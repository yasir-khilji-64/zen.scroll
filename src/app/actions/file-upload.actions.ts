'use server';

import { randomBytes } from 'crypto';
import { currentUser } from '@clerk/nextjs/server';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ServerEnv } from '@/lib/env/server.env';
import { FileBuckets, config } from '@/lib/utils';

const s3 = new S3Client({
  region: ServerEnv.AWS_REGION,
  credentials: {
    accessKeyId: ServerEnv.AWS_ACCESS,
    secretAccessKey: ServerEnv.AWS_SECRET,
  },
});

const genRandomKey = (length = 32) => {
  return randomBytes(length).toString('hex');
};

const MAX_FILE_SIZE = 10 * config.SIZE_IN.MB;

export async function getSignedURL(
  container: FileBuckets,
  type: string,
  sz: number
) {
  const user = await currentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  if (
    !config.FILE_TYPES.IMAGE.includes(type) &&
    !config.FILE_TYPES.VIDEO.includes(type)
  ) {
    throw new Error('Unsupported file type. Please provide a valid file type.');
  }
  if (sz > MAX_FILE_SIZE) {
    throw new Error('File size exceeds the maximum limit of 10MB');
  }

  let key: string;
  switch (container) {
    case FileBuckets.PROFILE:
      key = `${FileBuckets.PROFILE}/${genRandomKey()}`;
      break;

    default:
      key = genRandomKey();
      break;
  }
  const fileUploadCommand = new PutObjectCommand({
    Bucket: ServerEnv.AWS_BUCKET,
    Key: key,
    ContentLength: sz,
    ContentType: type,
    Metadata: {
      userId: user.id,
      created_at: new Date().toISOString(),
      ETag: genRandomKey(),
    },
  });
  try {
    const signedURL = await getSignedUrl(s3, fileUploadCommand, {
      expiresIn: 60,
    });
    return {
      url: signedURL,
    };
  } catch (error) {
    console.error(error);
    throw new Error('Fatal server error while uploading.');
  }
}

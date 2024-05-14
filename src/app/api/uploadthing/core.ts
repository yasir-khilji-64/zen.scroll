import { currentUser } from '@clerk/nextjs/server';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const fileRouter = {
  media: f({ image: { maxFileSize: '4MB' } })
    .middleware(async () => {
      const user = await currentUser();
      if (!user) throw new Error('Unauthorized');

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Uploaded, Metadata: ', metadata.userId);
      console.log('File URL: ', file.url);
    }),
} satisfies FileRouter;

export type FileRouterType = typeof fileRouter;

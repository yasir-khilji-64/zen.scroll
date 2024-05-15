import { z } from 'zod';

const ServerEnvSchema = z.object({
  CLERK_SECRET_KEY: z.string({ message: 'Clerk Secret Key not provided' }),
  UPLOADTHING_SECRET: z.string({ message: 'Uploadthing Secret not provided' }),
  UPLOADTHING_APP_ID: z.string({ message: 'Uploadthing App ID not provided' }),
  AWS_REGION: z.string({ message: 'AWS Region not provided' }),
  AWS_ACCESS_KEY: z.string({ message: 'AWS Access Key not provided' }),
  AWS_SECRET_KEY: z.string({ message: 'AWS Secret Key not provided' }),
  AWS_BUCKET: z.string({ message: 'AWS Bucket not provided' }),
});

export const SeverEnv = ServerEnvSchema.parse(process.env);

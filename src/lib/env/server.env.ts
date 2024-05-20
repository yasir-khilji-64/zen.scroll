import { z } from 'zod';

const ServerEnvSchema = z.object({
  CLERK_SECRET_KEY: z.string({ message: 'Clerk Secret Key not provided' }),
  AWS_REGION: z.string({ message: 'AWS Region not provided' }),
  AWS_ACCESS: z.string({ message: 'AWS Access Key not provided' }),
  AWS_SECRET: z.string({ message: 'AWS Secret Key not provided' }),
  AWS_BUCKET: z.string({ message: 'AWS Bucket not provided' }),
  MONGO_URI: z.string({ message: 'MongoDB URI not provided' }),
  MONGO_DATABASE: z.string({ message: 'Database name not provide' }),
});

export const ServerEnv = ServerEnvSchema.parse(process.env);

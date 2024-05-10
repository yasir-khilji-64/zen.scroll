import { z } from 'zod';

const schema = z.object({
  CLERK_SECRET_KEY: z.string({ message: 'Clerk Secret Key not provided' }),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string({
    message: 'Clerk Publishable Key not provided',
  }),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string({
    message: 'Clerk SignIn URL not provided',
  }),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string({
    message: 'Clerk SignUp URL not provided',
  }),
  NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL: z.string({
    message: 'Clerk SignIn Fallback Redirect URL not provided',
  }),
  NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL: z.string({
    message: 'Clerk SignIn Fallback Redirect URL not provided',
  }),
  NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL: z.string({
    message: 'Clerk SignIn Force Redirect URL not provided',
  }),
  NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL: z.string({
    message: 'Clerk SignIn Force Redirect URL not provided',
  }),
});

export const env = schema.parse(process.env);

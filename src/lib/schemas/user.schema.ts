import { z } from 'zod';

export const UserSchema = z.object({
  user_id: z.string({ message: 'Provide a valid user id' }),
  username: z
    .string({ message: 'Provide a valid username' })
    .min(3, { message: 'Username must be atleast 3 characters' }),
  email: z
    .string({ message: 'Provide a valid email' })
    .email({ message: 'Provide a valid email' }),
  avatar_url: z.string().url({ message: 'Provide a valid avatar url' }),
  bio: z
    .string({ message: 'User must provide bio for onboarding' })
    .min(10, { message: 'Bio must be atleast 10 characters long' })
    .max(200, { message: 'Bio should not exceed 200 characters' }),
  is_onboarded: z.boolean(),
});

export type UserType = z.infer<typeof UserSchema>;

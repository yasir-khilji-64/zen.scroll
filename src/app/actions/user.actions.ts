'use server';

import connectToDatabase from '@/lib/database';
import { UserModel } from '@/lib/models/user.model';
import { UserSchema, UserType } from '@/lib/schemas/user.schema';
import { currentUser } from '@clerk/nextjs/server';

export async function createUser(data: UserType) {
  try {
    await connectToDatabase();
    const validated = await UserSchema.parseAsync(data);
    const result = await UserModel.create([validated]);
    console.log(result);
    return {
      user: JSON.parse(JSON.stringify(result[0])),
    };
  } catch (error) {
    const err = error as Error;
    console.error(err);
    throw err;
  }
}

export async function getUsers() {
  try {
    await connectToDatabase();
    const loggedInUser = await currentUser();
    const users = await UserModel.aggregate([
      {
        $match: {
          user_id: loggedInUser?.id,
          email: loggedInUser?.primaryEmailAddress?.emailAddress,
        },
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          user_id: '$user_id',
          email: '$email',
          username: '$username',
          avatar_url: '$avatar_url',
          bio: '$bio',
          is_onboarded: '$is_onboarded',
        },
      },
    ]);
    console.log(users);
    return {
      user: JSON.parse(JSON.stringify(users[0])),
    };
  } catch (error) {
    const err = error as Error;
    console.error(err);
    throw err;
  }
}

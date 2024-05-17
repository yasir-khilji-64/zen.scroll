import { Schema, model, models } from 'mongoose';
import { UserType } from '../schemas/user.schema';

const User = new Schema<UserType>(
  {
    user_id: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    avatar_url: {
      type: String,
      default: 'https://gravatar.com/avatar/?s=400&d=identicon',
    },
    bio: {
      type: String,
      required: true,
    },
    is_onboarded: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

User.post('save', function (err: any, doc: any, next: any) {
  console.log('Save Post', err);
  if (err.name === 'MongoServerError' && err.code === 11000) {
    const error: Error = new Error('User already registered');
    next(error);
  } else {
    next();
  }
});

export const UserModel = models.user || model<UserType>('user', User);

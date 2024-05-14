'use client';

import React, { ChangeEvent, useState } from 'react';
import { Send } from 'lucide-react';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUploadThing } from '@/lib/uploadthing';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

const Schema = z.object({
  username: z
    .string({ message: 'Provide a valid username' })
    .min(3, { message: 'Username must be atleast 3 characters' }),
  avatar_url: z.string().url({ message: 'Provide a valid avatar url' }),
  bio: z
    .string({ message: 'User must provide bio for onboarding' })
    .min(10, { message: 'Bio must be atleast 10 characters long' })
    .max(200, { message: 'Bio should not exceed 200 characters' }),
});
type SchemaType = z.infer<typeof Schema>;

type User = {
  user_id: string;
  username: string | null;
  email: string | undefined;
  avatar_url: string;
  bio?: string | null;
};

interface IUserProfileProps {
  title: string;
  buttonTitle: string;
  user: User;
  description?: string;
}

export const UserProfile: React.FC<IUserProfileProps> = ({
  title,
  buttonTitle,
  user,
  description,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues: {
      username: user.username ?? '',
      avatar_url: user.avatar_url,
      bio: user.bio ?? '',
    },
  });

  const { startUpload } = useUploadThing('media');

  const [image, setImage] = useState<string>(user.avatar_url ?? '');
  const [file, setFile] = useState<File | null>(null);

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const userData: SchemaType = data;
    if (file !== null) {
      const result = await startUpload([file]);
      if (result !== undefined) {
        setValue('avatar_url', result[0].url);
        userData.avatar_url = result[0].url;
      }
    }
    console.log(userData);
  };

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null || e.target.files[0] === null) {
      return;
    }
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-[560px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Avatar className="w-24 h-24">
              <AvatarImage src={image} />
              <AvatarFallback className="text-2xl font-medium">
                {user.username
                  ?.split(' ')
                  .map((word) => word.charAt(0).toUpperCase())
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <Input type="file" accept="image/*" onChange={onImageChange} />
          </div>
          <div className="my-1">
            <Label
              htmlFor="username"
              className={errors.username ? 'text-destructive' : ''}
            >
              Username
            </Label>
            <Input
              type="text"
              {...register('username')}
              className={errors.username ? 'border-destructive' : ''}
            />
            {errors.username && (
              <Label htmlFor="username_error" className="text-destructive">
                {errors.username.message}
              </Label>
            )}
          </div>
          <div className="">
            <Label
              htmlFor="Bio"
              className={errors.bio ? 'text-destructive' : ''}
            >
              Bio
            </Label>
            <Textarea
              className={`h-[100px] ${errors.bio ? 'border-destructive' : ''}`}
              {...register('bio')}
              placeholder="Introduce yourself to the vibrant community of Zen Scroll. Share a brief bio"
            />
            {errors.bio && (
              <Label htmlFor="bio_error" className="text-destructive">
                {errors.bio.message}
              </Label>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            {buttonTitle}
            <Send className="ml-2 w-5 h-5" />
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

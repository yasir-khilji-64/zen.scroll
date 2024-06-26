'use client';

import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Send } from 'lucide-react';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getSignedURL } from '@/app/actions/file-upload.actions';
import { UserType } from '@/lib/schemas/user.schema';
import { createUser } from '@/app/actions/user.actions';
import { FileBuckets, config } from '@/lib/utils';
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
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';

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
  id?: string;
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
    formState: { errors, isSubmitted, isValid },
  } = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues: {
      username: user.username ?? '',
      avatar_url: user.avatar_url,
      bio: user.bio ?? '',
    },
  });

  const router = useRouter();
  const imageTypes = config.FILE_TYPES.IMAGE.join(',');
  const [image, setImage] = useState<string>(user.avatar_url ?? '');
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const userData: UserType = {
      user_id: user.user_id,
      username: data.username,
      email: user.email ?? '',
      avatar_url: data.avatar_url,
      bio: data.bio,
      is_onboarded: true,
    };
    try {
      if (file !== null) {
        const { url } = await getSignedURL(
          FileBuckets.PROFILE,
          file.type,
          file.size
        );
        await fetch(url, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        });
        [userData.avatar_url] = url.split('?');
      }
      await createUser(userData);
      router.replace('/');
    } catch (error) {
      const err = error as Error;
      toast({
        variant: 'destructive',
        title: err.name,
        description: err.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      reset();
    }
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
            <Input type="file" accept={imageTypes} onChange={onImageChange} />
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
          <Button className="w-full" disabled={!isValid}>
            {isSubmitted && <Loader2 className="mr-2 w-5 h-5" />}
            {buttonTitle}
            <Send className="ml-2 w-5 h-5" />
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

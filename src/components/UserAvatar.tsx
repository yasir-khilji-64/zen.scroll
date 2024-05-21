'use client';

import React from 'react';
import { LogOut } from 'lucide-react';
import { SignOutButton } from '@clerk/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

type User = {
  id: string;
  user_id: string;
  username: string;
  email: string;
  avatar_url: string;
  bio: string;
};

interface IUserAvatarProps {
  user: User;
}

export const UserAvatar: React.FC<IUserAvatarProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-8 h-8 cursor-pointer">
          <AvatarImage src={user.avatar_url} />
          <AvatarFallback className="text-base">
            {user.username
              ?.split(' ')
              .map((word: string) => word.charAt(0).toUpperCase())
              .join('')}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex flex-row items-center">
          <LogOut className="mr-2 w-4 h-4" />
          <SignOutButton />
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

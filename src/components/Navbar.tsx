import React from 'react';
import Link from 'next/link';
import { LogIn, ScrollText } from 'lucide-react';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { getUser } from '@/app/actions/user.actions';
import { Button } from './ui/button';
import { UserAvatar } from './UserAvatar';

export async function Navbar() {
  const { user } = await getUser();
  return (
    <div className="flex w-full border-b bg-background sticky">
      <header className="container flex flex-row top-0 h-16 items-center gap-4 px-4 md:px-6">
        <nav className="w-full flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <ScrollText className="h-6 w-6" />
            <p className="hidden md:flex text-xl font-semibold">Zen Scroll</p>
          </Link>
        </nav>
        <div className="flex justify-end items-center gap-4">
          <SignedOut>
            <Link href="/sign-up">
              <Button variant="ghost" className="hover:underline">
                <p className="">Create Account</p>
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button
                variant="secondary"
                className="hover:underline hover:bg-primary hover:text-primary-foreground"
              >
                <p className="">Login</p>
                <LogIn className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserAvatar
              user={{
                id: user?.id,
                user_id: user?.user_id,
                email: user?.email,
                username: user?.username,
                avatar_url: user?.avatar_url,
                bio: user?.bio,
              }}
            />
          </SignedIn>
        </div>
      </header>
    </div>
  );
}

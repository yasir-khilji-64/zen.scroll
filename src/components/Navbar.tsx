import { LogIn, ScrollText } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';

export function Navbar() {
  return (
    <div className="flex w-full border-b bg-background">
      <header className="container flex flex-row sticky top-0 h-16 items-center gap-4 px-4 md:px-6">
        <nav className="w-full flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <ScrollText className="h-6 w-6" />
            <p className="hidden md:flex">Zen Scroll</p>
          </Link>
        </nav>
        <div className="flex justify-end items-center gap-4">
          <Button variant="ghost" className="hover:underline">
            Create Account
          </Button>
          <Button
            variant="secondary"
            className="hover:underline hover:bg-primary hover:text-primary-foreground"
          >
            Login
            <LogIn className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>
    </div>
  );
}

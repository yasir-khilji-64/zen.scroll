import { LogIn } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

export default function Navbar() {
  return (
    <div className="sticky top-0 z-10 w-full border-b bg-background">
      <header className="container flex items-center justify-between h-16 px-4 md:px-6">
        <nav className="flex items-center gap-4 md:gap-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <div className="relative w-12 h-7 md:w-14 md:h-8">
              <Image
                src="/logo.png"
                alt="Next.js Logo"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <p className="hidden md:block text-xl font-semibold">Zen Scroll</p>
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/sign-up" className="hidden md:block">
            <Button variant="ghost" className="hover:underline">
              Create Account
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button
              variant="secondary"
              className="hover:underline hover:bg-primary hover:text-primary-foreground"
            >
              Login
              <LogIn className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>
    </div>
  );
}

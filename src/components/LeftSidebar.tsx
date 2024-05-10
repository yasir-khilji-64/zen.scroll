import React from 'react';
import Link from 'next/link';
import { SidebarLinks } from '@/contants';

export function LeftSidebar() {
  return (
    <section className="sticky left-0 top-0 flex h-auto w-fit flex-col justify-between overflow-auto max-md:hidden">
      <div className="flex flex-1 flex-col text-base gap-4">
        {SidebarLinks.map((link) => {
          return (
            <Link
              href={link.route}
              key={link.label}
              className="flex gap-4 justify-start items-center text-base"
            >
              {link.icon}
              <h2>{link.label}</h2>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

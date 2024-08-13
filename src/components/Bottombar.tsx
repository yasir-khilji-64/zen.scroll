import Link from 'next/link';
import SidebarLinks from './SidebarLinks';

export default function Bottombar() {
  return (
    <nav className="fixed bottom-0 h-16 z-10 w-full rounded-t-2xl p-4 backdrop-blur-lg bg-accent/40 sm:px-6 md:hidden">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {SidebarLinks.map((link) => {
          return (
            <Link
              key={link.route}
              href={link.route}
              className="flex flex-col gap-4 justify-start items-center"
            >
              {link.icon}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

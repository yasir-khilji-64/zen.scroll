import type { Metadata } from 'next';
import '../globals.css';
import { Navbar } from '@/components/Navbar';
import LeftSidebar from '@/components/LeftSidebar';
import RightSidebar from '@/components/RightSidebar';
import Bottombar from '@/components/Bottombar';

export const metadata: Metadata = {
  title: 'Zen Scroll',
  description:
    'Zen Scroll: Where developers unite to share insights, engage, and collaborate seamlessly.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex flex-row justify-between container px-4 md:px-6 py-2 md:py-4">
        <LeftSidebar />
        <section className="flex flex-1 flex-col items-center sm:px-8">
          {children}
        </section>
        <RightSidebar />
      </main>
      <Bottombar />
    </>
  );
}

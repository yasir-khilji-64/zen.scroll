import type { Metadata } from 'next';
import '../globals.css';
import { Navbar } from '@/components/Navbar';

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
      <main className="flex flex-row container px-4 md:px-6">
        <section>{children}</section>
      </main>
    </>
  );
}

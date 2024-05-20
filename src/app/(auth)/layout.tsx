import type { Metadata } from 'next';
import '../globals.css';

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
      <main className="flex flex-1 min-h-dvh justify-center items-center">
        {children}
      </main>
    </>
  );
}

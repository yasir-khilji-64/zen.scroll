import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/ThemeProvider';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: '400',
});

export const metadata: Metadata = {
  title: {
    template: '%s - Zen Scroll',
    default: 'Zen Scroll',
  },
  description:
    'Zen Scroll: Where developers unite to share insights, engage, and collaborate seamlessly.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-dvh bg-background font-sans antialiased',
          poppins.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          themes={['light', 'dark', 'system']}
          storageKey="theme"
          disableTransitionOnChange={true}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

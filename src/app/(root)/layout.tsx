import Bottombar from '@/components/Bottombar';
import LeftSidebar from '@/components/LeftSidebar';
import Navbar from '@/components/Navbar';
import RightSidebar from '@/components/RightSidebar';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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

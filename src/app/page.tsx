import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex bg-background flex-col items-center">
      <div className="flex flex-row gap-4 items-center">
        <Image
          className="relative"
          src="/logo.svg"
          alt="Next.js Logo"
          width={51}
          height={33}
          priority
        />{' '}
        <h1 className="text-3xl">Zen Scroll</h1>
      </div>
      <p>
        Zen Scroll: Where developers unite to share insights, engage, and
        collaborate seamlessly.
      </p>
    </main>
  );
}

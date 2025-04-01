'use client';
import H1 from '@/components/H1';
import Link from 'next/link';

export default function GlobalError({}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-col items-center px-2 pt-30 min-h-[100vh]">
      <H1 className="mb-15">Something went wrong!</H1>
      <Link
        className="bg-white/10 px-6 py-2 rounded-md opacity-80 hover:opacity-100 transition cursor-pointer"
        href="/"
        replace
      >
        На главную
      </Link>
    </main>
  );
}

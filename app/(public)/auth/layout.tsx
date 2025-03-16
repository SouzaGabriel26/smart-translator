import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="h-full grid place-items-center relative">
      <Link
        href="/"
        className="hover:underline transition-all absolute top-6 left-6"
      >
        Back to home
      </Link>
      {children}
    </div>
  );
}

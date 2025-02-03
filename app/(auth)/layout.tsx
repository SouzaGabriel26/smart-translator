import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return <div className="h-full grid place-items-center">{children}</div>;
}

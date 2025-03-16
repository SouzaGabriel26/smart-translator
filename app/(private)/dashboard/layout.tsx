import { checkUserAction } from '@/actions/auth/check-user';
import { Header } from '@/components/header';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default async function Layout({ children }: Props) {
  const user = await checkUserAction();

  return (
    <div className="h-full">
      <Header user={user} />
      {children}
    </div>
  );
}

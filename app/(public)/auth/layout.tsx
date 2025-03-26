import { getAppLanguageAction } from '@/app/actions';
import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default async function Layout({ children }: Props) {
  const language = await getAppLanguageAction();

  return (
    <div className="h-full grid place-items-center relative">
      <Link
        href="/"
        className="hover:underline transition-all absolute top-6 left-6"
      >
        {language === 'pt-br' ? 'Voltar para o início' : 'Back to home'}
      </Link>
      {children}
    </div>
  );
}

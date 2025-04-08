import { checkUserAction } from '@/actions/auth/check-user';
import { getAppLanguageAction } from '@/app/actions';
import { Header } from '@/components/header';
import { ToggleHardMode } from '@/components/toggle-hard-mode';
import { LanguageProvider } from '@/contexts/LanguageContext';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default async function Layout({ children }: Props) {
  const user = await checkUserAction();
  const language = await getAppLanguageAction();

  return (
    <div className="h-full">
      <Header user={user} />

      <LanguageProvider>
        <div className="flex flex-col px-6 py-12 gap-3 bg-background">
          <ToggleHardMode language={language} />
          {children}
        </div>
      </LanguageProvider>
    </div>
  );
}

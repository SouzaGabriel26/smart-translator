import { isLoggedIn } from '@/actions/auth/check-user';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset } from '@/components/ui/sidebar';
import { getLanguageContext } from '@/config/app-language-context';
import type { ReactNode } from 'react';
import { getAppLanguageAction } from '../actions';

type GlobalLayoutProps = {
  children: ReactNode;
};

export async function GlobalLayout({ children }: GlobalLayoutProps) {
  const isLogged = await isLoggedIn();
  const language = await getAppLanguageAction();
  const appLanguageContext = getLanguageContext(language);

  return isLogged ? (
    <>
      <AppSidebar
        sidebarLanguage={appLanguageContext.sidebar}
        appTitle={appLanguageContext.title}
        userIsAdmin={isLogged.role === 'ADMIN'}
      />

      <SidebarInset className="bg-background h-full">
        {children}
      </SidebarInset>
    </>
  ) : (<div className="w-full">{children}</div>)
}

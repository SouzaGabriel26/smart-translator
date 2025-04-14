import { getAppLanguageAction } from '@/app/actions';
import { getLanguageContext } from '@/config/app-language-context';
import { prismaClient } from '@/lib/prisma-client';
import type { Users as User } from '@prisma/client';
import { Globe } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { Notification, NotificationSkeleton } from './notification';
import { ToggleTheme } from './toggle-theme';
import { Button } from './ui/button';
import { SidebarTrigger } from './ui/sidebar';

type HeaderProps = {
  user?: User;
};

export async function Header({ user }: HeaderProps) {
  const language = await getAppLanguageAction();
  const appLanguageContext = getLanguageContext(language);

  const userPlan = await prismaClient.plans.findFirst({
    where: {
      id: user?.planId,
    },
  });

  function buildPlanLabel() {
    if (!userPlan) return '';

    if (language === 'pt-br') {
      return `Plano ${userPlan.name}: ${userPlan.translationsLimit} traduções por dia`;
    }

    return `${userPlan.name} Plan: ${userPlan.translationsLimit} translations per day`;
  }

  const formattedPlanLabel = buildPlanLabel();

  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-sm h-16 bg-background/60 flex justify-between items-center px-4">
      {user ? (
        <SidebarTrigger />
      ) : (
        <Link href="/" className="flex items-center gap-2">
          <Globe className="size-6 text-primary" />
          <h1 className="md:text-xl font-bold">{appLanguageContext.title}</h1>
        </Link>
      )}
      <div className="flex items-center gap-2">
        {!user && <AuthOptions />}
        {user && (
          <>
            <span className="hidden md:block border rounded-full text-xs px-2 py-1 text-muted-foreground dark:border-muted">
              {formattedPlanLabel}
            </span>

            <Suspense fallback={<NotificationSkeleton />}>
              <Notification />
            </Suspense>
          </>
        )}
        <ToggleTheme />
      </div>
    </header>
  );

  function AuthOptions() {
    return (
      <div className="flex gap-2 items-center">
        <Button asChild variant="ghost">
          <Link href="/auth/sign-in">{appLanguageContext.signInLabel}</Link>
        </Button>

        <Button asChild className="hidden md:block text-white">
          <Link href="/auth/sign-up">{appLanguageContext.signUpLabel}</Link>
        </Button>
      </div>
    );
  }
}

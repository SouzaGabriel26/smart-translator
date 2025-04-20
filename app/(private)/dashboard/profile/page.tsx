import { getAppLanguageAction } from '@/app/actions';
import { getLanguageContext } from '@/config/app-language-context';
import { Suspense } from 'react';
import AccountInfoCard from './_components/AccountInfoCard';
import AccountInfoCardSkeleton from './_components/AccountInfoCardSkeleton';
import { SubscriptionCard } from './_components/SubscriptionCard';
import { SubscriptionCardSkeleton } from './_components/SubscriptionCardSkeleton';

export default async function Page() {
  const language = await getAppLanguageAction();
  const { profile: profileLanguage } = getLanguageContext(language);

  return (
    <div className="w-full mx-auto p-6 space-y-6 grid grid-cols-1 lg:grid-cols-3 h-[calc(100%-64px)] relative lg:gap-4">
      <div className="lg:col-span-2">
        <Suspense
          fallback={
            <AccountInfoCardSkeleton profileLanguage={profileLanguage} />
          }
        >
          <AccountInfoCard profileLanguage={profileLanguage} />
        </Suspense>
      </div>

      <div className="lg:col-span-1">
        <Suspense
          fallback={
            <SubscriptionCardSkeleton profileLanguage={profileLanguage} />
          }
        >
          <SubscriptionCard profileLanguage={profileLanguage} />
        </Suspense>
      </div>
    </div>

    /* TODO: translation statistics card */
  );
}

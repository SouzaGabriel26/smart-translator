import { getAppLanguageAction } from '@/app/actions';
import { getLanguageContext } from '@/config/app-language-context';
import { Suspense } from 'react';
import AccountInfoCard from './_components/AccountInfoCard';
import AccountInfoCardSkeleton from './_components/AccountInfoCardSkeleton';

export default async function Page() {
  const language = await getAppLanguageAction();
  const { profile: profileLanguage } = getLanguageContext(language);

  return (
    <div className="w-full mx-auto p-6 space-y-6 grid place-items-center h-[calc(100%-64px)] relative">
      <Suspense
        fallback={<AccountInfoCardSkeleton profileLanguage={profileLanguage} />}
      >
        <AccountInfoCard profileLanguage={profileLanguage} />
      </Suspense>
    </div>

    /* TODO: subscription card */

    /* TODO: translation statistics card */
  );
}

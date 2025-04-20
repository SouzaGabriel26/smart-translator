'use client';

import { Progress } from '@/components/ui/progress';
import type { AppLanguageContext } from '@/config/app-language-context';
import { getUserDayRange } from '@/lib/utils';
import type { Plans } from '@prisma/client';
import { useEffect, useState } from 'react';
import { getTodayTranslationsAction } from '../../actions';

type SubscriptionDailyUsageProps = {
  profileLanguage: AppLanguageContext['profile'];
  plan: Plans | null;
};

export function SubscriptionDailyUsage({
  profileLanguage,
  plan,
}: SubscriptionDailyUsageProps) {
  const [translationsToday, setTranslationsToday] = useState(0);

  useEffect(() => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const { startOfToday, endOfToday } = getUserDayRange(userTimeZone);

    async function getTodayTranslations() {
      const translations = await getTodayTranslationsAction({
        startOfToday,
        endOfToday,
      });

      setTranslationsToday(translations.length);
    }

    getTodayTranslations();
  }, []);

  const progressValue =
    (translationsToday * 100) / (plan?.translationsLimit || 0);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between w-full items-center text-sm font-medium">
        <span>{profileLanguage.dailyUsage}</span>
        <span>
          {translationsToday} / {plan?.translationsLimit || 0}
        </span>
      </div>

      <Progress value={progressValue} />
    </div>
  );
}

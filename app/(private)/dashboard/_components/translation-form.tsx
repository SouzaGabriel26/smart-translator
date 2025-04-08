'use client';

import { GenerateTranslationForm } from '@/components/generate-translation-form';
import type { AppLanguageContext } from '@/config/app-language-context';
import { getUserDayRange } from '@/lib/utils';
import { HistoryIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getTodayTranslationsAction } from '../actions';
import { ToggleLanguage } from './toggle-language';

type TranslationFormProps = {
  dashboardLanguage: AppLanguageContext['dashboard'];
  translationsLimitPerDay: number;
  randomLabel: string;
};

export function TranslationForm({
  dashboardLanguage,
  translationsLimitPerDay,
  randomLabel,
}: TranslationFormProps) {
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

  return (
    <div className="w-full">
      <div className="rounded-t-md flex flex-col border p-6 dark:border-muted">
        <div className="flex justify-between items-center flex-col sm:flex-row">
          <h2 className="text-xl font-bold">{dashboardLanguage.form.title}</h2>

          <ToggleLanguage dashboardLanguage={dashboardLanguage} />
        </div>

        <GenerateTranslationForm
          disabled={translationsToday >= translationsLimitPerDay}
          label={randomLabel}
          dashboardLanguage={dashboardLanguage}
        />
      </div>

      <div className="flex gap-2 px-6 py-3 rounded-b-md border-x border-b dark:border-muted bg-muted text-muted-foreground">
        <span className="flex gap-2 items-center text-sm">
          <HistoryIcon className="size-4" />
          {dashboardLanguage.form.translationsLimitCounter} {translationsToday}/
          {translationsLimitPerDay}
        </span>
      </div>
    </div>
  );
}

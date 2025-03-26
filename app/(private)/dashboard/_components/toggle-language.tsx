'use client';

import { setLanguageAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import type { AppLanguageContext } from '@/config/app-language-context';
import type { AvailableLanguages } from '@/config/constants';
import { ArrowRight, ArrowRightLeft } from 'lucide-react';
import { useState } from 'react';

type ToggleLanguageProps = {
  defaultLanguages: {
    languageFrom: AvailableLanguages;
    languageTo: AvailableLanguages;
  };
  dashboardLanguage: AppLanguageContext['dashboard'];
};

export function ToggleLanguage({
  defaultLanguages,
  dashboardLanguage,
}: ToggleLanguageProps) {
  const [languages, setLanguages] = useState({
    languageFrom: defaultLanguages.languageFrom,
    languageTo: defaultLanguages.languageTo,
  });
  const { englishLabel, portugueseLabel } = dashboardLanguage.form;

  async function toggleLanguage() {
    const input = {
      languageFrom: languages.languageTo,
      languageTo: languages.languageFrom,
    };

    await setLanguageAction(input.languageFrom, input.languageTo);
    setLanguages(input);
  }

  return (
    <div className="flex gap-2">
      <div className="text-sm flex items-center gap-2">
        <span>
          {languages.languageFrom === 'en' ? englishLabel : portugueseLabel}
        </span>
        <ArrowRight className="size-4" />
        <span>
          {languages.languageTo === 'en' ? englishLabel : portugueseLabel}
        </span>
      </div>

      <Button onClick={toggleLanguage} variant="ghost" title="Switch languages">
        <ArrowRightLeft className="size-6" />
      </Button>
    </div>
  );
}

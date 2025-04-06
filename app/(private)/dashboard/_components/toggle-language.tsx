'use client';

import { Button } from '@/components/ui/button';
import type { AppLanguageContext } from '@/config/app-language-context';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { ArrowRight, ArrowRightLeft } from 'lucide-react';
import { useState } from 'react';

type ToggleLanguageProps = {
  dashboardLanguage: AppLanguageContext['dashboard'];
};

export function ToggleLanguage({ dashboardLanguage }: ToggleLanguageProps) {
  const [isRotated, setIsRotated] = useState(false);
  const { languageFrom, languageTo, toggleLanguage } = useLanguage();
  const { englishLabel, portugueseLabel } = dashboardLanguage.form;

  function handleClickButton() {
    toggleLanguage();
    setIsRotated((prev) => !prev);
  }

  return (
    <div className="flex gap-2">
      <div className="text-sm flex items-center gap-2">
        <span>{languageFrom === 'en' ? englishLabel : portugueseLabel}</span>

        <ArrowRight className="size-4" />

        <span>{languageTo === 'en' ? englishLabel : portugueseLabel}</span>
      </div>

      <Button
        onClick={handleClickButton}
        variant="ghost"
        title="Switch languages"
      >
        <ArrowRightLeft
          className={cn(
            'size-6 transition-transform ease-in-out duration-200',
            isRotated ? 'rotate-180' : 'rotate-0',
          )}
        />
      </Button>
    </div>
  );
}

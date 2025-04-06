'use client';

import { Button } from '@/components/ui/button';
import type { AppLanguageContext } from '@/config/app-language-context';
import { useToggleLanguage } from '@/hooks/use-toggle-language';
import { cn } from '@/lib/utils';
import { ArrowRight, ArrowRightLeft } from 'lucide-react';
import { useState } from 'react';

type ToggleLanguageProps = {
  dashboardLanguage: AppLanguageContext['dashboard'];
};

export function ToggleLanguage({ dashboardLanguage }: ToggleLanguageProps) {
  const [toggleIconDegree, setToggleIconDegree] = useState(0);
  const { languageFrom, languageTo, toggleLanguage } = useToggleLanguage();
  const { englishLabel, portugueseLabel } = dashboardLanguage.form;

  function handleClickButton() {
    toggleLanguage();
    setToggleIconDegree((prev) => (prev === 0 ? 180 : 0));
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
            `rotate-${toggleIconDegree}`,
          )}
        />
      </Button>
    </div>
  );
}

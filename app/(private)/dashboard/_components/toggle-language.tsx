'use client';

import { getLanguageAction, setLanguageAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowRightLeft } from 'lucide-react';
import { useState } from 'react';

export function ToggleLanguage() {
  const [languages, setLanguages] = useState({
    languageFrom: 'en',
    languageTo: 'pt-br',
  });

  async function toggleLanguage() {
    const { languageFrom, languageTo } = await getLanguageAction();

    if (languageFrom === 'en') {
      await setLanguageAction('pt-br', 'en');
      setLanguages({ languageFrom: 'pt-br', languageTo: 'en' });
    } else {
      await setLanguageAction('en', 'pt-br');
      setLanguages({ languageFrom: 'en', languageTo: 'pt-br' });
    }
  }

  return (
    <div className="flex gap-2">
      <div className="text-sm flex items-center gap-2">
        <span>
          {languages.languageFrom === 'en' ? 'English' : 'Portuguese'}
        </span>
        <ArrowRight className="size-4" />
        <span>{languages.languageTo === 'en' ? 'English' : 'Portuguese'}</span>
      </div>

      <Button onClick={toggleLanguage} variant="ghost" title="Switch languages">
        <ArrowRightLeft className="size-6" />
      </Button>
    </div>
  );
}

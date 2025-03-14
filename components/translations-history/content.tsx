'use client';

import { findTranslationsAction } from '@/app/actions';
import type { TranslationPhrases, Translations } from '@prisma/client';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { DebouncedInput } from '../debounced-input';

type TranslationsWithPhrases = Array<
  Translations & {
    phrases: Array<TranslationPhrases>;
  }
>;

type TranslationsHistoryContentProps = {
  initialTranslations: TranslationsWithPhrases;
};

export function TranslationsHistoryContent({
  initialTranslations,
}: TranslationsHistoryContentProps) {
  const [translations, setTranslations] =
    useState<TranslationsWithPhrases>(initialTranslations);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSearch(value: string) {
    setIsLoading(true);
    const filteredTranslations = await findTranslationsAction(value);
    setTranslations(filteredTranslations);
    setIsLoading(false);
  }

  return (
    <div className="h-full space-y-4 pb-4 md:pb-0">
      <h3 className="mb-3 text-xl font-medium">
        Translation History ({translations.length})
      </h3>

      <form>
        <label htmlFor="search_term" className="text-slate-600 text-sm">
          Search translations
        </label>

        <div className='relative'>
          <DebouncedInput
            id="search_term"
            placeholder="Search for a word or a translation..."
            action={handleSearch}
          />

          {isLoading && (
            <Loader2Icon className='size-4 animate-spin absolute right-3 top-2.5' />
          )}
        </div>
      </form>

      <div className="border rounded overflow-y-auto h-96 p-4 bg-background">
        {translations.length === 0 ? (
          <p className="text-slate-400 text-center py-10">
            No translations found.
          </p>
        ) : (
          translations.map((translation) => (
            <div key={translation.id} className="shadow-md rounded p-4">
              <div className="text-xl">
                <div className="flex items-center gap-2">
                  <span className="font-bold">
                    {translation.targetWord} ({translation.languageFrom})
                  </span>
                  {' = '}
                  <span className="font-bold">
                    {translation.translatedWord} ({translation.languageTo})
                  </span>
                </div>

                <span className="text-muted-foreground">
                  {translation.createdAt.toLocaleDateString('en', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </span>
              </div>

              <div>
                <ul className="space-y-2 mt-4">
                  {translation.phrases.map((phrase) => (
                    <li key={phrase.id} className="flex flex-col">
                      <span className="font-bold">{phrase.content}</span>
                      <span className="text-muted-foreground">
                        {phrase.translatedContent}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

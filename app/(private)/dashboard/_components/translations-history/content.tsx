'use client';

import { findTranslationsAction } from '@/app/(private)/dashboard/actions';
import { DebouncedInput } from '@/components/debounced-input';
import type { AppLanguageContext } from '@/config/app-language-context';
import type { AvailableLanguages } from '@/config/constants';
import type { TranslationPhrases, Translations } from '@prisma/client';
import { HistoryIcon, Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { DeleteConfirmationModal } from './delete-confirmation-modal';

export type TranslationsWithPhrases = Array<
  Translations & {
    phrases: Array<TranslationPhrases>;
  }
>;

type TranslationsHistoryContentProps = {
  initialTranslations: TranslationsWithPhrases;
  historyLanguage: AppLanguageContext['dashboard']['history'];
  language: AvailableLanguages;
};

export function TranslationsHistoryContent({
  initialTranslations,
  historyLanguage,
  language,
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
    <div className="space-y-4 pb-4 md:pb-0 border dark:border-muted rounded-md p-4 w-full md:h-[750px] flex flex-col">
      <h3 className="mb-3 text-xl font-bold flex items-center gap-2">
        <HistoryIcon className="size-6" />
        {historyLanguage.title} ({translations.length})
      </h3>

      <form>
        <div className="relative">
          <DebouncedInput
            id="search_term"
            className="text-sm"
            placeholder={historyLanguage.inputLabel}
            action={handleSearch}
          />

          {isLoading && (
            <Loader2Icon className="size-4 animate-spin absolute right-3 top-2.5" />
          )}
        </div>
      </form>

      <div className="flex-1 overflow-y-auto bg-background">
        {translations.length === 0 ? (
          <p className="text-slate-400 text-center py-10">
            {historyLanguage.noTranslationsFound}
          </p>
        ) : (
          translations.map((translation) => (
            <div
              key={translation.id}
              className="border-b dark:border-muted rounded py-4 px-2 relative"
            >
              <DeleteConfirmationModal
                translationToDelete={translation}
                language={language}
              />

              <div>
                <div className="flex font-medium items-center gap-2 text-md">
                  <div className="space-x-1">
                    <span className="capitalize">{translation.targetWord}</span>
                    <small>({translation.languageFrom})</small>
                  </div>
                  =
                  <div className="space-x-1">
                    <span className="capitalize">
                      {translation.translatedWord}
                    </span>
                    <small>({translation.languageTo})</small>
                  </div>
                </div>

                <span className="h-fit text-xs border rounded-full px-2 py-1">
                  {translation.createdAt.toLocaleDateString(language, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </span>
              </div>

              <div>
                <ul className="space-y-3 mt-4">
                  {translation.phrases.map((phrase) => (
                    <li key={phrase.id} className="flex flex-col text-sm">
                      <span className="font-bold">{phrase.content}</span>
                      <span className="text-sm text-muted-foreground">
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

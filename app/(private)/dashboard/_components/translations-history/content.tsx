'use client';

import { findTranslationsAction } from '@/app/(private)/dashboard/actions';
import { CopyToClipboard } from '@/components/CopyToClipboard';
import { DisplaySoundButton } from '@/components/DisplaySoundButton';
import { DebouncedInput } from '@/components/debounced-input';
import type { AppLanguageContext } from '@/config/app-language-context';
import type { AvailableLanguages } from '@/config/constants';
import { cn } from '@/lib/utils';
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
  isHardMode: boolean;
};

export function TranslationsHistoryContent({
  initialTranslations,
  historyLanguage,
  language,
  isHardMode,
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
    <div className="space-y-4 pb-4 md:pb-0 rounded-md p-4 w-full flex flex-col">
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

      <div className="flex-1 overflow-y-auto px-1 bg-background">
        {translations.length === 0 ? (
          <p className="text-slate-400 text-center py-10">
            {historyLanguage.noTranslationsFound}
          </p>
        ) : (
          translations.map((translation) => {
            const isHardModeAvailable =
              isHardMode && Boolean(translation.wordOverview);

            return (
              <div
                key={translation.id}
                className="border-b dark:border-muted rounded py-4 px-2 relative"
              >
                <DeleteConfirmationModal
                  translationToDelete={translation}
                  language={language}
                />

                <div className="flex flex-col gap-3">
                  <div
                    className={cn(
                      'flex font-bold items-center gap-1 text-md',
                      isHardModeAvailable && 'flex-col items-start',
                    )}
                  >
                    <div className="flex gap-1 items-center">
                      <span className="capitalize">
                        {translation.targetWord}
                      </span>
                      <small>({translation.languageFrom})</small>
                    </div>

                    <div className="flex gap-1">
                      {isHardModeAvailable ? (
                        <span className="text-sm font-normal text-muted-foreground">
                          {translation.wordOverview}
                        </span>
                      ) : (
                        <div className="flex gap-1 items-center">
                          <span className="capitalize">
                            {'='} {translation.translatedWord}
                          </span>
                          <small>({translation.languageTo})</small>
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="h-fit text-xs border rounded-full px-2 py-1 w-fit">
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
                      <li
                        key={phrase.id}
                        className="flex flex-col text-sm gap-2"
                      >
                        <div className="flex gap-2 items-center justify-between sm:justify-start">
                          <span className="font-bold">{phrase.content}</span>
                          <CopyToClipboard textToCopy={phrase.content} />
                          <DisplaySoundButton text={phrase.content} />
                        </div>

                        <div
                          className={cn(
                            'flex gap-2 items-center justify-between sm:justify-start',
                            isHardModeAvailable && 'hidden',
                          )}
                        >
                          <span className="text-sm text-muted-foreground">
                            {phrase.translatedContent}
                          </span>
                          <CopyToClipboard
                            textToCopy={phrase.translatedContent}
                          />
                          <DisplaySoundButton text={phrase.translatedContent} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

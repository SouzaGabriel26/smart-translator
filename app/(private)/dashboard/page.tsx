import { checkUserAction } from '@/actions/auth/check-user';
import { getLanguageAction } from '@/app/actions';
import { GenerateTranslationForm } from '@/components/generate-translation-form';
import { TranslationsHistorySkeleton } from '@/components/translations-history-skeleton';
import { prismaClient } from '@/lib/prisma-client';
import { HistoryIcon } from 'lucide-react';
import { Suspense } from 'react';
import { ToggleLanguage } from './_components/toggle-language';
import { TranslationsHistory } from './_components/translations-history';

const date = new Date().toISOString().split('T')[0];

const startOfToday = new Date(`${date}T00:00:00.000Z`);
const endOfToday = new Date(`${date}T23:59:59.999Z`);

export default async function Page() {
  const user = await checkUserAction();
  const MAX_TRANSLATIONS_PER_DAY = 25;

  const latestTranslation = await prismaClient.translations.findFirst({
    where: {
      userId: user.id,
    },
    include: {
      phrases: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const todayTranslations = await prismaClient.translations.findMany({
    where: {
      userId: user.id,
      createdAt: {
        gte: startOfToday,
        lte: endOfToday,
      },
    },
  });

  const randomWordsInEnglishToTranslate = [
    'Smart Contract',
    'Decentralized',
    'Cryptocurrency',
    'Smart Translator',
    'Artificial Intelligence',
    'Machine Learning',
  ];

  const randomPlaceHolderIndex = Math.floor(
    Math.random() * randomWordsInEnglishToTranslate.length,
  );

  const { languageFrom, languageTo } = await getLanguageAction();

  return (
    <main
      key={Date.now()}
      className="flex flex-col md:flex-row px-6 py-12 gap-4"
    >
      <div className="flex flex-col justify-between gap-4 w-full md:h-[750px]">
        <div className="w-full">
          <div className="rounded-t-md flex flex-col border p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Translate</h2>

              <ToggleLanguage defaultLanguages={{ languageFrom, languageTo }} />
            </div>

            <GenerateTranslationForm
              disabled={todayTranslations.length >= MAX_TRANSLATIONS_PER_DAY}
              label={randomWordsInEnglishToTranslate[randomPlaceHolderIndex]}
              languageFrom={languageFrom}
              languageTo={languageTo}
            />
          </div>

          <div className="flex gap-2 px-6 py-3 rounded-b-md border-x border-b bg-muted text-muted-foreground">
            <span className="flex gap-2 items-center text-sm">
              <HistoryIcon className="size-4" />
              Translations today: {todayTranslations.length}/
              {MAX_TRANSLATIONS_PER_DAY}
            </span>
          </div>
        </div>

        <div className="rounded-md w-full border p-4">
          <h2 className="text-xl font-bold">Latest translation</h2>
          <p className="text-muted-foreground text-sm">
            View your most recent translation with examples
          </p>

          <div className="mt-5">
            {!latestTranslation ? (
              <p className="text-center text-slate-400">
                No translations yet. Enter a word to translate.
              </p>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <div className="font-bold space-x-1">
                      <span className="capitalize">
                        {latestTranslation.targetWord}
                      </span>
                      <small>({latestTranslation.languageFrom})</small>
                    </div>
                    =
                    <div className="font-bold space-x-1">
                      <span className="capitalize">
                        {latestTranslation.translatedWord}
                      </span>
                      <small>({latestTranslation.languageTo})</small>
                    </div>
                  </div>

                  <span className="text-sm text-muted-foreground">
                    {latestTranslation.createdAt.toLocaleDateString('en', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </span>
                </div>

                <div>
                  <span>Example Usage</span>

                  <ul className="space-y-3 mt-2">
                    {latestTranslation.phrases.map((phrase) => (
                      <li
                        key={phrase.id}
                        className="flex flex-col border rounded-md p-4"
                      >
                        <span className="font-bold">{phrase.content}</span>
                        <span className="text-sm text-muted-foreground">
                          {phrase.translatedContent}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Suspense fallback={<TranslationsHistorySkeleton />}>
        <TranslationsHistory key={Date.now()} />
      </Suspense>
    </main>
  );
}

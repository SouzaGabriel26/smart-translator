import { checkUserAction } from '@/actions/auth/check-user';
import { GenerateTranslationForm } from '@/components/generate-translation-form';
import { TranslationsHistory } from '@/components/translations-history';
import { TranslationsHistorySkeleton } from '@/components/translations-history-skeleton';
import { prismaClient } from '@/lib/prisma-client';
import { Suspense } from 'react';

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

  return (
    <main className="flex flex-col px-6 py-12 gap-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="rounded w-full xl:w-1/2 flex flex-col">
          <h2 className="mb-3  text-xl font-medium">Translate a word</h2>

          <GenerateTranslationForm
            disabled={todayTranslations.length >= MAX_TRANSLATIONS_PER_DAY}
          />

          <div className="flex gap-2 mt-4">
            <strong>Translations generated today:</strong>
            <span>{todayTranslations.length}</span>
          </div>
        </div>

        <div className="rounded w-full xl:w-1/2">
          <h2 className="mb-3 text-xl font-medium">Latest translation</h2>

          <div className="border rounded p-4">
            {!latestTranslation ? (
              <p className="text-center text-slate-400">
                No translations yet. Enter a word to translate.
              </p>
            ) : (
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <span className="text-lg font-bold">
                    {latestTranslation.targetWord} (
                    {latestTranslation.languageFrom}){' = '}
                    {latestTranslation.translatedWord} (
                    {latestTranslation.languageTo})
                  </span>

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
                  <ul className="space-y-2 mt-4">
                    {latestTranslation.phrases.map((phrase) => (
                      <li key={phrase.id} className="flex flex-col">
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

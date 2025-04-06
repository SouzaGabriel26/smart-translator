import { checkUserAction } from '@/actions/auth/check-user';
import { getAppLanguageAction } from '@/app/actions';
import { TranslationsHistorySkeleton } from '@/components/translations-history-skeleton';
import { getLanguageContext } from '@/config/app-language-context';
import { prismaClient } from '@/lib/prisma-client';
import { Suspense } from 'react';
import { TranslationForm } from './_components/translation-form';
import { TranslationsHistory } from './_components/translations-history';

export default async function Page() {
  const user = await checkUserAction();
  const language = await getAppLanguageAction();
  const { dashboard: dashboardLanguage } = getLanguageContext(language);

  const userPlan = await prismaClient.plans.findFirst({
    where: { id: user.planId },
  });

  const MAX_TRANSLATIONS_PER_DAY = userPlan?.translationsLimit || 15;

  const latestTranslation = await prismaClient.translations.findFirst({
    where: {
      userId: user.id,
      discarded: false,
    },
    include: {
      phrases: true,
    },
    orderBy: {
      createdAt: 'desc',
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

  const randomIndex = Math.floor(
    Math.random() * randomWordsInEnglishToTranslate.length,
  );
  const randomLabel = randomWordsInEnglishToTranslate[randomIndex];

  return (
    <main
      key={Date.now()}
      className="flex flex-col md:flex-row px-6 py-12 gap-4 bg-background"
    >
      <div className="flex flex-col justify-between gap-4 w-full md:h-[750px]">
        <TranslationForm
          dashboardLanguage={dashboardLanguage}
          translationsLimitPerDay={MAX_TRANSLATIONS_PER_DAY}
          randomLabel={randomLabel}
        />

        <div className="rounded-md flex-1 w-full border p-4 dark:border-muted">
          <h2 className="text-xl font-bold">
            {dashboardLanguage.latest.title}
          </h2>
          <p className="text-muted-foreground text-sm">
            {dashboardLanguage.latest.description}
          </p>

          <div className="mt-5 h-full">
            {!latestTranslation ? (
              <p className="text-slate-400 flex h-full items-center justify-center">
                {dashboardLanguage.latest.noTranslationsYet}
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
                    {latestTranslation.createdAt.toLocaleDateString(language, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </span>
                </div>

                <div>
                  <span>{dashboardLanguage.latest.exampleUsage}</span>

                  <ul className="space-y-3 mt-2">
                    {latestTranslation.phrases.map((phrase) => (
                      <li
                        key={phrase.id}
                        className="flex flex-col border dark:border-muted rounded-md p-4"
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

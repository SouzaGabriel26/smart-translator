import { checkUserAction } from '@/actions/auth/check-user';
import { TranslationsHistorySkeleton } from '@/app/(private)/dashboard/_components/translations-history/translations-history-skeleton';
import { getAppLanguageAction, getModeAction } from '@/app/actions';
import { ToggleHardMode } from '@/components/toggle-hard-mode';
import { getLanguageContext } from '@/config/app-language-context';
import { prismaClient } from '@/lib/prisma-client';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';
import { TranslationForm } from './_components/translation-form';
import { TranslationsHistory } from './_components/translations-history';

export default async function Page() {
  const user = await checkUserAction();
  const language = await getAppLanguageAction();
  const { dashboard: dashboardLanguage } = getLanguageContext(language);
  const mode = await getModeAction();

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

  const isHardModeAvailable =
    mode === 'hard' && Boolean(latestTranslation?.wordOverview);

  return (
    <div className="flex flex-col px-6 py-6 md:py-12 gap-3 bg-background">
      <ToggleHardMode language={language} />
      <main
        key={Date.now()}
        className="flex flex-col xl:flex-row gap-4 bg-background"
      >
        <div className="flex flex-col justify-between gap-4 w-full xl:h-[750px]">
          <TranslationForm
            dashboardLanguage={dashboardLanguage}
            translationsLimitPerDay={MAX_TRANSLATIONS_PER_DAY}
            randomLabel={randomLabel}
          />

          <div className="relative rounded-md flex-1 bg-background w-full border p-4 dark:border-muted">
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
                  <div className="flex flex-col gap-2">
                    <div
                      className={cn(
                        'flex items-center gap-1',
                        isHardModeAvailable && 'flex-col items-start',
                      )}
                    >
                      <div className="font-bold flex gap-1 items-center">
                        <span className="capitalize">
                          {latestTranslation.targetWord}
                        </span>
                        <small>({latestTranslation.languageFrom})</small>
                      </div>
                      <div className="flex gap-1">
                        {isHardModeAvailable ? (
                          <span className="text-muted-foreground text-sm">
                            {latestTranslation.wordOverview}
                          </span>
                        ) : (
                          <div className="font-bold flex gap-1 items-center">
                            <span className="capitalize">
                              {'= '} {latestTranslation.translatedWord}
                            </span>
                            <small>({latestTranslation.languageTo})</small>
                          </div>
                        )}
                      </div>
                    </div>

                    <span className="text-sm text-muted-foreground">
                      {latestTranslation.createdAt.toLocaleDateString(
                        language,
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                        },
                      )}
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
                          <span
                            className={cn(
                              'text-sm text-muted-foreground',
                              isHardModeAvailable && 'hidden',
                            )}
                          >
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
    </div>
  );
}

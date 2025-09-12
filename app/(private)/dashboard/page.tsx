import { checkUserAction } from "@/actions/auth/check-user";
import { getAppLanguageAction, getModeAction } from "@/app/actions";
import { CopyToClipboard } from "@/components/CopyToClipboard";
import { DisplaySoundButton } from "@/components/DisplaySoundButton";
import { ToggleHardMode } from "@/components/toggle-hard-mode";
import { getLanguageContext } from "@/config/app-language-context";
import { prismaClient } from "@/lib/prisma-client";
import { cn } from "@/lib/utils";
import { TranslationForm } from "./_components/translation-form";

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
      createdAt: "desc",
    },
  });

  const randomWordsInEnglishToTranslate = [
    "Smart Contract",
    "Decentralized",
    "Cryptocurrency",
    "Smart Translator",
    "Artificial Intelligence",
    "Machine Learning",
  ];

  const randomIndex = Math.floor(
    Math.random() * randomWordsInEnglishToTranslate.length
  );
  const randomLabel = randomWordsInEnglishToTranslate[randomIndex];

  const isHardModeAvailable =
    mode === "hard" && Boolean(latestTranslation?.wordOverview);

  return (
    <div className="flex flex-col px-6 py-6 md:py-12 gap-3 bg-background md:px-20">
      <ToggleHardMode language={language} />

      <main
        key={Date.now()}
        className="flex flex-col xl:flex-row gap-4 bg-background"
      >
        <div className="flex flex-col justify-between gap-4 w-full">
          <TranslationForm
            dashboardLanguage={dashboardLanguage}
            translationsLimitPerDay={MAX_TRANSLATIONS_PER_DAY}
            randomLabel={randomLabel}
          />

          <div className="relative rounded-md flex-1 bg-background w-full border p-4 dark:border-muted min-h-40 mt-6">
            {!latestTranslation ? (
              <p className="text-slate-400 flex h-full items-center justify-center text-center">
                {dashboardLanguage.latest.noTranslationsYet}
              </p>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <div
                    className={cn(
                      "flex items-center gap-1",
                      isHardModeAvailable && ""
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
                        <span className="text-sm">
                          {"= "} {latestTranslation.wordOverview}
                        </span>
                      ) : (
                        <div className="font-bold flex gap-1 items-center">
                          <span className="capitalize">
                            {"= "} {latestTranslation.translatedWord}
                          </span>
                          <small>({latestTranslation.languageTo})</small>
                        </div>
                      )}
                    </div>

                    <DisplaySoundButton text={latestTranslation.targetWord} />
                  </div>

                  <span className="text-sm text-muted-foreground">
                    {latestTranslation.createdAt.toLocaleDateString(language, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </span>
                </div>
                <div>
                  <span>{dashboardLanguage.latest.exampleUsage}</span>

                  <ul className="space-y-3 mt-2">
                    {latestTranslation.phrases.map((phrase) => (
                      <li
                        key={phrase.id}
                        className="flex flex-col gap-2 border dark:border-muted rounded-md p-4 group"
                      >
                        <div className="flex gap-2 items-center justify-between sm:justify-start">
                          <span className="font-bold">{phrase.content}</span>
                          <CopyToClipboard textToCopy={phrase.content} />
                          <DisplaySoundButton text={phrase.content} />
                        </div>

                        <div
                          className={cn(
                            "flex gap-2 items-center justify-between sm:justify-start",
                            isHardModeAvailable && "hidden"
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
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

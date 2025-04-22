import { checkUserAction } from '@/actions/auth/check-user';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { AppLanguageContext } from '@/config/app-language-context';
import { prismaClient } from '@/lib/prisma-client';

type StatisticsCardProps = {
  profileLanguage: AppLanguageContext['profile'];
};

export async function StatisticsCard({ profileLanguage }: StatisticsCardProps) {
  const user = await checkUserAction();

  const translations = await prismaClient.translations.findMany({
    where: { userId: user.id },
    select: {
      id: true,
      languageFrom: true,
      languageTo: true,
    },
  });

  const totalTranslations = translations.length;

  type TranslationsByLanguage = Record<
    string,
    {
      languageLabel: string;
      count: number;
    }
  >;
  const totalTranslationsByLanguage = translations.reduce((acc, curr) => {
    const languageKey = `${curr.languageFrom}:${curr.languageTo}`;
    const languageLabel = `${curr.languageFrom}  → ${curr.languageTo}`;

    if (!acc[languageKey]) {
      acc[languageKey] = {
        languageLabel,
        count: 0,
      };
    }

    acc[languageKey].count += 1;

    return acc;
  }, {} as TranslationsByLanguage);

  function getTranslationPercentage(count: number) {
    return Math.round((count / totalTranslations) * 100);
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-2">
        <div className="flex flex-col gap-2">
          <span className="text-xl font-medium">
            {profileLanguage.statistics}
          </span>
          <p className="text-sm text-muted-foreground">
            {profileLanguage.statisticsDescription}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-muted p-4">
            <div className="text-sm font-medium">
              {profileLanguage.translationsCount}
            </div>
            <div className="mt-2 text-3xl font-bold">{totalTranslations}</div>
          </div>

          {Object.entries(totalTranslationsByLanguage).map(([key, value]) => (
            <div
              key={key}
              className="rounded-lg bg-muted p-4 flex flex-col gap-2"
            >
              <div className="text-sm font-medium">{value.languageLabel}</div>
              <div className="mt-2 text-3xl font-bold flex w-full justify-between items-end">
                {totalTranslations}

                <span className="text-muted-foreground text-md">
                  {getTranslationPercentage(value.count)}%
                </span>
              </div>
              <Progress value={getTranslationPercentage(value.count)} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

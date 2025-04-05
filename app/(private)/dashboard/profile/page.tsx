import { checkUserAction } from '@/actions/auth/check-user';
import { getAppLanguageAction } from '@/app/actions';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getLanguageContext } from '@/config/app-language-context';
import { prismaClient } from '@/lib/prisma-client';
import Link from 'next/link';

export default async function Page() {
  const user = await checkUserAction();
  const language = await getAppLanguageAction();
  const { profile: profileLanguage } = getLanguageContext(language);

  const splittedName = user.name.split(' ');
  const nameInitials =
    splittedName.length > 1
      ? `${splittedName[0].charAt(0)}${splittedName[1].charAt(0)}`
      : splittedName[0].charAt(0);

  const userPlan = await prismaClient.plans.findFirst({
    where: {
      id: user.planId,
    },
  });

  const translations = await prismaClient.translations.findMany({
    where: {
      userId: user.id,
    },
  });

  const translationsCount = translations.length;
  type TranslationByDirection = {
    directionLabel: string;
    count: number;
  };

  const translationsByDirection = translations.reduce(
    (acc, curr) => {
      const direction = curr.languageFrom.concat('-').concat(curr.languageTo);

      if (!acc[direction]) {
        acc[direction] = {
          directionLabel: `${curr.languageFrom} → ${curr.languageTo}`,
          count: 1,
        };

        return acc;
      }

      acc[direction].count += 1;

      return acc;
    },
    {} as Record<string, TranslationByDirection>,
  );

  const formattedTranslationsByDirection = Object.values(
    translationsByDirection,
  );

  return (
    <div className="w-full mx-auto p-6 space-y-6 grid place-items-center h-[calc(100%-64px)] relative">
      <Link
        href="/"
        className="hover:underline transition-all absolute top-6 left-6"
      >
        {language === 'pt-br' ? 'Voltar para o início' : 'Back to home'}
      </Link>
      <Card className="max-w-3xl w-full">
        <CardHeader className="flex items-center space-x-4">
          <Avatar>
            <AvatarFallback>{nameInitials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{user?.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">{profileLanguage.plan}</p>
              <p className="text-lg font-semibold text-muted-foreground">
                {userPlan?.name || 'Free'}
              </p>
            </div>

            <Button className="text-white" disabled>
              {profileLanguage.upgradePlan}
            </Button>
          </div>
          <Separator />
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium">{profileLanguage.createdAt}</p>
              <p className="text-lg font-semibold text-muted-foreground">
                {new Date(user?.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">{profileLanguage.updatedAt}</p>
              <p className="text-lg font-semibold text-muted-foreground">
                {new Date(user?.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-2">
            <div>
              <p className="text-sm font-medium">
                {profileLanguage.translationsCount}
              </p>
              <p className="text-lg font-semibold text-muted-foreground">
                {translationsCount}
              </p>
            </div>

            <Separator />

            <p className="text-sm font-medium">
              {profileLanguage.translationsDirection}
            </p>

            {formattedTranslationsByDirection.map((translation) => (
              <div
                key={translation.directionLabel}
                className="flex gap-2 items-center"
              >
                <p className="text-md px-2 rounded bg-slate-100 capitalize font-semibold text-muted-foreground">
                  {translation.directionLabel}:
                </p>
                {translation.count}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

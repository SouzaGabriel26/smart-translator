import { checkUserAction } from '@/actions/auth/check-user';
import { getAppLanguageAction } from '@/app/actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getLanguageContext } from '@/config/app-language-context';
import { prismaClient } from '@/lib/prisma-client';
import { SubscriptionDailyUsage } from './SubscriptionDailyUsage';

export async function SubscriptionCard() {
  const user = await checkUserAction();
  const plan = await prismaClient.plans.findFirst({
    where: {
      id: user.planId,
    },
  });

  const language = await getAppLanguageAction();
  const { profile: profileLanguage } = getLanguageContext(language);

  return (
    <Card className="w-full h-[335px]">
      <CardHeader className="space-y-2">
        <div className="flex flex-col gap-2">
          <span className="text-xl font-medium">
            {profileLanguage.subscription}
          </span>
          <p className="text-sm text-muted-foreground">
            {profileLanguage.subscriptionDescription}
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="w-full bg-gradient-to-r text-white from-primary to-primary/45 rounded-lg p-3">
          <span className="text-md flex justify-between w-full items-center">
            {profileLanguage.plan}

            {plan && (
              <Badge className="bg-white/30 rounded-full text-white text-sm py-0">
                {plan?.name}
              </Badge>
            )}
          </span>

          {plan && (
            <div className="flex flex-col gap-2">
              <p className="2xl:text-xl font-bold">
                {plan.translationsLimit} {profileLanguage.translationsPerDay}
              </p>
              <Button
                disabled
                variant="outline"
                className="text-black dark:text-white"
              >
                {profileLanguage.upgradePlan}
              </Button>
            </div>
          )}
        </div>

        <SubscriptionDailyUsage plan={plan} profileLanguage={profileLanguage} />
      </CardContent>
    </Card>
  );
}

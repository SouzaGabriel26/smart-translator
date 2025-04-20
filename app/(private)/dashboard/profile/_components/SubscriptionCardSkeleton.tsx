import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { AppLanguageContext } from '@/config/app-language-context';

type SubscriptionCardSkeletonProps = {
  profileLanguage: AppLanguageContext['profile'];
};

export function SubscriptionCardSkeleton({
  profileLanguage,
}: SubscriptionCardSkeletonProps) {
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

            <Skeleton className="bg-white/30 rounded-full text-white text-sm py-0" />
          </span>

          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold flex items-center gap-2">
              <Skeleton className="w-7 h-4 bg-white/30 rounded-full text-white text-sm py-0" />
              {profileLanguage.translationsPerDay}
            </p>
            <Button
              disabled
              variant="outline"
              className="text-black dark:text-white"
            >
              {profileLanguage.upgradePlan}
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between w-full items-center text-sm font-medium">
            <span>{profileLanguage.dailyUsage}</span>
            <span>0/0</span>
          </div>
          <Skeleton className="w-full h-4" />
        </div>
      </CardContent>
    </Card>
  );
}

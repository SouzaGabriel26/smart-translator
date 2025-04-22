import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { AppLanguageContext } from '@/config/app-language-context';

type StatisticsCardSkeletonProps = {
  profileLanguage: AppLanguageContext['profile'];
};

export async function StatisticsCardSkeleton({
  profileLanguage,
}: StatisticsCardSkeletonProps) {
  return (
    <Card className="w-full h-[335px]">
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="rounded-lg bg-muted p-4 h-[120px]" />
          <Skeleton className="rounded-lg bg-muted p-4 h-[120px]" />
          <Skeleton className="rounded-lg bg-muted p-4 h-[120px]" />
        </div>
      </CardContent>
    </Card>
  );
}

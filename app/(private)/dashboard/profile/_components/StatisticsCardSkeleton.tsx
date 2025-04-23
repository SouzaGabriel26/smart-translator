import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function StatisticsCardSkeleton() {
  return (
    <Card className="w-full h-[335px]">
      <CardHeader className="space-y-2">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
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

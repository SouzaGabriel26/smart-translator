import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';


export function SubscriptionCardSkeleton() {
  return (
    <Card className="w-full h-[335px]">
      <CardHeader className="space-y-2">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-1/2 h-6" />
          <Skeleton className="w-1/3 h-4" />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="w-full bg-gradient-to-r text-white from-primary to-primary/45 rounded-lg p-3">
          <span className="text-md flex justify-between w-full items-center">
            <Skeleton className="w-1/2 h-4 bg-white/30 rounded-full text-white text-sm py-0" />

            <Skeleton className="bg-white/30 rounded-full text-white text-sm py-0" />
          </span>

          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold flex items-center gap-2">
              <Skeleton className="w-7 h-4 bg-white/30 rounded-full text-white text-sm py-0" />
            </p>
            <Button
              disabled
              variant="outline"
              className="text-black dark:text-white"
            >
              <Skeleton className="w-1/2 h-4 bg-white/30 rounded-full text-white text-sm py-0" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between w-full items-center text-sm font-medium">
            <Skeleton className="w-1/2 h-4 bg-white/30 rounded-full text-white text-sm py-0" />
            <span>0/0</span>
          </div>
          <Skeleton className="w-full h-4" />
        </div>
      </CardContent>
    </Card>
  );
}

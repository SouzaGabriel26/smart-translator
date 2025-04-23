import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Settings } from 'lucide-react';

export function AccountInfoCardSkeleton() {
  return (
    <Card className="w-full lg:h-[335px]">
      <CardHeader className="space-y-2">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-1/2 h-6" />
          <Skeleton className="w-1/3 h-4" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Avatar className="w-24 h-24 sm:w-28 sm:h-28 border-2 border-primary mx-auto sm:mx-0">
            <AvatarFallback>
              <Skeleton className="w-full h-full rounded-full" />
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-2 text-center sm:text-left w-full">
            <Skeleton className="w-1/2 h-6 mx-auto sm:mx-0" />
            <Skeleton className="w-1/2 h-4 mx-auto sm:mx-0" />

            <fieldset className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-start">
              <Button variant="outline" disabled className="w-full sm:w-auto">
                <Settings className="size-4 mr-2" />
                <Skeleton className="w-1/2 h-4" />
              </Button>

              <Button variant="outline" disabled className="w-full sm:w-auto">
                <Skeleton className="w-1/2 h-4" />
              </Button>
            </fieldset>
          </div>
        </div>

        <Separator className="mt-4" />
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row w-full gap-4 text-sm">
        <div className="rounded-lg bg-muted p-4 flex flex-col sm:flex-row justify-between w-full">
          <span className="font-medium text-muted-foreground">
            <Skeleton className="w-1/2 h-4" />
          </span>
          <Skeleton className="w-1/2 h-4 mt-2 sm:mt-0" />
        </div>

        <div className="rounded-lg bg-muted p-4 flex flex-col sm:flex-row justify-between w-full">
          <span className="font-medium text-muted-foreground">
            <Skeleton className="w-1/2 h-4" />
          </span>
          <Skeleton className="w-1/2 h-4 mt-2 sm:mt-0" />
        </div>
      </CardFooter>
    </Card>
  );
}

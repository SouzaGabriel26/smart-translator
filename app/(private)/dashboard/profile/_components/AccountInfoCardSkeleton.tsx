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
import type { AppLanguageContext } from '@/config/app-language-context';
import { Settings } from 'lucide-react';

type AccountInfoCardSkeletonProps = {
  profileLanguage: AppLanguageContext['profile'];
};

export default async function AccountInfoCardSkeleton({
  profileLanguage,
}: AccountInfoCardSkeletonProps) {
  return (
    <Card className="max-w-3xl w-full">
      <CardHeader className="flex space-x-4">
        <div className="flex flex-col gap-2">
          <span className="text-xl font-medium">
            {profileLanguage.information}
          </span>
          <p className="text-sm text-muted-foreground">
            {profileLanguage.informationDescription}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <Avatar className="w-28 h-28 border-3 border-primary">
            <AvatarFallback>
              <Skeleton className="w-28 h-28" />
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-2">
            <Skeleton className="w-1/2 h-6" />
            <Skeleton className="w-1/2 h-4" />

            <fieldset className="flex gap-2 items-center">
              <Button variant="outline" disabled>
                <Settings className="size-4" />
                {profileLanguage.edit}
              </Button>

              <Button variant="outline" disabled>
                {profileLanguage.changePassword}
              </Button>
            </fieldset>
          </div>
        </div>
        <Separator className="mt-4" />
      </CardContent>

      <CardFooter className="flex w-full gap-4 text-sm">
        <div className="rounded-lg bg-muted p-4 flex-1 flex justify-between">
          <span className="font-medium text-muted-foreground">
            {profileLanguage.createdAt}
          </span>
          <Skeleton className="w-1/2 h-4" />
        </div>

        <div className="rounded-lg bg-muted p-4 flex-1 flex justify-between">
          <span className="font-medium text-muted-foreground">
            {profileLanguage.updatedAt}
          </span>
          <Skeleton className="w-1/2 h-4" />
        </div>
      </CardFooter>
    </Card>
  );
}

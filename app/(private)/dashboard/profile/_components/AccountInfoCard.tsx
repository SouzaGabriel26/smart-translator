import { checkUserAction } from '@/actions/auth/check-user';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { AppLanguageContext } from '@/config/app-language-context';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Settings } from 'lucide-react';

type AccountInfoCardProps = {
  profileLanguage: AppLanguageContext['profile'];
};

export default async function AccountInfoCard({
  profileLanguage,
}: AccountInfoCardProps) {
  const user = await checkUserAction();

  const splittedName = user.name.split(' ');
  const nameInitials =
    splittedName.length > 1
      ? `${splittedName[0].charAt(0)}${splittedName[1].charAt(0)}`
      : splittedName[0].charAt(0);

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader className="space-y-2">
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
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Avatar className="w-24 h-24 sm:w-28 sm:h-28 border-2 border-primary mx-auto sm:mx-0">
            <AvatarImage src={user.avatar_url ?? ''} alt={user.name} />
            <AvatarFallback>{nameInitials}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-2 text-center sm:text-left w-full">
            <span className="text-2xl font-semibold break-words">
              {user.name}
            </span>
            <p className="text-md text-muted-foreground break-all">
              {user.email}
            </p>

            <fieldset className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-start">
              <Button variant="outline" disabled className="w-full sm:w-auto">
                <Settings className="size-4 mr-2" />
                {profileLanguage.edit}
              </Button>

              <Button variant="outline" disabled className="w-full sm:w-auto">
                {profileLanguage.changePassword}
              </Button>
            </fieldset>
          </div>
        </div>

        <Separator className="mt-4" />
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row w-full gap-4 text-sm">
        <div className="rounded-lg bg-muted p-4 flex flex-col sm:flex-row justify-between w-full">
          <span className="font-medium text-muted-foreground">
            {profileLanguage.createdAt}
          </span>
          <p className="font-semibold">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="rounded-lg bg-muted p-4 flex flex-col sm:flex-row justify-between w-full">
          <span className="font-medium text-muted-foreground">
            {profileLanguage.updatedAt}
          </span>
          <p className="font-semibold">
            {new Date(user.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}

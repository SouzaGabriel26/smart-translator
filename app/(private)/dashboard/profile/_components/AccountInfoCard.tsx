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
            <AvatarImage src={user.avatar_url ?? ''} alt={user.name} />
            <AvatarFallback>{nameInitials}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold">{user.name}</span>
            <p className="text-md text-muted-foreground">{user.email}</p>

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
          <p className="font-semibold">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="rounded-lg bg-muted p-4 flex-1 flex justify-between">
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

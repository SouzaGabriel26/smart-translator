import { getAppLanguageAction, getNotificationsAction } from '@/app/actions';
import { getLanguageContext } from '@/config/app-language-context';
import { prismaClient } from '@/lib/prisma-client';
import { cn } from '@/lib/utils';
import { Bell } from 'lucide-react';
import Link from 'next/link';
import { MarkAsReadButton } from './mark-as-read';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export async function Notification() {
  const language = await getAppLanguageAction();
  const { notification: notificationsText } = getLanguageContext(language);

  const notifications = await prismaClient.notifications.findMany({
    where: { expirationAdsTime: { gt: new Date() } },
  });

  const readNotifications = await getNotificationsAction();
  const availableNotifications = notifications.filter(
    (notification) => !readNotifications.includes(notification.id),
  );

  const notificationsCount = availableNotifications.length;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'relative dark:border-muted',
            notificationsCount > 0 &&
              'border-muted-foreground dark:border-muted-foreground',
          )}
        >
          <Bell className="size-4" />

          {notificationsCount > 0 && (
            <span className="size-2 absolute bg-primary rounded-full top-2 right-4" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="dark:border-muted">
        <div className="p-4 w-full space-y-2 max-h-80 overflow-y-auto">
          {notificationsCount === 0 && (
            <p className="text-muted-foreground text-center">
              {notificationsText.empty}
            </p>
          )}

          {notificationsCount > 0 &&
            availableNotifications.map((notification) => (
              <div key={notification.id}>
                <div className="relative isolate w-full hover:bg-muted transition-all p-2 rounded-md cursor-pointer flex flex-col">
                  <Link
                    href={`/dashboard/releases#${notification.slug}`}
                    className="font-bold"
                  >
                    {notification.name}
                    <span className="absolute inset-0 z-30" />
                  </Link>

                  <span className="text-xs text-muted-foreground">
                    {new Date(notification.createdAt).toLocaleDateString(
                      language,
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      },
                    )}
                  </span>

                  <p className="text-md max-w-52 h-14 text-ellipsis overflow-hidden">
                    {notification.description}
                  </p>

                  <span className="absolute inset-0 w-full bg-gradient-to-t from-white dark:from-background from-10% to-50%" />
                </div>

                <MarkAsReadButton notificationId={notification.id}>
                  {notificationsText.markAsRead}
                </MarkAsReadButton>
              </div>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function NotificationSkeleton() {
  return (
    <Button variant="outline">
      <Bell className="size-4 animate-pulse" />
    </Button>
  );
}

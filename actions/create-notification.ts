'use server';

import type { Notification } from '@/components/create-notification-button';
import { prismaClient } from '@/lib/prisma-client';
import slug from 'slug';

export async function createNotificationAction(input: Notification) {
  const notificationSlug = slug(input.name);

  await prismaClient.notifications.create({
    data: {
      name: input.name,
      slug: notificationSlug,
      description: input.description,
      expirationAdsTime: input.expirationDate,
    },
  });
}

import { prismaClient } from '@/lib/prisma-client';
import { orchestrator } from '@/test/orchestrator';
import bcrypt from 'bcryptjs';

async function main() {
  await Promise.all([
    prismaClient.translationPhrases.deleteMany(),
    prismaClient.translations.deleteMany(),
    prismaClient.users.deleteMany(),
    prismaClient.plans.deleteMany(),
    prismaClient.notifications.deleteMany(),
  ]);

  const SALT = 10;
  const password = '123456';
  const hashedPassword = await bcrypt.hash(password, SALT);

  await orchestrator.createDefaultPlans();

  const freePlan = await prismaClient.plans.findFirst({
    where: {
      active: true,
      name: 'Free',
    },
  });

  const { id: userId } = await prismaClient.users.create({
    data: {
      email: 'user@email.com',
      name: 'User',
      password: hashedPassword,
      planId: freePlan?.id!,
    },
  });

  await prismaClient.users.create({
    data: {
      email: 'admin@email.com',
      name: 'Admin',
      password: hashedPassword,
      planId: freePlan?.id!,
      role: 'ADMIN',
    },
  });

  await prismaClient.$transaction([
    prismaClient.translations.create({
      data: {
        userId,
        languageFrom: 'en',
        languageTo: 'pt',
        targetWord: 'hello',
        translatedWord: 'olá',
        phrases: {
          createMany: {
            data: [
              {
                content: 'Hello, how are you?',
                translatedContent: 'Olá, como você está?',
              },
              {
                content: 'Hello, world!',
                translatedContent: 'Olá, mundo!',
              },
              {
                content: 'Hello, everyone!',
                translatedContent: 'Olá, pessoal!',
              },
            ],
          },
        },
      },
    }),
    prismaClient.translations.create({
      data: {
        userId,
        languageFrom: 'en',
        languageTo: 'pt',
        targetWord: 'world',
        translatedWord: 'mundo',
        phrases: {
          createMany: {
            data: [
              {
                content: 'Hello, world!',
                translatedContent: 'Olá, mundo!',
              },
              {
                content: 'The world is big.',
                translatedContent: 'O mundo é grande.',
              },
              {
                content: 'The world is beautiful.',
                translatedContent: 'O mundo é bonito.',
              },
            ],
          },
        },
      },
    }),
  ]);

  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);

  await prismaClient.$transaction([
    prismaClient.notifications.create({
      data: {
        name: 'Notification 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        slug: 'notification-1',
        expirationAdsTime: nextWeek,
      },
    }),
    prismaClient.notifications.create({
      data: {
        name: 'Notification 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        slug: 'notification-2',
        expirationAdsTime: nextWeek,
      },
    }),
  ]);
}
main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });

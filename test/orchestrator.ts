import { prismaClient } from '@/lib/prisma-client';

async function resetDatabaseTables() {
  await Promise.all([
    prismaClient.translationPhrases.deleteMany(),
    prismaClient.translations.deleteMany(),
    prismaClient.users.deleteMany(),
    prismaClient.plans.deleteMany(),
  ]);
}

async function createDefaultPlans() {
  await prismaClient.$transaction([
    prismaClient.plans.createMany({
      data: [
        {
          name: 'Free',
          price: 0,
          translationsLimit: 25,
        },
        {
          name: 'Premium',
          price: 9.99,
          active: false,
          translationsLimit: 9999,
        },
      ],
    }),
  ]);
}

export const orchestrator = Object.freeze({
  resetDatabaseTables,
  createDefaultPlans,
});

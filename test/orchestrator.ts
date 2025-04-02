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
          translationsLimit: 15,
        },
        {
          name: 'Premium',
          price: 6.99,
          active: false,
          translationsLimit: 250,
        },
      ],
    }),
  ]);
}

export const orchestrator = Object.freeze({
  resetDatabaseTables,
  createDefaultPlans,
});

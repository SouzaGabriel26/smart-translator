'use server';

import { getAppLanguageAction } from '@/app/actions';
import { getLanguageContext } from '@/config/app-language-context';
import { prismaClient } from '@/lib/prisma-client';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
});

export async function saveLeadEmailAction(email: string) {
  const language = await getAppLanguageAction();
  const { plansSection } = await getLanguageContext(language);
  const { success } = schema.safeParse({ email });

  if (!success) {
    return {
      ok: false,
      error: plansSection.invalidEmail,
    };
  }

  const emailAlreadyRegistered = await prismaClient.plansWaitList.findUnique({
    where: { email },
  });

  if (emailAlreadyRegistered) {
    return {
      ok: false,
      error: plansSection.alreadyOnWaitlist,
    };
  }

  const premiumPlan = await prismaClient.plans.findFirst({
    where: {
      name: 'Premium',
    },
  });

  if (!premiumPlan) {
    return {
      ok: false,
      error: plansSection.planDoesntExists,
    };
  }

  await prismaClient.plansWaitList.create({
    data: { email, planId: premiumPlan.id },
  });

  return {
    ok: true,
    message: plansSection.success,
  };
}

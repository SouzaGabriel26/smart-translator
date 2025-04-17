import { prismaClient } from '@/lib/prisma-client';
import type { SignUpProps } from '@/types/sign-up';
type CreateOrReturnUserProps = Omit<SignUpProps, 'password'> & {
  avatar_url?: string;
};

export async function createOrReturnUser(input: CreateOrReturnUserProps) {
  const { email, name, avatar_url } = input;

  const userAlreadyExists = await prismaClient.users.findUnique({
    where: { email },
  });

  if (!userAlreadyExists?.avatar_url && avatar_url) {
    await prismaClient.users.update({
      where: { email },
      data: { avatar_url },
    });
  }

  if (userAlreadyExists) return userAlreadyExists;

  const availablePlan = await prismaClient.plans.findFirst({
    where: { active: true, name: 'Free' },
  });

  const newUser = await prismaClient.users.create({
    data: {
      email,
      name,
      planId: availablePlan!.id,
      avatar_url,
    },
  });

  return newUser;
}

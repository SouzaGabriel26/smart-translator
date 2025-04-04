'use server';

import { projectConstants } from '@/config/constants';
import { prismaClient } from '@/lib/prisma-client';
import type { Roles } from '@prisma/client';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type CheckUserActionProps = {
  role?: Roles | null;
};

export async function checkUserAction({ role }: CheckUserActionProps = {}) {
  const cookieStorage = await cookies();
  const token = cookieStorage.get(projectConstants.accessToken)?.value;

  if (!token) return redirect('/auth/sign-in?action=logout');

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!),
    );

    const user = await prismaClient.users.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (!user) return redirect('/auth/sign-in?action=logout');

    if (role && user.role !== role) {
      return redirect('/auth/sign-in?action=unauthorized');
    }

    return user;
  } catch {
    return redirect('/auth/sign-in?action=logout');
  }
}

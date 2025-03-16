'use server';

import { constants } from '@/config/constants';
import { prismaClient } from '@/lib/prisma-client';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function checkUserAction() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get(constants.accessToken)?.value;

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

    return user;
  } catch {
    return redirect('/auth/sign-in?action=logout');
  }
}

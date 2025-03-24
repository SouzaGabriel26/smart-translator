'use server';

import { projectConstants } from '@/config/constants';
import { auth } from '@/models/auth';
import type { SignInProps } from '@/types/sign-in';
import type { SignUpProps } from '@/types/sign-up';
import { cookies } from 'next/headers';

export async function signUpAction(data: SignUpProps) {
  const result = await auth.signUp(data);
  return result;
}

export async function signInAction(data: SignInProps) {
  const result = await auth.signIn(data);

  if (result.token) {
    const sevenDaysInMilliseconds = 60 * 60 * 24 * 7 * 1000;

    const cookieStorage = await cookies();
    cookieStorage.set(projectConstants.accessToken, result.token, {
      httpOnly: true,
      expires: new Date(Date.now() + sevenDaysInMilliseconds),
    });
  }

  return result;
}

'use server';

import { projectConstants } from '@/config/constants';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout() {
  const cookiesStorage = await cookies();
  cookiesStorage.delete(projectConstants.accessToken);

  return redirect('/');
}

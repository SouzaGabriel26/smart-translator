'use server';

import { type AvailableLanguages, projectConstants } from '@/config/constants';
import { cookies } from 'next/headers';

export async function setAppLanguageAction(language: AvailableLanguages) {
  const cookieStorage = await cookies();

  const { appLanguageKey } = projectConstants;

  cookieStorage.set(appLanguageKey, language, {
    httpOnly: true,
  });
}

export async function getAppLanguageAction() {
  const cookieStorage = await cookies();

  const { appLanguageKey } = projectConstants;

  const appLanguage = cookieStorage.get(appLanguageKey)
    ?.value as AvailableLanguages;

  if (!projectConstants.availableLanguages.includes(appLanguage)) {
    return 'en';
  }

  return appLanguage;
}

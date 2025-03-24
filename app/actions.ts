'use server';

import { type AvailableLanguages, projectConstants } from '@/config/constants';
import { cookies } from 'next/headers';

export async function setLanguageAction(
  languageFrom: AvailableLanguages,
  languageTo: AvailableLanguages,
) {
  if (languageFrom === languageTo) {
    return {
      ok: false,
      error: 'The languages must be different',
    };
  }

  const cookieStorage = await cookies();

  const { availableLanguages, languageFromKey, languageToKey } =
    projectConstants;

  if (!availableLanguages.includes(languageFrom)) {
    return {
      ok: false,
      error: 'Invalid languageFrom',
    };
  }

  if (!availableLanguages.includes(languageTo)) {
    return {
      ok: false,
      error: 'Invalid languageTo',
    };
  }

  cookieStorage.set(languageFromKey, languageFrom, {
    httpOnly: true,
  });

  cookieStorage.set(languageToKey, languageTo, {
    httpOnly: true,
  });
}

export async function getLanguageAction() {
  const cookieStorage = await cookies();

  const { languageFromKey, languageToKey } = projectConstants;

  const cookiesLanguageFrom = cookieStorage.get(languageFromKey)?.value ?? 'en';
  const cookiesLanguageTo = cookieStorage.get(languageToKey)?.value ?? 'pt-br';

  const languageFrom = cookiesLanguageFrom as AvailableLanguages;
  const languageTo = cookiesLanguageTo as AvailableLanguages;

  return {
    languageFrom,
    languageTo,
  };
}

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

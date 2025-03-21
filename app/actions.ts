'use server';

import { cookies } from 'next/headers';
import { type AvailableLanguages, projectConstants } from './constants';

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

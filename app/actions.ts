'use server';

import {
  type AvailableLanguages,
  type AvailableModes,
  projectConstants,
} from '@/config/constants';
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

export async function setModeAction(mode: AvailableModes) {
  const cookieStorage = await cookies();

  const { modeKey } = projectConstants;

  cookieStorage.set(modeKey, mode, {
    httpOnly: true,
  });
}

export async function getModeAction() {
  const cookieStorage = await cookies();

  const { modeKey } = projectConstants;
  const mode = cookieStorage.get(modeKey)?.value as AvailableModes;

  if (!projectConstants.availableModes.includes(mode)) {
    return 'easy';
  }

  return mode;
}

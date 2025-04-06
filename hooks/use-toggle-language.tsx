import { type AvailableLanguages, projectConstants } from '@/config/constants';
import { useState } from 'react';

function getLanguageFromLocalStorage(
  languageKey: string,
  defaultValue: AvailableLanguages,
) {
  const storedLanguage = localStorage.getItem(
    languageKey,
  ) as AvailableLanguages;
  if (projectConstants.availableLanguages.includes(storedLanguage)) {
    return storedLanguage;
  }
  return defaultValue;
}

export function useToggleLanguage() {
  const { languageFromKey, languageToKey } = projectConstants;

  const [languageFrom, setLanguageFrom] = useState(
    getLanguageFromLocalStorage(languageFromKey, 'en'),
  );
  const [languageTo, setLanguageTo] = useState(
    getLanguageFromLocalStorage(languageToKey, 'pt-br'),
  );

  function toggleLanguage() {
    const newLanguageFrom = languageTo;
    const newLanguageTo = languageFrom;

    localStorage.setItem(languageFromKey, newLanguageFrom);
    localStorage.setItem(languageToKey, newLanguageTo);

    setLanguageFrom(newLanguageFrom);
    setLanguageTo(newLanguageTo);
  }

  return {
    languageFrom,
    languageTo,
    toggleLanguage,
  };
}

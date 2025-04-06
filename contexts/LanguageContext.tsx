'use client';

import { type AvailableLanguages, projectConstants } from '@/config/constants';
import { createContext, useContext, useEffect, useState } from 'react';

type LanguageContextType = {
  languageFrom: AvailableLanguages;
  languageTo: AvailableLanguages;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType>(
  {} as LanguageContextType,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { languageFromKey, languageToKey, availableLanguages } =
    projectConstants;

  const [languageFrom, setLanguageFrom] = useState<AvailableLanguages>('en');
  const [languageTo, setLanguageTo] = useState<AvailableLanguages>('pt-br');

  useEffect(() => {
    const storedFrom = localStorage.getItem(
      languageFromKey,
    ) as AvailableLanguages;
    const storedTo = localStorage.getItem(languageToKey) as AvailableLanguages;

    if (availableLanguages.includes(storedFrom)) {
      setLanguageFrom(storedFrom);
    }

    if (availableLanguages.includes(storedTo)) {
      setLanguageTo(storedTo);
    }
  }, [languageFromKey, languageToKey, availableLanguages]);

  const toggleLanguage = () => {
    const newFrom = languageTo;
    const newTo = languageFrom;

    localStorage.setItem(languageFromKey, newFrom);
    localStorage.setItem(languageToKey, newTo);

    setLanguageFrom(newFrom);
    setLanguageTo(newTo);
  };

  return (
    <LanguageContext.Provider
      value={{ languageFrom, languageTo, toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

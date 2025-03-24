import type { AvailableLanguages } from './constants';

export const languageContexts = {
  'pt-br': {
    title: 'Tradutor Inteligente',
    signInLabel: 'Entrar',
    signUpLabel: 'Registrar',
  },
  en: {
    title: 'Smart Translator',
    signInLabel: 'Sign In',
    signUpLabel: 'Sign Up',
  },
};

export function getLanguageContext(language: AvailableLanguages) {
  return languageContexts[language] ?? languageContexts['en'];
}

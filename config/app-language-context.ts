import type { AvailableLanguages } from './constants';

export const languageContexts = {
  'pt-br': {
    title: 'Tradutor Inteligente',
    signInLabel: 'Entrar',
    signUpLabel: 'Registrar',
    heroSection: {
      title: 'Tradutor Inteligente com IA',
      description:
        'Traduza palavras e frases com contexto e exemplos. Nosso sistema integrado com IA gera frases relacionadas para ajudar você a aprender linguagens naturalmente.',
      getStartedLabel: 'Começar de graça',
      viewPlansLabel: 'Ver planos',
    },
    featuresSection: {
      title: 'Recursos do Tradutor Inteligente',
      description:
        'Nosso sistema de tradução com IA vai além da simples tradução palavra por palavra',
    },
    plansSection: {
      title: 'Escolha seu Plano',
      description:
        'Selecione o plano que se encaixa nas suas necessidades de tradução',
    },
    footer: {
      reserved: 'Tradutor Inteligente. Todos os direitos reservados.',
      serviceTerms: 'Termos de Serviço',
      privacyPolicy: 'Política de Privacidade',
      contact: 'Contato',
    },
  },
  en: {
    title: 'Smart Translator',
    signInLabel: 'Sign In',
    signUpLabel: 'Sign Up',
    heroSection: {
      title: 'AI-Powered Smart Translator',
      description:
        'Translate words and phrases with context and examples. Our AI-integrated system generates related sentences to help you learn languages naturally.',
      getStartedLabel: 'Get Started Free',
      viewPlansLabel: 'View Plans',
    },
    featuresSection: {
      title: 'Smart Translator Features',
      description:
        'Our AI-powered translation system goes beyond simple word-for-word translation',
    },
    plansSection: {
      title: 'Choose your Plan',
      description: 'Select the plan that fits your translation needs',
    },
    footer: {
      reserved: 'Smart Translator. All rights reserved.',
      serviceTerms: 'Terms of Service',
      privacyPolicy: 'Privacy Policy',
      contact: 'Contact',
    },
  },
};

export function getLanguageContext(language: AvailableLanguages) {
  return languageContexts[language] ?? languageContexts['en'];
}

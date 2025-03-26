import type { AvailableLanguages } from './constants';

const languageContexts = {
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
    dashboard: {
      form: {
        title: 'Traduzir',
        description:
          'Digite uma palavra/termo em inglês (20 caracteres no máximo)',
        englishLabel: 'Inglês',
        portugueseLabel: 'Português',
        translateButton: 'Gerar Tradução',
        translateButtonLoading: 'Gerando Tradução...',
        translationsLimitCounter: 'Traduções hoje:',
        alreadyExists: 'Tradução já existe em seu histórico.',
        generatedSuccessfully: 'Tradução gerada com sucesso!',
        contactSupportDescription: 'Avise o suporte para mais informações.',
        contactSupportLabel: 'Avisar suporte',
      },
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
    dashboard: {
      form: {
        title: 'Translate',
        description: 'Type an English word/term (20 characters max)',
        englishLabel: 'English',
        portugueseLabel: 'Portuguese',
        translateButton: 'Generate Translation',
        translateButtonLoading: 'Generating Translation...',
        translationsLimitCounter: 'Translations today:',
        alreadyExists: 'Translation already exists in your history.',
        generatedSuccessfully: 'Translation generated successfully!',
        contactSupportDescription: 'Notify support for more information.',
        contactSupportLabel: 'Notify support',
      },
    },
  },
};

export type AppLanguageContext = (typeof languageContexts)['en'];

export function getLanguageContext(language: AvailableLanguages) {
  return languageContexts[language] ?? languageContexts['en'];
}

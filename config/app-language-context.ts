import type { AvailableLanguages } from './constants';

const languageContexts = {
  'pt-br': {
    title: 'Tradutor Inteligente',
    signInLabel: 'Entrar',
    signUpLabel: 'Registrar',
    userOptions: {
      hello: 'Olá',
      signOut: 'Sair',
      profile: 'Perfil',
      release: 'Notas de Lançamento',
      leads: 'Ver Leads',
    },
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
      getPremiumAccess: 'Obtenha Acesso Premium',
      getPremiumAccessDescription:
        'Seja o primeiro a saber quando nosso plano Premium estiver disponível.',
      joinWaitlist: 'Entrar na lista de espera',
      enterEmailAddress: 'Digite seu endereço de e-mail',
      invalidEmail: 'Endereço de e-mail inválido.',
      alreadyOnWaitlist: 'Você já está na lista de espera.',
      success: 'Sucesso! Você agora está na lista de espera.',
      planDoesntExists: 'Plano não existe.',
    },
    footer: {
      reserved: 'Tradutor Inteligente. Todos os direitos reservados.',
      serviceTerms: 'Termos de Serviço',
      privacyPolicy: 'Política de Privacidade',
      contact: 'Contato',
    },
    auth: {
      signInDescription: 'Digite seu e-mail abaixo para entrar na sua conta',
      doNotHaveAccount: 'Não tem uma conta?',
      signedInSuccessfully: 'Logado com sucesso!',
      signUpDescription: 'Digite seu e-mail abaixo para registrar sua conta',
      alreadyHaveAccount: 'Já tem uma conta?',
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
      latest: {
        title: 'Última Tradução',
        description: 'Veja sua tradução mais recente com exemplos',
        exampleUsage: 'Exemplos de uso',
        noTranslationsYet:
          'Nenhuma tradução ainda. Digite uma palavra para traduzir.',
      },
      history: {
        title: 'Histórico de Traduções',
        inputLabel: 'Buscar traduções...',
        noTranslationsFound: 'Nenhuma tradução encontrada.',
      },
      wordOverview: 'Visão geral',
    },
    profile: {
      plan: 'Plano',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
      translationsCount: 'Total de Traduções',
      translationsDirection: 'Traduções por Direção',
      upgradePlan: 'Atualizar Plano',
    },
    hardMode: {
      title: 'Modo Difícil',
      description: `O Modo Difícil mostra o conteúdo apenas no seu idioma de origem selecionado (por exemplo, inglês).
Em vez de traduções diretas, você receberá uma breve explicação e frases de exemplo no mesmo idioma - ajudando você a aprender através do contexto, como uma verdadeira imersão. Você pode ativá-lo ou desativá-lo a qualquer momento nas configurações.`,
      note: 'Nota: O modo difícil pode não estar disponível para todas as traduções, tendo em vista que é uma funcionalidade nova.',
    },
    notification: {
      empty: 'Sem notificações',
      markAsRead: 'Marcar como lido',
    },
  },
  en: {
    title: 'Smart Translator',
    signInLabel: 'Sign In',
    signUpLabel: 'Sign Up',
    userOptions: {
      hello: 'Hello',
      signOut: 'Sign Out',
      profile: 'Profile',
      release: 'Release Notes',
      leads: 'See Leads',
    },
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
      getPremiumAccess: 'Get Premium Access',
      getPremiumAccessDescription:
        'Be the first to know when our Premium plan becomes available.',
      joinWaitlist: 'Join Premium Waitlist',
      enterEmailAddress: 'Enter your email address',
      invalidEmail: 'Invalid email address.',
      alreadyOnWaitlist: 'You are already on the waitlist.',
      success: 'Success! You are now on the waitlist.',
      planDoesntExists: "Plan doesn't exist.",
    },
    footer: {
      reserved: 'Smart Translator. All rights reserved.',
      serviceTerms: 'Terms of Service',
      privacyPolicy: 'Privacy Policy',
      contact: 'Contact',
    },
    auth: {
      signInDescription: 'Enter your email below to login to your account',
      doNotHaveAccount: "Don't have an account?",
      signedInSuccessfully: 'Signed in successfully!',
      signUpDescription: 'Enter your email below to register to your account',
      alreadyHaveAccount: 'Already have an account?',
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
      latest: {
        title: 'Latest Translation',
        description: 'View your most recent translation with examples',
        exampleUsage: 'Example usage',
        noTranslationsYet: 'No translations yet. Enter a word to translate.',
      },
      history: {
        title: 'Translation History',
        inputLabel: 'Search translations...',
        noTranslationsFound: 'No translations found.',
      },
      wordOverview: 'Brief overview',
    },
    profile: {
      plan: 'Plan',
      createdAt: 'Created At',
      updatedAt: 'Updated At',
      translationsCount: 'Total Translations',
      translationsDirection: 'Translations by Direction',
      upgradePlan: 'Upgrade Plan',
    },
    hardMode: {
      title: 'Hard Mode',
      description: `Hard Mode shows content only in your selected source language (e.g. English).
Instead of direct translations, you'll get a brief explanation and example sentences in the same language — helping you learn through context, like real immersion.
You can toggle it on or off anytime in settings.`,
      note: "Note: Hard Mode may not be available for all translations, as it's a new feature.",
    },
    notification: {
      empty: 'No notifications',
      markAsRead: 'Mark as read',
    },
  },
};

export type AppLanguageContext = (typeof languageContexts)['en'];

export function getLanguageContext(language: AvailableLanguages) {
  return languageContexts[language] ?? languageContexts['en'];
}

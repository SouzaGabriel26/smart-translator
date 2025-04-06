import { BrainCircuit, GlobeIcon, History } from 'lucide-react';

const englishFeatures = [
  {
    title: 'Translate words and phrases',
    description:
      'Translate words and short phrases with context and examples using AI',
    icon: GlobeIcon,
  },
  {
    title: 'Translations history',
    description:
      'View your translations history and search your saved translations',
    icon: History,
  },
  {
    title: 'Learn languages naturally',
    description: 'Our AI generates related phrases to help you learn languages',
    icon: BrainCircuit,
  },
];

const portugueseFeatures = [
  {
    title: 'Traduza palavras e frases',
    description:
      'Traduza palavras e frases curtas com contexto e exemplos usando IA',
    icon: GlobeIcon,
  },
  {
    title: 'Histórico de traduções',
    description:
      'Veja seu histórico de traduções e pesquise suas traduções salvas',
    icon: History,
  },
  {
    title: 'Aprenda idiomas naturalmente',
    description:
      'Nossa IA gera frases relacionadas para ajudá-lo a aprender idiomas',
    icon: BrainCircuit,
  },
];

export type Plan = {
  type: 'free' | 'paid';
  title: string;
  usdPrice: number;
  status: { available: boolean; reason?: string };
  features: { title: string; available: boolean }[];
};

const englishPlans: Plan[] = [
  {
    type: 'free',
    title: 'Free',
    usdPrice: 0,
    status: { available: true },
    features: [
      {
        title: 'Up to 15 translations per day',
        available: true,
      },
      {
        title: 'Basic contextual translations',
        available: true,
      },
      {
        title: '3 AI-generated phrases per translation',
        available: true,
      },
      {
        title: 'Another languages support',
        available: false,
      },
      {
        title: 'Pronunciation guides',
        available: false,
      },
    ],
  },
  {
    type: 'paid',
    title: 'Premium',
    usdPrice: 6.99,
    status: { available: false, reason: 'Coming Soon' },
    features: [
      {
        title: 'Up to 250 translations per day',
        available: true,
      },
      {
        title: 'Advanced contextual translations',
        available: true,
      },
      {
        title: 'Up to 10 AI-generated phrases per translation',
        available: true,
      },
      {
        title: 'Another languages support',
        available: true,
      },
      {
        title: 'Pronunciation guides',
        available: true,
      },
    ],
  },
];

const portuguesePlans: Plan[] = [
  {
    type: 'free',
    title: 'Free',
    usdPrice: 0,
    status: { available: true },
    features: [
      {
        title: 'Até 15 traduções por dia',
        available: true,
      },
      {
        title: 'Traduções contextuais básicas',
        available: true,
      },
      {
        title: '3 frases geradas por IA por tradução',
        available: true,
      },
      {
        title: 'Suporte a outros idiomas',
        available: false,
      },
      {
        title: 'Guias de pronúncia',
        available: false,
      },
    ],
  },
  {
    type: 'paid',
    title: 'Premium',
    usdPrice: 6.99,
    status: { available: false, reason: 'Em Breve' },
    features: [
      {
        title: 'Até 250 traduções por dia',
        available: true,
      },
      {
        title: 'Traduções contextuais avançadas',
        available: true,
      },
      {
        title: 'Até 10 frases geradas por IA por tradução',
        available: true,
      },
      {
        title: 'Suporte a outros idiomas',
        available: true,
      },
      {
        title: 'Guias de pronúncia',
        available: true,
      },
    ],
  },
];

const availableLanguages = ['en', 'pt-br'] as const;
export type AvailableLanguages = (typeof availableLanguages)[number];

const features: Record<AvailableLanguages, typeof englishFeatures> = {
  en: englishFeatures,
  'pt-br': portugueseFeatures,
};

const plans: Record<AvailableLanguages, typeof englishPlans> = {
  en: englishPlans,
  'pt-br': portuguesePlans,
};

const availableModes = ['hard', 'easy'] as const;
export type AvailableModes = (typeof availableModes)[number];

export const projectConstants = Object.freeze({
  accessToken: 'smart-translator:accessToken',
  features,
  plans,
  availableLanguages,
  languageFromKey: 'smart-translator:language-from',
  languageToKey: 'smart-translator:language-to',
  appLanguageKey: 'smart-translator:app-language',
  modeKey: 'smart-translator:mode',
  availableModes,
});

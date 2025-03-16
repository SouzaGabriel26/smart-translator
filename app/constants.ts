import { BrainCircuit, GlobeIcon, History } from 'lucide-react';

const features = [
  {
    title: 'Translate words and phrases',
    description:
      'Translate words and short phrases with context and examples using AI',
    icon: GlobeIcon,
  },
  {
    title: 'Translations history',
    description:
      'View your translations history and manage your saved translations',
    icon: History,
  },
  {
    title: 'Learn languages naturally',
    description:
      'Our AI generates related phrases to help you learn languages naturally',
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

const plans: Plan[] = [
  {
    type: 'free',
    title: 'Free',
    usdPrice: 0,
    status: { available: true },
    features: [
      {
        title: 'Up to 25 translations per day',
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
    usdPrice: 9.99,
    status: { available: false, reason: 'Coming Soon' },
    features: [
      {
        title: 'Unlimited translations per day',
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

export const projectConstants = Object.freeze({
  features,
  plans,
});

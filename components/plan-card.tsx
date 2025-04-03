import type { AvailableLanguages, Plan } from '@/config/constants';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';
import Link from 'next/link';
import { CapturePlanLeads } from './capture-plan-leads';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle } from './ui/card';

type PlanCardProps = {
  plan: Plan;
  language: AvailableLanguages;
};

export function PlanCard({ plan, language }: PlanCardProps) {
  return (
    <Card
      className={cn(
        'max-w-[420px] h-[582px] w-full p-6 flex flex-col relative space-y-4 hover:shadow-xl transition-shadow',
      )}
    >
      <CardHeader className="pt-0">
        <CardTitle className="text-3xl font-medium">{plan.title}</CardTitle>

        <span>
          <strong className="text-xl">$ {plan.usdPrice}</strong>
          <span className="text-muted-foreground">
            {' '}
            / {language === 'pt-br' ? 'mensal' : 'month'}
          </span>
        </span>
      </CardHeader>

      <div className="flex flex-col justify-between flex-grow gap-6">
        <ul className="space-y-2 mt-4">
          {plan.features.map((feature) => (
            <li
              key={feature.title}
              className={`flex items-center space-x-2 ${
                feature.available ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <span>
                {feature.available ? (
                  <Check className="text-green-500" />
                ) : (
                  <X className="text-red-500" />
                )}
              </span>
              <span>{feature.title}</span>
            </li>
          ))}
        </ul>

        {plan.status.available ? (
          <Button
            className="w-full text-white"
            disabled={!plan.status.available}
            asChild={plan.status.available}
          >
            <Link href="/auth/sign-up" aria-disabled={!plan.status.available}>
              {language === 'pt-br' ? 'Começar' : 'Get Started'}
            </Link>
          </Button>
        ) : (
          <CapturePlanLeads />
        )}
      </div>

      {!plan.status.available && plan.status.reason && (
        <span className="rounded-full bg-primary text-white text-sm px-2 py-0.5 font-medium absolute right-3 -top-7">
          {plan.status.reason}
        </span>
      )}
    </Card>
  );
}

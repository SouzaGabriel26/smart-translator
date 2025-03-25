import type { Plan } from '@/config/constants';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle } from './ui/card';

type PlanCardProps = {
  plan: Plan;
};

export function PlanCard({ plan }: PlanCardProps) {
  return (
    <Card
      className={cn(
        'max-w-[420px] min-h-[450px] w-full p-6 flex flex-col relative space-y-4',
        !plan.status.available && 'opacity-60',
      )}
    >
      <CardHeader className="pt-0">
        <CardTitle className="text-3xl font-medium">{plan.title}</CardTitle>

        <span>
          <strong className="text-xl">
            {plan.currency === 'brl' ? 'R$' : '$'} {plan.price}
          </strong>
          <span className="text-muted-foreground">
            {' '}
            / {plan.currency === 'brl' ? 'mensal' : 'month'}
          </span>
        </span>
      </CardHeader>

      <div className="flex flex-col justify-between flex-grow">
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

        <Button
          className="w-full"
          disabled={!plan.status.available}
          asChild={plan.status.available}
        >
          <Link href="/auth/sign-up" aria-disabled={!plan.status.available}>
            {plan.currency === 'brl' ? 'Começar' : 'Get Started'}
          </Link>
        </Button>
      </div>

      {!plan.status.available && plan.status.reason && (
        <span className="rounded-full bg-primary text-white text-sm px-2 py-0.5 font-medium absolute right-3 -top-7">
          {plan.status.reason}
        </span>
      )}
    </Card>
  );
}

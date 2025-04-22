import { Suspense } from 'react';
import { AccountInfoCard } from './_components/AccountInfoCard';
import { AccountInfoCardSkeleton } from './_components/AccountInfoCardSkeleton';
import { StatisticsCard } from './_components/StatisticsCard';
import { StatisticsCardSkeleton } from './_components/StatisticsCardSkeleton';
import { SubscriptionCard } from './_components/SubscriptionCard';
import { SubscriptionCardSkeleton } from './_components/SubscriptionCardSkeleton';

export default function Page() {
  return (
    <div className="w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 h-[calc(100%-64px)] relative gap-4">
      <div className="lg:col-span-2">
        <Suspense fallback={<AccountInfoCardSkeleton />}>
          <AccountInfoCard />
        </Suspense>
      </div>

      <div className="lg:col-span-1">
        <Suspense fallback={<SubscriptionCardSkeleton />}>
          <SubscriptionCard />
        </Suspense>
      </div>

      <div className="lg:col-span-3">
        <Suspense fallback={<StatisticsCardSkeleton />}>
          <StatisticsCard />
        </Suspense>
      </div>
    </div>
  );
}

import { Suspense } from 'react';
import { TranslationsHistory } from '../_components/translations-history';
import { TranslationsHistorySkeleton } from '../_components/translations-history/translations-history-skeleton';

export default function Page() {
  return (
    <main className="flex-1">
      <Suspense fallback={<TranslationsHistorySkeleton />}>
        <TranslationsHistory key={Date.now()} />
      </Suspense>
    </main>
  );
}

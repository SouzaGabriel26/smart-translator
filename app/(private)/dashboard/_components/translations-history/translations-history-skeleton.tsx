import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { HistoryIcon } from 'lucide-react';

export async function TranslationsHistorySkeleton() {
  return (
    <div className="space-y-4 p-4 pb-0 rounded-md w-full md:h-[750px] flex flex-col">
      <h3 className="mb-3 text-xl font-bold flex items-center gap-2">
        <HistoryIcon className="size-6" />
        Translation History
      </h3>

      <form>
        <Input
          id="translation_search"
          type="search"
          placeholder="Search for a word or a translation..."
        />
      </form>

      <div className="overflow-y-auto h-full bg-background">
        <TranslationSkeletonCard />
        <TranslationSkeletonCard />
        <TranslationSkeletonCard />
      </div>
    </div>
  );
}

export function TranslationSkeletonCard() {
  return (
    <div className="shadow-md rounded p-4">
      <div className="text-xl">
        <div className="flex items-center gap-2">
          <span>
            <Skeleton className="w-16 h-3" />
          </span>
          {' = '}
          <span>
            <Skeleton className="w-16 h-3" />
          </span>
        </div>

        <span className="text-muted-foreground">
          <Skeleton className="w-60 h-3" />
        </span>
      </div>

      <div>
        <ul className="space-y-4 mt-4">
          <li className="flex flex-col gap-2">
            <Skeleton className="w-32 h-2" />
            <Skeleton className="w-36 h-2" />
          </li>

          <li className="flex flex-col gap-2">
            <Skeleton className="w-32 h-2" />
            <Skeleton className="w-36 h-2" />
          </li>

          <li className="flex flex-col gap-2">
            <Skeleton className="w-32 h-2" />
            <Skeleton className="w-36 h-2" />
          </li>
        </ul>
      </div>
    </div>
  );
}

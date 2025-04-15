'use client';

import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';
import { useLinkStatus } from 'next/link';
import type { JSX } from 'react';

type LinkLoaderIndicatorProps = JSX.IntrinsicElements['svg'];

export function LinkLoaderIndicator({
  className,
  ...props
}: LinkLoaderIndicatorProps) {
  const { pending } = useLinkStatus();

  if (!pending) return null;

  return (
    <Loader2Icon className={cn('size-6 animate-spin', className)} {...props} />
  );
}

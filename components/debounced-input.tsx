'use client';

import type { JSX } from 'react';
import { Input } from './ui/input';

type DebouncedInputProps = JSX.IntrinsicElements['input'] & {
  action: (value: string) => Promise<void>;
};

export function DebouncedInput({ action, ...props }: DebouncedInputProps) {
  let timeoutId: NodeJS.Timeout;

  function debounce(value: string) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => await action(value), 300);
  }

  return <Input {...props} onChange={(e) => debounce(e.target.value)} />;
}

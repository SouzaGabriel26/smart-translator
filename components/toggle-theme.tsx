'use client';

import { LoaderIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';

export function ToggleTheme() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      className="dark:border-muted"
      variant="outline"
    >
      {!resolvedTheme ? (
        <LoaderIcon className="size-4 animate-spin" />
      ) : resolvedTheme === 'dark' ? (
        <SunIcon className="size-4" />
      ) : (
        <MoonIcon className="size-4" />
      )}
    </Button>
  );
}

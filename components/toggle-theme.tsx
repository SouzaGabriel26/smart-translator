'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      variant="outline"
    >
      {theme === 'dark' ? (
        <SunIcon className="size-4" />
      ) : (
        <MoonIcon className="size-4" />
      )}
    </Button>
  );
}

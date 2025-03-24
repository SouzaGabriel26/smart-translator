'use client';

import { setAppLanguageAction } from '@/app/actions';
import { cn } from '@/lib/utils';
import { LanguagesIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

type ChangeLanguageButtonProps = {
  className?: string;
};

export function ChangeLanguageButton({ className }: ChangeLanguageButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <Button
        title="Change Language"
        className={cn(
          'absolute bottom-2 right-2 size-10 rounded-full',
          className,
        )}
        asChild
      >
        <PopoverTrigger>
          <LanguagesIcon />
        </PopoverTrigger>
      </Button>

      <PopoverContent className="w-fit">
        <ul className="flex flex-col gap-2">
          <li className="border-b pb-2">
            <Button
              onClick={async () => {
                await setAppLanguageAction('pt-br');
                setIsOpen(false);
              }}
              variant="ghost"
              className="w-full"
            >
              🇧🇷 Português
            </Button>
          </li>
          <li>
            <Button
              onClick={async () => {
                await setAppLanguageAction('en');
                setIsOpen(false);
              }}
              variant="ghost"
              className="w-full"
            >
              🇺🇸 English
            </Button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}

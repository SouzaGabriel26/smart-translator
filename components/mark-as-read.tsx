'use client';

import { markNotificationAsReadAction } from '@/app/actions';
import { Check } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from './ui/button';

type MarkAsReadButtonProps = {
  children: ReactNode;
  notificationId: string;
};

export function MarkAsReadButton({
  children,
  notificationId,
}: MarkAsReadButtonProps) {
  async function handleClick() {
    await markNotificationAsReadAction(notificationId);
  }

  return (
    <Button
      onClick={handleClick}
      className="dark:text-white w-full flex gap-2"
      variant="outline"
    >
      {children}
      <Check />
    </Button>
  );
}

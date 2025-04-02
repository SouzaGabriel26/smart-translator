'use client';

import { saveLeadEmailAction } from '@/actions/capture-leads';
import type { AppLanguageContext } from '@/config/app-language-context';
import { type FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

type CaptureLeadsFormProps = {
  plansSection: AppLanguageContext['plansSection'];
};

export function CaptureLeadsForm({ plansSection }: CaptureLeadsFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email')?.toString() || '';

    const result = await saveLeadEmailAction(email);

    if (!result.ok) {
      toast.error(result.error);
    } else {
      toast.success(result.message);
      setEmail('');
    }

    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
      <Input
        required
        name="email"
        type="email"
        value={email}
        placeholder={plansSection.enterEmailAddress}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button disabled={isLoading} className="self-end">
        {plansSection.joinWaitlist}
      </Button>
    </form>
  );
}

'use client';

import { generateTranslationAction } from '@/app/(private)/dashboard/actions';
import { Sparkles } from 'lucide-react';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Input } from './ui/input';

type GenerateTranslationFormProps = {
  disabled?: boolean;
  label: string;
  languageFrom: string;
  languageTo: string;
};

export function GenerateTranslationForm({
  disabled,
  label,
  languageFrom,
  languageTo,
}: GenerateTranslationFormProps) {
  const [state, action, isPending] = useActionState(
    generateTranslationAction,
    null,
  );

  useEffect(() => {
    if (state?.ok) {
      const message = state.translation_already_exists
        ? 'Translation already exists in your history.'
        : 'Translation generated successfully!';
      toast.success(message);
      return;
    }

    if (state?.error) {
      toast.error(state.error, {
        description: 'Contact support for more information.',
        action: {
          label: 'Contact Support',
          onClick: () => {
            console.log(
              `Contact support about ${state.module} error when trying to generate a translation.`,
            );
          },
        },
        duration: 5000,
      });
    }
  }, [state]);

  return (
    <form action={action} className="space-y-4 w-full min-w-40">
      <label htmlFor="word_to_translate" className="text-slate-600 text-sm">
        Type an English word/term (20 characters max)
      </label>
      <Input
        required
        id="word_to_translate"
        disabled={disabled}
        placeholder={label}
        name="word_to_translate"
        defaultValue={
          state?.module === 'invalid-word' ? '' : state?.word_to_translate
        }
      />

      {disabled && (
        <p className="text-slate-400 text-sm">
          You have reached the maximum number of translations for today.
        </p>
      )}

      <input type="hidden" name="language_from" value={languageFrom} />
      <input type="hidden" name="language_to" value={languageTo} />

      <Button disabled={isPending || disabled} className="w-full">
        <Sparkles className="size-4" />

        {isPending ? 'Generating Translation...' : 'Generate Translation'}
      </Button>
    </form>
  );
}

'use client'

import { generateTranslationAction } from "@/app/actions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function GenerateTranslationForm() {
  const [state, action, isPending] = useActionState(generateTranslationAction, null);

  useEffect(() => {
    if (state?.ok) {
      toast.success("Translation generated successfully!");
      return;
    }

    if (state?.error) {
      toast.error(state.error, {
        description: 'Contact support for more information.',
        action: {
          label: 'Contact Support',
          onClick: () => {
            console.log(`Contact support about ${state.module} error when trying to generate a translation.`);
          },
        },
        duration: 5000,
      });
    }
  }, [state])

  return (
    <form action={action} className="space-y-2">

      <Input required placeholder="Word to translate" name="word_to_translate" defaultValue={state?.word_to_translate} />

      <Button disabled={isPending}>
        {
          isPending ? "Generating Translation..." : "Generate Translation"
        }
      </Button>

    </form>
  )
}

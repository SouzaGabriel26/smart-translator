'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { AvailableLanguages } from '@/config/constants';
import { TrashIcon } from 'lucide-react';
import type { TranslationsWithPhrases } from './content';

const englishDescription =
  'Are you sure you want to delete the translation? Deleting will not decrease the translation count per day.';

const portugueseDescription =
  'Tem certeza que deseja deletar a tradução? A deleção não diminuirá a contagem de traduções por dia.';

type DeleteConfirmationModalProps = {
  language: AvailableLanguages;
  translationToDelete: TranslationsWithPhrases[0];
};

export function DeleteConfirmationModal({
  language,
  translationToDelete,
}: DeleteConfirmationModalProps) {
  const buttonTitle = language === 'en' ? 'Delete' : 'Deletar';
  const dialogTitle =
    language === 'en' ? 'Delete translation' : 'Deletar tradução';

  const dialogDescription =
    language === 'en' ? englishDescription : portugueseDescription;

  const translationLabel = language === 'en' ? 'Translation' : 'Tradução';

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="absolute right-2 top-2"
          title={buttonTitle}
        >
          <TrashIcon className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          <div>
            <p className="mb-4">{dialogDescription}</p>
            <div className="text-sm font-semibold flex flex-col">
              <span className="text-sm text-muted-foreground">
                {translationLabel}
              </span>
              <p>
                {translationToDelete.targetWord} -{' '}
                {translationToDelete.translatedWord}
              </p>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

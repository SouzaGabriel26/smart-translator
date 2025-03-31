'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { AvailableLanguages } from '@/config/constants';
import { ArrowRight, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { discardTranslationAction } from '../../actions';
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
  const [isOpen, setIsOpen] = useState(false);

  const buttonTitle = language === 'en' ? 'Delete' : 'Deletar';
  const dialogTitle =
    language === 'en' ? 'Delete translation' : 'Deletar tradução';
  const cancelButtonTitle = language === 'en' ? 'Cancel' : 'Cancelar';

  const dialogDescription =
    language === 'en' ? englishDescription : portugueseDescription;

  const translationLabel = language === 'en' ? 'Translation' : 'Tradução';
  const languageLabel = language === 'en' ? 'Language' : 'Idioma';

  async function handleDiscard() {
    const message =
      language === 'en'
        ? 'Translation deleted successfully'
        : 'Tradução deletada com sucesso';

    await discardTranslationAction(translationToDelete.id);
    toast.success(message);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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

        <div>
          <p className="mb-4">{dialogDescription}</p>
          <div className="text-sm font-semibold flex flex-col">
            <div className="flex gap-4">
              <div>
                <span className="text-sm text-muted-foreground">
                  {languageLabel}
                </span>
                <div className="flex gap-2 items-center border-r-2 pr-4">
                  <span>{translationToDelete.languageFrom}</span>
                  <span className="text-muted-foreground">
                    <ArrowRight className="size-4" />
                  </span>
                  <span>{translationToDelete.languageTo}</span>
                </div>
              </div>

              <div>
                <span className="text-sm text-muted-foreground">
                  {translationLabel}
                </span>
                <div className="flex gap-2 items-center">
                  <span>{translationToDelete.targetWord}</span>
                  <span className="text-muted-foreground">
                    <ArrowRight className="size-4" />
                  </span>
                  <span>{translationToDelete.translatedWord}</span>
                </div>
              </div>
            </div>
          </div>

          <fieldset className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              {cancelButtonTitle}
            </Button>
            <Button variant="destructive" onClick={() => handleDiscard()}>
              {buttonTitle}
            </Button>
          </fieldset>
        </div>
      </DialogContent>
    </Dialog>
  );
}

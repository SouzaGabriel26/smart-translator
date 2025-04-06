'use client';

import { getModeAction, setModeAction } from '@/app/actions';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { getLanguageContext } from '@/config/app-language-context';
import type { AvailableLanguages } from '@/config/constants';
import { useLanguage } from '@/contexts/LanguageContext';
import { Info } from 'lucide-react';
import { startTransition, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';

type ToggleHardModeProps = {
  language: AvailableLanguages;
};

export function ToggleHardMode({ language }: ToggleHardModeProps) {
  const { languageFrom, languageTo } = useLanguage();

  const [isHardMode, setIsHardMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const { hardMode } = getLanguageContext(language);

  const formattedHardModeDescription = hardMode.description
    .replaceAll('$languageFrom', languageFrom)
    .replaceAll('$languageTo', languageTo);

  useEffect(() => {
    setIsLoading(true);
    fetchMode();
    setIsLoading(false);

    async function fetchMode() {
      const mode = await getModeAction();
      setIsHardMode(mode === 'hard');
    }
  }, []);

  async function handleToggleHardMode() {
    setIsLoading(true);

    const mode = isHardMode ? 'easy' : 'hard';

    startTransition(() => {
      setIsHardMode(!isHardMode);
    });

    await setModeAction(mode);

    if (mode === 'hard') {
      toast.success('Hard mode activated 😎');
    }

    setIsLoading(false);
  }

  return (
    <div className="flex items-center gap-2">
      <HardModeInfoModal />

      <Label htmlFor="hard-mode">Hard mode</Label>
      <Switch
        checked={isHardMode}
        onCheckedChange={handleToggleHardMode}
        disabled={isLoading}
        id="hard-mode"
        name="hard_mode"
      />
    </div>
  );

  function HardModeInfoModal() {
    return (
      <Dialog open={isInfoModalOpen} onOpenChange={setIsInfoModalOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" title="Info">
            <Info className="size-4" />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogTitle>{hardMode.title} 😎</DialogTitle>
          <p>{formattedHardModeDescription}</p>
        </DialogContent>
      </Dialog>
    );
  }
}

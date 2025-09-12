'use client';

import { Volume2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { AudioLinesIcon } from './ui/audio-lines';
import { Button } from './ui/button';

type DisplaySoundButtonProps = {
  text: string;
};

export function DisplaySoundButton({ text }: DisplaySoundButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }
    };
  }, []);

  async function handlePlay() {
    if (isLoading || isPlaying) return;

    setIsLoading(true);
    try {
      const { generateAudioAction } = await import(
        '@/actions/tts/generate-audio'
      );
      const result = await generateAudioAction({ text });

      if (!result.success) {
        console.error('TTS failed:', result.error);
        toast.error(result.error);
        return;
      }

      const audioBuffer = Buffer.from(result.audioData, 'base64');
      const blob = new Blob([audioBuffer], { type: 'audio/mpeg' });

      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }

      const url = URL.createObjectURL(blob);
      audioUrlRef.current = url;
      const audioElement = new Audio(url);
      await audioElement.play();
      setIsPlaying(true);

      audioElement.addEventListener('ended', () => {
        setIsPlaying(false);
        URL.revokeObjectURL(url);
        audioUrlRef.current = null;
      });
    } catch (error) {
      console.error('TTS playback failed:', error);
      toast.error('Failed to play audio. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handlePlay}
      disabled={isLoading}
      aria-label={isPlaying ? 'Playing audio' : 'Play audio'}
    >
      {isLoading ? (
        <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : isPlaying ? (
        <AudioLinesIcon animated className="size-4" />
      ) : (
        <Volume2 className="size-4" />
      )}
    </Button>
  );
}

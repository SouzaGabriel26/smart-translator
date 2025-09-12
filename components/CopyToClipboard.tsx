'use client';

import { cn } from '@/lib/utils';
import { CheckSquare, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';

type CopytoClipboardProps = {
  textToCopy: string;
  className?: string;
};

export function CopyToClipboard({
  textToCopy,
  className,
}: CopytoClipboardProps) {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  async function handleCopy() {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isCopied ? 'Copied!' : 'Copy to clipboard'}
      onClick={handleCopy}
      disabled={isCopied}
      title="Copy"
      className={cn('p-1 rounded-md hover:bg-muted transition-all', className)}
    >
      {isCopied ? (
        <CheckSquare className="text-green-500 size-4" />
      ) : (
        <Copy className="text-muted-foreground size-4" />
      )}
    </Button>
  );
}

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VideoTranscript } from '@/types/VideoTranscript';

interface CopyButtonProps {
  transcript: VideoTranscript;
  className?: string;
}

export const CopyButton = ({ transcript, className }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const text = transcript.captions.map(caption => caption.text).join(' ');
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={handleCopy}
      className={cn("shadow-md", className)}
      title={isCopied ? 'Copied!' : 'Copy transcript'}
    >
      {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  );
};

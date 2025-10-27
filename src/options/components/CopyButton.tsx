import { useState } from 'react';
import { Button } from '@/options/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/options/lib/utils';
import { useVideoCard } from './VideoCard/VideoCardContext';


export const CopyButton = () => {
  const {selectedLanguage, transcript} = useVideoCard();
  const selectedTranscript = transcript.captions[selectedLanguage]

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const text = selectedTranscript.map(caption => caption.text).join(' ');
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
      variant="outline"
      onClick={handleCopy}
      className={cn("shadow-md")}
      title={isCopied ? 'Copied!' : 'Copy transcript'}
    >
      {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  );
};

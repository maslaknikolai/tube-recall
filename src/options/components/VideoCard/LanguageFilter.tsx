import { Button } from '@/options/components/ui/button';
import { useVideoCard } from './VideoCardContext';

export const LanguageFilter = () => {
  const { transcript, selectedLanguage, setSelectedLanguage } = useVideoCard();
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Language:</span>

      {Object.keys(transcript.captions).map(langItem => (
        <Button
          key={langItem}
          variant={selectedLanguage === langItem ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedLanguage(langItem)}
        >
          {langItem}
        </Button>
      ))}
    </div>
  );
};

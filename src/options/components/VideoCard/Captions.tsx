import { CopyButton } from '../CopyButton';
import { LanguageFilter } from './LanguageFilter';
import { useVideoCard } from './VideoCardContext';
import { Caption } from './Caption';

export const Captions = () => {
  const { transcript, selectedLanguage } = useVideoCard();
  const selectedLangCaptions = transcript.captions[selectedLanguage];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <CopyButton />
        <LanguageFilter />
      </div>

      <div className="h-[calc(100vh-195px)] overflow-y-auto p-3 rounded-md bg-muted/30">
        <p className="text-sm leading-relaxed pr-10">
          {selectedLangCaptions?.map(caption => (
            <Caption
              key={caption.id}
              caption={caption}
            />
          ))}
        </p>
      </div>
    </div>
  );
};

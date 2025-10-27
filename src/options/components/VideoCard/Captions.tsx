import { openVideoAtTime } from '@/options/lib/videoUtils';
import { CopyButton } from '../CopyButton';
import { LanguageFilter } from './LanguageFilter';
import { useVideoCard } from './VideoCardContext';

export const Captions = () => {
  const { transcript, selectedLanguage } = useVideoCard();
  const selectedCaptions = transcript.captions[selectedLanguage];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <CopyButton />
        <LanguageFilter />
      </div>

      <div className="max-h-96 overflow-y-auto p-3 rounded-md bg-muted/30">
        <p className="text-sm leading-relaxed pr-12">
          {selectedCaptions?.map((caption, index) => (
            <span
              key={index}
              onClick={() => openVideoAtTime(transcript.videoId, caption.start)}
              className="cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors rounded px-0.5"
            >
              {caption.text}
              {index < selectedCaptions.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

import { CopyButton } from '../CopyButton';
import { LanguageFilter } from './LanguageFilter';
import { useVideoCard } from './VideoCardContext';
import { cn } from '@/options/lib/utils';
import { useState } from 'react';
import { ClickedCaptionData, ClickedCaptionDropdown, defaultClickedCaptionData } from './ClickedCaptionDropdown';
import { useAtom } from 'jotai';
import { openedVideoIdsAtom } from '@/options/store/opened-videos';
import { CardContent } from '../ui/card';

export const CURRENT_CAPTION_DATA_ATTR = 'data-is-current-caption';

export const Captions = () => {
  const { transcript, selectedLanguage, captionsScrollableRef } = useVideoCard();
  const [openedVideoIds] = useAtom(openedVideoIdsAtom);

  const isOpen = openedVideoIds.has(transcript.videoId);

  const progressMs = transcript.progress * 1000

  const selectedLangCaptions = transcript.captions[selectedLanguage];

  const [clickedCaptionData, setClickedCaption] = useState<ClickedCaptionData>(defaultClickedCaptionData)

  if (!isOpen) {
    return null
  }

  return (
    <CardContent>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <CopyButton />
          <LanguageFilter />
        </div>

        <div
          className="h-[calc(100vh-195px)] overflow-y-auto p-3 rounded-md bg-muted/30"
          ref={captionsScrollableRef}
        >
          <p className="text-sm leading-relaxed pr-10">
            {selectedLangCaptions?.map(caption => {
              const isStarred = transcript.starredCaptions[caption.id]
              const isProgressHere = progressMs > caption.start && progressMs <= caption.end

              return (
                <span
                  key={caption.id}
                  {...{
                    [CURRENT_CAPTION_DATA_ATTR]: isProgressHere ? 'true' : undefined,
                  }}
                  onClick={(e) => {
                    setClickedCaption({
                      caption,
                      click: {
                        x: e.clientX,
                        y: e.clientY,
                      }
                    });
                  }}
                  className={cn(
                    "hover:bg-primary/20 hover:text-primary transition-colors rounded px-0.5",
                    {
                      'bg-yellow-100': isStarred,
                      'bg-primary text-secondary': isProgressHere || clickedCaptionData.caption?.id === caption.id,
                    }
                  )}
                >
                  {caption.text}
                </span>
              )
            })}
          </p>
        </div>

        <ClickedCaptionDropdown
          clickedCaptionData={clickedCaptionData}
          setClickedCaption={setClickedCaption}
        />
      </div>
    </CardContent>
  );
};

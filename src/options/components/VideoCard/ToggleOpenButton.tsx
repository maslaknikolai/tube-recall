import { Toggle } from '@/options/components/ui/toggle';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useAtom } from 'jotai';
import { openedVideoIdsAtom } from '@/options/store/opened-videos';
import { useVideoCard } from './VideoCardContext';
import invariant from 'tiny-invariant';
import { CURRENT_CAPTION_DATA_ATTR } from './Captions';

export const ToggleOpenButton = () => {
  const { transcript, videoCardRef, captionsScrollableRef } = useVideoCard();
  const [openedVideoIds, setOpenedVideoIds] = useAtom(openedVideoIdsAtom);

  const isOpen = openedVideoIds.has(transcript.videoId);

  const handleToggle = (pressed: boolean) => {
    setOpenedVideoIds(prev => {
      const newSet = new Set(prev);

      if (pressed) {
        newSet.add(transcript.videoId);

        requestAnimationFrame(() => {
          invariant(videoCardRef.current);
          invariant(captionsScrollableRef.current);

          window.scrollTo({
            top: window.scrollY + videoCardRef.current.getBoundingClientRect().top - 8,
            behavior: 'smooth'
          });

          const captionElement = captionsScrollableRef.current.querySelector(
            `[${CURRENT_CAPTION_DATA_ATTR}="true"]`
          ) as HTMLElement | null;

          if (!captionElement) return;

          const relativeY = captionElement.offsetTop - captionsScrollableRef.current.offsetTop;
          const scrollY = relativeY - (captionsScrollableRef.current.clientHeight / 2) + (captionElement.clientHeight / 2);

          captionsScrollableRef.current.scrollTo({
            top: scrollY,
            behavior: 'smooth'
          });
        })
      } else {
        newSet.delete(transcript.videoId);
      }
      return newSet;
    });
  };

  return (
    <Toggle
      pressed={isOpen}
      onPressedChange={handleToggle}
      aria-label="Toggle transcript"
      size="sm"
      variant="default"
      className="shrink-0 h-8 w-8 p-0"
    >
      {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
    </Toggle>
  );
};

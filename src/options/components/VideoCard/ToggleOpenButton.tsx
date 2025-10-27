import { Toggle } from '@/options/components/ui/toggle';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useAtom } from 'jotai';
import { openedVideoIdsAtom } from '@/options/store/opened-videos';
import { useVideoCard } from './VideoCardContext';

export const ToggleOpenButton = () => {
  const { transcript } = useVideoCard();
  const [openedVideoIds, setOpenedVideoIds] = useAtom(openedVideoIdsAtom);

  const isOpen = openedVideoIds.has(transcript.videoId);

  const handleToggle = (pressed: boolean) => {
    setOpenedVideoIds(prev => {
      const newSet = new Set(prev);
      if (pressed) {
        newSet.add(transcript.videoId);
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
      variant="outline"
      className="shrink-0 h-8 w-8 p-0"
    >
      {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
    </Toggle>
  );
};

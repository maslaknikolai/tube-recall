import { useMemo } from 'react';
import { useAtom } from 'jotai';
import { Button } from '@/options/components/ui/button';
import { DownloadAllButton } from './DownloadAllButton';
import { sortStateAtom } from '@/options/store/sort';
import { openedVideoIdsAtom } from '@/options/store/opened-videos';
import type { VideoTranscript } from '@/types/VideoTranscript';

interface ControlButtonsProps {
  transcripts: VideoTranscript[];
}

export const ControlButtons = ({ transcripts }: ControlButtonsProps) => {
  const [sortState, setSortState] = useAtom(sortStateAtom);
  const [openedVideoIds, setOpenedVideoIds] = useAtom(openedVideoIdsAtom);

  const handleSortClick = (type: 'date' | 'duration') => {
    if (sortState.type === type) {
      setSortState({ type, direction: sortState.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      setSortState({ type, direction: 'asc' });
    }
  };

  const toggleIsAllOpened = () => {
    if (isAllOpened) {
      setOpenedVideoIds(new Set());
    } else {
      const allVideoIds = new Set(transcripts.map(it => it.videoId));
      setOpenedVideoIds(allVideoIds);
    }
  };

  const isAllOpened = useMemo(() => {
    return transcripts.length > 0 && transcripts.every(it => openedVideoIds.has(it.videoId))
  }, [transcripts, openedVideoIds]);

  return (
    <div className="mb-6 flex items-center gap-2 flex-wrap">
      <span className="text-sm text-muted-foreground">Sort by:</span>

      <Button
        variant={sortState.type === 'date' ? 'default' : 'outline'}
        size="sm"
        onClick={() => handleSortClick('date')}
      >
        Date {sortState.type === 'date' && (sortState.direction === 'asc' ? '↑' : '↓')}
      </Button>

      <Button
        variant={sortState.type === 'duration' ? 'default' : 'outline'}
        size="sm"
        onClick={() => handleSortClick('duration')}
      >
        Duration {sortState.type === 'duration' && (sortState.direction === 'asc' ? '↑' : '↓')}
      </Button>

      <div className="ml-auto flex gap-2">
        <DownloadAllButton transcripts={transcripts} />

        <Button
          variant="outline"
          size="sm"
          onClick={toggleIsAllOpened}
          disabled={transcripts.length === 0}
        >
          {isAllOpened ? 'Close All' : 'Open All'}
        </Button>
      </div>
    </div>
  );
};

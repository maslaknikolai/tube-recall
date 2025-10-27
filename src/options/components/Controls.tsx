import { useMemo } from 'react';
import { useAtom } from 'jotai';
import { Button } from '@/options/components/ui/button';
import { DownloadAllButton } from './DownloadAllButton';
import { openedVideoIdsAtom } from '@/options/store/opened-videos';
import type { VideoTranscript } from '@/types/VideoTranscript';
import { SortControls } from './SortControls';
import { Filters } from './Filters';


export const Controls = ({ transcripts }: { transcripts: VideoTranscript[] }) => {
  const [openedVideoIds, setOpenedVideoIds] = useAtom(openedVideoIdsAtom);

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
      <Filters />
        <span>•</span>
      <SortControls />

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

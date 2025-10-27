import { useMemo } from 'react';
import { useAtom } from 'jotai';
import { Button } from '@/options/components/ui/button';
import { DownloadAllButton } from './DownloadAllButton';
import { openedVideoIdsAtom } from '@/options/store/opened-videos';
import type { VideoTranscript } from '@/types/VideoTranscript';
import { SortControls } from './SortControls';
import { Filters } from './Filters';
import { ToggleOpenButton } from './ToggleOpenButton';


export const Controls = ({ transcripts }: { transcripts: VideoTranscript[] }) => {
  return (
    <div className="mb-6 flex items-center gap-2 flex-wrap">
      <Filters />
        <span>•</span>
      <SortControls />

      <div className="ml-auto flex gap-2">
        <DownloadAllButton transcripts={transcripts} />
        <ToggleOpenButton />
      </div>
    </div>
  );
};

import { DownloadAllButton } from './DownloadAllButton';
import type { VideoTranscript } from '@/types/VideoTranscript';
import { SortControls } from './SortControls';
import { Filters } from './Filters';
import { ToggleOpenButton } from './ToggleOpenButton';
import { SearchField } from './SearchField';
import { useProcessedTranscripts } from '../AppProvider';


export const Controls = () => {
  const transcripts = useProcessedTranscripts()

  return (
    <div className="mb-6 flex gap-2 flex-wrap justify-between">
      <div className='flex flex-col gap-2'>
        <SearchField />

        <div className="flex">
          <Filters />
          <span>•</span>
          <SortControls />
        </div>
      </div>

      <div className="flex gap-2">
        <DownloadAllButton transcripts={transcripts} />
        <ToggleOpenButton />
      </div>
    </div>
  );
};

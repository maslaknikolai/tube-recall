import { DownloadAllButton } from './DownloadAllButton';
import { SortControls } from './SortControls';
import { StarredFilter } from './StarredFilter';
import { ToggleOpenAllButton } from './ToggleOpenAllButton';
import { SearchField } from './SearchField';


export const Controls = () => {
  return (
    <div className="mb-6 flex gap-2 flex-wrap justify-between">
      <div className='flex flex-col gap-2'>
        <SearchField />

        <div className="flex">
          <StarredFilter />
          <span>•</span>
          <SortControls />
        </div>
      </div>

      <div className="flex gap-2">
        <DownloadAllButton />
        <ToggleOpenAllButton />
      </div>
    </div>
  );
};

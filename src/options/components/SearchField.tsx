import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useAtom } from 'jotai';
import { searchQueryAtom } from '../store/search';

export const SearchField = () => {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)

  return (
    <div className='relative flex items-center gap-2'>
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        placeholder="Search transcripts..."
        className="w-full"
      />
      {!!searchQuery && (
        <Button onClick={() => setSearchQuery('')}>
          <X />
        </Button>
      )}
    </div>
  );
};

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import { searchInputAtom, activeSearchQueryAtom } from '@/lib/atoms';

export const SearchBar = () => {
  const [searchInput, setSearchInput] = useAtom(searchInputAtom);
  const [, setActiveSearchQuery] = useAtom(activeSearchQueryAtom);

  const handleSearch = () => {
    setActiveSearchQuery(searchInput.trim());
  };

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search captions..."
          value={searchInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          className="pl-10"
        />
      </div>
      <Button onClick={handleSearch}>
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </div>
  );
};

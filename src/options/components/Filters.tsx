import { useMemo } from 'react';
import { useAtom } from 'jotai';
import { Button } from '@/options/components/ui/button';
import { filterByAtom, sortAtom } from '@/options/store/sort';
import { Star } from 'lucide-react';

export const Filters = () => {
  const [filterBy, setFilterBy] = useAtom(filterByAtom);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Show:</span>

      <Button
        variant={filterBy === 'all' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setFilterBy('all')}
      >
        All
      </Button>

      <Button
        variant={filterBy === 'starred' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setFilterBy('starred')}
      >
        <Star className="h-4 w-4" />
      </Button>
    </div>
  );
};

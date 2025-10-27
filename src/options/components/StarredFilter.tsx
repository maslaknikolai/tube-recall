import { useAtom } from 'jotai';
import { Button } from '@/options/components/ui/button';
import { filterByAtom } from '@/options/store/filter';
import { Star } from 'lucide-react';

export const StarredFilter = () => {
  const [starredFilter, setStarredFilter] = useAtom(filterByAtom);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Show:</span>

      <Button
        variant={starredFilter === 'all' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setStarredFilter('all')}
      >
        All
      </Button>

      <Button
        variant={starredFilter === 'starred' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setStarredFilter('starred')}
      >
        <Star className="h-4 w-4" />
      </Button>
    </div>
  );
};

import { useAtom } from 'jotai';
import { Button } from '@/options/components/ui/button';
import { sortAtom, SortState } from '@/options/store/sort';

export const SortControls = () => {
  const [sortState, setSortState] = useAtom(sortAtom);

  const handleSortClick = (type: SortState['type']) => {
    setSortState((v) => {
      return v.type === type
       ? { type, direction: v.direction === 'asc' ? 'desc' : 'asc' }
        : { type, direction: 'asc' };
    })
  };

  return (
    <div className="flex items-center gap-2">
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
    </div>
  );
};

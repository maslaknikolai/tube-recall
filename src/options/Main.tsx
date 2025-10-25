import { useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import { useTranscripts } from '@/hooks/queries/useTranscripts';
import { VideoTranscript, Caption } from '@/types/VideoTranscript';
import { SearchBar } from './components/SearchBar';
import { VideoCard } from './components/VideoCard';
import { DownloadAllButton } from './components/DownloadAllButton';
import { Button } from '@/components/ui/button';
import { activeSearchQueryAtom, openedVideoIdsAtom } from '@/lib/atoms';

type SortType = 'date' | 'duration';
type SortDirection = 'asc' | 'desc';

export const Main = () => {
  const { data: transcripts = [], isLoading } = useTranscripts();
  const [sortType, setSortType] = useState<SortType>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const [activeSearchQuery] = useAtom(activeSearchQueryAtom);
  const [openedVideoIds, setOpenedVideoIds] = useAtom(openedVideoIdsAtom);

  const sorted = useMemo(() => {
    const sorted = [...transcripts];

    if (sortType === 'date') {
      sorted.sort((a, b) => {
        const dateA = a.watchedAt ?? 0;
        const dateB = b.watchedAt ?? 0;
        const diff = dateB - dateA;
        return sortDirection === 'asc' ? -diff : diff;
      });
    } else if (sortType === 'duration') {
      sorted.sort((a, b) => {
        const durationA = a.videoDuration ?? 0;
        const durationB = b.videoDuration ?? 0;
        const diff = durationA - durationB;
        return sortDirection === 'asc' ? diff : -diff;
      });
    }

    return sorted;
  }, [transcripts, sortType, sortDirection]);

  const handleSortClick = (type: 'date' | 'duration') => {
    if (sortType === type) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortType(type);
      setSortDirection('asc');
    }
  };

  const toggleIsAllOpened = () => {
    if (isAllOpened) {
      setOpenedVideoIds(new Set());
    } else {
      const allVideoIds = new Set(sorted.map(it => it.videoId));
      setOpenedVideoIds(allVideoIds);
    }
  };

  const isAllOpened = useMemo(() => {
    return sorted.length > 0 && sorted.every(it => openedVideoIds.has(it.videoId))
  }, [sorted, openedVideoIds]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading transcripts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">TubeRecall</h1>
        <p className="text-muted-foreground">
          {transcripts.length} video transcript{transcripts.length !== 1 ? 's' : ''} available
        </p>
      </div>

      <div className="mb-6 flex items-center gap-2 flex-wrap">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <Button
          variant={sortType === 'date' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleSortClick('date')}
        >
          Date {sortType === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
        </Button>
        <Button
          variant={sortType === 'duration' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleSortClick('duration')}
        >
          Duration {sortType === 'duration' && (sortDirection === 'asc' ? '↑' : '↓')}
        </Button>

        <div className="ml-auto flex gap-2">
          <DownloadAllButton transcripts={sorted} />
          <Button
            variant="outline"
            size="sm"
            onClick={toggleIsAllOpened}
            disabled={sorted.length === 0}
          >
            {isAllOpened ? 'Close All' : 'Open All'}
          </Button>
        </div>
      </div>

      {activeSearchQuery && (
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {sorted.length > 0
              ? `Found ${sorted.length} video${sorted.length !== 1 ? 's' : ''} with matching captions`
              : `No results found for "${activeSearchQuery}"`
            }
          </p>
        </div>
      )}

      <div className="space-y-4">
        {sorted.map((transcript) => (
            <VideoCard
              key={transcript.videoId}
              transcript={transcript}
            />
          ))
        }
      </div>
    </div>
  );
};

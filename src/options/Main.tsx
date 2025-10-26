import { useMemo } from 'react';
import { useAtom } from 'jotai';
import { useTranscripts } from '@/hooks/queries/useTranscripts';
import { VideoTranscript, Caption } from '@/types/VideoTranscript';
import { VideoCard } from './components/VideoCard';
import { DownloadAllButton } from './components/DownloadAllButton';
import { Button } from '@/components/ui/button';
import { openedVideoIdsAtom, sortStateAtom } from '@/lib/atoms';

export const Main = () => {
  const { data: transcripts = [], isLoading } = useTranscripts();
  const [sortState, setSortState] = useAtom(sortStateAtom);
  const [openedVideoIds, setOpenedVideoIds] = useAtom(openedVideoIdsAtom);

  const sorted = useMemo(() => {
    const sorted = [...transcripts];

    if (sortState.type === 'date') {
      sorted.sort((a, b) => {
        const dateA = a.watchedAt ?? 0;
        const dateB = b.watchedAt ?? 0;
        const diff = dateB - dateA;
        return sortState.direction === 'asc' ? -diff : diff;
      });
    } else if (sortState.type === 'duration') {
      sorted.sort((a, b) => {
        const durationA = a.videoDuration ?? 0;
        const durationB = b.videoDuration ?? 0;
        const diff = durationA - durationB;
        return sortState.direction === 'asc' ? diff : -diff;
      });
    }

    return sorted;
  }, [transcripts, sortState]);

  const handleSortClick = (type: 'date' | 'duration') => {
    if (sortState.type === type) {
      setSortState({ type, direction: sortState.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      setSortState({ type, direction: 'asc' });
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

      {!sorted.length ? (
        <div className='flex items-center justify-center p-4 text-sm'>
          No trancripts yet. Transcripts will appear here after watching videos on YouTube with captions enabled.
        </div>
      ): (
        <div className="flex flex-col gap-4">
          {sorted.map((transcript) => (
            <VideoCard
              key={transcript.videoId}
              transcript={transcript}
            />
          ))}
      </div>
      )}
    </div>
  );
};

import { useMemo } from 'react';
import { useAtom } from 'jotai';
import { useTranscripts } from '@/options/hooks/queries/useTranscripts';
import { VideoCard } from './components/VideoCard';
import { ControlButtons } from './components/ControlButtons';
import { sortStateAtom } from '@/options/store/sort';

export const Main = () => {
  const { data: transcripts = [], isLoading } = useTranscripts();
  const [sortState] = useAtom(sortStateAtom);

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

      <ControlButtons transcripts={sorted} />

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

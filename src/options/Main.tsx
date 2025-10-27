import { useTranscripts } from '@/options/hooks/queries/useTranscripts';
import { VideoCard } from './components/VideoCard';
import { ControlButtons } from './components/ControlButtons';
import { useSortedTranscripts } from './hooks/useSortedTranscripts';

export const Main = () => {
  const { isLoading } = useTranscripts();
  const transcripts = useSortedTranscripts()

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-2">
            TubeRecall
          </h1>

          <a
            href="https://buymeacoffee.com/nikomaslak"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              alt="Buy me a coffee"
              className='w-36'
            />
          </a>
        </div>

        <p className="text-muted-foreground">
          {transcripts.length} video transcript(s) available
        </p>
      </div>

      <ControlButtons transcripts={transcripts} />

      {isLoading ? (
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading transcripts...</p>
          </div>
        </div>
      ) : !transcripts.length ? (
        <div className='flex items-center justify-center p-4 text-sm'>
          No trancripts yet. Transcripts will appear here after watching videos on YouTube with captions enabled.
        </div>
      ): (
        <div className="flex flex-col gap-4">
          {transcripts.map((transcript) => (
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

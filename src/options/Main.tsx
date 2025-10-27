import { VideoCard } from './components/VideoCard/VideoCard';
import { Controls } from './components/Controls';
import { BuyMeACoffeLink } from './components/BuyMeACoffeLink';
import { AboutModal } from './components/AboutModal';
import { useProcessedTranscripts } from './AppProvider';

export const Main = () => {
  const transcripts = useProcessedTranscripts()

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold mb-2">
              TubeRecall
            </h1>
            <AboutModal />
          </div>

          <BuyMeACoffeLink />
        </div>

        <p className="text-muted-foreground">
          {transcripts.length} video transcript(s) available
        </p>
      </div>

      <Controls />

      {!transcripts.length ? (
        <div className='flex items-center justify-center p-4 text-sm'>
          No transcripts yet. Transcripts will appear here after watching videos on YouTube with captions enabled.
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

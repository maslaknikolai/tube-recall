import { useMemo } from 'react';
import { useAtom } from 'jotai';
import { useTranscripts } from '@/hooks/queries/useTranscripts';
import { VideoTranscript, Caption } from '@/types/VideoTranscript';
import { SearchBar } from './components/SearchBar';
import { VideoCard } from './components/VideoCard';
import { activeSearchQueryAtom } from '@/lib/atoms';

interface VideoWithMatches {
  transcript: VideoTranscript;
  matchingCaptions: Caption[];
}

export const Main = () => {
  const { data: transcripts = [], isLoading } = useTranscripts();

  const [activeSearchQuery] = useAtom(activeSearchQueryAtom);

  const videosToDisplay = useMemo((): VideoWithMatches[] => {
    if (!activeSearchQuery) {
      return transcripts.map(transcript => ({
        transcript,
        matchingCaptions: []
      }));
    }

    const query = activeSearchQuery.toLowerCase();
    const videosWithMatches: VideoWithMatches[] = [];

    for (const transcript of transcripts) {
      const matchingCaptions = transcript.captions.filter(caption =>
        caption.text.toLowerCase().includes(query)
      );

      if (matchingCaptions.length > 0) {
        videosWithMatches.push({
          transcript,
          matchingCaptions
        });
      }
    }

    return videosWithMatches;
  }, [transcripts, activeSearchQuery]);

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
        <h1 className="text-3xl font-bold mb-2">Video Transcripts</h1>
        <p className="text-muted-foreground">
          {transcripts.length} video transcript{transcripts.length !== 1 ? 's' : ''} available
        </p>
      </div>

      <div className="pb-6">
        <SearchBar />
      </div>

      {activeSearchQuery && (
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {videosToDisplay.length > 0
              ? `Found ${videosToDisplay.length} video${videosToDisplay.length !== 1 ? 's' : ''} with matching captions`
              : `No results found for "${activeSearchQuery}"`
            }
          </p>
        </div>
      )}

      <div className="space-y-4">
        {videosToDisplay.map(({ transcript, matchingCaptions }) => (
            <VideoCard
              key={transcript.videoId}
              transcript={transcript}
              matchingCaptions={matchingCaptions}
            />
          ))
        }
      </div>
    </div>
  );
};

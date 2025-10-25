import { useState, useEffect, useMemo, useCallback } from 'react';
import { getAllTranscripts } from '@/lib/transcriptsStore';
import { VideoTranscript, Caption } from '@/types/VideoTranscript';
import { Card, CardContent } from '@/components/ui/card';
import { SearchBar } from './components/SearchBar';
import { VideoCard } from './components/VideoCard';

interface VideoWithMatches {
  transcript: VideoTranscript;
  matchingCaptions: Caption[];
}

export const Options = () => {
  const [transcripts, setTranscripts] = useState<VideoTranscript[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [activeSearchQuery, setActiveSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTranscripts = async () => {
      try {
        const loadedTranscripts = await getAllTranscripts();
        console.log('TubeRecall: Loading transcripts', loadedTranscripts);
        setTranscripts(loadedTranscripts);
      } catch (error) {
        console.error('Failed to load transcripts:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTranscripts();
  }, []);

  const handleSearch = useCallback(() => {
    setActiveSearchQuery(searchInput.trim());
  }, [searchInput]);

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

  if (loading) {
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

      <div className="mb-6">
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          onSearch={handleSearch}
        />
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
              searchQuery={activeSearchQuery}
              matchingCaptions={matchingCaptions}
            />
          ))
        }
      </div>
    </div>
  );
};

import { useState } from 'react';
import { VideoTranscript, Caption } from '@/types/VideoTranscript';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Video, Clock, ExternalLink, Play, List } from 'lucide-react';

interface VideoCardProps {
  transcript: VideoTranscript;
  searchQuery?: string;
  matchingCaptions?: Caption[];
}

const openVideoAtTime = (videoId: string, startTime?: number) => {
  const url = startTime !== undefined
    ? `https://www.youtube.com/watch?v=${videoId}&t=${Math.floor(startTime / 1000)}s`
    : `https://www.youtube.com/watch?v=${videoId}`;
  window.open(url, '_blank');
};

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const highlightText = (text: string, query: string) => {
  if (!query) return text;

  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={index} className="bg-yellow-200 dark:bg-yellow-800">{part}</mark>
      : part
  );
};

export const VideoCard = ({ transcript, searchQuery, matchingCaptions }: VideoCardProps) => {
  const [showAllTranscripts, setShowAllTranscripts] = useState(false);

  // Determine which captions to display
  const captionsToDisplay = showAllTranscripts 
    ? transcript.captions 
    : (matchingCaptions && matchingCaptions.length > 0 ? matchingCaptions : []);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg flex items-center gap-2 mb-1">
              <Video className="h-4 w-4 shrink-0" />
              <span className="truncate">{transcript.title}</span>
            </CardTitle>
            <CardDescription className="flex items-center gap-2 flex-wrap">
              {transcript.videoDuration !== undefined && (
                <>
                  <Clock className="h-3 w-3" />
                  <span>Duration: {formatTime(transcript.videoDuration)}</span>
                </>
              )}
              {transcript.watchedAt !== undefined && (
                <>
                  {transcript.videoDuration !== undefined && <span>•</span>}
                  <span>Watched: {formatDate(transcript.watchedAt)}</span>
                </>
              )}
              <Badge variant="outline" className="ml-2">
                {transcript.videoId}
              </Badge>
            </CardDescription>
          </div>
          <Button
            onClick={() => openVideoAtTime(transcript.videoId)}
            className="shrink-0"
          >
            <Play className="h-4 w-4 mr-2" />
            Open Video
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              {showAllTranscripts 
                ? `All ${transcript.captions.length} caption${transcript.captions.length !== 1 ? 's' : ''}`
                : matchingCaptions && matchingCaptions.length > 0
                  ? `${matchingCaptions.length} matching caption${matchingCaptions.length !== 1 ? 's' : ''}`
                  : `${transcript.captions.length} caption${transcript.captions.length !== 1 ? 's' : ''} available`
              }
            </p>
            <Toggle
              pressed={showAllTranscripts}
              onPressedChange={setShowAllTranscripts}
              aria-label="Toggle all transcripts"
              size="sm"
              variant="outline"
            >
              <List className="h-4 w-4 mr-1" />
              {showAllTranscripts ? 'Hide All' : 'Show All'}
            </Toggle>
          </div>

          {captionsToDisplay.length > 0 && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {captionsToDisplay.map((caption, index) => (
                <div key={index} className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
                  <div className="flex-1">
                    <p className="text-sm">
                      {searchQuery ? highlightText(caption.text, searchQuery) : caption.text}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTime(caption.start)}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openVideoAtTime(transcript.videoId, caption.start)}
                    className="shrink-0"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

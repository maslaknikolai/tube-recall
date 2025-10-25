import { useState } from 'react';
import { VideoTranscript, Caption } from '@/types/VideoTranscript';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Video, Clock, ExternalLink, Play, List, Trash2 } from 'lucide-react';
import { useDeleteTranscript } from '@/hooks/mutations/useDeleteTranscript';
import { openVideoAtTime } from '@/lib/videoUtils';
import { formatTime, formatDate } from '@/lib/formatUtils';
import { highlightText } from '@/lib/textUtils';

interface VideoCardProps {
  transcript: VideoTranscript;
  searchQuery?: string;
  matchingCaptions?: Caption[];
}

export const VideoCard = ({ transcript, searchQuery, matchingCaptions }: VideoCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const deleteMutation = useDeleteTranscript();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the transcript for "${transcript.title}"?`)) {
      deleteMutation.mutate(transcript.videoId);
    }
  };

  const captionsToDisplay = isOpen
    ? transcript.captions
    : (matchingCaptions && matchingCaptions.length > 0 ? matchingCaptions : []);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg flex items-center gap-2 mb-1 overflow-hidden">
              <Video className="h-4 w-4 shrink-0" />
              <span className="truncate">{transcript.title}</span>
            </CardTitle>

            <CardDescription className="flex items-center gap-2 flex-wrap">
              {!!transcript.videoDuration && (
                <>
                  <Clock className="h-3 w-3" />
                  <span>Duration: {formatTime(transcript.videoDuration)}</span>
                </>
              )}

              {!!transcript.watchedAt && (
                <>
                  {transcript.videoDuration !== undefined && <span>•</span>}
                  <span>Last watch: {formatDate(transcript.watchedAt)}</span>
                </>
              )}
            </CardDescription>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button
              onClick={() => openVideoAtTime(transcript.videoId)}
              variant="default"
            >
              <Play className="h-4 w-4 mr-2" />
              Open Video
            </Button>

            <Button
              onClick={handleDelete}
              variant="destructive"
              disabled={deleteMutation.isPending}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              {!isOpen && `Matches: ${matchingCaptions?.length}`}
            </p>

            <Toggle
              pressed={isOpen}
              onPressedChange={setIsOpen}
              aria-label="Toggle all transcripts"
              size="sm"
              variant="outline"
            >
              <List className="h-4 w-4 mr-1" />
              {isOpen ? 'Hide' : 'Show'}
            </Toggle>
          </div>

          {!!captionsToDisplay.length && (
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

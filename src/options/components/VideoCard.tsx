import { useState } from 'react';
import { VideoTranscript, Caption } from '@/types/VideoTranscript';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Clock, Play, ChevronDown, ChevronRight, Trash2 } from 'lucide-react';
import { useDeleteTranscript } from '@/hooks/mutations/useDeleteTranscript';
import { openVideoAtTime } from '@/lib/videoUtils';
import { formatTime, formatDate } from '@/lib/formatUtils';
import { highlightText } from '@/lib/textUtils';
import { useAtom } from 'jotai';
import { activeSearchQueryAtom } from '@/lib/atoms';
import { CopyButton } from './CopyButton';

interface VideoCardProps {
  transcript: VideoTranscript;
  matchingCaptions: Caption[];
}

export const VideoCard = ({ transcript, matchingCaptions }: VideoCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSearchQuery] = useAtom(activeSearchQueryAtom);

  const deleteMutation = useDeleteTranscript();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the transcript for "${transcript.title}"?`)) {
      deleteMutation.mutate(transcript.videoId);
    }
  };

  const captionsToDisplay = !!matchingCaptions.length ? matchingCaptions : transcript.captions;
  const fullTranscriptText = captionsToDisplay.map(caption => caption.text).join(' ');

  return (
    <Card>
      <CardHeader className='flex flex-col gap-2'>
        <CardTitle className="text-lg flex gap-2 overflow-hidden w-full items-center">
          <Toggle
            pressed={isOpen}
            onPressedChange={setIsOpen}
            aria-label="Toggle transcript"
            size="sm"
            variant="outline"
            className="shrink-0 h-8 w-8 p-0"
          >
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Toggle>

          <span className="truncate flex-1">{transcript.title}</span>

          <div className="flex gap-2 shrink-0">
            <Button
              onClick={() => openVideoAtTime(transcript.videoId)}
              variant="default"
            >
              <Play className="h-4 w-4" />
            </Button>

            <Button
              onClick={handleDelete}
              variant="destructive"
              disabled={deleteMutation.isPending}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
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
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {isOpen && (
            <div className="relative">
              <CopyButton
                text={fullTranscriptText}
                className="absolute top-2 right-2 z-10"
              />
              <div className="max-h-96 overflow-y-auto p-3 rounded-md bg-muted/30">
                <p className="text-sm leading-relaxed pr-12">
                  {captionsToDisplay.map((caption, index) => (
                    <span
                      key={index}
                      onClick={() => openVideoAtTime(transcript.videoId, caption.start)}
                      className="cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors rounded px-0.5"
                    >
                      {activeSearchQuery ? highlightText(caption.text, activeSearchQuery) : caption.text}
                      {index < captionsToDisplay.length - 1 ? ' ' : ''}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

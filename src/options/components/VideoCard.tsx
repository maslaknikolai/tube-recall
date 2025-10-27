import { VideoTranscript } from '@/types/VideoTranscript';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/options/components/ui/card';
import { Button } from '@/options/components/ui/button';
import { Toggle } from '@/options/components/ui/toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/options/components/ui/dropdown-menu';
import { Clock, Play, ChevronDown, ChevronRight, Trash2, AlertTriangle } from 'lucide-react';
import { useDeleteTranscript } from '@/options/hooks/mutations/useDeleteTranscript';
import { openVideoAtTime } from '@/options/lib/videoUtils';
import { formatTime, formatDate } from '@/options/lib/formatUtils';
import { useAtom } from 'jotai';
import { openedVideoIdsAtom } from '@/options/store/opened-videos';
import { CopyButton } from './CopyButton';
import { useState } from 'react';

interface VideoCardProps {
  transcript: VideoTranscript;
}

export const VideoCard = ({ transcript }: VideoCardProps) => {
  const [openedVideoIds, setOpenedVideoIds] = useAtom(openedVideoIdsAtom);

  const isOpen = openedVideoIds.has(transcript.videoId);

  const handleToggle = (pressed: boolean) => {
    setOpenedVideoIds(prev => {
      const newSet = new Set(prev);
      if (pressed) {
        newSet.add(transcript.videoId);
      } else {
        newSet.delete(transcript.videoId);
      }
      return newSet;
    });
  };

  const deleteMutation = useDeleteTranscript();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = () => {
    deleteMutation.mutate(transcript.videoId);
    setShowConfirmation(false);
  };
  return (
    <Card>
      <CardHeader className='flex flex-col gap-2'>
        <CardTitle className="text-lg flex gap-2 overflow-hidden w-full items-center">
          <Toggle
            pressed={isOpen}
            onPressedChange={handleToggle}
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

            <DropdownMenu open={showConfirmation} onOpenChange={setShowConfirmation}>
              <DropdownMenuTrigger>
                <Button
                  variant="destructive"
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem
                  className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
                  onSelect={(e) => {
                    e.preventDefault();
                    handleDelete();
                  }}
                >
                  <AlertTriangle className="h-4 w-4" />
                  <div className="flex flex-col">
                    <span className="font-semibold">Delete transcript</span>
                    <span className="text-xs text-muted-foreground">This action cannot be undone</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardTitle>

        <CardDescription className="flex items-center gap-2 flex-wrap">
          <Clock className="h-3 w-3" />
          <span>Duration: {formatTime(transcript.videoDuration)}</span>
          <span>•</span>
          <span>Last watch: {formatDate(transcript.watchedAt)}</span>
        </CardDescription>
      </CardHeader>

      {isOpen && (
        <CardContent>
          <div className="relative">
            <CopyButton
              transcript={transcript}
              className="absolute top-2 right-6 z-10"
            />

            <div className="max-h-96 overflow-y-auto p-3 rounded-md bg-muted/30">
              <p className="text-sm leading-relaxed pr-12">
                {transcript.captions.map((caption, index) => (
                  <span
                    key={index}
                    onClick={() => openVideoAtTime(transcript.videoId, caption.start)}
                    className="cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors rounded px-0.5"
                  >
                    {caption.text}
                    {index < transcript.captions.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

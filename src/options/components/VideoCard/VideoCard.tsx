import { VideoTranscript } from '@/types/VideoTranscript';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/options/components/ui/card';
import { Button } from '@/options/components/ui/button';
import { Clock, ExternalLink } from 'lucide-react';
import { formatTime, formatDate } from '@/options/lib/formatUtils';
import { ToggleOpenButton } from './ToggleOpenButton';
import { Captions } from './Captions';
import { DeleteButton } from './DeleteButton';
import { useAtom } from 'jotai';
import { openedVideoIdsAtom } from '@/options/store/opened-videos';
import { VideoCardProvider } from './VideoCardContext';

interface VideoCardProps {
  transcript: VideoTranscript;
}

export const VideoCard = ({ transcript }: VideoCardProps) => {
  const [openedVideoIds] = useAtom(openedVideoIdsAtom);
  const isOpen = openedVideoIds.has(transcript.videoId);

  return (
    <VideoCardProvider transcript={transcript}>
      <Card>
        <CardHeader className='flex flex-col gap-2'>
          <CardTitle className="text-lg flex gap-2 overflow-hidden w-full items-center">
            <ToggleOpenButton />

            <span className="truncate flex-1">{transcript.title}</span>

            <div className="flex gap-2 shrink-0">
              <a
                href={`https://www.youtube.com/watch?v=${transcript.videoId}`}
                target="_blank"
              >
                <Button variant="default">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>

              <DeleteButton />
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
            <Captions />
          </CardContent>
        )}
      </Card>
    </VideoCardProvider>
  );
};

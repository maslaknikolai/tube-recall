import { Transcript } from '@/types/Transcript';
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
import { youtubeLink } from '@/options/lib/youtubeLink';

interface VideoCardProps {
  transcript: Transcript;
}

export const VideoCard = ({ transcript }: VideoCardProps) => {
  const [openedVideoIds] = useAtom(openedVideoIdsAtom);
  const isOpen = openedVideoIds.has(transcript.videoId);

  return (
    <VideoCardProvider transcript={transcript}>
      <Card>
        <CardHeader className='flex flex-col gap-2'>
          <CardTitle className="flex gap-2 overflow-hidden w-full items-center">
            <ToggleOpenButton />

            <h2 className="truncate flex-1 text-lg">
              {transcript.title}
            </h2>

            <div className="flex gap-2 shrink-0">
              <a
                href={youtubeLink(transcript.videoId, transcript.progress)}
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
            <span>•</span>
            <a
              href={youtubeLink(transcript.videoId, transcript.progress)}
              target="_blank"
            >
              Progress: {formatTime(transcript.progress)}
            </a>
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

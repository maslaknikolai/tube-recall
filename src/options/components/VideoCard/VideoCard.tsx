import { Transcript } from '@/types/Transcript';
import { Card, CardDescription, CardHeader, CardTitle } from '@/options/components/ui/card';
import { Button } from '@/options/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { formatTime, formatDate } from '@/options/lib/formatUtils';
import { ToggleOpenButton } from './ToggleOpenButton';
import { Captions } from './Captions';
import { DeleteButton } from './DeleteButton';
import { useVideoCard, VideoCardProvider } from './VideoCardContext';
import { youtubeLink } from '@/options/lib/youtubeLink';

interface VideoCardProps {
  transcript: Transcript;
}

export const VideoCard = ({ transcript }: VideoCardProps) => {
  return (
    <VideoCardProvider transcript={transcript}>
      <VideoCardInner />
    </VideoCardProvider>
  )
}

export const VideoCardInner = () => {
  const { transcript, videoCardRef } = useVideoCard();

  return (
    <Card ref={videoCardRef}>
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
          <span className='text-sm'>
            {formatDate(transcript.watchedAt)}
          </span>

          <span>•</span>

          <span className='text-sm'>
            {formatTime(transcript.progress)} / {formatTime(transcript.videoDuration)}
          </span>
        </CardDescription>
      </CardHeader>

      <Captions />
    </Card>
  );
};

import { openVideoAtTime } from '@/options/lib/videoUtils';
import { Star, ExternalLink, StarOff } from 'lucide-react';
import { useVideoCard } from './VideoCardContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { cn } from '@/options/lib/utils';
import { Caption as CaptionType, StarredCaptions } from '@/types/VideoTranscript';
import { setTranscript } from '@/store/transcriptsStore';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/options/lib/queryKeys';
import { useState } from 'react';


export function Caption({ caption, }: { caption: CaptionType }) {
  const queryClient = useQueryClient();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { transcript } = useVideoCard();
  const isStared = transcript.starredCaptions[caption.id];

  console.log('WIPWIP', transcript.starredCaptions, caption.id);

  const toggleStarred = () => {
    const starredCaptions: StarredCaptions = {
      ...transcript.starredCaptions,
    };

    if (isStared) {
      delete starredCaptions[caption.id];
    } else {
      starredCaptions[caption.id] = true;
    }

    setTranscript({
      ...transcript,
      starredCaptions,
    });

    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transcripts });
    }, 100)
  }

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <span className={cn(
          "cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors rounded px-0.5",
          {
            'bg-yellow-100': isStared,
            'bg-primary text-secondary': isDropdownOpen,
          }
        )}>
          {caption.text}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => openVideoAtTime(transcript.videoId, caption.start)}>
          <ExternalLink />
          Open on YouTube
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => toggleStarred()}>
          {isStared ? <>
            <StarOff />
            Unstar Caption
          </> : <>
            <Star />
            Star Caption
          </>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

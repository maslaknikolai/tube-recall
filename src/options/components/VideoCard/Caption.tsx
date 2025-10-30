import { Star, ExternalLink, StarOff } from 'lucide-react';
import { useVideoCard } from './VideoCardContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { cn } from '@/options/lib/utils';
import { Caption as CaptionType, StarredCaptions } from '@/types/Transcript';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/options/lib/queryKeys';
import { useState } from 'react';
import { youtubeLink } from '@/options/lib/youtubeLink';
import { transcriptsStore } from '@/store/transcriptsStore';
import { useStore } from '@/options/hooks/use-store';


export function Caption({ caption, }: { caption: CaptionType }) {
  const queryClient = useQueryClient();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { transcript } = useVideoCard();
  const [transcripts, setTranscripts] = useStore(transcriptsStore)

  const isStared = transcript.starredCaptions[caption.id];

  const progressMs = Math.floor(transcript.progress * 1000)
  const isProgressHere = progressMs > caption.start && progressMs <= caption.end;

  const toggleStarred = () => {
    const starredCaptions: StarredCaptions = {
      ...transcript.starredCaptions,
    };

    if (isStared) {
      delete starredCaptions[caption.id];
    } else {
      starredCaptions[caption.id] = true;
    }

    setTranscripts({
      ...transcripts,
      [transcript.videoId]: {
        ...transcript,
        starredCaptions,
      }
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
            'bg-primary text-secondary': isDropdownOpen || isProgressHere,
          }
        )}>
          {caption.text}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <a
          href={youtubeLink(transcript.videoId, caption.start / 1000)}
          target="_blank"
        >
          <DropdownMenuItem>
            <ExternalLink />
            Open on YouTube
          </DropdownMenuItem>
        </a>

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

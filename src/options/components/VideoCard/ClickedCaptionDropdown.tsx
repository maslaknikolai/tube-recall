import { Star, ExternalLink, StarOff } from 'lucide-react';
import { useVideoCard } from './VideoCardContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Caption, StarredCaptions } from '@/types/Transcript';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/options/lib/queryKeys';
import { useState } from 'react';
import { youtubeLink } from '@/options/lib/youtubeLink';
import { transcriptsStore } from '@/store/transcriptsStore';
import { useStore } from '@/options/hooks/use-store';
import invariant from 'tiny-invariant';

export type ClickedCaptionData = {
  caption: Caption | null,
  click: {
    x: number;
    y: number;
  }
}

export const defaultClickedCaptionData: ClickedCaptionData = {
  caption: null,
  click: {
    x: 0,
    y: 0,
  }
}

export function ClickedCaptionDropdown({
  clickedCaptionData,
  setClickedCaption,
}: {
  clickedCaptionData: ClickedCaptionData;
  setClickedCaption: React.Dispatch<React.SetStateAction<ClickedCaptionData>>
}) {
  const queryClient = useQueryClient();

  const {transcript} = useVideoCard();
  const [transcripts, setTranscripts] = useStore(transcriptsStore)

  const isStared = clickedCaptionData.caption ? transcript.starredCaptions[clickedCaptionData.caption?.id] : false

  const toggleStarred = () => {
    invariant(clickedCaptionData.caption, 'No selected Caption ID');

    const starredCaptions: StarredCaptions = {
      ...transcript.starredCaptions,
    };

    if (isStared) {
      delete starredCaptions[clickedCaptionData.caption.id];
    } else {
      starredCaptions[clickedCaptionData.caption.id] = true;
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
    <DropdownMenu
      open={!!clickedCaptionData.caption}
      onOpenChange={(v) => {
        if (!v) {
          setClickedCaption(prev => ({
            ...prev,
            caption: null,
          }))
        }
      }}
    >
       <DropdownMenuTrigger asChild>
          <button
            style={{
              position: "fixed",
              width: 1,
              height: 1,
              opacity: 0,
              pointerEvents: "none",
              top: clickedCaptionData.click.y,
              left: clickedCaptionData.click.x,
            }}
          />
        </DropdownMenuTrigger>

      <DropdownMenuContent
        side="right"
        align="start"
      >
        <a
          href={youtubeLink(transcript.videoId, clickedCaptionData.caption ? clickedCaptionData.caption.start / 1000 : undefined)}
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

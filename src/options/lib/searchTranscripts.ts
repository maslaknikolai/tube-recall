import { SortState } from "../store/sort";
import { VideoTranscript } from "@/types/VideoTranscript";

export function searchTranscripts(transcripts: VideoTranscript[], searchQuery: string) {
  if (!searchQuery) {
    return transcripts;
  }

  const lowerCaseQuery = searchQuery.toLowerCase();

  return transcripts.reduce<VideoTranscript[]>((acc, transcript) => {
    const titleMatch = transcript.title?.toLowerCase().includes(lowerCaseQuery);
    const captions = transcript.captions

    const matchedCaptions = captions.filter(caption =>
      caption.text.toLowerCase().includes(lowerCaseQuery)
    );

    if (titleMatch || matchedCaptions.length > 0) {
      acc.push({
        ...transcript,
        captions: matchedCaptions,
      });
    }

    return acc;
  }, []);
}
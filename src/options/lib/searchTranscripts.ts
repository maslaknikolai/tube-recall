import { SortState } from "../store/sort";
import { VideoTranscript } from "@/types/VideoTranscript";

export function searchTranscripts(transcripts: VideoTranscript[], searchQuery: string) {
  if (!searchQuery) {
    return transcripts;
  }

  const lowerCaseQuery = searchQuery.toLowerCase();

  return transcripts
}
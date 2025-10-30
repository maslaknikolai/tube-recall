import { SortState } from "../store/sort";
import { Transcript } from "@/types/Transcript";

export function sortTranscripts(transcripts: Transcript[], sortState: SortState) {
  const sorted = [...transcripts];

  if (sortState.type === 'date') {
    sorted.sort((a, b) => {
      const dateA = a.watchedAt ?? 0;
      const dateB = b.watchedAt ?? 0;
      const diff = dateB - dateA;
      return sortState.direction === 'asc' ? -diff : diff;
    });
  } else if (sortState.type === 'duration') {
    sorted.sort((a, b) => {
      const durationA = a.videoDuration ?? 0;
      const durationB = b.videoDuration ?? 0;
      const diff = durationA - durationB;
      return sortState.direction === 'asc' ? diff : -diff;
    });
  }

  return sorted;
}
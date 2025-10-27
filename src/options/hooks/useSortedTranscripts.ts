import { useMemo } from "react";
import { sortAtom } from "../store/sort";
import { useAtom } from "jotai";
import { useTranscripts } from "./queries/useTranscripts";

export function useSortedTranscripts() {
    const { data: transcripts = [] } = useTranscripts();
    const [sortState] = useAtom(sortAtom);

    return useMemo(() => {
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
    }, [transcripts, sortState]);
}
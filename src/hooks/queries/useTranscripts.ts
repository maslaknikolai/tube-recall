import { useQuery } from '@tanstack/react-query';
import { getAllTranscripts } from '@/lib/transcriptsStore';
import { queryKeys } from '@/lib/queryKeys';

export const useTranscripts = () => {
  return useQuery({
    queryKey: queryKeys.transcripts,
    queryFn: async () => {
      const loadedTranscripts = await getAllTranscripts();
      console.log('TubeRecall: Loading transcripts', loadedTranscripts);
      return loadedTranscripts;
    },
  });
};

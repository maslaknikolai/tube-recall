import { useQuery } from '@tanstack/react-query';
import { getAllTranscripts } from '@/lib/transcriptsStore';

export const useTranscripts = () => {
  return useQuery({
    queryKey: ['transcripts'],
    queryFn: async () => {
      const loadedTranscripts = await getAllTranscripts();
      console.log('TubeRecall: Loading transcripts', loadedTranscripts);
      return loadedTranscripts;
    },
  });
};

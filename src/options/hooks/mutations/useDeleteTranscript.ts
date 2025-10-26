import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTranscript } from '@/store/transcriptsStore';
import { queryKeys } from '@/options/lib/queryKeys';

export const useDeleteTranscript = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (videoId: string) => deleteTranscript(videoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transcripts });
    },
  });
};

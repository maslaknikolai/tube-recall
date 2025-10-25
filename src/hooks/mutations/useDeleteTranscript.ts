import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTranscript } from '@/lib/transcriptsStore';
import { queryKeys } from '@/lib/queryKeys';

export const useDeleteTranscript = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (videoId: string) => deleteTranscript(videoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transcripts });
    },
  });
};

import { Button } from '@/options/components/ui/button';
import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { openedVideoIdsAtom } from '../store/opened-videos';
import { useTranscriptsQuery } from '../hooks/queries/useTranscripts';
import { CircleMinus, CirclePlus } from 'lucide-react';

export const ToggleOpenButton = () => {
  const { data: transcripts = [] } = useTranscriptsQuery();

  const [openedVideoIds, setOpenedVideoIds] = useAtom(openedVideoIdsAtom);

  const toggleIsAllOpened = () => {
    if (isAllOpened) {
      setOpenedVideoIds(new Set());
    } else {
      const allVideoIds = new Set(transcripts.map(it => it.videoId));
      setOpenedVideoIds(allVideoIds);
    }
  };

  const isAllOpened = useMemo(() => {
    return transcripts.length > 0 && transcripts.every(it => openedVideoIds.has(it.videoId))
  }, [transcripts, openedVideoIds]);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleIsAllOpened}
      disabled={transcripts.length === 0}
    >
      {isAllOpened ? (
        <>
          <CircleMinus />
          Close All
        </>
      ) : (
        <>
          <CirclePlus />
          Expand All
        </>
      )}
    </Button>
  );
};

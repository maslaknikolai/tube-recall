import { Button } from '@/options/components/ui/button';
import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { openedVideoIdsAtom } from '../store/opened-videos';
import { CircleMinus, CirclePlus } from 'lucide-react';
import { transcriptsStore } from '@/store/transcriptsStore';
import { useStore } from '../hooks/use-store';

export const ToggleOpenAllButton = () => {
  const [openedVideoIds, setOpenedVideoIds] = useAtom(openedVideoIdsAtom);
  const [transcripts] = useStore(transcriptsStore)
  const transcriptsArray = useMemo(() => Object.values(transcripts), [transcripts]);

  const toggleIsAllOpened = () => {
    if (isAllOpened) {
      setOpenedVideoIds(new Set());
    } else {
      const allVideoIds = new Set(Object.values(transcripts).map(it => it.videoId));
      setOpenedVideoIds(allVideoIds);
    }
  };

  const isAllOpened = useMemo(() => {
    return transcriptsArray.length > 0 && transcriptsArray.every(it => openedVideoIds.has(it.videoId))
  }, [transcriptsArray, openedVideoIds]);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleIsAllOpened}
      disabled={transcriptsArray.length === 0}
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

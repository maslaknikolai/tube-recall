import { createContext, useContext, useDeferredValue, useMemo } from 'react';

import { sortTranscripts } from './lib/sortTranscripts';
import { useAtom } from 'jotai';
import { sortAtom } from './store/sort';
import { searchTranscripts } from './lib/searchTranscripts';
import { searchQueryAtom } from './store/search';
import { filterByAtom } from './store/filter';
import { filterStarred } from './lib/filterStarred';
import { useStore } from './hooks/use-store';
import { transcriptsStore } from '@/store/transcriptsStore';

type AppContextValue = {
  proccessedTranscripts: ReturnType<typeof sortTranscripts>;
}

const context = createContext<AppContextValue>(null as unknown as AppContextValue);

export const AppProvider = ({children}: {children: React.ReactNode}) => {
  const [transcripts] = useStore(transcriptsStore)
  const transcriptsArray = useMemo(() => Object.values(transcripts), [transcripts]);

  const [sortState] = useAtom(sortAtom);
  const [starredFilter] = useAtom(filterByAtom);

  const [searchQuery] = useAtom(searchQueryAtom);
  const searchQueryDeferred = useDeferredValue(searchQuery);

  const proccessedTranscripts = useMemo(() => {
    const found = searchTranscripts(transcriptsArray, searchQueryDeferred)
    const filtered = filterStarred(found, starredFilter)
    const sorted = sortTranscripts(filtered, sortState)

    return sorted
  }, [sortState, transcripts, searchQueryDeferred, starredFilter])

  const value = useMemo(() => ({
    proccessedTranscripts
  }),[proccessedTranscripts])

  return (
    <context.Provider value={value}>
      {children}
    </context.Provider>
  );
};

export function useProcessedTranscripts() {
  const ctx = useContext(context);
  return ctx.proccessedTranscripts;
}

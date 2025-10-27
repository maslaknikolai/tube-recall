import { createContext, useContext, useDeferredValue, useMemo } from 'react';

import { useTranscriptsQuery } from './hooks/queries/useTranscripts';
import { sortTranscripts } from './lib/sortTranscripts';
import { useAtom } from 'jotai';
import { sortAtom } from './store/sort';
import { searchTranscripts } from './lib/searchTranscripts';
import { searchQueryAtom } from './store/search';

type AppContextValue = {
  proccessedTranscripts: ReturnType<typeof sortTranscripts>;
}

const context = createContext<AppContextValue>(null as unknown as AppContextValue);

export const AppProvider = ({children}: {children: React.ReactNode}) => {
  const { data: transcripts = [] } = useTranscriptsQuery();

  const [sortState] = useAtom(sortAtom);

  const [searchQuery] = useAtom(searchQueryAtom);
  const searchQueryDeferred = useDeferredValue(searchQuery);

  const proccessedTranscripts = useMemo(() => {
    const found = searchTranscripts(transcripts, searchQueryDeferred)
    const sorted = sortTranscripts(found, sortState)

    return sorted
  }, [sortState, transcripts, searchQueryDeferred])

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

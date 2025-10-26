import { atom } from 'jotai';

export interface SortState {
  type: 'date' | 'duration';
  direction: 'asc' | 'desc';
}

export const openedVideoIdsAtom = atom(new Set<string>());

export const sortStateAtom = atom<SortState>({
  type: 'date',
  direction: 'desc'
});

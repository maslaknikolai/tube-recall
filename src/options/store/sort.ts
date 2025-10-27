import { atom } from 'jotai';

export interface SortState {
  type: 'date' | 'duration';
  direction: 'asc' | 'desc';
}

export const sortAtom = atom<SortState>({
  type: 'date',
  direction: 'desc'
});

export type Filter = 'all' | 'starred';
export const filterByAtom = atom<Filter>('all');

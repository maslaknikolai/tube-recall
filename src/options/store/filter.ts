import { atom } from 'jotai';

export type StarredFilter = 'all' | 'starred';
export const filterByAtom = atom<StarredFilter>('all');
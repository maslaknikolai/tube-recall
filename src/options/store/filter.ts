import { atom } from 'jotai';

export type Filter = 'all' | 'starred';
export const filterByAtom = atom<Filter>('all');
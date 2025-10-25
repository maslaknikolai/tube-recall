import { atom } from 'jotai';

export const searchInputAtom = atom('');
export const activeSearchQueryAtom = atom('');
export const openedVideoIdsAtom = atom(new Set<string>());

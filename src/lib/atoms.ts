import { atom } from 'jotai';

export const openedVideoIdsAtom = atom(new Set<string>());

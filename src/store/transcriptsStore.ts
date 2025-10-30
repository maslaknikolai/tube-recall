import { createStore } from "./create-store";
import { BrowserStorageKeys } from "./browser-storage";
import { Transcript } from "@/types/Transcript";


export const transcriptsStore = createStore<Record<string, Transcript>>(
  {},
  BrowserStorageKeys.transcripts
);

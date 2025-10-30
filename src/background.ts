import browser from "webextension-polyfill";
import { ProgressPayload } from "./types/Progress";
import { transcriptsStore } from "./store/transcriptsStore";

console.log("Hello from the background!");

browser.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);

  if (details.reason === 'install') {
    browser.runtime.openOptionsPage();
  }
});

browser.action.onClicked.addListener(() => {
  browser.runtime.openOptionsPage();
});

browser.runtime.onMessage.addListener(async (message: any, _sender, sendResponse) => {
  if (message?.type !== 'video_progress') {
    return undefined;
  }

  const progressPayload = message.data as ProgressPayload

  const transcripts = transcriptsStore.get()
  const transcript = transcripts[progressPayload.videoId]

  if (
    !transcript
    || transcript.progress === progressPayload.progress
  ) {
    return
  }

  transcriptsStore.set({
    ...transcripts,
    [progressPayload.videoId]: {
      ...transcript,
      progress: progressPayload.progress,
      watchedAt: Date.now(),
    }
  })
});
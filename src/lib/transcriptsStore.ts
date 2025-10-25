import browser from "webextension-polyfill";
import { VideoTranscript } from "@/types/VideoTranscript";

const STORAGE_KEY = "videos";

async function getAllData(): Promise<Record<string, VideoTranscript>> {
  const result = await browser.storage.local.get(STORAGE_KEY);
  return result[STORAGE_KEY] || {};
}

async function setAllData(data: Record<string, VideoTranscript>): Promise<void> {
  await browser.storage.local.set({ [STORAGE_KEY]: data });
}

export async function getTranscript(videoId: string): Promise<VideoTranscript | undefined> {
  const data = await getAllData();
  return data[videoId];
}

export async function setTranscript(transcript: VideoTranscript): Promise<void> {
  const data = await getAllData();
  data[transcript.videoId] = transcript;
  await setAllData(data);
}

export async function deleteTranscript(videoId: string): Promise<void> {
  const data = await getAllData();
  delete data[videoId];
  await setAllData(data);
}

export async function getTranscriptKeys(): Promise<string[]> {
  const data = await getAllData();
  return Object.keys(data);
}

export async function getAllTranscripts(): Promise<VideoTranscript[]> {
  const data = await getAllData();
  return Object.values(data);
}

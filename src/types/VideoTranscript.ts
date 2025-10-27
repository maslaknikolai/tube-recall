export const DEFAULT_LANG = 'default' as const
export type Lang = string

export interface VideoTranscript {
  videoId: string;
  title: string;
  captions: Record<Lang, Caption[]>;
  videoDuration: number;
  watchedAt: number;
}

export interface Caption {
  start: number;
  end: number;
  text: string;
}

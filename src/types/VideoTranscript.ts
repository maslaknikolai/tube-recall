export const DEFAULT_LANG = 'default' as const
export type Lang = string

export type StarredCaptions = Record<string, boolean | undefined>

export interface VideoTranscript {
  videoId: string;
  title: string;
  captions: Record<Lang, Caption[]>;
  videoDuration: number;
  watchedAt: number;
  starredCaptions: StarredCaptions
}

export interface Caption {
  id: string
  start: number;
  end: number;
  text: string;
}

export type StarredCaption = {
  originalCaptionIndex: number,
  lang: Lang,
  caption: Caption[]
}
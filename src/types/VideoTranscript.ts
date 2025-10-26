export interface VideoTranscript {
  videoId: string;
  title: string;
  captions: Caption[];
  videoDuration: number;
  watchedAt: number;
}

export interface Caption {
  start: number;
  end: number;
  text: string;
}

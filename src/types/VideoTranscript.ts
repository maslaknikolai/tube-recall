export interface VideoTranscript {
  videoId: string;
  title: string;
  captions: Caption[];
  videoDuration?: number; // Video length in seconds
  watchedAt?: number; // Timestamp when video was watched
}

export interface Caption {
  start: number;
  end: number;
  text: string;
}

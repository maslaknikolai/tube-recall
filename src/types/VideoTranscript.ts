export interface VideoTranscript {
  videoId: string;
  title: string;
  captions: Caption[];
}

export interface Caption {
  start: number;
  end: number;
  text: string;
}

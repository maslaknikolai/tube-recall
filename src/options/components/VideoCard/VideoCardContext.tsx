import { createContext, useContext, ReactNode, useState } from 'react';
import type { VideoTranscript, Lang } from '@/types/VideoTranscript';

interface VideoCardContextValue {
  transcript: VideoTranscript;
  selectedLanguage: Lang;
  setSelectedLanguage: (lang: Lang) => void;
}

const VideoCardContext = createContext<VideoCardContextValue | undefined>(undefined);

export function useVideoCard() {
  const context = useContext(VideoCardContext);
  if (!context) {
    throw new Error('useVideoCard must be used within VideoCardProvider');
  }
  return context;
}

interface VideoCardProviderProps {
  children: ReactNode;
  transcript: VideoTranscript;
}

export function VideoCardProvider({ children, transcript }: VideoCardProviderProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Lang>(Object.keys(transcript.captions)[0]);

  return (
    <VideoCardContext.Provider value={{ transcript, selectedLanguage, setSelectedLanguage }}>
      {children}
    </VideoCardContext.Provider>
  );
}

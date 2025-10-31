import { createContext, useContext, ReactNode, useState, RefObject, useRef } from 'react';
import type { Transcript, Lang } from '@/types/Transcript';

interface VideoCardContextValue {
  transcript: Transcript;
  selectedLanguage: Lang;
  setSelectedLanguage: (lang: Lang) => void;
  videoCardRef: RefObject<HTMLDivElement>;
  captionsScrollableRef: RefObject<HTMLDivElement>;
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
  transcript: Transcript;
}

export function VideoCardProvider({ children, transcript }: VideoCardProviderProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Lang>(Object.keys(transcript.captions)[0]);
  const captionsScrollableRef = useRef<HTMLDivElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);

  return (
    <VideoCardContext.Provider value={{ transcript, selectedLanguage, setSelectedLanguage, videoCardRef, captionsScrollableRef }}>
      {children}
    </VideoCardContext.Provider>
  );
}

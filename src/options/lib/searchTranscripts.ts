import { SortState } from "../store/sort";
import { Caption, Lang, Transcript } from "@/types/Transcript";

export function searchTranscripts(transcripts: Transcript[], searchQuery: string) {
  if (!searchQuery) {
    return transcripts;
  }

  const lowerCaseQuery = searchQuery.toLowerCase();

  return transcripts.reduce<Transcript[]>((transcriptsAcc, transcript) => {
    const titleMatch = transcript.title?.toLowerCase().includes(lowerCaseQuery);

    const matchedLanguages = Object.entries(transcript.captions)
      .reduce<Record<Lang, Caption[]>>((captionsAcc, [langCode, captions]) => {
        const matchedCaptions = captions.reduce<Caption[]>((captionAcc, caption) => {
          if (caption.text.toLowerCase().includes(lowerCaseQuery)) {
            captionAcc.push(caption);
          }

          return captionAcc;
        }, []);

        if (matchedCaptions.length > 0) {
          captionsAcc[langCode] = matchedCaptions;
        }

        return captionsAcc;
      }, {});

    const hasMatchedCaptions = Object.keys(matchedLanguages).length > 0;

    if (titleMatch || hasMatchedCaptions) {
      transcriptsAcc.push({
        ...transcript,
        captions: hasMatchedCaptions ? matchedLanguages : transcript.captions,
      });
    }

    return transcriptsAcc;
  }, []);
}
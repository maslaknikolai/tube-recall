import { StarredFilter } from "../store/filter";
import { Caption, Lang, Transcript } from "@/types/Transcript";

export function filterStarred(transcripts: Transcript[], starredFilter: StarredFilter) {
  if (starredFilter === 'all') {
    return transcripts;
  }

  return transcripts.reduce<Transcript[]>((transcriptsAcc, transcript) => {
    const matchedLanguages = Object.entries(transcript.captions)
      .reduce<Record<Lang, Caption[]>>((captionsAcc, [langCode, captions]) => {
        const matchedCaptions = captions.reduce<Caption[]>((captionAcc, caption, index) => {
          if (transcript.starredCaptions[caption.id]) {
            captionAcc.push(caption);
          }

          return captionAcc;
        }, []);

        if (matchedCaptions.length > 0) {
          captionsAcc[langCode] = matchedCaptions;
        }

        return captionsAcc;
      }, {});

    console.log('WIPWIP', matchedLanguages);

    const hasMatchedCaptions = Object.keys(matchedLanguages).length > 0;

    if (hasMatchedCaptions) {
      transcriptsAcc.push({
        ...transcript,
        captions: hasMatchedCaptions ? matchedLanguages : transcript.captions,
      });
    }

    return transcriptsAcc;
  }, []);

}
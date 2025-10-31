import { TimedTextResponse } from "@/types/TimedTextResponse"
import { Caption, DEFAULT_LANG, Transcript } from "@/types/Transcript"
import { showSavedNotification } from "./showSavedNotification"
import { transcriptsStore } from "@/store/transcriptsStore"

export function listenForSubtitles() {
    window.addEventListener("message", async (event) => {
        const title = document.querySelector<HTMLElement>('#title.style-scope.ytd-watch-metadata')?.innerText.trim()

        if (
            location.pathname !== "/watch" || // captions may be requested from other pages as well
            !title || // ensure we are on a video page
            event.data?.type !== "XHR_CAPTURE"
        ) {
            return
        }

        const data = event.data as {
            type: "XHR_CAPTURE",
            url: string,
            body: string,
            ytInitialData: any
        }

        if (!data.url.includes('/api/timedtext')) {
            return
        }

        console.log('ytInitialData', data.ytInitialData);

        const parsedBody = (() => {
            try {
                return JSON.parse(data.body) as TimedTextResponse
            } catch {
                return null
            }
        })()

        const tlang = new URL(data.url).searchParams.get('tlang') || DEFAULT_LANG;

        if (!parsedBody) {
            console.warn('TubeRecall: Cannot parse timedtext response', data.body);
            return
        }

        try {
            const newCaptions = parsedBody.events.reduce<Caption[]>((acc, e, i) => {
                if (!e.segs) {
                    return acc;
                }

                const text = e.segs.map(s => s.utf8).join("").trim();

                if (text) {
                    acc.push({
                        id: `${tlang}-${i}`,
                        start: e.tStartMs,
                        end: e.tStartMs + (e.dDurationMs || 0),
                        text
                    });
                }
                return acc;
            }, []);

            const videoElement = document.querySelector('video.html5-main-video') as HTMLVideoElement;

            const videoId = new URL(data.url).searchParams.get('v');

            if (!videoId) {
                console.warn('TubeRecall: Cannot extract videoId from timedtext URL', data.url);
                return;
            }

            const transcripts = transcriptsStore.get()
            const savedTranscript = transcripts[videoId];

            const transcript: Transcript = {
                ...savedTranscript,
                videoId,
                title,
                captions: {
                    ...savedTranscript?.captions,
                    [tlang]: newCaptions
                },
                starredCaptions: savedTranscript?.starredCaptions || {},
                videoDuration: videoElement ? Math.floor(videoElement.duration) : 0,
                watchedAt: Date.now(),
                progress: 0,
            };

            transcriptsStore.set({
                ...transcripts,
                [videoId]: transcript
            });

            showSavedNotification();

            console.log('TubeRecall: saved subtitles', transcript, tlang, newCaptions);
        } catch (e) {
            console.warn('TubeRecall: Failed to extract captions', e);
        }
    })
}
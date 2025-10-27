import browser from "webextension-polyfill";
import { TimedTextResponse } from "./types/TimedTextResponse";
import { Caption, VideoTranscript } from "./types/VideoTranscript";
import { setTranscript, getTranscript } from "./store/transcriptsStore";

injectFetchRewrite()
listenForSubtitles()

function injectFetchRewrite() {
    const s = document.createElement("script");
    s.src = browser.runtime.getURL("rewrite-fetch.js");
    s.async = false;
    (document.head || document.documentElement).appendChild(s);
    s.remove();
}

function listenForSubtitles() {
    window.addEventListener("message", async (event) => {
        if (
            location.pathname !== "/watch" || // captions may be requested from other pages as well
            event.data?.type !== "XHR_CAPTURE"
        ) {
            return
        }

        const data = event.data as { type: "XHR_CAPTURE", url: string, body: string }

        if (!data.url.includes('/api/timedtext')) {
            return
        }

        const parsedBody = (() => {
            try {
                return JSON.parse(data.body) as TimedTextResponse
            } catch {
                return null
            }
        })()

        if (!parsedBody) {
            console.warn('TubeRecall: Cannot parse timedtext response', data.body);
            return
        }

        try {
            const captions = parsedBody.events.reduce<Caption[]>((acc, e) => {
                if (!e.segs) {
                    return acc;
                }

                const text = e.segs.map(s => s.utf8).join("").trim();

                if (text) {
                    acc.push({
                        start: e.tStartMs,
                        end: e.tStartMs + (e.dDurationMs || 0),
                        text
                    });
                }
                return acc;
            }, []);

            const videoElement = document.querySelector('video.html5-main-video') as HTMLVideoElement;

            const videoTranscript: VideoTranscript = {
                videoId: (() => {
                    const urlParams = new URLSearchParams(data.url.split('?')[1]);
                    return urlParams.get('v') || 'unknown';
                })(),
                title: document.title,
                captions,
                videoDuration: videoElement ? Math.floor(videoElement.duration) : 0,
                watchedAt: Date.now()
            };

            await setTranscript(videoTranscript);

            const video = await getTranscript(videoTranscript.videoId);

            showSavedNotification();

            console.log('TubeRecall: saved subtitles', video);
        } catch (e) {
            console.warn('TubeRecall: Failed to extract captions', e);
        }

    })
}

function showSavedNotification() {
    const el = document.createElement("div");
    el.textContent = "Transcript saved!";
    el.style.position = "fixed";
    el.style.top = "20px";
    el.style.right = "20px";
    el.style.padding = "10px 20px";
    el.style.backgroundColor = "red";
    el.style.color = "white";
    el.style.borderRadius = "5px";
    el.style.zIndex = "10000";
    document.body.appendChild(el);
    setTimeout(() => {
        el.remove();
    }, 3000);
}
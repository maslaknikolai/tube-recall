import browser from "webextension-polyfill";
import { TimedTextResponse } from "./types/TimedTextResponse";
import { Caption, VideoTranscript } from "./types/VideoTranscript";
import { KVDB } from "./lib/kvdb";

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
        if (event.data.type !== "XHR_CAPTURE") {
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
            console.warn('Cannot parse timedtext response', data.body);
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

            const videoTranscript: VideoTranscript = {
                videoId: (() => {
                    const urlParams = new URLSearchParams(data.url.split('?')[1]);
                    return urlParams.get('v') || 'unknown';
                })(),
                title: document.title,
                captions
            };

            const videosDB = new KVDB('videos');

            videosDB.set(videoTranscript.videoId, videoTranscript);

            const video = await videosDB.get(videoTranscript.videoId);
            console.log('WIPWIP', video);
        } catch (e) {
            console.warn('Failed to extract captions', e);
        }

    })
}
import { ProgressPayload } from "@/types/Progress";
import browser from "webextension-polyfill";

export function listenForProgress() {
    window.addEventListener("message", async (event) => {
        if (event.data?.type !== "VIDEO_PROGRESS") {
            return
        }

        const videoId = new URL(location.href).searchParams.get('v');

        if (!videoId) {
            console.warn('TubeRecall: No videoId');
            return;
        }

        browser.runtime.sendMessage({
            type: 'video_progress',
            data: {
                videoId,
                progress: event.data.progress,
            } satisfies ProgressPayload
        })
    })
}
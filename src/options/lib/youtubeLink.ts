export function youtubeLink(videoId: string, progress?: number) {
    let url = `https://www.youtube.com/watch?v=${videoId}`;
    if (progress && progress > 0) {
        url += `&t=${Math.floor(progress)}`;
    }
    return url;
}
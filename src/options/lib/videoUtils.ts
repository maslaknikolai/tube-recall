export const openVideoAtTime = (videoId: string, startTime?: number) => {
  const url = startTime !== undefined
    ? `https://www.youtube.com/watch?v=${videoId}&t=${Math.floor(startTime / 1000)}s`
    : `https://www.youtube.com/watch?v=${videoId}`;
  window.open(url, '_blank');
};

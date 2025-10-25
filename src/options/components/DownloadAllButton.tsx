import { Button } from '@/components/ui/button';
import { VideoTranscript } from '@/types/VideoTranscript';

interface DownloadAllButtonProps {
  transcripts: VideoTranscript[];
}

export const DownloadAllButton = ({ transcripts }: DownloadAllButtonProps) => {
  const handleDownloadAll = () => {
    const dataStr = JSON.stringify(transcripts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tube-recall-transcripts-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownloadAll}
      disabled={!transcripts.length}
    >
      Download All
    </Button>
  );
};

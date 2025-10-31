import { Button } from '@/options/components/ui/button';
import { Download } from 'lucide-react';
import { useProcessedTranscripts } from '../AppProvider';


export const DownloadAllButton = () => {
  const transcripts = useProcessedTranscripts()

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
      <Download />
      Download All
    </Button>
  );
};

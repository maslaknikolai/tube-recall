import { Button } from '@/options/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/options/components/ui/dropdown-menu';
import { Trash2, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useVideoCard } from './VideoCardContext';
import { useStore } from '@/options/hooks/use-store';
import { transcriptsStore } from '@/store/transcriptsStore';

export const DeleteButton = () => {
  const { transcript } = useVideoCard();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [transcripts, setTranscripts] = useStore(transcriptsStore)

  const handleDelete = () => {
    const a = {...transcripts}
    delete a[transcript.videoId];
    setTranscripts(a);

    setShowConfirmation(false);
  };

  return (
    <DropdownMenu open={showConfirmation} onOpenChange={setShowConfirmation}>
      <DropdownMenuTrigger>
        <Button variant="destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          className="flex items-center gap-2 text-destructive focus:text-destructive"
          onSelect={(e) => {
            e.preventDefault();
            handleDelete();
          }}
        >
          <AlertTriangle className="h-4 w-4" />
          <div className="flex flex-col">
            <span className="font-semibold">Delete transcript</span>
            <span className="text-xs text-muted-foreground">This action cannot be undone</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

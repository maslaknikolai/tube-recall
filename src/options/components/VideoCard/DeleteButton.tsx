import { Button } from '@/options/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/options/components/ui/dropdown-menu';
import { Trash2, AlertTriangle } from 'lucide-react';
import { useDeleteTranscript } from '@/options/hooks/mutations/useDeleteTranscript';
import { useState } from 'react';
import { useVideoCard } from './VideoCardContext';

export const DeleteButton = () => {
  const { transcript } = useVideoCard();
  const deleteMutation = useDeleteTranscript();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = () => {
    deleteMutation.mutate(transcript.videoId);
    setShowConfirmation(false);
  };

  return (
    <DropdownMenu open={showConfirmation} onOpenChange={setShowConfirmation}>
      <DropdownMenuTrigger>
        <Button
          variant="destructive"
          disabled={deleteMutation.isPending}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
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

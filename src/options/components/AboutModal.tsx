import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { BuyMeACoffeLink } from './BuyMeACoffeLink';

export const AboutModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          aria-label="About TubeRecall"
        >
          ?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>About TubeRecall</DialogTitle>
          <DialogDescription className="pt-4 space-y-4 text-left">
            <p>
              TubeRecall is a browser extension that automatically saves YouTube video transcripts 
              as you watch videos with captions enabled. It helps you keep track of the content 
              you've watched and makes it easy to search through and reference past videos.
            </p>
            <p>
              <strong>Key Features:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Automatic transcript capture from YouTube videos</li>
              <li>Search across all saved transcripts</li>
              <li>Star important videos for quick access</li>
              <li>Export transcripts for offline use</li>
              <li>Filter by language and sort by date</li>
            </ul>
            <p className="pt-2">
              Have ideas or feedback? Feel free to reach out at{' '}
              <a
                href="mailto:nikomaslak@gmail.com"
                className="text-primary hover:underline font-medium"
              >
                nikomaslak@gmail.com
              </a>
            </p>

            <BuyMeACoffeLink />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

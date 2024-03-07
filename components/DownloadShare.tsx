import downloadImage from "@/lib/downloadImage";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";

type ImageCardProps = {
  imageURL?: string;
  prompt: string;
  id: string;
};

export const DownloadShare: React.FC<ImageCardProps> = ({
  imageURL,
  prompt,
  id,
}) => {
  if (!imageURL) {
    return (
      <div>
        <p>Image URL not provided</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end gap-2 pt-2">
        <Button
          variant={"ghost"}
          size="icon"
          onClick={() => downloadImage(imageURL, prompt)}
          className="hidden md:flex md:justify-center md:bg-white/80"
        >
          <Download className="h-4 w-4" />
          <span className="sr-only">Download image</span>
        </Button>
        <Button
          variant={"ghost"}
          size="icon"
          onClick={() => {
            navigator.clipboard.writeText(`https://brickbloom.com/${id || ""}`);
            toast.success("Link copied to clipboard");
          }}
          className="bg-white/80"
        >
          <Copy className="h-4 w-4" />
          <span className="sr-only">Copy image link</span>
        </Button>
      </div>
    </>
  );
};

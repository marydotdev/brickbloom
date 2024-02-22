import Image from "next/image";
import downloadImage from "@/lib/downloadImage";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";

type ImageCardProps = {
  imageURL?: string;
  prompt: string;
  id: string;
};

export const ImageCard: React.FC<ImageCardProps> = ({
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
      <div className="relative max-w-md px-4 pt-4 pb-8 flex flex-col bg-white shadow-inner drop-shadow-xl">
        <Image
          alt={prompt}
          src={imageURL}
          width={480}
          height={480}
          className="h-full object-cover"
        />
        <div className="flex flex-col gap-4 pt-6">
          <p className="text-center text-lg h-12 balanced overflow-clip leading-snug">{prompt}</p>
          {/* <p className='text-center text-lg'>{time}</p> */}
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button
          variant={"ghost"}
          size="icon"
          onClick={() => downloadImage(imageURL, prompt)}
          className="bg-white/80"
        >
          <Download className="h-4 w-4" />
          <span className="sr-only">Download image</span>
        </Button>
        <Button
          variant={"ghost"}
          size="icon"
          onClick={() => {
            navigator.clipboard.writeText(
              `https://brickbloom.com/${id || ""}`
            );
            console.log("Link copied to clipboard");
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

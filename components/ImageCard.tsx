import Image from "next/image";

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
          <p className="uppercase font-protest font-bold text-center text-lg h-12 balanced overflow-clip leading-snug">{prompt}</p>
          {/* <p className='text-center text-lg'>{time}</p> */}
        </div>
      </div>

    </>
  );
};

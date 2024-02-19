import Image from "next/image";

type ImageCardProps = {
  imageURL?: string;
  prompt: string;
  time: string;
};

export const ImageCard: React.FC<ImageCardProps> = ({
  imageURL,
  time,
  prompt,
}) => {
  if (!imageURL) {
    return (
      <div>
        <p>Image URL not provided</p>
      </div>
    );
  }

  return (
    <div className="max-w-md px-4 pt-4 pb-8 flex flex-col bg-white shadow-inner drop-shadow-xl">
      <Image
        alt={prompt}
        src={imageURL}
        width={480}
        height={480}
        className="h-full object-cover"
      />
      <div className='flex flex-col gap-4 pt-4'>
        <p className='text-center text-lg'>{prompt}</p>
        {/* <p className='text-center text-lg'>{time}</p> */}
      </div>
    </div>
  );
};

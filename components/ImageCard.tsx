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
    <div className="max-w-md px-2 pt-4 pb-12 flex flex-col  bg-white shadow-inner drop-shadow-xl">
      <Image
        alt={prompt}
        src={imageURL}
        width={480}
        height={480}
        className="h-full object-cover"
      />
      <p className="font-caveat font-bold text-center pt-4 uppercase ">
        {prompt}
      </p>
      <p className="font-caveat font-bold text-center pt-4 uppercase ">
        {time}
      </p>
    </div>
  );
};

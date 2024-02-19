// import Image from "next/image";

// type LoadingImageProps = {
//   imageURL?: string;
//   prompt: string;
//   time: string;
// };

// export const LoadingImage: React.FC<LoadingImageProps> = ({
//   imageURL,
//   time,
//   prompt,
// }) => {
//   if (!imageURL) {
//     return (
//       <div>
//         <p>Image URL not provided</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-md px-4 pt-4 pb-8 flex flex-col bg-white shadow-inner drop-shadow-xl">
//       <Image
//         alt={prompt}
//         src={imageURL}
//         width={480}
//         height={480}
//         className="h-full object-cover"
//       />
//       <div className="flex flex-col gap-4 pt-4">
//         <p className="text-center text-lg">{prompt}</p>
//       </div>
//     </div>
//   );
// };

import { useState, useEffect } from "react";
import Image from "next/image";

export default function LoadingImage() {
  const items = [
    {
      key: "0hHdwLH",
      description: "a lego taylor swift sculpture",
    },
    {
      key: "2NKuGRl",
      description: "a lego fruit basket",
    },
    {
      key: "3lEdhRl",
      description: "a lego pizza",
    },
    {
      key: "Edski1u",
      description: "a lego taxi",
    },
    {
      key: "IhpM99Y",
      description: "a lego christmas tree",
    },
    {
      key: "LUmcEyM",
      description: "lego winter wonderland",
    },
    {
      key: "O6ctATM",
      description: "a lego horse",
    },
    {
      key: "SwHDM0s",
      description: "a lego coral reef",
    },
    {
      key: "T9NyCGp",
      description: "a lego Polaroid photo",
    },
    {
      key: "X93VfEI",
      description: "a lego portrait of the mona lisa",
    },
    {
      key: "XxsAoIM",
      description: "A lego anatomical heart",
    },
    {
      key: "obV2izq",
      description: "a lego swamp monster",
    },
    {
      key: "qJxE8uM",
      description: "a lego steampunk airship",
    },
    {
      key: "sy5h2qX",
      description: "a lego elf",
    },
  ];

  // Shuffle the items array
  items.sort(() => Math.random() - 0.5);

  // State to track the current index
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect hook to change the image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000); // Change image every 3 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [items.length]); // Empty dependency array means this effect runs only once after the initial render

  const currentItem = items[currentIndex];

  return (
    <div className="">
      <div
        key={currentItem.key}
        className="max-w-md px-4 pt-4 pb-8 flex flex-col bg-white shadow-inner drop-shadow-xl"
      >
        <Image
          alt={currentItem.description}
          src={`/gallery/${currentItem.key}.png`}
          width={480}
          height={480}
          className="h-full object-cover transition-all duration-300 ease-in-out"
        />
        <p className="font-caveat font-bold text-center uppercase truncate">
          {currentItem.description}
        </p>
      </div>
    </div>
  );
}


"use client"

import { useEffect, useState } from "react";
import { getUserId } from "@/lib/utils";
import { ImageCard } from "@/components/ImageCard";

type Image = {
  image_url: string;
  prompt: string;
};

const Gallery = () => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const userId = getUserId(); // Retrieve the userId
    const savedImages = JSON.parse(localStorage.getItem(userId) || "[]");
    setImages(savedImages);
    console.log(savedImages)
  }, []);

  return (
    <div className="relative max-w-screen-2xl mx-auto w-full justify-items-center px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
      {images.map((image, index) => (
        <div
          key={index}
          className="max-w-md px-2 py-4 flex flex-col gap-4 bg-white lg:hover:transform  lg:hover:scale-105 transition-all duration-100 ease-in-out"
        >
          <ImageCard imageURL={image.image_url} prompt={image.prompt} time={"0"} />
        </div>
      ))}
    </div>
  );
};

export default Gallery;

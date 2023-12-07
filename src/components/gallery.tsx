"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { Redis } from "@upstash/redis";

// const redis = Redis.fromEnv();

const redis = new Redis({
  url: 'https://us1-main-akita-40968.upstash.io',
  token: 'AaAIACQgZTljOGJiODEtZTVkZS00ZDcwLWE2ZjQtMjMwYjNiN2EwMTVhNTRiYmY5OGI5YjNjNGZmMmI4NTAyYWVmYWFmNWVlYmY=',
})


export default function Gallery() {
  const [images, setImages] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await redis.keys("*");
        const keys = data.filter(Boolean);

        if (!keys || keys.length === 0) {
          return; // Handle no data case
        }

        const fetchedImages = await Promise.all(
          keys.map(async (key) => {
            const type = await redis.type(key);
            if (type !== "hash") return null;
            return {
              key: key,
              data: await redis.hgetall(key),
            };
          })
        );

        const filteredImages = fetchedImages.filter(Boolean);
        const sortedImages = filteredImages.sort((a, b) => {
          return (b.data?.timestamp ?? 0) - (a.data?.timestamp ?? 0);
        });

        setImages(sortedImages);
      } catch (error) {
        console.error("Error fetching data from Redis:", error);
        // Handle error
      }
    }

    fetchData();
  }, []);

  if (!images) {
    return <p>Loading...</p>; // Or any other placeholder
  }

  return (
    <div className="relative px-4 w-full grid grid-cols-3 gap-4">
      {images.map((image) => (
        <div key={image.key} className="max-w-md">
          <p>{image.data?.prompt}</p>
          <Image
            alt="output image"
            src={image.data?.image}
            width={1280}
            height={1280}
            className="h-full object-cover"
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}

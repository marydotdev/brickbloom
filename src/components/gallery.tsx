"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { Redis } from "@upstash/redis";
import Link from 'next/link';

// const redis = Redis.fromEnv();

const redis = new Redis({
  url: 'https://us1-main-akita-40968.upstash.io',
  token: 'AaAIACQgZTljOGJiODEtZTVkZS00ZDcwLWE2ZjQtMjMwYjNiN2EwMTVhNTRiYmY5OGI5YjNjNGZmMmI4NTAyYWVmYWFmNWVlYmY=',
})


export default function Gallery() {
  const [images, setImages] = useState<({ key: string; data: Record<string, unknown> | null } | null)[]>([]);

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
          return (Number(b?.data?.timestamp) ?? 0) - (Number(a?.data?.timestamp) ?? 0);

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
    <div className="relative px-4 w-full grid grid-cols-4 gap-4">
      {images.map((image) => (
        <div key={image?.key} className="max-w-md px-2 pt-4 pb-12 flex flex-col gap-4 bg-white shadow-inner drop-shadow-xl hover:transform hover:rotate-3 hover:scale-105">
          <Link href={`/${image?.key}`}>
          <Image
            alt="output image"
            src={image?.data?.image as string}
            width={1280}
            height={1280}
            className="h-full object-cover"
            unoptimized
          />
          <p className='text-center pt-4'>{image?.data?.prompt as string}</p>

          </Link>
        </div>
      ))}
    </div>
  );
}

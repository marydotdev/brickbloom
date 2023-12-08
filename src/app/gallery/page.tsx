import { Redis } from "@upstash/redis";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const redis = Redis.fromEnv();

export default async function Results() {

  if (process.env.NODE_ENV !== "development") {
    notFound();
  }
  const keys = await redis.keys("");

  if (!keys) {
    notFound();
  }

  const images = await Promise.all(
    keys.map(async (key) => {
      return {
        key: key,
        data: await redis.hgetall(key),
      };
    })
  );

  return (


    <div className="relative px-4 lg:px-12 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
      {images.map((image) => (
        <div key={image?.key} className="max-w-md px-2 pt-4 pb-12 flex flex-col gap-4 bg-white shadow-inner drop-shadow-xl lg:hover:transform lg:hover:rotate-3 lg:hover:scale-105">
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

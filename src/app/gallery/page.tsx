import { Redis } from "@upstash/redis";
import { notFound } from "next/navigation";
import Image from "next/image";

const redis = Redis.fromEnv();

export default async function Results() {
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
    <div className="relative px-4 w-full grid grid-cols-3 gap-4">
      {images &&
        images.map((image) => (
          <div key={image.key} className="">
            <div className="max-w-md">
              <p>{image.data && String(image.data.prompt)}</p>
              <Image
                alt="output image"
                src={String(image.data?.image ?? "")}
                width={1280}
                height={1280}
                className="h-full object-cover"
                unoptimized
              />
            </div>
          </div>
        ))}
    </div>
  );
}

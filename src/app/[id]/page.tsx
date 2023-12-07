import { Redis } from "@upstash/redis";
import { notFound } from "next/navigation";
import FormRSC from "@/components/form-rsc";
import { Metadata } from "next";

const redis = Redis.fromEnv();

export async function generateMetadata({
  params,
}: {
  params: {
    id: string;
  };
}): Promise<Metadata | undefined> {
  const data = await redis.hgetall<{ prompt: string; image?: string }>(params.id);
  if (!data) {
    return;
  }

  const title = `Brickbloom: ${data.prompt}`;
  const description = `Generated with Brickbloom: ${data.prompt}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@marydotdev",
    },
  };
}

export default async function Results({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const data = await redis.hgetall<{
    prompt: string;
    pattern?: string;
    image?: string;
  }>(params.id);

  if (!data) {
    notFound();
  }
  return (
    <FormRSC
      prompt={data.prompt}
      {...(data?.pattern && { pattern: data.pattern })}
      image={data.image || null}
    />
  );
}

import { kv } from "@vercel/kv";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Body from "@/components/Body";
import AffiliateLinks from "@/components/AffiliateLinks";

async function getAllKv(id: string) {
  const data = await kv.hgetall<{
    prompt: string;
    image?: string;
    website_url?: string;
    model_latency?: string;
  }>(id);

  return data;
}

export async function generateMetadata({
  params,
}: {
  params: {
    id: string;
  };
}): Promise<Metadata | undefined> {
  const data = await getAllKv(params.id);
  if (!data) {
    return;
  }

  const title = `Brickbloom: ${data.prompt}`;
  const description = `Generate Lego inspired AI images`;
  const image = data.image || "https://brickbloom.com/opengraph-image.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
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
  const data = await getAllKv(params.id);
  if (!data) {
    notFound();
  }
  return (
    <>
      <Body
        prompt={data.prompt}
        imageUrl={data.image}
        redirectUrl={data.website_url}
        modelLatency={Number(data.model_latency)}
        id={params.id}
      />
      <AffiliateLinks />
    </>
  );
}

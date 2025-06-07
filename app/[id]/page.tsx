import { kv } from "@vercel/kv";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Body from "@/components/Body";
import AffiliateLinks from "@/components/AffiliateLinks";
import { AffiliateMarquee } from "@/components/AffiliateMarquee";

async function getAllKv(id: string) {
  try {
    // First try to get as hash (new format)
    const hashData = await kv.hgetall<{
      prompt: string;
      image_url?: string;
      model_latency_ms?: number;
      id?: string;
    }>(id);

    if (hashData && Object.keys(hashData).length > 0) {
      return hashData;
    }

    // If hash doesn't work, try to get as regular key (fallback for old format)
    const regularData = await kv.get<{
      prompt: string;
      image_url?: string;
      model_latency_ms?: number;
      id?: string;
    }>(id);

    if (regularData) {
      return regularData;
    }

    return null;
  } catch (error) {
    console.error("Error retrieving from KV:", error);

    // If there's a type error, the key might exist but be in wrong format
    // Try to clean it up and return null so the page shows not found
    try {
      await kv.del(id);
      console.log(`Cleaned up incorrectly formatted key: ${id}`);
    } catch (cleanupError) {
      console.error("Error cleaning up key:", cleanupError);
    }

    return null;
  }
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
    return {
      title: "Image Not Found - Brickbloom",
      description: "The requested image could not be found.",
    };
  }

  return {
    title: `${data.prompt} - Brickbloom`,
    description: `Generated LEGO image: ${data.prompt}`,
    openGraph: {
      title: `${data.prompt} - Brickbloom`,
      description: `Generated LEGO image: ${data.prompt}`,
      images: data.image_url ? [{ url: data.image_url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.prompt} - Brickbloom`,
      description: `Generated LEGO image: ${data.prompt}`,
      images: data.image_url ? [data.image_url] : [],
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

  const modelLatency = data.model_latency_ms;

  return (
    <>
      <Body
        imageUrl={data.image_url}
        prompt={data.prompt}
        redirectUrl={`/${params.id}`}
        modelLatency={modelLatency}
        id={params.id}
        promptValue={data.prompt}
      />
      <div className="block sm:hidden">
        <AffiliateLinks />
      </div>
      <div className="hidden sm:block">
        <AffiliateMarquee />
      </div>
    </>
  );
}

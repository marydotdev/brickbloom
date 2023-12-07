import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { Redis } from "@upstash/redis"

const redis = Redis.fromEnv();

export async function POST(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const id = searchParams.get("id") as string;

  // get output from Replicate
  const body = await req.json();
  const { output } = body;

  if (!output) {
    return new Response("Missing output", { status: 400 });
  }

  // convert output to a blob object
  const file = await fetch(output[0]).then((res) => res.blob());
  console.log("file", file);

  // upload & store in Vercel Blob
  const { url } = await put(`${id}.png`, file, { access: "public" });
  console.log("url uploaded", url);

  await redis.hset(id, { image: url, timestamp: Date.now() });

  return NextResponse.json({ ok: true });
}

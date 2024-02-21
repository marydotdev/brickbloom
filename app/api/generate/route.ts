import { replicateClient } from "@/lib/ReplicateClient";
import { GenerateRequest, GenerateResponse } from "@/lib/types";
import { NextRequest } from "next/server";
// import { Ratelimit } from '@upstash/ratelimit';
import { kv } from "@vercel/kv";
import { put } from "@vercel/blob";
import { nanoid } from "@/lib/utils";

export const maxDuration = 120; // This function can run for a maximum of 120 seconds

/**
 * Validates a request object.
 *
 * @param {GenerateRequest} request - The request object to be validated.
 * @throws {Error} Error message if URL or prompt is missing.
 */

const validateRequest = (request: GenerateRequest) => {
  if (!request.prompt) {
    throw new Error("Prompt is required");
  }
};

// const ratelimit = new Ratelimit({
//   redis: kv,
//   // Allow 20 requests from the same IP in 1 day.
//   limiter: Ratelimit.slidingWindow(20, '1 d'),
// });

export async function POST(request: NextRequest) {
  const reqBody = (await request.json()) as GenerateRequest;

  // const ip = request.ip ?? '127.0.0.1';
  // const { success } = await ratelimit.limit(ip);

  // if (!success && process.env.NODE_ENV !== 'development') {
  //   return new Response('Too many requests. Please try again after 24h.', {
  //     status: 429,
  //   });
  // }

  try {
    validateRequest(reqBody);
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message, { status: 400 });
    }
  }

  const id = nanoid();
  const startTime = performance.now();

  let imageUrl = await replicateClient.generateImage({
    prompt: `${reqBody.prompt} in the style of TOK`,
    negative_prompt: "blurry, low quality, nsfw, unrealistic",
  });

  const endTime = performance.now();
  const durationMS = endTime - startTime;

  // convert output to a blob object
  const file = await fetch(imageUrl).then((res) => res.blob());

  // upload & store in Vercel Blob
  const { url } = await put(`${id}.png`, file, { access: "public" });

  await kv.hset(id, {
    prompt: reqBody.prompt,
    image: url,
    website_url: "url",
    model_latency: Math.round(durationMS),
  });

  const response: GenerateResponse = {
    image_url: url,
    model_latency_ms: Math.round(durationMS),
    id: id,
    prompt: reqBody.prompt,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
  });
}

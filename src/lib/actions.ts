"use server";
import { Redis } from "@upstash/redis";
import { customAlphabet } from "nanoid";
import Replicate from "replicate";

const redis = Redis.fromEnv();

const sdxlVersion =
  "65e6fd1fd6dd3e59f7c0b26a4237819ce8d29d4bdbfcba9bcf5ab1aa362a2eb2";

const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://brickbloom.com/api/webhook"
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/webhook`
    : `${process.env.NGROK_URL}/api/webhook`;

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
);

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});

export async function generate(form: FormData) {
  const prompt = form.get("prompt") as string;

  const id = nanoid();
  console.log("id", id);
  console.log("prompt", prompt);

  const res = await Promise.all([
    redis.hset(id, { prompt: prompt }),
    replicate.predictions.create({
      version: sdxlVersion,
      input: {
        prompt: `${prompt} in the style of TOK`,
        negative_prompt: "blurry, low quality, nsfw, unrealistic",
        num_inference_steps: 10,
      },
      webhook: `${WEBHOOK_URL}?id=${id}`,
      webhook_events_filter: ["completed"],
    }),
  ]);

  console.log(res);

  return id;
}

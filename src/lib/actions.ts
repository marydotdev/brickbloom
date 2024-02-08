"use server";
import { Redis } from "@upstash/redis";
import { customAlphabet } from "nanoid";
import Replicate from "replicate";

const redis = Redis.fromEnv();

const sdxlVersion =
  "9ddc2c9883e658f1317fd39b4d150ff79376cc8e63421a97ab5d0d5d757e1ab6";

const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhook`
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
      },
      webhook: `${WEBHOOK_URL}?id=${id}`,
    }),
  ]);

  console.log(res);

  return id;
}

"use server";
import { Redis } from "@upstash/redis";
import { customAlphabet } from "nanoid";
import Replicate from "replicate";

const redis = Redis.fromEnv();

const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://brickbloom.com/api/webhook"
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/webhook`
    : `${process.env.NGROK_URL}/api/webhook`;

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
);

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});

export async function generate(form: FormData) {
  const prompt = form.get("prompt") as string;

  const id = nanoid();
  console.log("id", id);

  const res = await Promise.all([
    redis.hset(id, { prompt: prompt }),
    replicate.predictions.create({
      version:
        "9ddc2c9883e658f1317fd39b4d150ff79376cc8e63421a97ab5d0d5d757e1ab6",
      input: {
        prompt: prompt,
      },
      webhook: `${WEBHOOK_URL}?id=${id}`,
      webhook_events_filter: ["completed"],
    }),
  ]);

  console.log(res);

  return id;
}

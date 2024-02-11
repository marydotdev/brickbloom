// lib/actions.ts

"use server";
import { Redis } from "@upstash/redis";
import { customAlphabet } from "nanoid";
import Replicate from "replicate";
import { WEBHOOK_URL } from "./constants";

const redis = Redis.fromEnv();

// const sdxlVersion =
//   "9ddc2c9883e658f1317fd39b4d150ff79376cc8e63421a97ab5d0d5d757e1ab6";

const sdxlVersion =
  "3bcbe21f66f68d333dc449108a00da3c124882f806918408462dfad5006a0a70";

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
      webhook: `${WEBHOOK_URL}?id=${id}${
        process.env.REPLICATE_WEBHOOK_SECRET
          ? `&secret=${process.env.REPLICATE_WEBHOOK_SECRET}`
          : ""
      }`,
      webhook_events_filter: ["completed"],
    }),
  ]);

  console.log(res);

  return id;
}

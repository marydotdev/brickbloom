// import { NextResponse } from "next/server";
// import { put } from "@vercel/blob";
// import { Redis } from "@upstash/redis";

// const redis = Redis.fromEnv();

// export async function POST(req: Request) {
//   const searchParams = new URL(req.url).searchParams;
//   const id = searchParams.get("id") as string;

//   // get output from Replicate
//   const body = await req.json();
//   const { output } = body;
//   console.log("output", output);

//   if (!output) {
//     return new Response("Missing output", { status: 400 });
//   }

//   // convert output to a blob object
//   const file = await fetch(output[0]).then((res) => res.blob());
//   console.log("file", file);

//   // upload & store in Vercel Blob
//   const { url } = await put(`${id}.png`, file, { access: "public" });
//   console.log("url uploaded", url);

//   await redis.hset(id, { image: url, timestamp: Date.now() });

//   return NextResponse.json({ ok: true });
// }


import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function POST(req: Request) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const id = searchParams.get("id");
    console.log("Processing ID:", id);

    // Ensure ID is present
    if (!id) {
      console.error("ID is missing from the request URL.");
      return new Response("ID is missing", { status: 400 });
    }

    // Parse request body for output
    const body = await req.json();
    const { output } = body;

    console.log(body)

    // Validate output
    if (!output || output.length === 0) {
      console.error("Missing or empty output in the request body.");
      return new Response("Missing output", { status: 400 });
    }

    // Fetch image and convert to blob
    console.log("Fetching image from output URL:", output[0]);
    const file = await fetch(output[0]).then((res) => res.blob());
    console.log("Image fetched and converted to blob.");

    // Upload image to Vercel Blob
    console.log("Uploading image to Vercel Blob...");
    const { url } = await put(`${id}.png`, file, { access: "public" });
    console.log("Image uploaded to Vercel Blob:", url);

    // Store image URL and timestamp in Redis
    console.log("Storing image URL and timestamp in Redis...");
    await redis.hset(id, { image: url, timestamp: Date.now().toString() });
    console.log("Image URL and timestamp stored in Redis.");

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error during processing:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

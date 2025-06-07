import { replicateClient } from "@/lib/ReplicateClient";
import { GenerateRequest, GenerateResponse } from "@/lib/types";
import { NextRequest } from "next/server";
import { kv } from "@vercel/kv";
import { put } from "@vercel/blob";
import { nanoid } from "@/lib/utils";

export const maxDuration = 120; // This function can run for a maximum of 120 seconds

/**
 * Validates a request object.
 *
 * @param {GenerateRequest} request - The request object to be validated.
 * @throws {Error} Error message if prompt is missing.
 */
const validateRequest = (request: GenerateRequest) => {
  if (!request.prompt) {
    throw new Error("Prompt is required");
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const generateRequest: GenerateRequest = body;

    // Validate the request
    validateRequest(generateRequest);

    console.log("Generating image with prompt:", generateRequest.prompt);

    // Generate image using Replicate
    const startTime = Date.now();

    let imageUrl: string;
    try {
      imageUrl = await replicateClient.generateImage(generateRequest);
      console.log("Generated image URL:", imageUrl);
    } catch (replicateError) {
      console.error("Replicate generation error:", replicateError);
      return new Response(
        JSON.stringify({
          error: "Failed to generate image",
          details:
            replicateError instanceof Error
              ? replicateError.message
              : "Unknown error",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const endTime = Date.now();
    const modelLatency = endTime - startTime;

    if (!imageUrl) {
      return new Response(
        JSON.stringify({ error: "No image URL returned from model" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Fetch the image data
    let imageResponse: Response;
    try {
      imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) {
        throw new Error(
          `Failed to fetch image: ${imageResponse.status} ${imageResponse.statusText}`
        );
      }
    } catch (fetchError) {
      console.error("Error fetching generated image:", fetchError);
      return new Response(
        JSON.stringify({
          error: "Failed to fetch generated image",
          details:
            fetchError instanceof Error ? fetchError.message : "Unknown error",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Convert output to a blob object
    const imageBuffer = await imageResponse.arrayBuffer();
    const imageBlob = new Blob([imageBuffer], {
      type: imageResponse.headers.get("content-type") || "image/png",
    });

    // Generate unique ID
    const id = nanoid();

    // Upload & store in Vercel Blob
    let blobUrl: string;
    try {
      const blob = await put(`${id}.png`, imageBlob, {
        access: "public",
      });
      blobUrl = blob.url;
      console.log("Uploaded to Vercel Blob:", blobUrl);
    } catch (blobError) {
      console.error("Error uploading to Vercel Blob:", blobError);
      return new Response(
        JSON.stringify({
          error: "Failed to upload image",
          details:
            blobError instanceof Error ? blobError.message : "Unknown error",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Store metadata in KV using hset for hash structure
    try {
      await kv.hset(id, {
        image_url: blobUrl,
        prompt: generateRequest.prompt,
        model_latency_ms: modelLatency,
        id: id,
      });
    } catch (kvError) {
      console.error("Error storing in KV:", kvError);
      // Don't fail the request if KV storage fails, just log it
    }

    const response: GenerateResponse = {
      image_url: blobUrl,
      prompt: generateRequest.prompt,
      model_latency_ms: modelLatency,
      id: id,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Route handler error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

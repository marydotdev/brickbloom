import Replicate from "replicate";
import { ReplicateRequest, ReplicateResponse } from "./types";

export class ReplicateClient {
  replicate: Replicate;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("Replicate API key is required");
    }

    this.replicate = new Replicate({
      auth: apiKey,
    });
  }

  /**
   * Clean and optimize the user prompt for LEGO generation
   */
  private optimizePrompt(userPrompt: string): string {
    // Remove common LEGO-related words that we'll add back in a more structured way
    const legoWords = [
      "lego",
      "legos",
      "brick",
      "bricks",
      "building blocks",
      "plastic blocks",
    ];
    let cleanedPrompt = userPrompt.toLowerCase();

    // Remove LEGO-related words (case insensitive)
    legoWords.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      cleanedPrompt = cleanedPrompt.replace(regex, "").trim();
    });

    // Clean up extra spaces and normalize
    cleanedPrompt = cleanedPrompt.replace(/\s+/g, " ").trim();

    // If the cleaned prompt is empty, use the original
    if (!cleanedPrompt) {
      cleanedPrompt = userPrompt;
    }

    // Build the optimized prompt with better structure and style keywords
    const optimizedPrompt = [
      `LEGO brick model of ${cleanedPrompt},`,
      "made entirely of plastic LEGO building blocks,",
      "clean studio photography,",
      "white background,",
      "professional product photography,",
      "detailed brick texture and connections visible,",
      "bright even lighting,",
      "sharp focus,",
      "high resolution,",
      "vibrant colors",
    ].join(" ");

    return optimizedPrompt;
  }

  /**
   * Generate image using Flux model
   */
  generateImage = async (request: ReplicateRequest): Promise<string> => {
    try {
      const optimizedPrompt = this.optimizePrompt(request.prompt);
      console.log("Original prompt:", request.prompt);
      console.log("Optimized prompt:", optimizedPrompt);

      const output = await this.replicate.run(
        "black-forest-labs/flux-1.1-pro",
        {
          input: {
            prompt: optimizedPrompt,
            aspect_ratio: "1:1",
            output_format: "png",
            output_quality: 95, // Increased for better quality
            safety_tolerance: 2, // Allow more creative freedom
            prompt_upsampling: true, // Let Flux enhance the prompt
          },
        }
      );

      console.log("Raw Replicate output:", output);
      console.log("Output type:", typeof output);
      console.log("Is array:", Array.isArray(output));

      // Handle different possible output formats from Flux
      let imageUrl: string;

      if (typeof output === "string") {
        imageUrl = output;
      } else if (Array.isArray(output)) {
        if (output.length === 0) {
          throw new Error("Empty array received from Replicate model");
        }
        imageUrl = output[0];
      } else if (output && typeof output === "object" && "url" in output) {
        imageUrl = (output as any).url;
      } else if (output && typeof output === "object" && "image" in output) {
        imageUrl = (output as any).image;
      } else {
        console.error("Unexpected output format:", output);
        throw new Error(
          `Unexpected output format from Replicate: ${typeof output}`
        );
      }

      console.log("Extracted image URL:", imageUrl);

      if (!imageUrl || typeof imageUrl !== "string") {
        throw new Error(
          `Invalid image URL received from Replicate. Got: ${typeof imageUrl}, value: ${imageUrl}`
        );
      }

      // Validate URL
      try {
        new URL(imageUrl);
        console.log("URL validation passed");
      } catch (urlError) {
        console.error("URL validation failed:", urlError);
        throw new Error(`Invalid URL format received: ${imageUrl}`);
      }

      return imageUrl;
    } catch (error) {
      console.error("Error in generateImage:", error);
      if (error instanceof Error) {
        throw new Error(`Replicate generation failed: ${error.message}`);
      }
      throw new Error("Unknown error occurred during image generation");
    }
  };
}

// Initialize the client
const apiKey = process.env.REPLICATE_API_KEY;
if (!apiKey) {
  throw new Error("REPLICATE_API_KEY environment variable is not set");
}

export const replicateClient = new ReplicateClient(apiKey);

import Replicate from "replicate";
import { ReplicateRequest, ReplicateResponse } from "./types";

export class ReplicateClient {
  replicate: Replicate;

  constructor(apiKey: string) {
    this.replicate = new Replicate({
      auth: apiKey,
    });
  }

  /**
   * Generate image
   */
  // generateImage = async (request: ReplicateRequest): Promise<string> => {
  //   const output = (await this.replicate.run(
  //     "marydotdev/sdxl-lego:9ddc2c9883e658f1317fd39b4d150ff79376cc8e63421a97ab5d0d5d757e1ab6",
  //     {
  //       input: {
  //         prompt: request.prompt,
  //         negative_prompt: request.negative_prompt,
  //       },
  //     }
  //   )) as ReplicateResponse;

  //   if (!output) {
  //     throw new Error("Failed to generate QR code");
  //   }

  //   return output[0];
  // };

  // generateImage = async (request: ReplicateRequest): Promise<string> => {
  //   const output = (await this.replicate.run(
  //     "marydotdev/flex-lego:7a2b0fd5f1a8cdec8014820848584af41cd34476ab34ef2001481cd8ff447f92",
  //     {
  //       input: {
  //         prompt: request.prompt,
  //         negative_prompt: request.negative_prompt,
  //         model: "dev",
  //         lora_scale: 1,
  //         num_outputs: 1,
  //         aspect_ratio: "1:1",
  //         output_format: "webp",
  //         guidance_scale: 3.5,
  //         output_quality: 90,
  //         prompt_strength: 0.8,
  //         extra_lora_scale: 1,
  //         num_inference_steps: 28,
  //       },
  //     }
  //   )) as ReplicateResponse;

  //   if (!output) {
  //     throw new Error("Failed to generate QR code");
  //   }

  //   return output[0];
  // };

  generateImage = async (request: ReplicateRequest): Promise<string> => {
    const output = (await this.replicate.run(
      "marydotdev/brickbloom-flux:7a2b0fd5f1a8cdec8014820848584af41cd34476ab34ef2001481cd8ff447f92",
      {
        input: {
          prompt: request.prompt,
        },
      }
    )) as ReplicateResponse;

    if (!output) {
      throw new Error("Failed to generate QR code");
    }

    return output[0];
  };
}

const apiKey = process.env.REPLICATE_API_KEY;
if (!apiKey) {
  throw new Error("REPLICATE_API_KEY is not set");
}
export const replicateClient = new ReplicateClient(apiKey);

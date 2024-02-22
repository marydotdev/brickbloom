
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
  generateImage = async (request: ReplicateRequest): Promise<string> => {
    const output = (await this.replicate.run(
      "marydotdev/sdxl-lego:9ddc2c9883e658f1317fd39b4d150ff79376cc8e63421a97ab5d0d5d757e1ab6",
      {
        input: {
          prompt: request.prompt,
          negative_prompt: request.negative_prompt,
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

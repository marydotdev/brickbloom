export type ReplicateRequest = {
  prompt: string;
  negative_prompt?: string;
};

export type ReplicateResponse = [string];

export interface GenerateRequest {
  /**
   * Accompanying text prompt that will decide the style or theme of the code.
   */
  prompt: string;


}

export interface GenerateResponse {
  /**
   * URL of the image that was generated by the model.
   */
  image_url: string;

  /**
   * Prompt that was used to generate the image.
   */
  prompt: string;

  /**
   * Response latency in milliseconds.
   */
  model_latency_ms: number;

  /**
   * Unique ID of the QR code.
   * This ID can be used to retrieve the QR code image from the API.
   */
  id: string;
}
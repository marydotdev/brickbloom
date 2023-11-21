import { Configuration, OpenAIApi } from "openai";
import upsertPrediction from "../../../lib/upsertPrediction";
import MODELS from "../../../lib/models";
import packageData from "../../../package.json";
import fetch from "node-fetch";

const REPLICATE_API_HOST = "https://api.replicate.com";
const STABILITY_API_HOST = "https://api.stability.ai";

// const WEBHOOK_HOST = "https://brickbloom.vercel.app";
const WEBHOOK_HOST = process.env.NGROK_HOST

// const WEBHOOK_HOST = process.env.NEXT_PUBLIC_VERCEL_URL
//   ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
//   : process.env.NGROK_HOST;

// let WEBHOOK_HOST;

// if (process.env.NODE_ENV === 'production') {
//   WEBHOOK_HOST = `https://${process.env.VERCEL_URL}`;
// } else if (process.env.NODE_ENV === 'development') {
//   WEBHOOK_HOST = process.env.NGROK_HOST;
// }

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
    );
  }

  if (!WEBHOOK_HOST) {
    throw new Error(
      "WEBHOOK HOST is not set. If you're on local, make sure you set it to an ngrok url. If this doesn't exist, replicate predictions won't save to DB."
    );
  }

  const modelName = req.body.model;
  const modelObject = MODELS.filter((model) => model.name === modelName)[0];

  if (!modelObject) {
    throw new Error(`Model ${modelName} not found`);
  }

  if (req.body.source == "replicate") {
    console.log("host", WEBHOOK_HOST);

    const searchParams = new URLSearchParams({
      submission_id: req.body.submission_id,
      model: modelName,
      anon_id: req.body.anon_id,
      source: req.body.source,
    });
    // console.log("searchParams", searchParams.get("anon_id"));

    const input = req.body.input;
    const body = JSON.stringify({
      input: {
        prompt: req.body.prompt,
        ...modelObject.default_params,
        ...input,
      },
      version: modelObject.version,
      webhook: `${WEBHOOK_HOST}/api/replicate-webhook?${searchParams}`,
      webhook_events_filter: ["start", "completed"],
    });

    const headers = {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": `${packageData.name}/${packageData.version}`,
    };

    const response = await fetch(`${REPLICATE_API_HOST}/v1/predictions`, {
      method: "POST",
      headers,
      body,
    });

    if (response.status !== 201) {
      let error = await response.json();
      res.statusCode = 500;
      res.end(JSON.stringify({ detail: error.detail }));
      return;
    }

    const prediction = await response.json();

    res.statusCode = 201;
    res.end(JSON.stringify(prediction));
  } else if (req.body.source == "openai") {
    const response = await openai.createImage({
      prompt: req.body.prompt,
      ...modelObject.default_params,
    });

    const prediction = {
      id: req.body.id,
      status: "succeeded",
      version: "dall-e",
      output: [response.data.data[0].url],
      input: { prompt: req.body.prompt },
      model: modelName,
      inserted_at: new Date(),
      created_at: new Date(),
      submission_id: req.body.submission_id,
      source: modelObject.source,
      anon_id: req.body.anon_id,
    };

    await upsertPrediction(prediction);

    res.statusCode = 201;
    res.end(JSON.stringify(prediction));
  } else if (req.body.source == "stability") {
    const apiKey = process.env.STABILITY_API_KEY;
    if (!apiKey) throw new Error("Missing Stability API key.");

    const engineId = "stable-diffusion-xl-1024-v0-9";
    const seed = Math.floor(Math.random() * 1000000);
    const prompt = req.body.prompt;

    const response = await fetch(
      `${STABILITY_API_HOST}/v1/generation/${engineId}/text-to-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: prompt,
            },
          ],
          ...modelObject.default_params,
          seed,
        }),
      }
    );

    const responseJSON = await response.json();

    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`);
    }

    console.log(
      `data is ${JSON.stringify(Object.keys(responseJSON.artifacts[0]))}`
    );

    const prediction = {
      id: req.body.id,
      status: "succeeded",
      version: "stability",
      output: [responseJSON.artifacts[0].base64],
      input: { prompt: req.body.prompt },
      model: modelName,
      inserted_at: new Date(),
      created_at: new Date(),
      submission_id: req.body.submission_id,
      source: req.body.source,
      anon_id: req.body.anon_id,
      seed: seed,
    };
    await upsertPrediction(prediction);

    // ask charlie or jesse about this
    delete prediction.output;

    res.statusCode = 201;
    res.end(JSON.stringify(prediction));
  }
}

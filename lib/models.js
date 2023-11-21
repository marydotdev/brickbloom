/**
 * These are the models that are runnable on Zoo.
 * To add your own, add a model object to this array.
 * The ordering of these model objects matter — it determines the order in the UI!
 *
 * Each model object looks like this:
 *
 * {
    id: 101 (integer ID, must be unique otherwise you'll get weirdness),
    owner: "stability-ai", // model owner on Replicate
    name: "SDXL", // model name on Replicate
    default_params: { // default parameters used for running the model on Replicate
      width: 1024,
      height: 1024,
      scheduler: "K_EULER",
    },
    version: "98d6bab2dd21e4ffc4cc626420ab4f24b99ec60728c5d835ff9c3439396aca45", // Replicate version
    checked: true, // whether or no the model is checked by default in the UI
    source: "replicate", // source of the model, either "replicate" or "openai"
    url: "https://replicate.com/stability-ai/sdxl?utm_source=project&utm_campaign=zoo", // url to the model
    description:
      "A text-to-image generative AI model that creates beautiful 1024x1024 images",
    links: [
      {
        name: "replicate",
        url: "https://replicate.com/stability-ai/sdxl?utm_source=project&utm_campaign=zoo",
      },
      {
        name: "github",
        url: "https://github.com/Stability-AI/generative-models",
      },
    ],
  },
 *
 */
const MODELS = [
  // {
  //   id: 31,
  //   owner: "stability-ai",
  //   name: "SDXL",
  //   default_params: {
  //     width: 1024,
  //     height: 1024,
  //     scheduler: "K_EULER",
  //   },
  //   version: "98d6bab2dd21e4ffc4cc626420ab4f24b99ec60728c5d835ff9c3439396aca45",
  //   checked: false,
  //   source: "replicate",
  //   url: "https://replicate.com/stability-ai/sdxl?utm_source=project&utm_campaign=zoo",
  //   description:
  //     "A text-to-image generative AI model that creates beautiful 1024x1024 images",
  //   links: [
  //     {
  //       name: "replicate",
  //       url: "https://replicate.com/stability-ai/sdxl?utm_source=project&utm_campaign=zoo",
  //     },
  //     {
  //       name: "github",
  //       url: "https://github.com/Stability-AI/generative-models",
  //     },
  //   ],
  // },

  {
    id: 4,
    owner: "marydotdev",
    name: "sdxl-lego",
    default_params: {
      image_dimensions: "512x512",
    },
    version: "9ddc2c9883e658f1317fd39b4d150ff79376cc8e63421a97ab5d0d5d757e1ab6",
    checked: true,
    description: "sdxl lego",
    url: "https://replicate.com/marydotdev/sdxl-lego",
    links: [
      {
        name: "replicate",
        url: "https://replicate.com/marydotdev/sdxl-lego",
      },
    ],
    source: "replicate",
  },
  // {
  //   id: 10,
  //   owner: "marydotdev",
  //   name: "sdxl-legomovie",
  //   version: "e2c88551d2e60ca34df0d2e0f0bab1fb39ed88787aeae0a28c652a991d659180",
  //   checked: false,
  //   description: "sdxl lego movie",
  //   url: "hhttps://replicate.com/marydotdev/sdxl-legomovie",
  //   source: "replicate",
  //   links: [
  //     {
  //       name: "replicate",
  //       url: "https://replicate.com/marydotdev/sdxl-legomovie",
  //     },
  //   ],
  // },
  // {
  //   id: 5,
  //   owner: "marydotdev",
  //   name: "sdxl-wg",
  //   default_params: {
  //     image_dimensions: "512x512",
  //   },
  //   version: "bdedc8500d3befc66529463dd9d576a5edd260d1249bd36201b4d5dc40ed29c3",
  //   checked: false,
  //   description: "sdxl wallace and gromit",
  //   url: "https://replicate.com/marydotdev/sdxl-wg/versions",
  //   links: [
  //     {
  //       name: "replicate",
  //       url: "https://replicate.com/marydotdev/sdxl-wg/versions",
  //     },
  //   ],
  //   source: "replicate",
  // },
];

export default MODELS;

export const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://brickbloom.com/api/webhook"
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/webhook`
    : `${process.env.NGROK_URL}/api/webhook`;

export const AFFILIATE_LINKS = [
  {
    title: "Lego Icons Orchid",
    url: "https://amzn.to/488uvKF",
    image: "/lego-orchid.jpg",
  },
  {
    title: "Lego Icons Succulents",
    url: "https://amzn.to/4acBaoL",
    image: "/lego-succulents.jpg",
  },
  {
    title: "Lego Icons Bonsai",
    url: "https://amzn.to/3Torq4O",
    image: "/lego-bonsai.jpg",
  },
  {
    title: "Lego Ideas Insect Collection",
    url: "https://amzn.to/3NeZdJR",
    image: "/lego-insects.jpg",
  },
  {
    title: "Lego Icons Flower Bouquet",
    url: "https://amzn.to/41ekn0x",
    image: "/lego-bouquet.jpg",
  },
  {
    title: "Lego Architecture Himeji Castle",
    url: "https://amzn.to/41cWOFm",
    image: "/lego-himeji-castle.jpg",
  },
];

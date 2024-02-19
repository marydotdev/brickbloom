/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbxt.replicate.delivery",
      },
      {
        protocol: "https",
        hostname: "rslyfbnpbdbystdg.public.blob.vercel-storage.com",
      },
    ],
  },
};

module.exports = nextConfig;

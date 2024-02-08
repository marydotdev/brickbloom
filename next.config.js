/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "a6ar4ev9eff2kzqs.public.blob.vercel-storage.com",
      "replicate.delivery",
    ],
  },
};

module.exports = nextConfig;

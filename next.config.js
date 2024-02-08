/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "replicate.com",
        "*.replicate.com",
        "api.replicate.com",
        "replicate.delivery",
      ],
    },
  },
  images: {
    domains: [
      "a6ar4ev9eff2kzqs.public.blob.vercel-storage.com",
      "replicate.delivery",
    ],
  },
};

module.exports = nextConfig;

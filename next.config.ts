import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Matches any domain
      },
      {
        protocol: 'http',
        hostname: '**', // Matches any domain
      }
    ],
  },
};

export default nextConfig;

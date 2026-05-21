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
      },
    ],
    unoptimized: true, // Disable Next.js's built-in image optimization
  },
};

export default nextConfig;

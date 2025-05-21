import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https', // or 'http' if applicable
        hostname: 'coin-images.coingecko.com',
        port: '', // Leave empty if no specific port
        pathname: '/coins/images/**', // This allows all paths under images for this host
      },
    ],
  },
};

export default nextConfig;
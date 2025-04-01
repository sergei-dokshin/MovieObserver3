import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'robohash.org',
        protocol: 'https'
      },
      {
        hostname: 'images.unsplash.com',
        protocol: 'https'
      }
    ]
  }
};

export default nextConfig;

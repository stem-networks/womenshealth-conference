import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/brochure',       // your Next.js route
        destination: 'https://api.stem-cms.com',  // external API endpoint
      },
      {
        source: '/api/register',
        destination: 'https://api.stem-cms.com/',
      },
    ];
  },
};

export default nextConfig;

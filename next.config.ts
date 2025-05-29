import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },

  async rewrites() {
    return [
      {
        source: "/api/brochure", // your Next.js route
        destination: "https://api.stem-cms.com", // external API endpoint
      },
      {
        source: "/api/register",
        destination: "https://api.stem-cms.com/",
      },
    ];
  },
};

export default nextConfig;

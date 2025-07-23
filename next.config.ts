import type { NextConfig } from "next";
import path from "path";
 
const nextConfig: NextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
 
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
 
  async rewrites() {
    return [
      {
        source: "/api/brochure",
        destination: "https://api.stem-cms.com",
      },
    ];
  },
};
 
export default nextConfig;
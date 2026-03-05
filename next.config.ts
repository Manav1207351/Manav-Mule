import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Manav-Mule",
  assetPrefix: "/Manav-Mule/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

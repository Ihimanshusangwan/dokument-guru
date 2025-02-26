import type { NextConfig } from "next";
const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  output: "export",
  distDir: isDev ? "/build" : "../backend/public/build/",
  basePath: isDev ? "" : "/build",
  assetPrefix: isDev ? "" : "/build/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

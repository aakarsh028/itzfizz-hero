import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repo = "itzfizz-hero"; // must match your GitHub repo name

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  images: { unoptimized: true },
};

export default nextConfig;
import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
const repo = "cutculture";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isGithubActions ? `/${repo}` : "",
};

export default nextConfig;

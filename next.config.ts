import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  optimizePackageImports: ["@chakra-ui/react"],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

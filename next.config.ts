import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enable React compiler for better performance in future
    // reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
};

export default nextConfig;

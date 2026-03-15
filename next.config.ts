import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Provide a build-time fallback so Next.js can prerender pages (e.g. /_not-found)
  // without a real Clerk key in the CI environment.
  // The fallback value decodes to "example.clerk.accounts.dev$" — it is Clerk's
  // own example key from their documentation and is NOT a real credential.
  // The actual key is set via deployment environment variables (e.g. Vercel settings).
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ??
      "pk_test_ZXhhbXBsZS5jbGVyay5hY2NvdW50cy5kZXYk", // example.clerk.accounts.dev$
  },
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

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "izlkllquyctjzyqgkrkx.supabase.co",
      },
      {
        protocol: "https",
        hostname: "**",
      }
    ],
  },
};

export default nextConfig;

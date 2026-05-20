import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/loiseau/:path*",
        destination: "http://localhost:5173/api/public/v1/:path*",
      },
    ];
  },
};

export default nextConfig;

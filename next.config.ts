import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Using Pages Router (/pages directory)
  // Note: /src/app is FSD infrastructure layer, not App Router
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/diary",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

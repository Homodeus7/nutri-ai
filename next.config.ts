/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Ignore ESLint during production builds (run in CI/locally instead)
    ignoreDuringBuilds: true,
  },
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/board",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

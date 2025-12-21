/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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

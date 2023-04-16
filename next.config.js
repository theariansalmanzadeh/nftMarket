// /** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["gateway.pinata.cloud"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**gateway.pinata.cloud",
      },
    ],
  },
  distDir: "build",
};

// const withVideos = require("next-videos");

// module.exports = withVideos();

// module.exports = {};

module.exports = nextConfig;

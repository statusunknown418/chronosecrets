/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    /** For defer.run to work correctly */
    serverMinification: false,
  },
  images: {
    remotePatterns: [
      {
        hostname: "cdn.discordapp.com",
        protocol: "https",
      },
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
      },
      {
        hostname: "utfs.io",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;

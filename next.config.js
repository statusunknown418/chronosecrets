/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    /** For defer.run to work correctly */
    serverMinification: false,
  },
  images: {
    domains: ["cdn.discordapp.com", "lh3.googleusercontent.com", "utfs.io"],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
import withPlaiceholder from "@plaiceholder/next";

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

export default withPlaiceholder(nextConfig);

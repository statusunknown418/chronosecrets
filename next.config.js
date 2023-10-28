/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    /** For defer.run to work correctly */
    serverMinification: false,
  },
  async headers() {
    return [
      {
        source: "/api/ping",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET",
          },
          { key: "Access-Control-Allow-Credentials", value: "true" },
        ],
      },
    ];
  },
  images: {
    domains: ["cdn.discordapp.com", "lh3.googleusercontent.com", "utfs.io"],
  },
};

module.exports = nextConfig;

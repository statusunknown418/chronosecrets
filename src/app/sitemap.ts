import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://chronosecrets.app",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://chronosecrets.app/auth/signin",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://chronosecrets.app/auth/bye",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: "https://chronosecrets.app/inbox",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://chronosecrets.app/secrets/new",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}

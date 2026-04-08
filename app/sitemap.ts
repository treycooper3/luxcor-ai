import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const seoPages = [
    "ai-services-florida",
    "ai-automation-space-coast",
    "ai-services-melbourne-florida",
    "ai-voice-agents",
    "ai-automation-contractors",
  ];

  return [
    {
      url: "https://luxcor.tech",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...seoPages.map((slug) => ({
      url: `https://luxcor.tech/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    {
      url: "https://luxcor.tech/index.md",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://luxcor.tech/llms.txt",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}

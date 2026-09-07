import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.url) return [];
  return ["/", "/work/sports-stories", "/work/lifestyle-films", "/work/freelance-work"].map((path, index) => ({ url: `${siteConfig.url}${path}`, changeFrequency: "monthly" as const, priority: index === 0 ? 1 : 0.8 }));
}

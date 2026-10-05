import type { MetadataRoute } from "next";

import { workCategories } from "@/data/portfolio";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.url) return [];
  return ["/", ...workCategories.map((category) => `/work/${category.slug}`)].map((path, index) => ({ url: `${siteConfig.url}${path}`, changeFrequency: "monthly" as const, priority: index === 0 ? 1 : 0.8 }));
}

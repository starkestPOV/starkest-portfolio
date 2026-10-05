import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CollectionPage } from "@/components/portfolio/collection-page";
import { workCategories } from "@/data/portfolio";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = workCategories.find((item) => item.slug === slug);
  if (!category) return {};
  const title = `${category.title} | ${siteConfig.brand}`;
  const url = `/work/${category.slug}`;
  const images = [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${siteConfig.brand} — ${siteConfig.name}` }];
  return {
    title: category.title,
    description: category.description,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "en_IN", title, description: category.description, url, siteName: siteConfig.brand, images },
    twitter: { card: "summary_large_image", title, description: category.description, images },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = workCategories.find((item) => item.slug === slug);
  if (!category) notFound();
  return <CollectionPage category={category} />;
}

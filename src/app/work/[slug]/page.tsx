import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CollectionGallery } from "@/components/portfolio/collection-gallery";
import { LifestylePage } from "@/components/portfolio/lifestyle-page";
import { collectionMediaGroups, workCategories } from "@/data/portfolio";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = workCategories.find((item) => item.slug === slug);
  return category ? { title: category.title, description: category.description } : {};
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = workCategories.find((item) => item.slug === slug);
  if (!category) notFound();
  if (category.slug === "lifestyle-films") return <LifestylePage category={category} />;
  const media = collectionMediaGroups[category.slug];
  const labels = category.slug === "sports-stories" ? { films: "Sports Films", visuals: "Sports Photography" } : { films: "Freelance Video", visuals: "Freelance Visuals" };
  return <main id="main-content" className="collection-page"><Link href="/#work" className="back-link">← Back to selected work</Link><p className="eyebrow">{category.number} / Collection</p><h1>{category.title}</h1><p className="collection-intro">{category.description}</p>{media.films.length > 0 && <section className="collection-media-section" aria-labelledby={`${category.slug}-films`}><h2 id={`${category.slug}-films`}>{labels.films}</h2><CollectionGallery media={media.films} type="films" /></section>}{media.visuals.length > 0 && <section className="collection-media-section" aria-labelledby={`${category.slug}-visuals`}><h2 id={`${category.slug}-visuals`}>{labels.visuals}</h2><CollectionGallery media={media.visuals} type="visuals" /></section>}</main>;
}

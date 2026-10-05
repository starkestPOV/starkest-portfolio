import Link from "next/link";

import { CollectionGallery } from "@/components/portfolio/collection-gallery";
import { collectionMediaGroups, type WorkCategory } from "@/data/portfolio";

export function CollectionPage({ category }: { category: WorkCategory }) {
  const media = collectionMediaGroups[category.slug];
  const featured = media.visuals.find((asset) => asset.src === category.featuredVisual);
  const visuals = media.visuals.filter((asset) => asset !== featured);

  return (
    <main id="main-content" className={`collection-page collection-page-${category.slug}`}>
      <Link href="/#work" className="back-link">← Back to selected work</Link>
      <p className="eyebrow">{category.number} / Collection</p>
      <h1>{category.title}</h1>
      <p className="collection-intro">{category.description}</p>
      {media.films.length > 0 && (
        <section className="collection-media-section" aria-labelledby={`${category.slug}-films`}>
          <div className="collection-section-heading">
            <h2 id={`${category.slug}-films`}>{category.labels.films}</h2>
            <p className="eyebrow">{String(media.films.length).padStart(2, "0")} films / Press play to watch</p>
          </div>
          <CollectionGallery media={media.films} type="films" />
        </section>
      )}
      {media.visuals.length > 0 && (
        <section className="collection-media-section" aria-labelledby={`${category.slug}-photography`}>
          <div className="collection-section-heading">
            <h2 id={`${category.slug}-photography`}>{category.labels.visuals}</h2>
            <p className="eyebrow">{String(media.visuals.length).padStart(2, "0")} {category.slug === "automotive" ? "photos / Selected frames" : "photographs"}</p>
          </div>
          <div className="collection-photo-sequence">
            {featured && <CollectionGallery media={[featured]} type="visuals" variant="featured" />}
            {visuals.length > 0 && <CollectionGallery media={visuals} type="visuals" variant={category.slug === "lifestyle" ? "editorial" : "gallery"} />}
          </div>
        </section>
      )}
    </main>
  );
}

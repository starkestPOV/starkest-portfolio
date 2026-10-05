import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { collectionCovers, workCategories } from "@/data/portfolio";

export function WorkSection() {
  return (
    <section className="work-section" id="work" aria-labelledby="work-title">
      <div className="section-heading"><p className="eyebrow">Selected frames & films</p><h2 id="work-title">SELECTED WORK</h2></div>
      <div className="category-grid">
        {workCategories.map((category) => (
          <Link className={`category-card category-${category.appearance} ${["automotive", "celebrities", "lifestyle"].includes(category.slug) ? "category-card-portrait" : ""}`} href={`/work/${category.slug}`} key={category.slug}>
            <div className="category-visual" aria-hidden="true"><Image src={collectionCovers[category.slug].kind === "image" ? collectionCovers[category.slug].src : collectionCovers[category.slug].poster!} alt="" fill sizes={category.slug === "freelance-work" ? "(max-width: 1100px) 100vw, 50vw" : category.slug === "lifestyle" ? "(max-width: 760px) 100vw, 50vw" : "(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"} /><span>{category.number}</span><i /></div>
            <div className="category-content">
              <p className="eyebrow">{category.number} / Collection</p>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <span className="category-link">Explore collection <ArrowUpRight size={17} /></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

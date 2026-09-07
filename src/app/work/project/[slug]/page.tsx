import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { portfolioProjects } from "@/data/portfolio";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioProjects.find((item) => item.slug === slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = portfolioProjects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <main id="main-content" className="collection-page"><Link href={`/work/${project.category}`} className="back-link">← Back to collection</Link><p className="eyebrow">{project.disciplines.join(" / ")}</p><h1>{project.title}</h1>{project.summary && <p className="collection-intro">{project.summary}</p>}{project.media.kind === "image" && <div className="project-media"><Image src={project.media.src} alt={project.media.alt} fill sizes="90vw" /></div>}</main>;
}

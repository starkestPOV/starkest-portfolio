"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { useEffect, useState } from "react";

import type { MediaAsset } from "@/data/portfolio";

export function CollectionGallery({ media, type, variant = "gallery" }: { media: readonly MediaAsset[]; type: "films" | "visuals"; variant?: "gallery" | "featured" }) {
  const [selected, setSelected] = useState<MediaAsset | null>(null);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <>
    <div className={`collection-gallery collection-gallery-${type} collection-gallery-${variant}`} aria-label={type === "films" ? "Film work" : "Photography and visual work"}>
      {media.map((asset) => (
        <article className={`collection-card collection-card-${asset.kind}`} key={asset.src} style={asset.kind === "image" ? { aspectRatio: `${asset.width}/${asset.height}` } : undefined}>
          {asset.kind === "image" ? (
            <button type="button" className="collection-image-button" onClick={() => setSelected(asset)} aria-label={`View ${asset.alt}`}><Image src={asset.src} alt={asset.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" /></button>
          ) : (
            <video controls playsInline preload="metadata" poster={asset.poster} aria-label={asset.alt}>
              <source src={asset.src} type="video/mp4" />
            </video>
          )}
          {asset.kind === "video" && <span className="video-badge" aria-hidden="true"><Play size={14} fill="currentColor" /></span>}
        </article>
      ))}
    </div>
    <AnimatePresence>{selected && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}><button type="button" className="lightbox-close" aria-label="Close image viewer" onClick={() => setSelected(null)}><X /></button><div className="lightbox-image" onClick={(event) => event.stopPropagation()}><Image src={selected.src} alt={selected.alt} fill sizes="90vw" /></div></motion.div>}</AnimatePresence>
    </>
  );
}

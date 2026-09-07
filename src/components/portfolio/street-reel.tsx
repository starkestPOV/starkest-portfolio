"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { streetImages, type MediaAsset } from "@/data/portfolio";

export function StreetReel() {
  const reduceMotion = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<MediaAsset | null>(null);
  const hasImages = streetImages.length > 0;
  const items = hasImages ? [...streetImages, ...streetImages] : [];

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const scrollBy = (direction: number) => track.current?.scrollBy({ left: direction * 320, behavior: "smooth" });

  return (
    <section className="street-section" aria-labelledby="street-title">
      <div className="street-heading"><div><p className="eyebrow">Ongoing visual archive</p><h2 id="street-title">STREET PHOTOGRAPHY</h2></div><div className="reel-controls"><button type="button" aria-label="Previous photographs" onClick={() => scrollBy(-1)}><ChevronLeft /></button><button type="button" aria-label="Next photographs" onClick={() => scrollBy(1)}><ChevronRight /></button></div></div>
      {hasImages ? (
        <div className="reel-window" ref={track} tabIndex={0} role="region" aria-label="Street photography reel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onPointerDown={() => setPaused(true)} onPointerUp={() => setPaused(false)} onPointerLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} onKeyDown={(event) => { if (event.key === "ArrowLeft") scrollBy(-1); if (event.key === "ArrowRight") scrollBy(1); }}>
          <motion.div className="reel-track" drag={reduceMotion ? false : "x"} dragConstraints={{ left: -6000, right: 0 }} animate={reduceMotion || paused ? undefined : { x: ["0%", "-50%"] }} transition={{ duration: 75, ease: "linear", repeat: Infinity }}>
            {items.map((image, index) => <button className="street-image" type="button" key={`${image.src}-${index}`} onClick={() => setSelected(image)} aria-label={`View ${image.alt}`}><Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 72vw, 360px" /></button>)}
          </motion.div>
        </div>
      ) : null}
      <AnimatePresence>{selected && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}><button type="button" className="lightbox-close" aria-label="Close image viewer" onClick={() => setSelected(null)}><X /></button><div className="lightbox-image" onClick={(event) => event.stopPropagation()}><Image src={selected.src} alt={selected.alt} fill sizes="90vw" /></div></motion.div>}</AnimatePresence>
    </section>
  );
}

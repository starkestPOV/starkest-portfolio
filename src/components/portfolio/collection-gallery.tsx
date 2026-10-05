"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { MediaAsset } from "@/data/portfolio";

function FilmCard({ asset, index }: { asset: MediaAsset; index: number }) {
  const [activated, setActivated] = useState(false);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const video = useRef<HTMLVideoElement>(null);

  const startPlayback = () => {
    const player = video.current;
    if (!player) return;

    setPlaybackError(null);
    setActivated(true);
    // Keep loading and play() in the user gesture, including on Safari. The mounted
    // player has no source until this click, so page load never fetches the film.
    player.src = asset.src;
    player.controls = true;
    player.load();
    void player.play().catch((error: unknown) => {
      console.warn(`Unable to start video: ${asset.src}`, error);
      setPlaybackError("Playback did not start. Try Play in the video controls.");
    });
    player.focus({ preventScroll: true });
  };

  return (
    <article className="film-card">
      <div className="film-frame">
        <video
          ref={video}
          controls={activated}
          playsInline
          preload="none"
          aria-label={asset.alt}
          aria-hidden={!activated}
          tabIndex={activated ? 0 : -1}
          onPlaying={() => setPlaybackError(null)}
          onError={() => setPlaybackError("This video could not be loaded. Open the video directly to retry.")}
        />
        {!activated && (
          <button type="button" className="film-poster" onClick={startPlayback} aria-label={`Play ${asset.title ?? asset.alt}`}>
            {asset.poster && <Image src={asset.poster} alt="" fill sizes="(max-width: 760px) 90vw, 40vw" />}
            <span className="film-play"><Play size={22} fill="currentColor" /></span>
          </button>
        )}
      </div>
      <div className="film-caption"><span className="eyebrow">{String(index + 1).padStart(2, "0")} / Film</span><h3>{asset.title ?? asset.alt}</h3></div>
      {playbackError && <p role="alert">{playbackError} <a href={asset.src}>Open video</a></p>}
    </article>
  );
}

export function CollectionGallery({ media, type, variant = "gallery" }: { media: readonly MediaAsset[]; type: "films" | "visuals"; variant?: "gallery" | "featured" | "editorial" }) {
  const [selected, setSelected] = useState<MediaAsset | null>(null);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <>
    <div className={`collection-gallery collection-gallery-${type} collection-gallery-${variant}`} aria-label={type === "films" ? "Film work" : "Photography and visual work"}>
      {media.map((asset, index) => asset.kind === "video" ? <FilmCard key={asset.src} asset={asset} index={index} /> : (
        <article className={`collection-card collection-card-${asset.kind}`} key={asset.src} style={asset.kind === "image" ? { aspectRatio: `${asset.width}/${asset.height}` } : undefined}>
          <button type="button" className="collection-image-button" onClick={() => setSelected(asset)} aria-label={`View ${asset.alt}`}><Image src={asset.src} alt={asset.alt} fill sizes={variant === "featured" ? "(max-width: 760px) 90vw, 760px" : variant === "editorial" ? "(max-width: 760px) 90vw, 40vw" : "(max-width: 760px) 90vw, (max-width: 900px) 40vw, 26vw"} /></button>
        </article>
      ))}
    </div>
    <AnimatePresence>{selected && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}><button type="button" className="lightbox-close" aria-label="Close image viewer" onClick={() => setSelected(null)}><X /></button><div className="lightbox-image" onClick={(event) => event.stopPropagation()}><Image src={selected.src} alt={selected.alt} fill sizes="90vw" /></div></motion.div>}</AnimatePresence>
    </>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { siteConfig } from "@/lib/site";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const rise = reduceMotion ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-grain" aria-hidden="true" />
      <motion.div className="hero-orbit" aria-hidden="true" animate={reduceMotion ? {} : { rotate: 360 }} transition={{ duration: 55, repeat: Infinity, ease: "linear" }} />
      <div className="hero-layout">
        <motion.div className="hero-copy" {...rise}>
          <p className="eyebrow">{siteConfig.brand}</p>
          <h1 id="hero-title">STARK&apos;S <span>CREATIVE</span> PORTFOLIO</h1>
          <div className="hero-footnote">
            <p>{siteConfig.role}</p>
            <p>{siteConfig.name}</p>
          </div>
        </motion.div>
        <motion.div className="hero-visual" initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.12 }}>
          <Image src="/images/hero/hero-stark.png" alt="Sinto Pallipadan Varghese" fill priority sizes="(max-width: 760px) 100vw, 42vw" />
          <span className="frame-mark frame-mark-a" />
          <span className="frame-mark frame-mark-b" />
        </motion.div>
      </div>
      <a className="scroll-cue" href="#work"><span /> Scroll to explore</a>
    </section>
  );
}

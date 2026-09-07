"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { navigation, siteConfig } from "@/lib/site";

export function Navigation() {
  const { scrollY } = useScroll();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => setIsScrolled(latest > 24));

  return (
    <motion.header
      className="site-nav"
      style={{
        backgroundColor: isScrolled ? "rgba(11, 13, 13, .88)" : "rgba(11, 13, 13, 0)",
      }}
    >
      <nav className="nav-inner" aria-label="Primary navigation">
        <Link className="brand" href="/" aria-label={`Go to ${siteConfig.brand} homepage`} onClick={() => setIsOpen(false)}>{siteConfig.brand}</Link>
        <div className="nav-links">
          {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </div>
        <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            {navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>{item.label}</a>)}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

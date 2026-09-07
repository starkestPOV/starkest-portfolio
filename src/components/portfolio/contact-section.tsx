import { ArrowUpRight } from "lucide-react";

import { siteConfig, socialLinks } from "@/lib/site";

export function ContactSection() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <p className="eyebrow">Available for collaborations</p>
      <h2 id="contact-title">LET&apos;S WORK<br />TOGETHER</h2>
      <p>Have a project in mind? Let&apos;s create something amazing together.</p>
      {siteConfig.email ? <a className="contact-cta" href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Project Inquiry — Starkest POV")}`} aria-label="Email Sinto Pallipadan Varghese about a project inquiry">Get in touch <ArrowUpRight size={20} /></a> : <span className="contact-cta is-disabled">Get in touch <ArrowUpRight size={20} /></span>}
      {socialLinks.length > 0 && <div className="social-links">{socialLinks.map((link) => <a key={link.label} href={link.href} aria-label={link.ariaLabel} {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{link.label}</a>)}</div>}
    </section>
  );
}

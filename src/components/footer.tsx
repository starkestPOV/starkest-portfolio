import { siteConfig, socialLinks } from "@/lib/site";

export function Footer() {
  return <footer className="footer"><span>{siteConfig.brand}</span><nav className="footer-social-links" aria-label="Social links">{socialLinks.map((link) => <a key={link.label} href={link.href} aria-label={link.ariaLabel} {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{link.label}</a>)}</nav><span>© {new Date().getFullYear()} {siteConfig.name}</span><span>{siteConfig.role}</span></footer>;
}

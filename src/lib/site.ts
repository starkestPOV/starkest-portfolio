export const siteConfig = {
  brand: "STARKEST POV",
  name: "Sinto Pallipadan Varghese",
  role: "Video Editor / Photographer / Creative",
  title: "STARKEST POV | Sinto Pallipadan Varghese | Video Editor & Photographer",
  description: "The portfolio of Sinto Pallipadan Varghese — video editor, photographer, and creative behind STARKEST POV.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "",
  email: "sintopv77@gmail.com",
} as const;

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const socialLinks = [
  { label: "YouTube", href: "http://www.youtube.com/@starkestpov", ariaLabel: "Visit Starkest POV on YouTube", external: true },
  { label: "Instagram", href: "https://www.instagram.com/starkest_pov", ariaLabel: "Visit Starkest POV on Instagram", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sinto-pv-8b5313247/", ariaLabel: "View Sinto Pallipadan Varghese on LinkedIn", external: true },
  { label: "Email", href: "mailto:sintopv77@gmail.com", ariaLabel: "Email Sinto Pallipadan Varghese", external: false },
] as const;

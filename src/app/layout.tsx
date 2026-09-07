import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { siteConfig } from "@/lib/site";

const metadataBase = new URL(siteConfig.url || "http://localhost:3000");

export const metadata: Metadata = {
  title: { default: siteConfig.title, template: `%s | ${siteConfig.brand}` },
  description: siteConfig.description,
  metadataBase,
  ...(siteConfig.url ? { alternates: { canonical: "/" } } : {}),
  applicationName: siteConfig.brand,
  keywords: ["Sinto Pallipadan Varghese", "Starkest POV", "video editor", "photographer", "sports photography", "automotive storytelling", "creative portfolio"],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.brand,
  category: "portfolio",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: { type: "website", locale: "en_IN", title: siteConfig.title, description: siteConfig.description, siteName: siteConfig.brand },
  twitter: { card: "summary_large_image", title: siteConfig.title, description: siteConfig.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

export const viewport: Viewport = { colorScheme: "dark", themeColor: "#0b0d0d", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><SmoothScroll><Navigation />{children}<Footer /></SmoothScroll></body></html>;
}

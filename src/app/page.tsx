import { AboutSection } from "@/components/portfolio/about-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { Hero } from "@/components/portfolio/hero";
import { StreetReel } from "@/components/portfolio/street-reel";
import { WorkSection } from "@/components/portfolio/work-section";

export default function HomePage() {
  return <main id="main-content" tabIndex={-1}><Hero /><WorkSection /><StreetReel /><AboutSection /><ContactSection /></main>;
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { siteConfig } from "@/lib/site";

const skills = ["Video Editing", "Photography", "Color Grading", "Freelance Work"];
const creativeFocus = ["Photography", "Sports Photography", "Sports Video", "Automotive", "Celebrities", "Lifestyle", "Freelance Creative Work", "Color Grading", "AI-Assisted Creative Workflows"];
const careerJourney = [
  { years: "2019 – 2020", company: "COLORHOUSE", role: "Graphic Designer / Video Editor", location: "Thrissur, Kerala", label: "Studio", description: "Worked in a professional studio handling photography and video editing. Edited photos and videos for client projects and studio productions, and assisted with shoots, lighting setups and post-production workflows." },
  { years: "2021 – 2022", company: "BANDIDOS PITSTOP", role: "Video Editor / Videographer", location: "Thrissur, Kerala", label: "Motorsports", description: "Worked with motorsport-focused content, shooting and editing promotional and branding videos for motorsport events and teams. Created social media content using video editing, color correction and audio sync." },
  { years: "2022 – 2023", company: "TAHAWAL IT SOLUTIONS", role: "Videographer / Graphic Designer", location: "Kochi, Kerala", label: "Agency", description: "Produced and edited promotional videos and social media content. Managed video shoots, camera setups and post-production workflows, while designing marketing graphics and visual assets for clients." },
  { years: "2023 – Present", company: "FREELANCE VIDEO EDITOR / CREATIVE", role: "Independent", location: "", label: "Freelance", description: "Edit promotional videos, social media content and cinematic work for different clients and creative projects." },
] as const;

export function AboutSection() {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? {} : { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 }, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } };

  return <section className="about-section" id="about" aria-labelledby="about-title">
    <div className="about-intro-grid">
      <div className="about-portrait"><Image src="/images/about/sinto-palipadan-varghese.jpg" alt="Sinto Pallipadan Varghese" fill sizes="(max-width: 760px) 100vw, 38vw" /></div>
      <div className="about-copy"><p className="eyebrow">About / {siteConfig.brand}</p><h2 id="about-title">SINTO PALLIPADAN VARGHESE</h2><p className="role-line">Video Editor / Photographer / Creative</p><p>Started as a freelance video editor, then expanded into sports photography and sports filmmaking before moving into lifestyle and automotive visual storytelling. Starkest POV is my creative portfolio and brand.</p><div className="skills" aria-label="Creative focus">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>
    </div>
    <motion.div className="career-journey" {...entrance}>
      <div className="career-heading"><p className="eyebrow">Professional path</p><h3>CAREER JOURNEY</h3></div>
      <ol className="career-timeline">{careerJourney.map((entry) => <li key={entry.years} className="career-entry"><p className="career-years">{entry.years}</p><span className="career-marker" aria-hidden="true" /><div className="career-detail"><h4>{entry.company}</h4><p className="career-role">{entry.role}</p>{entry.location && <p className="career-location">{entry.location}</p>}<p className="career-description">{entry.description}</p></div><span className="career-label">{entry.label}</span></li>)}</ol>
    </motion.div>
    <motion.div className="creative-evolution" {...entrance}><p className="eyebrow">Creative evolution</p><h3>ALWAYS CREATING</h3><p>My career began with editing and design, but over time my work expanded into photography, sports, automotive visuals and independent creative projects. I continue to learn, experiment and build visual stories across different formats.</p><div className="evolution-focus" aria-label="Expanded creative focus">{creativeFocus.map((focus) => <span key={focus}>{focus}</span>)}</div></motion.div>
  </section>;
}

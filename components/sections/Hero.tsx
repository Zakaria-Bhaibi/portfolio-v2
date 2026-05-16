"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { personalInfo, stats } from "@/lib/data";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";

// Both arrays have the same length and cycle at the same interval,
// so subject + object always form a coherent sentence pair.
const SUBJECTS = ["team",         "brand",      "startup",    "company",    "clients",    "business"];
const OBJECTS  = ["great design", "a website",  "clean code", "better UX",  "real impact", "great results"];
const CYCLE_MS = 2800;

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ delay: 0.1 });
        tl.from(".hero-badge",   { opacity: 0, y: -14, duration: 0.45, ease: "power2.out" })
          .from(".hero-heading", { opacity: 0, y: 48,  duration: 0.8,  ease: "power3.out" }, "-=0.15")
          .from(".hero-sub",     { opacity: 0, y: 20,  duration: 0.55, ease: "power2.out" }, "-=0.35")
          .from(".hero-cta",     { opacity: 0, y: 16,  duration: 0.45, ease: "power2.out", stagger: 0.1 }, "-=0.3")
          .from(".hero-stats",   { opacity: 0, y: 16,  duration: 0.45, ease: "power2.out" }, "-=0.2")
          .from(".hero-photo",   { opacity: 0, scale: 0.88, duration: 1, ease: "power3.out" }, 0.15)
          .from(".hero-tag",     {
            opacity: 0,
            x: (_i: number, el: Element) => el.classList.contains("tag-left") ? -20 : 20,
            duration: 0.45,
            ease: "power2.out",
            stagger: 0.12,
          }, "-=0.4");
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="home"
      className="relative min-h-screen flex items-center px-5 md:px-20 max-w-[1280px] mx-auto py-[120px] overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(192,193,255,0.18) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* ── Left column ── */}
        <div className="md:col-span-7 flex flex-col gap-7">

          {/* Available badge — clean, no dot */}
          <div className="hero-badge inline-flex items-center px-4 py-2 border border-tertiary/35 rounded w-fit">
            <span className="label-caps text-tertiary tracking-[0.18em]">Available for new opportunities</span>
          </div>

          {/* Main heading — three lines so the second animated word has its own full row */}
          <h1 className="hero-heading text-display-xl leading-[1.05]">
            {/* Line 1: Your [subject] */}
            <div className="flex items-baseline gap-[0.22em]">
              <span className="text-on-surface font-light flex-shrink-0">Your</span>
              <AnimatedTextCycle
                words={SUBJECTS}
                interval={CYCLE_MS}
                className="text-primary"
              />
            </div>
            {/* Line 2: deserves (static) */}
            <div>
              <span className="text-on-surface font-light">deserves</span>
            </div>
            {/* Line 3: [object]. — own full line, never fights the photo */}
            <div className="flex items-baseline gap-[0.12em]">
              <AnimatedTextCycle
                words={OBJECTS}
                interval={CYCLE_MS}
                className="gradient-text-teal italic"
              />
              <span className="text-on-surface flex-shrink-0">.</span>
            </div>
          </h1>

          {/* Bio */}
          <p className="hero-sub text-[18px] leading-[28px] text-on-surface-variant max-w-xl">
            {personalInfo.bio}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <motion.a
              href="#projects"
              className="hero-cta inline-flex items-center gap-2 bg-primary text-on-primary px-7 py-3.5 rounded text-code font-bold hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              View Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
            <motion.a
              href={personalInfo.cv}
              download
              className="hero-cta inline-flex items-center gap-2 border border-primary text-primary px-7 py-3.5 rounded text-code font-bold hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Download CV
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </motion.a>
          </div>

          {/* Stats */}
          <div className="hero-stats flex items-center pt-6 border-t border-white/10 mt-2">
            {stats.slice(0, 2).map((s, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col gap-0.5 pr-8">
                  <span className="text-headline-md text-on-surface font-bold">{s.value}</span>
                  <span className="label-caps text-on-surface-variant">{s.label}</span>
                </div>
                {i < 1 && <div className="w-px h-12 bg-white/10 mr-8" />}
              </div>
            ))}
          </div>
        </div>

        {/* ── Right column: Photo ── */}
        <div className="md:col-span-5 relative mt-10 md:mt-0">
          <motion.div
            className="hero-photo relative w-full aspect-square rounded-xl overflow-hidden border border-white/10 shadow-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
          >
            <Image
              src="/profile.png"
              alt="Zakaria Bhaibi"
              fill
              priority
              className="object-cover hover:scale-105 transition-transform duration-500"
              style={{ objectPosition: "50% 15%" }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
              style={{ background: "linear-gradient(to top, #0b1326 0%, transparent 100%)" }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

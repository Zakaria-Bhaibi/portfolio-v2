"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { experience } from "@/lib/data";

export default function Experience() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".exp-reveal", {
          scrollTrigger: { trigger: container.current, start: "top 78%" },
          opacity: 0, y: 40, duration: 0.75, ease: "power3.out", stagger: 0.1,
        });
        gsap.from(".exp-item", {
          scrollTrigger: { trigger: ".exp-list", start: "top 80%" },
          opacity: 0, x: -30, duration: 0.6, ease: "power3.out", stagger: 0.13,
        });
        // Animated vertical track line
        gsap.fromTo(
          ".exp-track",
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".exp-list",
              start: "top 70%",
              end: "bottom 25%",
              scrub: 1.5,
            },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="experience" className="px-5 md:px-20 max-w-[1280px] mx-auto py-[120px]">
      {/* Header */}
      <p className="exp-reveal label-caps text-primary mb-4">Career</p>
      <h2 className="exp-reveal text-headline-lg text-on-surface mb-4">
        Professional{" "}
        <span className="gradient-text-teal italic">Journey.</span>
      </h2>
      <p className="exp-reveal text-[18px] leading-[28px] text-on-surface-variant max-w-2xl mb-16">
        A chronological overview of my professional roles, responsibilities, and key achievements
        in full-stack web development.
      </p>

      {/* Timeline */}
      <div
        className="exp-list relative max-w-4xl"
        style={{ paddingLeft: "60px" }}
      >
        {/* Static grey track */}
        <div className="absolute left-[15px] top-4 bottom-0 w-[2px] bg-surface-variant" />
        {/* Animated coloured track overlay */}
        <div
          className="exp-track absolute left-[15px] top-4 bottom-0 w-[2px]"
          style={{ background: "linear-gradient(to bottom, var(--primary), var(--tertiary))" }}
        />

        <div className="space-y-8">
          {experience.map((job, i) => (
            <motion.div
              key={i}
              className="exp-item relative group"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Dot */}
              <div
                className={`absolute -left-[60px] top-5 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-300 ${
                  job.current
                    ? "bg-surface border-primary shadow-[0_0_14px_rgba(192,193,255,0.5)]"
                    : "bg-surface border-surface-variant group-hover:border-tertiary"
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    job.current ? "bg-primary" : "bg-surface-variant group-hover:bg-tertiary"
                  }`}
                />
              </div>
              {job.current && (
                <div className="absolute -left-[60px] top-5 w-8 h-8 rounded-full bg-primary/15 animate-ping" />
              )}

              {/* Card */}
              <div
                className={`border rounded-xl p-6 md:p-8 transition-colors duration-300 ${
                  job.current
                    ? "bg-surface-bright/30 backdrop-blur-md border-primary/40 hover:border-primary/60"
                    : "bg-surface-container-low border-white/5 hover:bg-surface-bright/20 hover:border-white/15"
                }`}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-5">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-headline-md text-on-surface">{job.company}</h3>
                      {job.current && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary text-[10px] font-mono tracking-wider">
                          <span className="w-1 h-1 rounded-full bg-tertiary animate-pulse" />
                          Current
                        </span>
                      )}
                    </div>
                    <div className={`text-[16px] font-medium mt-0.5 ${job.current ? "text-primary" : "text-tertiary"}`}>
                      {job.role}
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-surface-variant/50 border border-outline-variant/30 px-3 py-1 rounded self-start flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-on-surface-variant">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <span className="label-caps text-on-surface-variant">{job.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-5">
                  {job.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-start gap-3 text-[16px] leading-[24px] text-on-surface-variant">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className={`flex-shrink-0 mt-0.5 ${job.current ? "text-tertiary" : "text-on-surface-variant opacity-60"}`}>
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {job.website && (
                    <a
                      href={job.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-code text-primary hover:opacity-80 transition-opacity"
                    >
                      {job.website.replace("https://", "").replace(/\/$/, "")}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </a>
                  )}
                  <span className="text-code text-on-surface-variant bg-surface-container-lowest border border-surface-variant px-2 py-1 rounded">
                    {job.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

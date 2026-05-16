"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, useGSAP } from "@/lib/gsap";

// Dynamic import — Three.js cannot run on the server
const SkillGallery = dynamic(
  () =>
    import("@/components/ui/3d-skill-gallery").then((m) => ({
      default: m.SkillGallery,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[680px] flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted text-xs font-mono tracking-widest uppercase">
            Loading 3D Scene
          </p>
        </div>
      </div>
    ),
  }
);

export default function Skills() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".skills-label", {
          scrollTrigger: { trigger: container.current, start: "top 80%" },
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power3.out",
        });
        gsap.from(".skills-heading", {
          scrollTrigger: { trigger: container.current, start: "top 75%" },
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="skills">
      {/* Section header */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-20 pt-[120px] pb-10">
        <p className="skills-label label-caps text-primary mb-4">Stack</p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="skills-heading text-headline-lg text-on-surface">
            My <span className="gradient-text-teal italic">Tech Stack</span>
          </h2>
          <p className="text-[16px] leading-[24px] text-on-surface-variant max-w-xs">
            20 technologies — drag to orbit, click any card to explore.
          </p>
        </div>
      </div>

      {/* 3D Galaxy — constrained so page scroll isn't hijacked */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-20 pb-[120px]">
        <div className="rounded-xl overflow-hidden border border-white/10">
          <SkillGallery />
        </div>
      </div>
    </section>
  );
}
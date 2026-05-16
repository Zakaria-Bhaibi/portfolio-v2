"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { StaggerServices } from "@/components/ui/stagger-services";

export default function About() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".about-reveal", {
          scrollTrigger: { trigger: container.current, start: "top 78%" },
          opacity: 0, y: 40, duration: 0.75, ease: "power3.out", stagger: 0.1,
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="about" className="px-5 md:px-20 max-w-[1280px] mx-auto py-[120px]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div className="max-w-xl">
          <p className="about-reveal label-caps text-primary mb-4">Services</p>
          <h2 className="about-reveal text-headline-lg text-on-surface">What I Do</h2>
        </div>
        <p className="about-reveal text-[16px] leading-[24px] text-on-surface-variant max-w-md">
          Delivering end-to-end engineering solutions, from concept to deployment. I focus on writing clean,
          maintainable code that drives real business value.
        </p>
      </div>

      {/* Stagger services carousel */}
      <StaggerServices />
    </section>
  );
}

"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { PortfolioGallery } from "@/components/ui/portfolio-gallery";
import { projects, personalInfo } from "@/lib/data";

export default function Projects() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".projects-label", {
          scrollTrigger: { trigger: container.current, start: "top 80%" },
          opacity: 0, y: 20, duration: 0.5, ease: "power3.out",
        });
        gsap.from(".projects-gallery", {
          scrollTrigger: { trigger: container.current, start: "top 70%" },
          opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
        });
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} id="projects">
      {/* Section label — sits above the gallery card */}
      <div className="projects-label max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-0">
        <div className="flex items-center gap-3 mb-4">
          <span className="section-label gradient-text">04</span>
          <span className="w-8 h-px bg-border" />
          <span className="section-label text-muted">Projects</span>
        </div>
      </div>

      {/* Gallery */}
      <div className="projects-gallery">
        <PortfolioGallery
          sectionId="projects-gallery"
          title="Selected Work"
          archiveButton={{
            text: "View GitHub",
            href: personalInfo.social.github,
            external: true,
          }}
          images={projects}
          maxHeight={130}
          spacing="-space-x-64 md:-space-x-72"
        />
      </div>
    </div>
  );
}
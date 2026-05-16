"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

interface Props {
  children: React.ReactNode;
  index: number;
  background: string;
}

/**
 * Sticky card-stack that handles variable-height sections correctly.
 *
 * Architecture:
 *  ┌─ outerDiv  ─────────────────────────────────────────────────┐
 *  │  height = max(contentHeight, 100vh)                          │
 *  │  This is the "scroll budget" — the next section only enters  │
 *  │  after this div has been fully scrolled past.                │
 *  │                                                              │
 *  │  ┌─ stickyDiv  ───────────────────────────────────────────┐  │
 *  │  │  position: sticky  top: 0  height: 100vh               │  │
 *  │  │  overflow: hidden  ← keeps border-radius clean          │  │
 *  │  │                                                         │  │
 *  │  │  ┌─ contentDiv ─────────────────────────────────────┐  │  │
 *  │  │  │  height = natural (may exceed 100vh)              │  │  │
 *  │  │  │  GSAP scrolls this upward (y: 0 → -overflow)      │  │  │
 *  │  │  │  so the full content is visible before next card  │  │  │
 *  │  │  └──────────────────────────────────────────────────┘  │  │
 *  │  └─────────────────────────────────────────────────────────┘  │
 *  └──────────────────────────────────────────────────────────────┘
 *
 * scrollTrigger (content scroll): start="top top" end="+=${overflow}"
 * scrollTrigger (border-radius):  start="top bottom" end="top top"
 * Both use scrub — fully reversible with scroll-up.
 */
export default function SectionCard({ children, index, background }: Props) {
  const outerRef   = useRef<HTMLDivElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Measured content height → drives the outer div's height
  const [outerHeight, setOuterHeight] = useState<number>(0);

  useEffect(() => {
    function measure() {
      if (!contentRef.current) return;
      const ch = contentRef.current.scrollHeight;
      const vh = window.innerHeight;
      setOuterHeight(Math.max(ch, vh));
    }

    measure();

    // Re-measure if content changes (accordion open/close, 3D scene loads, etc.)
    const ro = new ResizeObserver(measure);
    if (contentRef.current) ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      if (!outerRef.current || !contentRef.current || !stickyRef.current) return;
      if (outerHeight === 0) return;

      const contentH = contentRef.current.scrollHeight;
      const vh       = window.innerHeight;
      const overflow = Math.max(0, contentH - vh);

      // ── Scroll content within the sticky card ──────────────────
      if (overflow > 0) {
        gsap.to(contentRef.current, {
          y: -overflow,
          ease: "none",
          scrollTrigger: {
            trigger:  outerRef.current,
            start:    "top top",
            end:      `+=${overflow}`,
            scrub:    true,
          },
        });
      }

      // ── Border-radius: 40px → 20px as card "lands" at top ──────
      if (index > 0) {
        gsap.fromTo(
          stickyRef.current,
          { borderRadius: "40px 40px 0 0" },
          {
            borderRadius: "20px 20px 0 0",
            ease: "none",
            scrollTrigger: {
              trigger: outerRef.current,
              start:   "top bottom",   // card enters from below
              end:     "top top",      // card reaches viewport top
              scrub:   true,
            },
          }
        );
      }

      ScrollTrigger.refresh();
    },
    { scope: outerRef, dependencies: [outerHeight] }
  );

  const isCard = index > 0;

  return (
    // Outer scroll-budget div — height keeps the next card at bay
    <div
      ref={outerRef}
      style={{ height: outerHeight > 0 ? `${outerHeight}px` : "100vh" }}
    >
      {/* Sticky viewport-height card */}
      <div
        ref={stickyRef}
        style={{
          position:        "sticky",
          top:             0,
          height:          "100vh",
          zIndex:          index + 1,
          backgroundColor: background,
          overflow:        "hidden",
          ...(isCard && {
            borderRadius: "20px 20px 0 0",
            boxShadow:    "0 -20px 60px rgba(0,0,0,0.65)",
          }),
        }}
      >
        {/* Scrollable content (translated by GSAP when taller than viewport) */}
        <div ref={contentRef}>
          {children}
        </div>
      </div>
    </div>
  );
}

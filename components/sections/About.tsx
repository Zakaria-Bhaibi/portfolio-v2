"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap, useGSAP } from "@/lib/gsap";

const SERVICES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    color: "text-primary",
    glow: "bg-primary/10",
    title: "Web & E-commerce",
    desc: "Building responsive, high-performance web apps and online stores — from custom-coded frontends to full Shopify store setups.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "WordPress", "Shopify"],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/>
      </svg>
    ),
    color: "text-secondary",
    glow: "bg-secondary/10",
    title: "Backend Architecture",
    desc: "Designing secure, scalable REST APIs with Python and Node.js. Database modeling and performance optimization for complex data systems.",
    tags: ["Node.js", "Python", "Django REST", "MySQL", "MongoDB"],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    color: "text-tertiary",
    glow: "bg-tertiary/10",
    title: "SEO & Paid Ads",
    desc: "Driving traffic and conversions through search optimisation and multi-platform ad campaigns — Meta, TikTok, Snapchat and Google.",
    tags: ["SEO", "Meta Ads", "TikTok Ads", "Snapchat Ads", "Google Ads", "Analytics"],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/>
      </svg>
    ),
    color: "text-primary",
    glow: "bg-primary/8",
    title: "Creative Tools",
    desc: "Producing polished visuals, short-form video content and branded assets — from static graphics to edited reels ready for any platform.",
    tags: ["Photoshop", "Canva", "CapCut", "Content Creation"],
  },
];

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
        gsap.from(".service-card", {
          scrollTrigger: { trigger: ".services-grid", start: "top 82%" },
          opacity: 0, y: 36, duration: 0.6, ease: "power3.out", stagger: 0.12,
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

      {/* Service cards grid */}
      <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map((svc, i) => (
          <motion.div
            key={i}
            className="service-card group bg-surface-container-low border border-white/10 rounded-xl p-8 hover:bg-surface-container transition-colors duration-300 relative overflow-hidden"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
          >
            {/* Corner glow on hover */}
            <div className={`absolute top-0 right-0 w-32 h-32 ${svc.glow} rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500`} />

            {/* Icon */}
            <div className={`w-14 h-14 bg-surface-bright rounded flex items-center justify-center mb-6 border border-white/10 ${svc.color}`}>
              {svc.icon}
            </div>

            <h3 className="text-headline-md text-on-surface mb-3">{svc.title}</h3>
            <p className="text-[16px] leading-[24px] text-on-surface-variant mb-6">{svc.desc}</p>

            <ul className="flex flex-wrap gap-2">
              {svc.tags.map((tag) => (
                <li key={tag} className="text-code text-on-surface-variant bg-surface border border-white/10 px-3 py-1 rounded">
                  {tag}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

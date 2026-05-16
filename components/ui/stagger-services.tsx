"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SQRT_5000 = Math.sqrt(5000);

/* ─── Service data ───────────────────────────────────────────── */

interface Service {
  id: number;
  icon: React.ReactNode;
  title: string;
  desc: string;
  tags: string[];
}

const BASE: Service[] = [
  {
    id: 0,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: "Web & E-commerce",
    desc: "Responsive, high-performance web apps and Shopify stores built with modern frameworks.",
    tags: ["React", "Next.js", "TypeScript", "WordPress", "Shopify"],
  },
  {
    id: 1,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/>
      </svg>
    ),
    title: "Backend Architecture",
    desc: "Secure, scalable REST APIs with Python and Node.js — optimised database design included.",
    tags: ["Node.js", "Python", "Django REST", "MySQL", "MongoDB"],
  },
  {
    id: 2,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: "SEO & Paid Ads",
    desc: "Multi-platform campaigns across Meta, TikTok, Snapchat and Google to drive real conversions.",
    tags: ["SEO", "Meta Ads", "TikTok Ads", "Snapchat Ads", "Google Ads"],
  },
  {
    id: 3,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    title: "Creative Tools",
    desc: "Polished visuals, branded assets and short-form video content ready for every platform.",
    tags: ["Photoshop", "Canva", "CapCut", "Content Creation"],
  },
];

// Repeat 3× so the stagger carousel always has plenty of cards to fan out
const SERVICES_POOL = [...BASE, ...BASE, ...BASE].map((s, i) => ({
  ...s,
  tempId: i,
}));

/* ─── Card ───────────────────────────────────────────────────── */

interface CardProps {
  position: number;
  service: (typeof SERVICES_POOL)[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const ServiceCard: React.FC<CardProps> = ({ position, service, handleMove, cardSize }) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className="absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 transition-all duration-500 ease-in-out select-none"
      style={{
        width:  cardSize,
        height: cardSize,
        clipPath: `polygon(40px 0%, calc(100% - 40px) 0%, 100% 40px, 100% 100%, calc(100% - 40px) 100%, 40px 100%, 0 100%, 0 0)`,
        backgroundColor: isCenter ? "#c0c1ff" : "#0f1729",
        borderColor:     isCenter ? "#c0c1ff" : "#464554",
        zIndex:          isCenter ? 10 : 0,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px #464554" : "0px 0px 0px 0px transparent",
      }}
    >
      {/* Cut-corner diagonal line */}
      <span
        className="absolute block origin-top-right rotate-45"
        style={{
          right: -2,
          top:   38,
          width: SQRT_5000,
          height: 2,
          backgroundColor: isCenter ? "rgba(16,0,169,0.35)" : "#464554",
        }}
      />

      {/* Icon box */}
      <div
        className="mb-4 w-11 h-11 flex items-center justify-center rounded"
        style={{
          backgroundColor: isCenter ? "rgba(16,0,169,0.12)" : "rgba(192,193,255,0.07)",
          border:          isCenter ? "1px solid rgba(16,0,169,0.2)"  : "1px solid rgba(255,255,255,0.08)",
          color:           isCenter ? "#1000a9" : "#c0c1ff",
        }}
      >
        {service.icon}
      </div>

      {/* Title */}
      <h3
        className="text-lg font-bold mb-2 leading-tight font-display"
        style={{ color: isCenter ? "#1000a9" : "#dae2fd" }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed"
        style={{ color: isCenter ? "rgba(16,0,169,0.72)" : "#c7c4d7" }}
      >
        {service.desc}
      </p>

      {/* Tags — pinned to bottom */}
      <div className="absolute bottom-5 left-6 right-6 flex flex-wrap gap-1.5">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono px-2 py-0.5 rounded"
            style={{
              backgroundColor: isCenter ? "rgba(16,0,169,0.10)" : "rgba(192,193,255,0.06)",
              border:          isCenter ? "1px solid rgba(16,0,169,0.18)" : "1px solid rgba(255,255,255,0.07)",
              color:           isCenter ? "#1000a9" : "#908fa0",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ─── Main export ────────────────────────────────────────────── */

export function StaggerServices() {
  const [cardSize, setCardSize] = useState(340);
  const [list, setList] = useState(SERVICES_POOL);

  const handleMove = (steps: number) => {
    const next = [...list];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = next.shift();
        if (!item) return;
        next.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = next.pop();
        if (!item) return;
        next.unshift({ ...item, tempId: Math.random() });
      }
    }
    setList(next);
  };

  useEffect(() => {
    const update = () =>
      setCardSize(window.matchMedia("(min-width: 640px)").matches ? 340 : 280);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 560 }}>
      {list.map((service, index) => {
        const position =
          list.length % 2
            ? index - (list.length + 1) / 2
            : index - list.length / 2;
        return (
          <ServiceCard
            key={service.tempId}
            service={service}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}

      {/* Nav buttons */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {[
          { label: "Previous", dir: -1, Icon: ChevronLeft },
          { label: "Next",     dir:  1, Icon: ChevronRight },
        ].map(({ label, dir, Icon }) => (
          <button
            key={label}
            onClick={() => handleMove(dir)}
            aria-label={`${label} service`}
            className="flex h-14 w-14 items-center justify-center border-2 transition-all duration-200"
            style={{ backgroundColor: "#060e20", borderColor: "#464554", color: "#dae2fd" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#c0c1ff";
              (e.currentTarget as HTMLElement).style.color = "#1000a9";
              (e.currentTarget as HTMLElement).style.borderColor = "#c0c1ff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#060e20";
              (e.currentTarget as HTMLElement).style.color = "#dae2fd";
              (e.currentTarget as HTMLElement).style.borderColor = "#464554";
            }}
          >
            <Icon size={24} />
          </button>
        ))}
      </div>
    </div>
  );
}

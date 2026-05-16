"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/lib/data";

const NAV_LINKS = [
  { label: "About",      href: "#about"      },
  { label: "Experience", href: "#experience" },
  { label: "Skills",     href: "#skills"     },
  { label: "Projects",   href: "#projects"   },
  { label: "Contact",    href: "#contact"    },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active,   setActive]     = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-surface/80 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-5 md:px-20 py-4 max-w-[1280px] mx-auto">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 hover:opacity-85 transition-opacity select-none group">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-9 h-9 flex-shrink-0"
              aria-hidden
            >
              <defs>
                <filter id="nb-glow" x="-25%" y="-25%" width="150%" height="150%">
                  <feGaussianBlur stdDeviation="2.8" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <rect width="100" height="100" rx="20" fill="#0b1326"/>
              <rect x="1.5" y="1.5" width="97" height="97" rx="19" fill="none" stroke="rgba(192,193,255,0.14)" strokeWidth="1.5"/>
              <g filter="url(#nb-glow)" stroke="#c0c1ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8.5">
                <line x1="13" y1="26" x2="43" y2="26"/>
                <line x1="43" y1="26" x2="13" y2="74"/>
                <line x1="13" y1="74" x2="43" y2="74"/>
                <line x1="55" y1="26" x2="55" y2="74"/>
                <path d="M55 26 Q74 26 74 38 Q74 50 55 50"/>
                <path d="M55 50 Q78 50 78 62 Q78 74 55 74"/>
              </g>
            </svg>
            <span className="font-bold text-[17px] tracking-tight text-on-surface leading-none">
              Zakaria <span className="text-primary">Bhaibi</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-code relative pb-0.5 transition-colors duration-200 group ${
                    isActive
                      ? "text-primary border-b-2 border-primary"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {link.label}
                  {!isActive && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-300" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1">
              <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-variant rounded transition-colors" aria-label="Code">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                </svg>
              </button>
              <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-variant rounded transition-colors" aria-label="Terminal">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
                </svg>
              </button>
            </div>

            <motion.a
              href="#contact"
              className="hidden md:inline-flex items-center gap-1.5 bg-primary text-on-primary px-5 py-2 rounded text-code font-bold hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Hire Me
            </motion.a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-on-surface p-2"
              aria-label="Menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {menuOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
                }
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[68px] inset-x-0 z-[99] bg-surface/95 backdrop-blur-xl border-b border-white/10 md:hidden"
          >
            <nav className="flex flex-col px-5 py-4 gap-0.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`py-2.5 text-sm border-b border-white/5 last:border-0 transition-colors ${
                    active === link.href
                      ? "text-primary"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={personalInfo.cv}
                download
                className="mt-3 text-sm text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Download CV ↓
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

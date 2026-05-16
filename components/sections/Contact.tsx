"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { personalInfo } from "@/lib/data";

export default function Contact() {
  const container = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".contact-reveal", {
          scrollTrigger: { trigger: container.current, start: "top 78%" },
          opacity: 0, y: 44, duration: 0.8, ease: "power3.out", stagger: 0.11,
        });
      });
    },
    { scope: container }
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Opens default mail client pre-filled
    window.location.href = `mailto:${personalInfo.email}?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.email}`;
    setSent(true);
  }

  const SOCIAL_LINKS = [
    { label: "GH",  href: personalInfo.social.github,   title: "GitHub" },
    { label: "IN",  href: personalInfo.social.linkedin,  title: "LinkedIn" },
    { label: "CV",  href: personalInfo.cv,               title: "Download CV", download: true },
  ];

  return (
    <section ref={container} id="contact" className="px-5 md:px-20 max-w-[1280px] mx-auto py-[120px] flex flex-col items-center relative">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        aria-hidden
      >
        <div
          className="w-[60vw] h-[60vh] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(192,193,255,0.12) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
      </div>

      {/* Heading */}
      <div className="contact-reveal w-full max-w-3xl flex flex-col items-center text-center mb-10 relative z-10">
        <h2 className="text-display-xl text-on-surface mb-4">
          Let&apos;s Build<br />
          <span className="text-primary">Something.</span>
        </h2>
        <p className="text-[18px] leading-[28px] text-on-surface-variant max-w-xl">
          Have a project in mind or just want to chat about tech? Drop a message and I&apos;ll get
          back to you within 24 hours.
        </p>
      </div>

      {/* Glass form card */}
      <div className="contact-reveal w-full max-w-2xl glass rounded-xl p-6 md:p-10 relative z-10">
        {/* Top accent line */}
        <div
          className="absolute top-0 left-10 right-10 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(192,193,255,0.5), transparent)" }}
        />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="name" className="label-caps text-on-surface-variant">Name</label>
              <input
                id="name"
                type="text"
                required
                placeholder="Zakaria Bhaibi"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-surface-dim border border-outline-variant rounded p-3 text-on-surface text-[16px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/40"
                style={{ "--tw-ring-color": "rgba(192,193,255,0.2)" } as React.CSSProperties}
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="email" className="label-caps text-on-surface-variant">Email</label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-surface-dim border border-outline-variant rounded p-3 text-on-surface text-[16px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/40"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="label-caps text-on-surface-variant">Message</label>
            <textarea
              id="message"
              required
              rows={5}
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="bg-surface-dim border border-outline-variant rounded p-3 text-on-surface text-[16px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none placeholder:text-on-surface-variant/40"
            />
          </div>

          <div className="mt-2 flex flex-col items-center">
            <motion.button
              type="submit"
              className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded text-code font-bold w-full md:w-auto justify-center hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {sent ? "Message Sent ✓" : "Send Message"}
              {!sent && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              )}
            </motion.button>
          </div>
        </form>
      </div>

      {/* Connect elsewhere */}
      <div className="contact-reveal mt-16 flex flex-col items-center gap-5 text-center relative z-10">
        <p className="label-caps text-on-surface-variant">Connect Elsewhere</p>
        <div className="flex gap-4">
          {SOCIAL_LINKS.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.download ? undefined : "_blank"}
              rel={s.download ? undefined : "noopener noreferrer"}
              download={s.download ? true : undefined}
              title={s.title}
              className="w-12 h-12 glass rounded flex items-center justify-center text-on-surface hover:text-primary hover:border-primary/50 transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-code font-bold">{s.label}</span>
            </motion.a>
          ))}
        </div>
        <p className="text-[16px] leading-[24px] text-on-surface-variant max-w-sm">
          Looking forward to building the next big thing together.
        </p>
      </div>
    </section>
  );
}

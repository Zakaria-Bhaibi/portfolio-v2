import { personalInfo } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="w-full py-[120px] border-t border-outline-variant/30 bg-surface-container-lowest">
      <div className="flex flex-col md:flex-row justify-between items-center px-5 md:px-20 max-w-[1280px] mx-auto gap-8">
        {/* Copyright */}
        <p className="label-caps text-on-surface-variant">
          © {new Date().getFullYear()} Zakaria Bhaibi. All rights reserved.
        </p>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-6">
          <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer"
            className="text-[16px] text-on-surface-variant hover:text-primary transition-colors">
            GitHub
          </a>
          <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer"
            className="text-[16px] text-on-surface-variant hover:text-primary transition-colors">
            LinkedIn
          </a>
          <a href={`mailto:${personalInfo.email}`}
            className="text-[16px] text-on-surface-variant hover:text-primary transition-colors">
            Email
          </a>
          <a href="#home"
            className="text-[16px] text-tertiary hover:text-primary transition-colors flex items-center gap-1">
            Back to Top
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
            </svg>
          </a>
        </nav>

        {/* Branding — matches the navbar logo */}
        <a href="#home" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 flex-shrink-0" aria-hidden>
            <defs>
              <filter id="ft-glow" x="-25%" y="-25%" width="150%" height="150%">
                <feGaussianBlur stdDeviation="2.8" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <rect width="100" height="100" rx="20" fill="#0b1326"/>
            <rect x="1.5" y="1.5" width="97" height="97" rx="19" fill="none" stroke="rgba(192,193,255,0.14)" strokeWidth="1.5"/>
            <g filter="url(#ft-glow)" stroke="#c0c1ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8.5">
              <line x1="13" y1="26" x2="43" y2="26"/>
              <line x1="43" y1="26" x2="13" y2="74"/>
              <line x1="13" y1="74" x2="43" y2="74"/>
              <line x1="55" y1="26" x2="55" y2="74"/>
              <path d="M55 26 Q74 26 74 38 Q74 50 55 50"/>
              <path d="M55 50 Q78 50 78 62 Q78 74 55 74"/>
            </g>
          </svg>
          <span className="font-bold text-sm text-on-surface tracking-tight">
            Zakaria <span className="text-primary">Bhaibi</span>
          </span>
        </a>
      </div>
    </footer>
  );
}

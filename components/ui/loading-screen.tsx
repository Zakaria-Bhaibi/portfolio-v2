'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { DottedSurface } from '@/components/ui/dotted-surface';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(intervalRef.current);
          return 100;
        }
        const step = p < 65 ? Math.random() * 9 + 3 : Math.random() * 2 + 0.4;
        return Math.min(p + step, 100);
      });
    }, 75);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(onComplete, 550);
      return () => clearTimeout(t);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      exit={{ y: '-100%' }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#060e20' }}
    >
      {/* Animated dot surface */}
      <DottedSurface />

      {/* Radial glow behind content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(192,193,255,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8">

        {/* ZB monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.65 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="100" height="100" rx="20" fill="#0f1729" />
            <g
              stroke="#c0c1ff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="8.5"
            >
              <line x1="13" y1="26" x2="43" y2="26" />
              <line x1="43" y1="26" x2="13" y2="74" />
              <line x1="13" y1="74" x2="43" y2="74" />
              <line x1="55" y1="26" x2="55" y2="74" />
              <path d="M55 26 Q74 26 74 38 Q74 50 55 50" />
              <path d="M55 50 Q78 50 78 62 Q78 74 55 74" />
            </g>
          </svg>
        </motion.div>

        {/* Name + role */}
        <motion.div
          className="flex flex-col items-center gap-2 text-center"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.28 }}
        >
          <h1
            className="text-2xl tracking-wide"
            style={{ color: '#dae2fd', fontFamily: 'var(--font-sora)' }}
          >
            Zakaria <span style={{ fontWeight: 700 }}>Bhaibi</span>
          </h1>
          <p
            className="text-[11px] tracking-[0.25em] uppercase"
            style={{ color: '#464554', fontFamily: 'var(--font-jetbrains)' }}
          >
            Full Stack Developer
          </p>
        </motion.div>

        {/* Progress bar + percentage */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <div
            className="relative overflow-hidden"
            style={{
              width: 220,
              height: 1,
              backgroundColor: 'rgba(255,255,255,0.07)',
            }}
          >
            <motion.div
              className="absolute inset-y-0 left-0"
              style={{ backgroundColor: '#c0c1ff' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.08, ease: 'linear' }}
            />
          </div>
          <span
            className="text-[10px] tabular-nums"
            style={{ color: '#464554', fontFamily: 'var(--font-jetbrains)' }}
          >
            {String(Math.round(progress)).padStart(3, '0')}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

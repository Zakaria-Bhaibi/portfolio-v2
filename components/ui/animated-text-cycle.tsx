import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface AnimatedTextCycleProps {
  words: string[];
  interval?: number;
  className?: string;
}

export default function AnimatedTextCycle({
  words,
  interval = 3000,
  className = "",
}: AnimatedTextCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // "auto" lets the container fit the first word naturally on initial paint.
  const [width, setWidth] = useState("auto");
  const measureRef = useRef<HTMLDivElement>(null);

  // Lock the container to the *current* word's exact width.
  const measure = () => {
    const el = measureRef.current?.children[currentIndex] as
      | HTMLElement
      | undefined;
    if (el) setWidth(`${el.getBoundingClientRect().width}px`);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval, words.length]);

  const variants: Variants = {
    hidden: { y: -20, opacity: 0, filter: "blur(8px)" },
    visible: {
      y: 0, opacity: 1, filter: "blur(0px)",
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
    },
    exit: {
      y: 20, opacity: 0, filter: "blur(8px)",
      transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
    },
  };

  return (
    <>
      {/* Hidden ruler — measures each word's natural width */}
      <div
        ref={measureRef}
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none"
        style={{ visibility: "hidden" }}
      >
        {words.map((word, i) => (
          <span key={i} className={`font-bold ${className}`} style={{ whiteSpace: "nowrap" }}>
            {word}
          </span>
        ))}
      </div>

      {/* Width is snapped to the incoming word during the swap gap (onExitComplete),
          while no word is visible — so the trailing dot never overlaps the text and
          never jumps. */}
      <span className="inline-block align-baseline" style={{ width }}>
        <AnimatePresence mode="wait" initial={false} onExitComplete={measure}>
          <motion.span
            key={currentIndex}
            className={`inline-block font-bold ${className}`}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ whiteSpace: "nowrap" }}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  );
}

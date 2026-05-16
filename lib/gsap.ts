"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";
import { Observer } from "gsap/Observer";
import { CustomEase } from "gsap/CustomEase";
import { TextPlugin } from "gsap/TextPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// All GSAP plugins are free as of 2024 — no Club membership needed.
// Register once here; import gsap, useGSAP, and any plugin from this file.
if (typeof window !== "undefined") {
  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    ScrollSmoother,
    SplitText,
    Flip,
    Draggable,
    Observer,
    CustomEase,
    TextPlugin,
    DrawSVGPlugin,
    MorphSVGPlugin,
    ScrambleTextPlugin,
    MotionPathPlugin,
  );
}

export {
  gsap,
  useGSAP,
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  Flip,
  Draggable,
  Observer,
  CustomEase,
  TextPlugin,
  DrawSVGPlugin,
  MorphSVGPlugin,
  ScrambleTextPlugin,
  MotionPathPlugin,
};

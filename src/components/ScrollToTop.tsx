"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUp } from "lucide-react";
import { getLenis } from "@/components/LenisScroll";

/** How far down the page the button appears, as a fraction of total scroll. */
const REVEAL_AT = 0.15;

/** Circumference of the progress ring (r=22 in a 52px viewBox). */
const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * A back-to-top control that appears once the visitor is meaningfully down the
 * page. The ring around it tracks read progress, so it doubles as a position
 * indicator rather than being pure chrome.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Spring-smoothed so the ring eases into place instead of tracking the raw
  // (already Lenis-smoothed) value with a visible stutter.
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const dashOffset = useTransform(
    progress,
    [0, 1],
    [CIRCUMFERENCE, 0],
  );

  useEffect(() => {
    return scrollYProgress.on("change", (v) => setVisible(v > REVEAL_AT));
  }, [scrollYProgress]);

  function handleClick() {
    const lenis = getLenis();
    if (lenis) {
      // Matches the site's own scroll feel; instant when motion is reduced.
      lenis.scrollTo(0, {
        duration: reduceMotion ? 0 : 1.2,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
      return;
    }
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label="Back to top"
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.6, y: 24 }
          }
          animate={
            reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }
          }
          exit={
            reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 24 }
          }
          transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.7 }}
          whileHover={reduceMotion ? undefined : { scale: 1.08 }}
          whileTap={reduceMotion ? undefined : { scale: 0.92 }}
          className="group fixed bottom-6 right-6 z-50 grid place-items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-navy md:bottom-8 md:right-8"
          style={{
            width: 52,
            height: 52,
            background: "var(--navy, #0b1c3a)",
            boxShadow:
              "0 8px 24px rgba(11, 28, 58, 0.35), 0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          {/* Progress ring — rotated so it fills clockwise from 12 o'clock. */}
          <svg
            viewBox="0 0 52 52"
            className="pointer-events-none absolute inset-0 -rotate-90"
            aria-hidden="true"
          >
            <circle
              cx="26"
              cy="26"
              r={RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="2.5"
            />
            <motion.circle
              cx="26"
              cy="26"
              r={RADIUS}
              fill="none"
              stroke="var(--red, #d4000f)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              style={{ strokeDashoffset: dashOffset }}
            />
          </svg>

          {/* Arrow lifts on hover — the affordance for what the button does.
              Driven by the parent's `group` so hovering anywhere on the button
              triggers it, not just the icon's own 20px box. */}
          <span className="relative block text-white transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-0.5">
            <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

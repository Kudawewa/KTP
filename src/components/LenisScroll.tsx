'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

// The live Lenis instance, shared so anything that scrolls programmatically
// (e.g. ScrollToTop) goes through Lenis rather than fighting its RAF loop.
let activeLenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  return activeLenis;
}

export default function LenisScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });

    lenisRef.current = lenis;
    activeLenis = lenis;

    function raf(time: number) {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
      }
      rafIdRef.current = requestAnimationFrame(raf);
    }

    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        if (activeLenis === lenisRef.current) {
          activeLenis = null;
        }
      }
    };
  }, []);

  return <>{children}</>;
}
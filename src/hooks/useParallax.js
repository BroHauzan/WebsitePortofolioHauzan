import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook for subtle, GPU-accelerated optical parallax depth.
 * Applies a gentle translateY offset (2–6%) without layout shifts.
 * Automatically respects prefers-reduced-motion.
 *
 * @param {number} [speed=0.04] - Multiplier for scroll offset (positive or negative)
 * @returns {{ ref: React.RefObject, offset: number, style: { transform: string } }}
 */
export default function useParallax(speed = 0.04) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Immediate fallback for reduced motion preferences
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined;
    }

    let rafId = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        if (!ref.current) {
          rafId = null;
          return;
        }
        const rect = ref.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calculate relative position to viewport center
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;
        const delta = elementCenter - viewportCenter;

        // Apply gentle dampening
        const calculatedOffset = Math.round(delta * -speed * 10) / 10;
        setOffset(calculatedOffset);
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return {
    ref,
    offset,
    style: {
      transform: `translate3d(0, ${offset}px, 0)`,
      willChange: 'transform',
    },
  };
}

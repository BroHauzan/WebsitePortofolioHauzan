import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook for choreographed staggered scroll reveals based on visual hierarchy.
 * Priority 1: Eyebrow/Headline -> Priority 2: Body text -> Priority 3: Action buttons/Badges.
 * Automatically reveals immediately if prefers-reduced-motion is active.
 *
 * @param {number} [threshold=0.15] - IntersectionObserver threshold
 * @returns {{ ref: React.RefObject, isRevealed: boolean }}
 */
export default function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (isRevealed || !ref.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [isRevealed, threshold]);

  return { ref, isRevealed };
}

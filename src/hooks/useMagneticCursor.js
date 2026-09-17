import { useState, useRef, useCallback } from 'react';

/**
 * Custom hook for desktop-only magnetic cursor attraction.
 * Attracts the element toward the cursor by 3–6px and springs back smoothly on leave.
 * Strictly inactive on touch devices and when prefers-reduced-motion is enabled.
 *
 * @param {number} [strength=0.25] - Magnetism pull factor (0.1 to 0.4 recommended)
 * @returns {{ ref: React.RefObject, style: React.CSSProperties, onMouseMove: Function, onMouseLeave: Function }}
 */
export default function useMagneticCursor(strength = 0.25) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const isEligible = useCallback(() => {
    if (typeof window === 'undefined') return false;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return isFinePointer && !prefersReducedMotion;
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isEligible() || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      // Limit maximum magnetic displacement to 6px
      const clampedX = Math.max(-6, Math.min(6, deltaX));
      const clampedY = Math.max(-6, Math.min(6, deltaY));

      setPosition({ x: clampedX, y: clampedY });
    },
    [isEligible, strength]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  const style = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    transition: position.x === 0 && position.y === 0
      ? 'transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1)'
      : 'transform 80ms ease-out',
  };

  return {
    ref,
    style,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}

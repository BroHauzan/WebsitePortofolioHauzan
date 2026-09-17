// ============================================================
// 3D COVERFLOW MATHEMATICAL UTILITIES
// Pure functions for circular distance, responsive step sizing,
// and 3D card transformation geometry.
// ============================================================

/**
 * Calculates responsive step and farStep based on viewport width.
 * Breakpoints:
 * - Mobile: < 640px
 * - Tablet: 640px - 1023px
 * - Desktop: >= 1024px
 */
export function getStepConfig(windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1024) {
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const step = isMobile ? 180 : isTablet ? 220 : 260;
  const farStep = isMobile ? 310 : isTablet ? 380 : 440;
  return { step, farStep };
}

/**
 * Calculates circular shortest diff between two indices on a circular track of length N.
 * Positive diff means card is to the right; negative means to the left.
 */
export function calculateCircularDiff(targetIndex, activeIndex, total) {
  let diff = targetIndex - activeIndex;
  while (diff > total / 2) diff -= total;
  while (diff < -total / 2) diff += total;
  return diff;
}

/**
 * Calculates 3D transformations, opacity, blur, scale, and z-index for a card
 * given its circular diff from active card and the current responsive step configuration.
 */
export function calculateCardGeometry(diff, stepConfig, reducedMotion = false) {
  const { step, farStep } = stepConfig;
  const distance = Math.abs(diff);
  const sign = Math.sign(diff);

  let x = 0;
  let scale = 1.0;
  let opacity = 1.0;
  let blur = 0;
  let rotateY = 0;
  let zIndex = 30;
  let shadow =
    '0 25px 50px -12px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(15, 23, 42, 0.08)';

  if (diff === 0) {
    // Active center card
    x = 0;
    scale = 1.0;
    opacity = 1.0;
    blur = 0;
    rotateY = 0;
    zIndex = 30;
    shadow =
      '0 25px 50px -12px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(15, 23, 42, 0.08)';
  } else if (distance === 1) {
    // Immediate left/right neighbours
    x = sign * step;
    scale = 0.86;
    opacity = 0.65;
    blur = 2.5;
    rotateY = -sign * 9;
    zIndex = 20;
    shadow = '0 15px 30px -10px rgba(15, 23, 42, 0.12)';
  } else {
    // Cards further away
    x = sign * farStep;
    scale = 0.72;
    opacity = 0.32;
    blur = 6;
    rotateY = -sign * 15;
    zIndex = 10;
    shadow = 'none';
  }

  let transform = '';
  if (reducedMotion) {
    rotateY = 0;
    blur = 0;
    scale = diff === 0 ? 1.0 : 0.85;
    transform = `translate3d(${x}px, 0, 0) scale(${scale})`;
  } else {
    const zTranslate = distance === 0 ? '0px' : distance === 1 ? '-90px' : '-190px';
    transform = `translate3d(${x}px, 0, ${zTranslate}) scale(${scale}) rotateY(${rotateY}deg)`;
  }

  return {
    x,
    scale,
    opacity,
    blur,
    rotateY,
    zIndex,
    shadow,
    transform,
    distance,
    sign,
    isNearActive: distance <= 1,
  };
}

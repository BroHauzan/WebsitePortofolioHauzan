import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CATEGORY_DESTINATIONS } from '../data/showcaseData';

// ============================================================
// 3D CIRCULAR COVERFLOW — exact port of the original vanilla JS
// implementation from code.html.
//
// The carousel stays DOM-driven on purpose: the touch gesture FSM
// needs a non-passive native touchmove listener (React synthetic
// touchmove cannot preventDefault), and the card geometry is applied
// imperatively for pixel-identical transitions.
//
// touchmove trade-off (perf audit): the listener stays non-passive
// because preventing vertical scroll bleed during a horizontal swipe
// is a deliberate behavior of this carousel, and the move handler now
// returns immediately for `idle` / `vertical-scroll` states so it does
// the minimum possible work per event. A fully passive listener would
// require `touch-action` CSS on the stage (global.css — not owned here).
//
// Preserved behaviors:
// - circular diff math (step/farStep/scale/opacity/blur/rotateY/z/translateZ)
// - responsive step buckets: mobile <640 / tablet 640-1023 / desktop >=1024
// - roving tabindex + aria-current + aria-label per card
// - aria-hidden + inert on cards further than one step from the active
//   card (they render at 0.32 opacity and must not be reachable)
// - capture-phase click suppression after swipe (300ms fallback timeout)
// - touch FSM: idle | possible-tap | horizontal-swipe | vertical-scroll
// - scoped ArrowLeft/ArrowRight window navigation with post-nav focus
// - debounced resize re-layout (100ms)
// - prefers-reduced-motion branch
// ============================================================

// Responsive step configuration (identical to the original)
function getStepConfig() {
  const isMobile = window.innerWidth < 640;
  const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
  const step = isMobile ? 180 : isTablet ? 220 : 260;
  const farStep = isMobile ? 310 : isTablet ? 380 : 440;
  return { step, farStep };
}

export default function useCoverflow({
  total,
  sectionRef,
  trackRef,
  stageRef,
  cardsRef,
  dotsRef,
  prevRef,
  nextRef,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const suppressClickRef = useRef(false);
  const suppressTimeoutRef = useRef(null);
  const prefersReducedMotionRef = useRef(false);

  // --- Click suppression state (with ~300ms fallback timeout) ---
  const setSuppressClick = useCallback((val) => {
    suppressClickRef.current = val;
    if (suppressTimeoutRef.current) {
      clearTimeout(suppressTimeoutRef.current);
      suppressTimeoutRef.current = null;
    }
    if (val) {
      // Fallback safety timeout (~300ms) to clear suppressClick
      // so subsequent taps are never locked
      suppressTimeoutRef.current = setTimeout(() => {
        suppressClickRef.current = false;
      }, 300);
    }
  }, []);

  // --- Core geometry pass: applies transform/opacity/filter/z-index/ ---
  // --- box-shadow + aria/tabindex to every card (verbatim math) ---
  const updateCarousel = useCallback(() => {
    const cards = cardsRef.current.filter(Boolean);
    const N = cards.length || total;
    const idx = activeIndexRef.current;
    const reduced = prefersReducedMotionRef.current;
    const { step, farStep } = getStepConfig();

    cards.forEach((card, i) => {
      // Calculate circular diff
      let diff = i - idx;
      while (diff > N / 2) diff -= N;
      while (diff < -N / 2) diff += N;

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

      // A11y: only the active card and its direct neighbours stay in
      // the accessibility tree and can receive pointer/tab focus.
      // Cards further away are blurred to 0.32 opacity, so an
      // accidental click on them is not prevented by the visual
      // change — they are hidden from assistive tech and made inert.
      // `inert` also removes the card's CTA link from the tab order.
      const isNearActive = distance <= 1;

      const catKey = card.dataset.category;
      const ctaLink = card.querySelector('.card-action-link');
      if (ctaLink && catKey && CATEGORY_DESTINATIONS[catKey]) {
        ctaLink.setAttribute('href', CATEGORY_DESTINATIONS[catKey]);
      }

      const catHeading = card.querySelector('h3');
      const catTitle = catHeading ? catHeading.textContent.trim() : `0${i + 1}`;

      if (diff === 0) {
        // Active card
        x = 0;
        scale = 1.0;
        opacity = 1.0;
        blur = 0;
        rotateY = 0;
        zIndex = 30;
        shadow =
          '0 25px 50px -12px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(15, 23, 42, 0.08)';
        card.setAttribute('aria-current', 'true');
        card.setAttribute('aria-label', `Koleksi ${i + 1} dari ${N}: ${catTitle}`);
        card.setAttribute('tabindex', '0');
        card.style.pointerEvents = 'auto';
        if (ctaLink) {
          ctaLink.removeAttribute('tabindex');
        }
      } else if (distance === 1) {
        // Nearest cards left or right
        x = sign * step;
        scale = 0.86;
        opacity = 0.65;
        blur = 2.5;
        rotateY = -sign * 9;
        zIndex = 20;
        shadow = '0 15px 30px -10px rgba(15, 23, 42, 0.12)';
        card.removeAttribute('aria-current');
        card.setAttribute('aria-label', `Koleksi ${i + 1} dari ${N}: ${catTitle}`);
        card.setAttribute('tabindex', '-1');
        card.style.pointerEvents = 'auto';
        if (ctaLink) {
          ctaLink.setAttribute('tabindex', '-1');
        }
      } else {
        // Far cards
        x = sign * farStep;
        scale = 0.72;
        opacity = 0.32;
        blur = 6;
        rotateY = -sign * 15;
        zIndex = 10;
        shadow = 'none';
        card.removeAttribute('aria-current');
        card.setAttribute('aria-label', `Koleksi ${i + 1} dari ${N}: ${catTitle}`);
        card.setAttribute('tabindex', '-1');
        card.style.pointerEvents = 'auto';
        if (ctaLink) {
          ctaLink.setAttribute('tabindex', '-1');
        }
      }

      // A11y attributes are applied AFTER active/distance resolution so
      // the active card and its neighbours always clear them:
      // - far cards (distance > 1) leave the a11y tree and become inert
      //   (no pointer hit, no tab stop on their link) while they are
      //   rendered at 0.32 opacity.
      // - active + neighbours are restored, otherwise the active card
      //   would stay permanently dead once it had been far away.
      if (isNearActive) {
        card.removeAttribute('aria-hidden');
        card.removeAttribute('inert');
      } else {
        card.setAttribute('aria-hidden', 'true');
        card.setAttribute('inert', '');
      }

      if (reduced) {
        rotateY = 0;
        blur = 0;
        scale = diff === 0 ? 1.0 : 0.85;
        card.style.transform = `translate3d(${x}px, 0, 0) scale(${scale})`;
      } else {
        card.style.transform = `translate3d(${x}px, 0, ${
          distance === 0 ? '0px' : distance === 1 ? '-90px' : '-190px'
        }) scale(${scale}) rotateY(${rotateY}deg)`;
      }

      card.style.opacity = `${opacity}`;
      card.style.filter = blur > 0 && !reduced ? `blur(${blur}px)` : 'none';
      card.style.zIndex = `${zIndex}`;
      card.style.boxShadow = shadow;
    });
  }, [cardsRef, total]);


  // --- Index transitions ---
  const setActiveIndexState = useCallback(
    (newIndex) => {
      const normalized = (newIndex + total) % total;
      activeIndexRef.current = normalized;
      setActiveIndex(normalized);
      updateCarousel();
    },
    [total, updateCarousel]
  );

  const prev = useCallback(() => {
    setActiveIndexState(activeIndexRef.current - 1);
  }, [setActiveIndexState]);

  const next = useCallback(() => {
    setActiveIndexState(activeIndexRef.current + 1);
  }, [setActiveIndexState]);

  const select = useCallback(
    (target) => {
      if (!isNaN(target)) {
        setActiveIndexState(target);
      }
    },
    [setActiveIndexState]
  );

  // --- CARD CLICK & ACTION LINKS INTERACTION MODEL ---
  // Inactive card (or its CTA): activate + center, never navigate.
  // Active card CTA: native anchor navigation.
  // Active card body: do nothing (Single Action Rule).
  const handleCardClick = useCallback(
    (event, idx) => {
      if (suppressClickRef.current) {
        event.preventDefault();
        event.stopPropagation();
        setSuppressClick(false);
        return;
      }

      if (idx !== activeIndexRef.current) {
        // INACTIVE CARD: always prevent link navigation and center it
        event.preventDefault();
        event.stopPropagation();
        setActiveIndexState(idx);
        cardsRef.current[idx]?.focus();
        return;
      }

      // ACTIVE CARD: clicking the CTA link proceeds natively;
      // clicking the card body does nothing.
    },
    [cardsRef, setActiveIndexState, setSuppressClick]
  );

  const handleCardKeyDown = useCallback(
    (e, idx) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (idx !== activeIndexRef.current) {
          e.preventDefault();
          setActiveIndexState(idx);
          cardsRef.current[idx]?.focus();
        }
      }
    },
    [cardsRef, setActiveIndexState]
  );

  // --- Initial paint (layout effect: styles applied before first paint) ---
  useLayoutEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    updateCarousel();
  }, [updateCarousel]);

  // --- Native listeners: capture-phase click suppression, scoped ---
  // --- keyboard nav, touch gesture FSM, debounced resize ---
  useEffect(() => {
    const gestureTarget = trackRef.current || stageRef.current;
    if (!gestureTarget) return undefined;

    // CLICK SUPPRESSION VIA CAPTURE PHASE
    // Intercept and discard the synthetic click the browser
    // generates right after a swipe.
    const captureClick = (e) => {
      if (suppressClickRef.current) {
        e.preventDefault();
        e.stopPropagation();
        setSuppressClick(false);
      }
    };
    gestureTarget.addEventListener('click', captureClick, true); // useCapture = true!

    // Scoped Keyboard Navigation (ArrowLeft / ArrowRight)
    const handleKeyNav = (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

      const activeEl = document.activeElement;
      const cards = cardsRef.current;
      const dots = dotsRef.current.filter(Boolean);
      const isWithinCarousel =
        (sectionRef.current && sectionRef.current.contains(activeEl)) ||
        (stageRef.current && stageRef.current.contains(activeEl)) ||
        (trackRef.current && trackRef.current.contains(activeEl)) ||
        (prevRef.current && prevRef.current === activeEl) ||
        (nextRef.current && nextRef.current === activeEl) ||
        dots.some((d) => d === activeEl);

      if (isWithinCarousel) {
        e.preventDefault();
        const direction = e.key === 'ArrowLeft' ? -1 : 1;
        const targetIdx = (activeIndexRef.current + direction + total) % total;
        setActiveIndexState(targetIdx);
        cards[targetIdx]?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyNav);

    // ---------------------------------------------------------
    // FINITE STATE MACHINE TOUCH GESTURES
    // States: 'idle' | 'possible-tap' | 'horizontal-swipe' | 'vertical-scroll'
    // ---------------------------------------------------------
    let gestureState = 'idle';
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;

    const SWIPE_THRESHOLD = 40;
    const SCROLL_THRESHOLD = 15;

    const onTouchStart = (e) => {
      if (e.touches.length > 1) {
        gestureState = 'idle';
        return;
      }
      gestureState = 'possible-tap';
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      currentX = startX;
      currentY = startY;
      setSuppressClick(false);
    };

    const onTouchMove = (e) => {
      // Fast path: nothing to do unless a gesture is actually in
      // progress. `vertical-scroll` is terminal for this gesture (native
      // scrolling owns it) and `idle` means no touch we care about —
      // bailing out immediately keeps this non-passive handler as cheap
      // as possible so it does not delay the compositor fast path.
      if (!gestureState || gestureState === 'idle' || gestureState === 'vertical-scroll') {
        return;
      }

      currentX = e.touches[0].clientX;
      currentY = e.touches[0].clientY;
      const dx = currentX - startX;
      const dy = currentY - startY;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);

      if (gestureState === 'horizontal-swipe') {
        if (e.cancelable) {
          e.preventDefault();
        }
        return;
      }

      if (gestureState === 'possible-tap') {
        if (absX >= SWIPE_THRESHOLD && absX > absY) {
          gestureState = 'horizontal-swipe';
          setSuppressClick(true);
          if (e.cancelable) {
            e.preventDefault();
          }
        } else if (absY >= SCROLL_THRESHOLD && absY > absX) {
          gestureState = 'vertical-scroll';
        }
      }
    };

    const onTouchEnd = () => {
      if (gestureState === 'horizontal-swipe') {
        const dx = currentX - startX;
        if (dx < -SWIPE_THRESHOLD) {
          next();
        } else if (dx > SWIPE_THRESHOLD) {
          prev();
        }
        setSuppressClick(true);
      } else if (gestureState === 'possible-tap') {
        // Normal tap: click event will follow naturally
        // for CTA navigation or card activation
      }

      // Reset state for next cycle
      gestureState = 'idle';
    };

    const onTouchCancel = () => {
      gestureState = 'idle';
    };

    gestureTarget.addEventListener('touchstart', onTouchStart, { passive: true });
    gestureTarget.addEventListener('touchmove', onTouchMove, { passive: false });
    gestureTarget.addEventListener('touchend', onTouchEnd, { passive: true });
    gestureTarget.addEventListener('touchcancel', onTouchCancel, { passive: true });

    // Window resize listener with debounce
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateCarousel();
      }, 100);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      gestureTarget.removeEventListener('click', captureClick, true);
      window.removeEventListener('keydown', handleKeyNav);
      gestureTarget.removeEventListener('touchstart', onTouchStart);
      gestureTarget.removeEventListener('touchmove', onTouchMove);
      gestureTarget.removeEventListener('touchend', onTouchEnd);
      gestureTarget.removeEventListener('touchcancel', onTouchCancel);
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
      if (suppressTimeoutRef.current) {
        clearTimeout(suppressTimeoutRef.current);
        suppressTimeoutRef.current = null;
      }
    };
  }, [
    cardsRef,
    dotsRef,
    next,
    prev,
    sectionRef,
    setSuppressClick,
    setActiveIndexState,
    stageRef,
    total,
    trackRef,
    updateCarousel,
    nextRef,
    prevRef,
  ]);

  return { activeIndex, prev, next, select, handleCardClick, handleCardKeyDown };
}


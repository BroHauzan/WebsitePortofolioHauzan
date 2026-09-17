import { useState, useEffect, useCallback, useRef } from 'react';

// ============================================================
// CINEMA BOOT SEQUENCE (Lens Rack Focus + Shutter Opening)
// Overlay on first visit with authentic viewfinder telemetry,
// aperture/shutter split reveal, and optical rack focus.
// ============================================================

export default function CinemaBootSequence({ onShutterOpen, onComplete }) {
  const [isDismissed, setIsDismissed] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
    try {
      return sessionStorage.getItem('introPlayed') === 'true';
    } catch {
      return false;
    }
  });
  const dismissedRef = useRef(isDismissed);
  const [phase, setPhase] = useState(1); // 1: sensor typing, 2: af lock, 3: rec, 4: shutter split, 5: done
  const [sensorText, setSensorText] = useState('');

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setIsDismissed(true);

    try {
      sessionStorage.setItem('introPlayed', 'true');
    } catch {
      // Ignore storage errors in restrictive environments
    }

    if (onShutterOpen) onShutterOpen();
    if (onComplete) onComplete();
  }, [onShutterOpen, onComplete]);

  useEffect(() => {
    if (dismissedRef.current) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      dismiss();
      return;
    }

    // Typewriter effect for "INITIALIZING SENSOR..."
    const targetString = 'INITIALIZING SENSOR...';
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (dismissedRef.current) {
        clearInterval(typingInterval);
        return;
      }
      charIndex += 1;
      setSensorText(targetString.slice(0, charIndex));
      if (charIndex >= targetString.length) {
        clearInterval(typingInterval);
      }
    }, 24);

    const t1 = setTimeout(() => {
      if (!dismissedRef.current) setPhase(2);
    }, 650);

    const t2 = setTimeout(() => {
      if (!dismissedRef.current) setPhase(3);
    }, 1150);

    const t3 = setTimeout(() => {
      if (!dismissedRef.current) {
        setPhase(4);
        if (onShutterOpen) onShutterOpen();
      }
    }, 1700);

    const t4 = setTimeout(() => {
      if (!dismissedRef.current) {
        setPhase(5);
        dismiss();
      }
    }, 2500);

    // Global skip handlers: click, keydown, intentional wheel scroll, intentional swipe
    const handleKeyDown = () => {
      dismiss();
    };

    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > 20 || Math.abs(e.deltaX) > 20) {
        dismiss();
      }
    };

    let touchStartY = null;
    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (touchStartY !== null && e.touches && e.touches[0]) {
        const delta = Math.abs(e.touches[0].clientY - touchStartY);
        if (delta > 25) dismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      clearInterval(typingInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [dismiss, onShutterOpen]);

  if (isDismissed || phase >= 5) {
    return null;
  }

  const shutterSplit = phase >= 4;

  return (
    <div
      role="dialog"
      aria-label="Cinema Boot Sequence"
      aria-modal="true"
      onClick={dismiss}
      className="fixed inset-0 z-[9999] overflow-hidden select-none cursor-pointer"
    >
      {/* Top Shutter Blade Curtain */}
      <div
        aria-hidden="true"
        className={`absolute top-0 left-0 right-0 h-1/2 bg-[#090e1a] border-b border-slate-800/80 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          shutterSplit ? '-translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* Bottom Shutter Blade Curtain */}
      <div
        aria-hidden="true"
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-[#090e1a] border-t border-slate-800/80 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          shutterSplit ? 'translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* Telemetry HUD Elements (Fades out when shutter opens) */}
      <div
        className={`relative z-10 w-full h-full flex flex-col justify-between p-6 sm:p-10 text-slate-300 font-mono transition-opacity duration-300 ${
          shutterSplit ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Top Telemetry Header */}
        <div className="flex items-center justify-between text-xs tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-semibold text-[11px]">SYS // BOOT</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400 text-[11px] hidden sm:inline">35mm SENSOR PRIME</span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              dismiss();
            }}
            className="text-[10px] tracking-widest uppercase text-slate-400 hover:text-white border border-slate-700 px-2.5 py-1 rounded bg-slate-900/80 focus-ring cursor-pointer"
          >
            Lewati [ESC / KLIK]
          </button>
        </div>

        {/* Center Viewfinder Optical Focus Target */}
        <div className="flex flex-col items-center justify-center my-auto">
          <div className="relative w-64 sm:w-80 p-6 border border-slate-700/60 rounded-xl bg-slate-950/60 backdrop-blur-sm text-center shadow-2xl">
            {/* Viewfinder L-Corner Brackets */}
            <span aria-hidden="true" className="absolute top-1.5 left-1.5 text-xs text-emerald-400/70 font-mono">⌜</span>
            <span aria-hidden="true" className="absolute top-1.5 right-1.5 text-xs text-emerald-400/70 font-mono">⌝</span>
            <span aria-hidden="true" className="absolute bottom-1.5 left-1.5 text-xs text-emerald-400/70 font-mono">⌞</span>
            <span aria-hidden="true" className="absolute bottom-1.5 right-1.5 text-xs text-emerald-400/70 font-mono">⌟</span>

            {/* Central Optical Reticle Crosshair */}
            <div className="relative w-12 h-12 mx-auto mb-4 border border-dashed border-slate-600 rounded-full flex items-center justify-center">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  phase >= 2 ? 'bg-emerald-400 scale-125 shadow-[0_0_12px_#34d399]' : 'bg-slate-600 scale-100'
                }`}
              />
            </div>

            {/* Monospace Telemetry Typing Lines */}
            <div className="space-y-2 text-left text-xs sm:text-sm font-mono tracking-wide min-h-[76px]">
              {/* Line 1: Typing effect with cursor and OK completion badge */}
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-slate-500 text-[10px]">&gt;</span>
                <span className="text-emerald-300 font-medium">
                  {sensorText || '\u00A0'}
                  {sensorText.length < 22 && (
                    <span className="inline-block w-1.5 h-3 bg-emerald-400 ml-0.5 animate-pulse" />
                  )}
                </span>
                {sensorText.length >= 22 && (
                  <span className="text-[10px] text-slate-400 ml-auto font-semibold">OK</span>
                )}
              </div>

              {/* Line 2: AF Locked with Lens Telemetry */}
              <div
                className={`flex items-center gap-2 transition-all duration-300 ${
                  phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'
                }`}
              >
                <span className="text-slate-500 text-[10px]">&gt;</span>
                <span className="text-emerald-400 font-semibold">AF LOCKED</span>
                <span className="text-[11px] text-slate-400">● [ISO 400 · f/1.8 · 24fps]</span>
              </div>

              {/* Line 3: REC timecode trigger */}
              <div
                className={`flex items-center gap-2 transition-all duration-300 ${
                  phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'
                }`}
              >
                <span className="text-slate-500 text-[10px]">&gt;</span>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-400 font-bold tracking-wider">● REC</span>
                <span className="text-slate-300 font-semibold tabular-nums text-xs ml-auto">00:00:00:01</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Quick Instruction */}
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span className="hidden sm:inline">MEDIA CENTER // PRODUCTION VIEW</span>
          <span className="mx-auto sm:mx-0">Klik di mana saja atau scroll untuk masuk</span>
          <span className="hidden sm:inline">SMAN 1 LUMAJANG</span>
        </div>
      </div>
    </div>
  );
}

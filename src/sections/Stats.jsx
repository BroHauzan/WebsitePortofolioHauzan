import { useState, useEffect, useRef } from 'react';

// ============================================================
// SECTION 3: STATS & REKAM JEJAK (Clean Minimal 1px Border Cards)
// Includes Smooth Easing Count-Up via IntersectionObserver
// and Audio Waveform Accent for Recording/Data Aesthetic
// ============================================================

const heroStatSubStats = [
  { target: 45, suffix: '+', label: 'Foto Liputan' },
  { target: 30, suffix: '+', label: 'Video & Recap' },
  { target: 25, suffix: '+', label: 'Motion & Desain' },
];

const metricCards = [
  {
    target: 3,
    suffix: ' Tahun',
    meta: 'SMAN 1 Lumajang',
    title: 'di Media Center',
    description: 'Dedikasi konsisten mendokumentasikan setiap denyut kreasi dan agenda sekolah.',
  },
  {
    target: 1.5,
    decimals: 1,
    suffix: ' Tahun',
    meta: 'Kepengurusan',
    title: 'Ketua Eskul',
    description: 'Memimpin alur kerja multi-kamera, tim liputan, dan editorial konten rilis sekolah.',
  },
  {
    target: 10,
    suffix: '+ Tools',
    meta: 'Software Stack',
    title: 'Tools Kreatif',
    description: 'Premiere, After Effects, DaVinci, Lightroom, Figma, hingga modern web coding.',
  },
];

// 18-bar waveform heights (normalized percentage)
const WAVEFORM_BARS = [35, 60, 85, 45, 95, 70, 50, 80, 100, 65, 40, 75, 90, 55, 35, 70, 45, 25];

function AnimatedCounter({ target, suffix = '', decimals = 0, isTriggered }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isTriggered) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    let start = null;
    const duration = 1600; // 1.6s easing count-up
    let rafId;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isTriggered, target]);

  const targetDisplay = decimals > 0 ? target.toFixed(decimals).replace('.', ',') : target;
  const display = decimals > 0 ? value.toFixed(decimals).replace('.', ',') : Math.round(value);

  return (
    <>
      <span className="sr-only">{targetDisplay}{suffix}</span>
      <span aria-hidden="true" className="tabular-nums font-mono font-semibold">
        {display}{suffix}
      </span>
    </>
  );
}

export default function Stats() {
  const sectionRef = useRef(null);
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-t border-cream-border py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-10"
      id="stats"
    >
      {/* Eyebrow & Display Heading Lockup */}
      <div className="mb-12">
        <span className="text-[11px] sm:text-xs font-semibold tracking-eyebrow uppercase text-ink-muted block mb-3">
          Arsip Liputan &amp; Rekam Jejak
        </span>
        <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tightHeadline text-ink-primary">
          Rekam jejak &amp; <span className="font-em text-slate-700">arsip</span> liputan.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Hero Stat Card with Audio Waveform Accent */}
        <div className="lg:col-span-6 bg-white border border-cream-border rounded-xl p-8 sm:p-12 flex flex-col justify-between shadow-sm">
          <div>
            {/* Field Recorder Telemetry & Rhythm Waveform Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-cream-border">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse motion-reduce:animate-none" />
                <span className="text-[10px] font-mono tracking-wider uppercase text-ink-muted">
                  ARCHIVE // LOG 2023-2026
                </span>
              </div>

              {/* Sleek Rhythm Audio Waveform Accent */}
              <div
                className="flex items-end gap-[3px] h-6 px-2.5 py-1 bg-cream-subtle rounded-md border border-cream-border/70 select-none"
                aria-hidden="true"
                title="Audio Waveform Monitor"
              >
                {WAVEFORM_BARS.map((heightPct, idx) => (
                  <span
                    key={idx}
                    className="w-[2.5px] rounded-full bg-slate-800 transition-all duration-300 origin-bottom motion-reduce:transform-none"
                    style={{
                      height: isTriggered ? `${heightPct}%` : '20%',
                      animation: isTriggered
                        ? `audioBarPulse 1.2s ease-in-out infinite alternate ${idx * 65}ms`
                        : 'none',
                    }}
                  />
                ))}
              </div>
            </div>

            <span className="text-[11px] font-semibold tracking-eyebrow uppercase text-ink-muted block mb-2">
              Total Dokumentasi &amp; Produksi
            </span>

            {/* Giant 100+ Counter */}
            <div className="font-display text-7xl sm:text-8xl lg:text-9xl font-semibold text-ink-primary tracking-tight leading-none mb-6">
              <AnimatedCounter target={100} suffix="+" isTriggered={isTriggered} />
            </div>

            {/* Sub-stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 pb-2 border-t border-cream-border text-xs text-ink-secondary">
              {heroStatSubStats.map((stat) => (
                <div key={stat.label}>
                  <span className="font-semibold text-ink-primary text-sm block">
                    <AnimatedCounter target={stat.target} suffix={stat.suffix} isTriggered={isTriggered} />
                  </span>
                  <span className="text-ink-muted text-[11px]">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm sm:text-base text-ink-muted leading-[1.65] max-w-md pt-6 border-t border-cream-border mt-4">
            Events &amp; projects documented across high school festivals, theatrical stages, and regional student productions.
          </p>
        </div>

        {/* Right 3 Supporting Metric Cards */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-4 flex flex-col justify-between">
          {metricCards.map((card) => (
            <div
              key={card.title}
              className="bg-white border border-cream-border rounded-xl p-6 sm:p-7 flex flex-col justify-center shadow-sm"
            >
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-display text-3xl sm:text-4xl font-semibold text-ink-primary">
                  <AnimatedCounter
                    target={card.target}
                    decimals={card.decimals}
                    suffix={card.suffix}
                    isTriggered={isTriggered}
                  />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-600">
                  {card.meta}
                </span>
              </div>
              <h3 className="text-xs uppercase tracking-[0.12em] font-semibold text-ink-secondary mb-1">
                {card.title}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

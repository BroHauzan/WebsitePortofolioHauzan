import { useState, useEffect } from 'react';

// ============================================================
// VIEWFINDER FRAME AESTHETIC COMPONENT
// High-end 35mm camera viewfinder HUD for Hero & About sections
// Includes Live Reactive Telemetry (Timecode + Jitter)
// ============================================================

// Base starting frame: 00:14:22:08 at 24fps
const BASE_FRAMES = 0 * 3600 * 24 + 14 * 60 * 24 + 22 * 24 + 8;

function formatTimecode(totalFrames) {
  const ff = totalFrames % 24;
  const totalSecs = Math.floor(totalFrames / 24);
  const ss = totalSecs % 60;
  const mm = Math.floor(totalSecs / 60) % 60;
  const hh = Math.floor(totalSecs / 3600) % 24;

  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
}

export default function ViewfinderFrame({ mode = 'cinema' }) {
  // Telemetry States
  const [frames, setFrames] = useState(BASE_FRAMES);
  const [db, setDb] = useState('-12dB');
  const [iso, setIso] = useState('ISO 400');
  const [ev, setEv] = useState('EV +0.0');
  const [raw, setRaw] = useState('98%');
  const [isoPortrait, setIsoPortrait] = useState('ISO 200');
  const [shutterPortrait, setShutterPortrait] = useState('1/320s');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let tcInterval = null;
    let jitterInterval = null;

    // 1. Live Timecode (24 FPS increment) - only in cinema mode
    if (mode === 'cinema') {
      const startTime = performance.now();
      tcInterval = setInterval(() => {
        if (document.hidden) return;
        const elapsedMs = performance.now() - startTime;
        const elapsedFrames = Math.floor(elapsedMs / (1000 / 24));
        setFrames(BASE_FRAMES + elapsedFrames);
      }, 42);
    }

    // 2. Realistic Telemetry Micro-Jitter (Light Metering & Sensor Activity)
    jitterInterval = setInterval(() => {
      if (document.hidden) return;
      if (mode === 'cinema') {
        const isoCinemaList = ['ISO 400', 'ISO 400', 'ISO 400', 'ISO 320', 'ISO 500'];
        const evList = ['EV +0.0', 'EV +0.0', 'EV +0.0', 'EV +0.3', 'EV -0.3'];
        const dbList = ['-12dB', '-11dB', '-13dB', '-10dB', '-14dB'];
        const rawList = ['98%', '98%', '97%', '99%'];

        setIso(isoCinemaList[Math.floor(Math.random() * isoCinemaList.length)]);
        setEv(evList[Math.floor(Math.random() * evList.length)]);
        setDb(dbList[Math.floor(Math.random() * dbList.length)]);
        setRaw(rawList[Math.floor(Math.random() * rawList.length)]);
      } else {
        const isoPortraitList = ['ISO 200', 'ISO 200', 'ISO 250', 'ISO 160'];
        const shutterList = ['1/320s', '1/320s', '1/250s', '1/400s'];

        setIsoPortrait(isoPortraitList[Math.floor(Math.random() * isoPortraitList.length)]);
        setShutterPortrait(shutterList[Math.floor(Math.random() * shutterList.length)]);
      }
    }, 3200);

    return () => {
      if (tcInterval) clearInterval(tcInterval);
      if (jitterInterval) clearInterval(jitterInterval);
    };
  }, [mode]);

  if (mode === 'portrait') {
    return (
      <div
        aria-label="35mm Portrait Viewfinder HUD Hauzan Naufal"
        role="img"
        className="relative w-full h-full bg-[#090e1a] text-slate-200 overflow-hidden select-none flex flex-col justify-between p-4 sm:p-5"
      >
        {/* Subtle Lens Vignette Background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(30,41,59,0.5)_0%,_rgba(9,14,26,0.95)_100%)] pointer-events-none"
        />

        {/* Rule-of-Thirds Composition Grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-15"
        >
          <div className="border-r border-b border-white/40" />
          <div className="border-r border-b border-white/40" />
          <div className="border-b border-white/40" />
          <div className="border-r border-b border-white/40" />
          <div className="border-r border-b border-white/40" />
          <div className="border-b border-white/40" />
          <div className="border-r border-b border-white/40" />
          <div className="border-r border-b border-white/40" />
          <div />
        </div>

        {/* 4 Precision L-Corner Brackets */}
        <div aria-hidden="true" className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-slate-400/80 pointer-events-none" />
        <div aria-hidden="true" className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-slate-400/80 pointer-events-none" />
        <div aria-hidden="true" className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-slate-400/80 pointer-events-none" />
        <div aria-hidden="true" className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-slate-400/80 pointer-events-none" />

        {/* Top Telemetry HUD */}
        <div className="relative z-10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-wider">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse motion-reduce:animate-none" />
            <span className="text-emerald-400 font-semibold">AF-C</span>
            <span className="text-slate-400">· EYE DETECT</span>
          </div>
          <span className="text-slate-400 bg-white/10 px-2 py-0.5 rounded border border-white/10 text-[9px] sm:text-[10px]">
            14-BIT RAW
          </span>
        </div>

        {/* Center Portrait Focus Bracket Reticle */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-4">
          <div className="relative w-36 h-48 sm:w-44 sm:h-56 border border-white/20 rounded-xl flex flex-col items-center justify-center p-3 text-center bg-white/[0.02]">
            {/* Center Crosshair */}
            <div aria-hidden="true" className="absolute w-4 h-0.5 bg-white/40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div aria-hidden="true" className="absolute h-4 w-0.5 bg-white/40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            {/* Inner Focus Indicator */}
            <div className="w-12 h-12 rounded-full border border-dashed border-white/30 flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>

            <span className="font-display font-medium text-white text-xs sm:text-sm tracking-tight mb-0.5">
              Hauzan Naufal
            </span>
            <span className="text-[9px] font-mono uppercase tracking-eyebrow text-slate-400">
              Media Center · Sekbid 9
            </span>

            {/* Micro Corner Ticks inside Focus Box */}
            <span aria-hidden="true" className="absolute top-1 left-1 text-[8px] text-white/40">⌜</span>
            <span aria-hidden="true" className="absolute top-1 right-1 text-[8px] text-white/40">⌝</span>
            <span aria-hidden="true" className="absolute bottom-1 left-1 text-[8px] text-white/40">⌞</span>
            <span aria-hidden="true" className="absolute bottom-1 right-1 text-[8px] text-white/40">⌟</span>
          </div>
        </div>

        {/* Bottom Telemetry HUD */}
        <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span>35mm</span>
            <span className="text-slate-500">|</span>
            <span>ƒ/1.8</span>
            <span className="text-slate-500">|</span>
            <span className="w-[46px] text-center tabular-nums inline-block">{shutterPortrait}</span>
            <span className="text-slate-500">|</span>
            <span className="w-[54px] text-center tabular-nums inline-block text-white font-medium">{isoPortrait}</span>
          </div>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400">
            Lumajang
          </span>
        </div>
      </div>
    );
  }

  // Default: Cinema 16:9 Viewfinder HUD
  return (
    <div
      aria-label="35mm Cinema Viewfinder HUD Frame Hauzan Naufal"
      role="img"
      className="relative w-full h-full bg-[#090e1a] text-slate-200 overflow-hidden select-none flex flex-col justify-between p-4 sm:p-6"
    >
      {/* Subtle Lens Vignette Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(30,41,59,0.55)_0%,_rgba(9,14,26,0.98)_100%)] pointer-events-none"
      />

      {/* Rule-of-Thirds Grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-15"
      >
        <div className="border-r border-b border-white/40" />
        <div className="border-r border-b border-white/40" />
        <div className="border-b border-white/40" />
        <div className="border-r border-b border-white/40" />
        <div className="border-r border-b border-white/40" />
        <div className="border-b border-white/40" />
        <div className="border-r border-b border-white/40" />
        <div className="border-r border-b border-white/40" />
        <div />
      </div>

      {/* 4 Precision L-Corner Brackets */}
      <div aria-hidden="true" className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-slate-400/90 pointer-events-none" />
      <div aria-hidden="true" className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-slate-400/90 pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-slate-400/90 pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-slate-400/90 pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between text-[10px] sm:text-xs font-mono tracking-wider">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse motion-reduce:animate-none" />
          <span className="text-red-400 font-bold">REC</span>
          <span className="text-slate-300 font-semibold tabular-nums inline-block w-[88px] sm:w-[94px]">
            {formatTimecode(frames)}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-slate-400">
          <span>4K DCI</span>
          <span>·</span>
          <span>24.00 FPS</span>
          <span>·</span>
          <span>SHUTTER 180°</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-400 hidden sm:inline-flex items-center gap-1 w-[68px] tabular-nums">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse motion-reduce:animate-none" />
            MIC {db}
          </span>
          <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded bg-emerald-950/40 w-[64px] text-center tabular-nums">
            RAW {raw}
          </span>
        </div>
      </div>

      {/* Center Cinematic Reticle with Crosshairs & Focus Point */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-3">
        {/* Reticle Focus Area */}
        <div className="relative w-48 sm:w-64 h-24 sm:h-32 border border-white/20 rounded-lg flex flex-col items-center justify-center p-3 text-center bg-white/[0.02]">
          {/* Subtle Center Crosshair */}
          <div aria-hidden="true" className="absolute w-6 h-0.5 bg-white/40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div aria-hidden="true" className="absolute h-6 w-0.5 bg-white/40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          {/* AF Box Brackets */}
          <span aria-hidden="true" className="absolute top-1 left-1 text-[9px] text-white/50 font-mono">⌜</span>
          <span aria-hidden="true" className="absolute top-1 right-1 text-[9px] text-white/50 font-mono">⌝</span>
          <span aria-hidden="true" className="absolute bottom-1 left-1 text-[9px] text-white/50 font-mono">⌞</span>
          <span aria-hidden="true" className="absolute bottom-1 right-1 text-[9px] text-white/50 font-mono">⌟</span>

          <span className="font-display font-medium text-white text-xs sm:text-base tracking-tight mb-1">
            Media Center SMAN 1 Lumajang
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-eyebrow text-slate-400">
            35mm Prime · Visual Storytelling
          </span>
        </div>
      </div>

      {/* Bottom Telemetry HUD */}
      <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="font-medium">ƒ/1.8</span>
          <span className="text-slate-600">·</span>
          <span>1/50s</span>
          <span className="text-slate-600">·</span>
          <span className="font-semibold text-white w-[58px] text-center tabular-nums inline-block">{iso}</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400 w-[52px] text-center tabular-nums inline-block">{ev}</span>
        </div>

        <div className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider text-slate-400">
          S-Log3 · Cinema EI
        </div>

        <div className="text-slate-300 uppercase tracking-wider text-[10px] sm:text-xs">
          Lumajang Doc
        </div>
      </div>
    </div>
  );
}

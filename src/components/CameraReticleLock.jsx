// ============================================================
// CAMERA RETICLE LOCK (Auto-Focus Reticle & Target Box)
// Snaps to cards on hover/focus with authentic camera AF brackets
// and an '[ AF-C · LOCKED ]' badge.
// ============================================================

const BADGE_POSITIONS = {
  'top-left': 'top-2.5 left-2.5',
  'top-right': 'top-2.5 right-2.5',
  'bottom-left': 'bottom-2.5 left-2.5',
  'bottom-right': 'bottom-2.5 right-2.5',
};

export default function CameraReticleLock({
  badgePosition = 'top-left', // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  showBadge = true,
  showCrosshair = true,
  className = 'rounded-2xl',
}) {
  const badgePosClass = BADGE_POSITIONS[badgePosition] ?? BADGE_POSITIONS['top-left'];

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-200 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 select-none z-20 ${className}`}
    >
      {/* 4 Precision L-Corner Brackets (snaps inward with scale transition) */}
      <div className="absolute inset-0 p-2.5 transition-transform duration-300 ease-out scale-105 group-hover:scale-100 group-focus-within:scale-100 motion-reduce:transform-none">
        {/* Top-Left */}
        <span className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-emerald-500/90 rounded-tl-sm shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
        {/* Top-Right */}
        <span className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-emerald-500/90 rounded-tr-sm shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
        {/* Bottom-Left */}
        <span className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-emerald-500/90 rounded-bl-sm shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
        {/* Bottom-Right */}
        <span className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-emerald-500/90 rounded-br-sm shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
      </div>

      {/* AF-C Locked Badge */}
      {showBadge && (
        <div
          className={`absolute ${badgePosClass} flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 text-[9px] font-mono tracking-wider shadow-md backdrop-blur-sm transition-transform duration-300 -translate-y-0.5 group-hover:translate-y-0 group-focus-within:translate-y-0 motion-reduce:transform-none`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse motion-reduce:animate-none" />
          <span className="font-semibold">[ AF-C · LOCKED ]</span>
        </div>
      )}

      {/* Optional Central Focus Crosshair Target */}
      {showCrosshair && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-8 h-8 flex items-center justify-center transition-transform duration-300 scale-125 group-hover:scale-100 group-focus-within:scale-100 motion-reduce:transform-none">
            {/* Horizontal Line */}
            <div className="absolute w-5 h-[1px] bg-emerald-500/50" />
            {/* Vertical Line */}
            <div className="absolute h-5 w-[1px] bg-emerald-500/50" />
            {/* Center Focus Box */}
            <div className="w-3 h-3 border border-emerald-400/60 rounded-sm" />
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Apple-grade designed content-shaped skeleton shimmer placeholders.
 * Replaces generic spinners/empty blocks with shapes matching final card & grid layouts.
 * Strictly non-announced (aria-hidden="true") to avoid screen-reader noise.
 */

export function ShowcaseSkeleton() {
  return (
    <div aria-hidden="true" className="w-full border-t border-cream-border/60 py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-10 select-none">
      {/* Header Lockup Skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
        <div className="space-y-3 w-full max-w-2xl">
          <div className="w-32 sm:w-44 h-3.5 rounded-full skeleton-shimmer" />
          <div className="w-3/4 sm:w-2/3 h-9 sm:h-12 rounded-xl skeleton-shimmer" />
          <div className="w-full h-4 rounded-md skeleton-shimmer" />
        </div>
        <div className="hidden sm:block w-24 h-7 rounded-full skeleton-shimmer" />
      </div>

      {/* Center 3D Stage Card Silhouettes */}
      <div className="relative w-full h-[480px] sm:h-[520px] flex items-center justify-center overflow-hidden">
        {/* Left card silhouette */}
        <div className="hidden md:block absolute -left-12 lg:left-12 w-[300px] h-[400px] rounded-2xl border border-cream-border/40 bg-white/40 opacity-40 transform scale-90 skeleton-shimmer" />
        {/* Center active card shape */}
        <div className="relative z-10 w-[320px] sm:w-[380px] h-[440px] sm:h-[460px] rounded-2xl border border-cream-border bg-white shadow-sm p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="aspect-[16/10] w-full rounded-xl skeleton-shimmer mb-5" />
            <div className="w-24 h-3 rounded-full skeleton-shimmer mb-3" />
            <div className="w-48 h-6 rounded-lg skeleton-shimmer mb-2" />
            <div className="w-full h-3.5 rounded skeleton-shimmer mb-1" />
            <div className="w-4/5 h-3.5 rounded skeleton-shimmer" />
          </div>
          <div className="pt-4 border-t border-cream-border/60 flex items-center justify-between">
            <div className="w-28 h-3 rounded-full skeleton-shimmer" />
            <div className="w-20 h-7 rounded-full skeleton-shimmer" />
          </div>
        </div>
        {/* Right card silhouette */}
        <div className="hidden md:block absolute -right-12 lg:right-12 w-[300px] h-[400px] rounded-2xl border border-cream-border/40 bg-white/40 opacity-40 transform scale-90 skeleton-shimmer" />
      </div>

      {/* Controls Bar Placeholder */}
      <div className="flex items-center justify-between gap-4 mt-8 px-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full skeleton-shimmer" />
          <div className="w-11 h-11 rounded-full skeleton-shimmer" />
        </div>
        <div className="w-36 h-8 rounded-full skeleton-shimmer" />
      </div>
    </div>
  );
}

export function GridSectionSkeleton({ rows = 3 }) {
  return (
    <div aria-hidden="true" className="w-full border-t border-cream-border/60 py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-10 select-none">
      {/* Header Lockup Skeleton */}
      <div className="mb-12 space-y-3 max-w-xl">
        <div className="w-32 h-3.5 rounded-full skeleton-shimmer" />
        <div className="w-3/4 h-9 sm:h-11 rounded-xl skeleton-shimmer" />
        <div className="w-full h-4 rounded-md skeleton-shimmer" />
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="bg-white border border-cream-border rounded-xl p-6 shadow-xs flex flex-col justify-between min-h-[200px]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-16 h-3 rounded-full skeleton-shimmer" />
                <div className="w-12 h-3 rounded-full skeleton-shimmer" />
              </div>
              <div className="w-4/5 h-6 rounded-lg skeleton-shimmer" />
              <div className="w-full h-3.5 rounded skeleton-shimmer" />
              <div className="w-3/4 h-3.5 rounded skeleton-shimmer" />
            </div>
            <div className="pt-4 border-t border-cream-border/60 flex items-center justify-between">
              <div className="w-20 h-3 rounded-full skeleton-shimmer" />
              <div className="w-6 h-6 rounded-full skeleton-shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// SECTION 3: STATS & REKAM JEJAK (Clean Minimal 1px Border Cards)
// ============================================================

const heroStatSubStats = [
  { value: '45+', label: 'Foto Liputan' },
  { value: '30+', label: 'Video & Recap' },
  { value: '25+', label: 'Motion & Desain' },
];

const metricCards = [
  {
    value: '3 Tahun',
    meta: 'SMAN 1 Lumajang',
    title: 'di Media Center',
    description: 'Dedikasi konsisten mendokumentasikan setiap denyut kreasi dan agenda sekolah.',
  },
  {
    value: '1,5 Tahun',
    meta: 'Kepengurusan',
    title: 'Ketua Eskul',
    description: 'Memimpin alur kerja multi-kamera, tim liputan, dan editorial konten rilis sekolah.',
  },
  {
    value: '10+ Tools',
    meta: 'Software Stack',
    title: 'Tools Kreatif',
    description: 'Premiere, After Effects, DaVinci, Lightroom, Figma, hingga modern web coding.',
  },
];

export default function Stats() {
  return (
    <section className="border-t border-cream-border py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-10 scroll-mt-20" id="stats">
      {/* Eyebrow & Display Heading Lockup */}
      <div className="mb-12">
        <span className="text-[11px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-ink-muted block mb-3">
          Arsip Liputan &amp; Rekam Jejak
        </span>
        <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tightHeadline text-ink-primary">
          Rekam jejak &amp; <span className="font-em text-slate-700">arsip</span> liputan.
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Hero Stat Card (Clean 1px border, 0 shadow, pure white card) */}
        <div className="lg:col-span-6 bg-white border border-cream-border rounded-xl p-8 sm:p-12 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-ink-muted block mb-4">Total Dokumentasi &amp; Produksi</span>
            <div className="font-display text-7xl sm:text-8xl lg:text-9xl font-semibold text-ink-primary tracking-tight leading-none mb-6">
              100+
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 pb-2 border-t border-cream-border text-xs text-ink-secondary">
              {heroStatSubStats.map((stat) => (
                <div key={stat.label}>
                  <span className="font-semibold text-ink-primary text-sm block">{stat.value}</span>
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
            <div key={card.title} className="bg-white border border-cream-border rounded-xl p-6 sm:p-7 flex flex-col justify-center">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-display text-3xl sm:text-4xl font-semibold text-ink-primary">{card.value}</span>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500">{card.meta}</span>
              </div>
              <h3 className="text-xs uppercase tracking-[0.12em] font-semibold text-ink-secondary mb-1">{card.title}</h3>
              <p className="text-xs text-ink-muted leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

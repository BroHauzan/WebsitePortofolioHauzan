// ============================================================
// SECTION 5: JOURNEY / TIMELINE — data-driven from journeyData.js
// ============================================================

import journeyEntries from '../data/journeyData';

const DOT_DEFAULT = 'absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-slate-400';
const DOT_HIGHLIGHT = 'absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-slate-800';
const DOT_FEATURED = 'absolute -left-[31px] sm:-left-[47px] top-5 w-3.5 h-3.5 rounded-full bg-slate-900';

export default function Journey() {
  return (
    <section className="border-t border-cream-border py-20 sm:py-32 max-w-7xl mx-auto px-6 sm:px-10" id="journey">
      <div className="mb-12">
        <span className="text-[11px] sm:text-xs font-semibold tracking-eyebrow uppercase text-ink-muted block mb-3">Perjalanan Kreatif</span>
        <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tightHeadline text-ink-primary">
          Dari kecil sampai <span className="font-em text-slate-700">sekarang.</span>
        </h2>
        <p className="text-sm sm:text-base text-ink-muted leading-[1.65] max-w-xl mt-3">
          Mosaik proses dan jejak langkah dari bangku sekolah dasar hingga memegang kendali media center.
        </p>
      </div>
      <div className="relative border-l border-cream-border pl-6 sm:pl-10 space-y-10">
        {journeyEntries.map((entry) => {
          if (entry.variant === 'featured') {
            // 2026 highlighted card (matches source exactly)
            return (
              <div key={entry.year} className="relative p-5 bg-white border border-slate-900 rounded-xl">
                <div aria-hidden="true" className={DOT_FEATURED}></div>
                <span className="text-xs font-mono tracking-wider text-ink-primary font-semibold uppercase">{entry.year}</span>
                <h3 className="font-display text-base sm:text-lg font-semibold text-ink-primary">{entry.title}</h3>
                <p className="text-xs text-ink-muted mt-1">{entry.description}</p>
              </div>
            );
          }
          const isHighlight = entry.variant === 'highlight';
          return (
            <div key={entry.year} className="relative">
              <div aria-hidden="true" className={isHighlight ? DOT_HIGHLIGHT : DOT_DEFAULT}></div>
              <span className={`text-xs font-mono tracking-wider uppercase ${isHighlight ? 'text-ink-primary font-semibold' : 'text-ink-muted'}`}>{entry.year}</span>
              <h3 className="font-display text-base sm:text-lg font-semibold text-ink-primary">{entry.title}</h3>
              <p className="text-xs text-ink-muted mt-1">{entry.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

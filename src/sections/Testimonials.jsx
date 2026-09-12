// ============================================================
// SECTION 6: TESTIMONIALS (What People Say)
// ============================================================

import testimonials from '../data/testimonialsData';

export default function Testimonials() {
  return (
    <section className="border-t border-cream-border py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-10" id="testimonials">
      <div className="mb-12">
        <span className="text-[11px] sm:text-xs font-semibold tracking-eyebrow uppercase text-ink-muted block mb-3">What People Say</span>
        <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tightHeadline text-ink-primary">
          Words from the people I've <span className="font-em text-slate-700">worked</span> with.
        </h2>
        <p className="text-sm sm:text-base text-ink-muted leading-[1.65] max-w-xl mt-3">
          Catatan dan apresiasi dari rekan satu tim serta kolaborator di berbagai agenda produksi.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-white border border-cream-border rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <blockquote className="text-xs sm:text-sm text-ink-muted leading-[1.7] italic mb-6">
              {t.quote}
            </blockquote>
            <div>
              <h3 className="font-display font-semibold text-sm text-ink-primary block">{t.name}</h3>
              <span className="text-[11px] font-mono uppercase tracking-wider text-ink-muted">{t.reference}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

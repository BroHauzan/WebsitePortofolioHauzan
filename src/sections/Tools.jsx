// ============================================================
// SECTION 7: TOOLS I USE — data-driven from toolsData.js
// ============================================================

import toolCategories from '../data/toolsData';

export default function Tools() {
  return (
    <section className="border-t border-cream-border py-20 sm:py-32 max-w-7xl mx-auto px-6 sm:px-10 scroll-mt-20" id="tools">
      <div className="mb-12">
        <span className="text-[11px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-ink-muted block mb-3">Tools I Use</span>
        <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tightHeadline text-ink-primary">
          The <span className="font-em text-slate-700">tools behind the work.</span>
        </h2>
        <p className="text-sm sm:text-base text-ink-muted leading-[1.65] max-w-xl mt-3">
          Perangkat lunak dan instrumen digital yang digunakan dalam alur kerja produksi harian.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {toolCategories.map((category) => (
          <div key={category.label} className="space-y-6">
            <div className="bg-white border border-cream-border rounded-xl p-6">
              <h3 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-3">{category.label}</h3>
              <div className="space-y-3">
                {category.tools.map((tool, toolIdx) => (
                  <div key={tool.name} className={`flex items-center justify-between ${toolIdx < category.tools.length - 1 ? 'border-b border-cream-border pb-2' : ''}`}>
                    <span className="font-display font-medium text-ink-primary text-base">{tool.name}</span>
                    <span className="text-xs text-ink-muted">{tool.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

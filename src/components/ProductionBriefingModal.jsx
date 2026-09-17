import { useEffect, useRef } from 'react';
import { copyToClipboard } from '../utils/toast';
import { lockBodyScroll, unlockBodyScroll } from '../utils/scrollLock';

export default function ProductionBriefingModal({ briefing, onClose }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Focus trap, focus restoration, body scroll lock, and ESC listener
  useEffect(() => {
    if (!briefing) return undefined;

    previousFocusRef.current = document.activeElement;
    lockBodyScroll();

    // Focus close button on mount
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
        return;
      }

      // Tab trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }

        const firstEl = focusable[0];
        const lastEl = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
      unlockBodyScroll();
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [briefing, onClose]);

  if (!briefing) return null;

  const handleShare = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://portofolio-hauzan-alpha.vercel.app';
    const textToCopy = `${briefing.title} — ${briefing.subtitle} | Dokumentasi Hauzan Naufal (${origin}/#works)`;
    copyToClipboard(textToCopy, `Detail proyek "${briefing.title}" disalin!`);
  };

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="briefing-modal-title"
      className="fixed inset-0 z-[60] flex justify-end"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-2xl h-full bg-[#fbfbf9] text-ink-primary shadow-2xl flex flex-col z-10 border-l border-cream-border overflow-hidden animate-slideLeft">
        {/* Drawer Header */}
        <div className="p-5 sm:p-7 border-b border-cream-border bg-white/90 backdrop-blur-md flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-ink-muted bg-cream-subtle border border-cream-border px-2.5 py-0.5 rounded-full">
                {briefing.collectionTag}
              </span>
              <span className="text-[11px] font-mono text-ink-muted">
                {briefing.year}
              </span>
            </div>
            <h2
              id="briefing-modal-title"
              className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-ink-primary leading-tight"
            >
              {briefing.title}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted mt-1 font-normal">
              {briefing.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <kbd className="hidden sm:inline-block px-2 py-1 text-[10px] font-mono text-ink-muted bg-cream-subtle border border-cream-border rounded">
              ESC
            </kbd>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Tutup Briefing Produksi"
              className="w-10 h-10 rounded-full border border-cream-border bg-white hover:bg-slate-100 transition-colors flex items-center justify-center text-ink-primary focus-ring"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-7">
          {/* Metadata Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-cream-border">
              <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted block mb-1">
                Peran &amp; Tanggung Jawab
              </span>
              <p className="text-xs sm:text-sm font-semibold text-ink-primary">
                {briefing.role}
              </p>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-cream-border">
              <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted block mb-1">
                Waktu &amp; Durasi
              </span>
              <p className="text-xs sm:text-sm font-semibold text-ink-primary">
                {briefing.timeline}
              </p>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-cream-border">
              <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted block mb-1">
                Klien &amp; Lembaga
              </span>
              <p className="text-xs sm:text-sm font-semibold text-ink-primary">
                {briefing.client}
              </p>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-cream-border">
              <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted block mb-1">
                Struktur Tim
              </span>
              <p className="text-xs sm:text-sm font-semibold text-ink-primary">
                {briefing.team}
              </p>
            </div>
          </div>

          {/* Equipment Rig & Stack */}
          <div>
            <h3 className="text-xs font-semibold tracking-eyebrow uppercase text-ink-muted mb-2.5">
              Equipment Rig &amp; Software Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {briefing.equipment.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-cream-border text-xs font-mono text-ink-secondary break-words max-w-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Production Narrative */}
          <div>
            <h3 className="text-xs font-semibold tracking-eyebrow uppercase text-ink-muted mb-2.5">
              Catatan Sutradara &amp; Tantangan Produksi
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-ink-secondary leading-[1.75]">
              {briefing.story.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <h3 className="text-xs font-semibold tracking-eyebrow uppercase text-ink-muted mb-2.5">
              Hasil Akhir &amp; Deliverables
            </h3>
            <ul className="space-y-2">
              {briefing.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-primary">
                  <span className="w-5 h-5 rounded-full bg-cream-subtle border border-cream-border flex items-center justify-center text-[10px] font-bold text-slate-700 flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Impact & Metric Highlight */}
          <div className="p-4 sm:p-5 rounded-xl bg-cream-subtle border border-cream-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted block mb-1">
              Dampak &amp; Metrik Capaian
            </span>
            <p className="text-xs sm:text-sm font-medium text-ink-primary leading-relaxed">
              {briefing.metrics}
            </p>
          </div>
        </div>

        {/* Drawer Footer Actions - responsive column on mobile, row on desktop */}
        <div className="p-4 sm:p-6 border-t border-cream-border bg-white flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
          <button
            type="button"
            onClick={handleShare}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-cream-border bg-white text-xs font-medium text-ink-secondary hover:bg-cream-subtle transition-colors focus-ring"
          >
            <svg className="w-4 h-4 text-slate-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Salin Ringkasan Proyek</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-ink-primary text-cream text-xs font-medium hover:bg-slate-800 transition-colors focus-ring text-center"
          >
            Selesai Membaca
          </button>
        </div>
      </div>
    </div>
  );
}

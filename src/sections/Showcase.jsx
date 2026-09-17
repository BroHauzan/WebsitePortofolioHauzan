import { useState, useEffect, useRef } from 'react';
import showcaseCategories from '../data/showcaseData';
import productionBriefings from '../data/briefingsData';
import { PhotographyIcon, showcaseIcons } from '../components/Icons';
import useCoverflow from '../hooks/useCoverflow';
import ProductionBriefingModal from '../components/ProductionBriefingModal';
import CameraReticleLock from '../components/CameraReticleLock';
import { BRIEFING_OPEN_EVENT, consumePendingBriefing } from '../utils/briefingEvents';

// ============================================================
// SECTION 4: SHOWCASE KARYA (3D Circular Coverflow Carousel)
// Presentation + markup only; all coverflow interaction logic
// lives in src/hooks/useCoverflow.js (verbatim port).
// ============================================================

// Resolve the per-category icon component from the shared icon map.
// Icons.jsx now exports function components, so each category icon must
// be rendered as <CategoryIcon /> rather than injected as a raw element.
// Falls back to PhotographyIcon if a category key is ever unmapped.
function CategoryIcon({ categoryKey, className }) {
  const Icon = showcaseIcons[categoryKey] ?? PhotographyIcon;
  return <Icon className={className} />;
}

export default function Showcase() {
  const [activeBriefing, setActiveBriefing] = useState(null);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const cardsRef = useRef([]);
  const dotsRef = useRef([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Listen for global open briefing events and consume any pending briefing on mount
  useEffect(() => {
    const pending = consumePendingBriefing();
    if (pending && productionBriefings[pending]) {
      setActiveBriefing(productionBriefings[pending]);
    }

    const handleOpen = (e) => {
      const id = e.detail?.id;
      if (id && productionBriefings[id]) {
        setActiveBriefing(productionBriefings[id]);
      }
    };

    window.addEventListener(BRIEFING_OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(BRIEFING_OPEN_EVENT, handleOpen);
  }, []);

  const { activeIndex, prev, next, select, handleCardClick, handleCardKeyDown } =
    useCoverflow({
      total: showcaseCategories.length,
      sectionRef,
      trackRef,
      stageRef,
      cardsRef,
      dotsRef,
      prevRef,
      nextRef,
    });

  const N = showcaseCategories.length;

  return (
    <section
      ref={sectionRef}
      aria-label="Showcase Karya Multimedia"
      aria-roledescription="carousel"
      className="border-t border-cream-border py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-10 overflow-hidden"
      id="works"
      role="region"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
        <div>
          <span className="text-[11px] sm:text-xs font-semibold tracking-eyebrow uppercase text-ink-muted block mb-3">
            Showcase Eksplorasi &amp; Karya
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tightHeadline text-ink-primary">
            Arsip visual, <span className="font-em text-slate-700">kreasi &amp; eksplorasi multimedia.</span>
          </h2>
          <p className="text-sm sm:text-base text-ink-muted leading-[1.65] max-w-2xl mt-3">
            Kurasi karya videografi panggung, festival sekolah, motion graphics, dan eksplorasi visual interaktif.
          </p>
        </div>
        {/* Top Right Compact Indicator */}
        <div className="hidden sm:flex items-center gap-3 self-start md:self-end">
          <span className="text-xs font-mono tracking-widest text-ink-muted uppercase">Index</span>
          <span aria-live="polite" className="text-xs font-mono font-semibold text-ink-primary bg-white border border-cream-border px-3 py-1 rounded-full shadow-sm">
            {`0${activeIndex + 1} / 0${N}`}
          </span>
        </div>
      </div>


      {/* 3D Circular Coverflow Carousel Stage (5 Categories) */}
      <div className="relative w-full py-6 sm:py-10 mb-4 overflow-x-clip touch-pan-y" id="carousel-track" ref={trackRef}>
        <div
          className="coverflow-perspective relative w-full h-[510px] sm:h-[530px] flex items-center justify-center select-none"
          id="coverflowStage"
          ref={stageRef}
        >
          {showcaseCategories.map((category, i) => (
            <div
              key={category.key}
              ref={(el) => { cardsRef.current[i] = el; }}
              aria-label={`Koleksi ${i + 1} dari ${N}: ${category.title}`}
              aria-roledescription="slide"
              className="coverflow-card-item relative group w-[320px] sm:w-[360px] md:w-[380px] -ml-[160px] sm:-ml-[180px] md:-ml-[190px] -mt-[245px] sm:-mt-[255px] bg-white border border-cream-border rounded-2xl overflow-hidden cursor-pointer focus-ring"
              data-category={category.key}
              data-index={i}
              role="group"
              tabIndex={i === 0 ? 0 : -1}
              onClick={(e) => handleCardClick(e, i)}
              onKeyDown={(e) => handleCardKeyDown(e, i)}
            >
              <div className="aspect-[16/10] bg-cream-subtle border-b border-cream-border relative overflow-hidden flex items-center justify-center p-6 text-center">
                {/* Camera AF Reticle Target on Hover/Focus — locks precisely on visual lens */}
                <CameraReticleLock badgePosition="top-left" className="rounded-t-2xl" />

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border border-slate-300 bg-white/80 flex items-center justify-center text-slate-600 mb-3 shadow-sm">
                    <CategoryIcon categoryKey={category.key} className="w-6 h-6" />
                  </div>
                  <span className="font-display font-medium text-slate-900 text-sm tracking-tight">{category.subtitle}</span>
                  <span className="text-[10px] font-mono uppercase tracking-eyebrow text-slate-600 mt-1">{category.visualMeta}</span>
                </div>
                <span className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider bg-white/90 border border-cream-border px-2 py-0.5 rounded-full text-slate-700">{category.badge}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-ink-muted">{category.collection}</span>
                  <span className="text-[11px] font-mono tracking-wider text-slate-600 font-medium">{category.count}</span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-ink-primary mb-2">{category.title}</h3>
                <p className="text-xs text-ink-muted leading-relaxed mb-4">{category.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-cream-border text-xs font-medium text-ink-primary">
                  <span className="text-[11px] font-mono text-ink-muted">{category.tools}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (i !== activeIndex) {
                        select(i);
                        return;
                      }
                      if (productionBriefings[category.key]) {
                        setActiveBriefing(productionBriefings[category.key]);
                      }
                    }}
                    className="card-action-link inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform text-slate-900 font-semibold hover:underline focus-ring rounded text-xs"
                    tabIndex={i === activeIndex ? 0 : -1}
                  >
                    {category.ctaLabel}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coverflow Controls Bar (Minimalist Buttons + Segmented Dots) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-14 px-2">
        <div className="flex items-center gap-3">
          {/* Prev Button */}
          <button
            ref={prevRef}
            aria-controls="coverflowStage"
            aria-label="Kategori Sebelumnya"
            className="w-11 h-11 rounded-full border border-cream-border bg-white text-ink-primary hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center focus-ring shadow-sm cursor-pointer"
            type="button"
            onClick={(e) => { e.preventDefault(); prev(); }}
          >
            <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </button>
          {/* Next Button */}
          <button
            ref={nextRef}
            aria-controls="coverflowStage"
            aria-label="Kategori Selanjutnya"
            className="w-11 h-11 rounded-full border border-cream-border bg-white text-ink-primary hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center focus-ring shadow-sm cursor-pointer"
            type="button"
            onClick={(e) => { e.preventDefault(); next(); }}
          >
            <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </button>
          <span className="text-xs text-ink-muted ml-2 hidden md:inline">Gunakan panah keyboard ← → atau swipe sentuh untuk navigasi</span>
        </div>
        {/* Dot / Segmented Pill Indicator */}
        <div
          aria-label="Indikator Kategori Carousel"
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-cream-border shadow-sm"
          id="carouselIndicators"
          role="group"
        >
          {showcaseCategories.map((category, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={category.key}
                ref={(el) => { dotsRef.current[i] = el; }}
                aria-label={`Tampilkan ${category.title}`}
                aria-current={isActive ? 'true' : undefined}
                className="indicator-dot grid h-6 w-6 place-items-center rounded-full transition-all focus-ring"
                data-target={i}
                type="button"
                onClick={() => select(i)}
              >
                <span
                  aria-hidden="true"
                  className={`block rounded-full transition-all ${
                    isActive ? 'h-2 w-7 bg-slate-900' : 'h-2 w-2 bg-slate-300 hover:bg-slate-500'
                  }`}
                ></span>
              </button>
            );
          })}
        </div>
      </div>
      {/* KATALOG TERBUKA: Videografi & Produksi Pilihan */}
      <div className="bg-white border border-cream-border rounded-xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-cream-border gap-2">
          <div>
            <h3 className="text-[11px] font-semibold tracking-eyebrow uppercase text-ink-muted">KATALOG TERBUKA: VIDEOGRAFI PILIHAN</h3>
            <p className="text-xs text-ink-muted mt-0.5">Dokumentasi utama yang diproduksi bersama tim Media Center &amp; OSIS IT Pubdok.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              document.getElementById('carousel-track')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-slate-900 hover:text-slate-600 transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto focus-ring rounded"
          >
            <span>Jelajahi Galeri Penuh</span>
            <span aria-hidden="true">↑</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setActiveBriefing(productionBriefings['dies-natalis'])}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveBriefing(productionBriefings['dies-natalis']);
              }
            }}
            className="relative border-l-2 border-cream-border hover:border-slate-900 pl-4 py-2.5 cursor-pointer transition-all hover:bg-cream-subtle/70 rounded-r-lg group focus-ring overflow-hidden"
          >
            <CameraReticleLock badgePosition="bottom-right" showCrosshair={false} className="rounded-r-lg" />
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted">Live Concert &amp; Stage</span>
              <span className="text-[10px] font-mono text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">Briefing ↗</span>
            </div>
            <h4 className="text-ink-primary font-semibold text-sm block mb-1 group-hover:text-slate-900">Dies Natalis Smaga: Simfoni Cahaya</h4>
            <p className="text-ink-muted leading-relaxed">Coverage dokumentasi acara puncak festival tahunan, konser bintang tamu, dan teaser pembuka.</p>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={() => setActiveBriefing(productionBriefings['profil-ekskul'])}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveBriefing(productionBriefings['profil-ekskul']);
              }
            }}
            className="relative border-l-2 border-cream-border hover:border-slate-900 pl-4 py-2.5 cursor-pointer transition-all hover:bg-cream-subtle/70 rounded-r-lg group focus-ring overflow-hidden"
          >
            <CameraReticleLock badgePosition="bottom-right" showCrosshair={false} className="rounded-r-lg" />
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted">Recruitment &amp; Showcase</span>
              <span className="text-[10px] font-mono text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">Briefing ↗</span>
            </div>
            <h4 className="text-ink-primary font-semibold text-sm block mb-1 group-hover:text-slate-900">Profil Ekstrakurikuler Multimedia</h4>
            <p className="text-ink-muted leading-relaxed">Rangkaian video promosi organisasi dan pengenalan divisi ekstrakurikuler untuk MPLS.</p>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={() => setActiveBriefing(productionBriefings['pelepasan-wisuda'])}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveBriefing(productionBriefings['pelepasan-wisuda']);
              }
            }}
            className="relative border-l-2 border-cream-border hover:border-slate-900 pl-4 py-2.5 cursor-pointer transition-all hover:bg-cream-subtle/70 rounded-r-lg group focus-ring overflow-hidden"
          >
            <CameraReticleLock badgePosition="bottom-right" showCrosshair={false} className="rounded-r-lg" />
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted">Ceremonial Broadcast</span>
              <span className="text-[10px] font-mono text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">Briefing ↗</span>
            </div>
            <h4 className="text-ink-primary font-semibold text-sm block mb-1 group-hover:text-slate-900">Pelepasan Wisuda Angkatan 64</h4>
            <p className="text-ink-muted leading-relaxed">Video kenangan angkatan, siaran multicam seremonial kelulusan, dan wawancara wisudawan.</p>
          </div>
        </div>
      </div>

      {/* Production Briefing Modal / Slide-over Drawer */}
      <ProductionBriefingModal
        briefing={activeBriefing}
        onClose={() => setActiveBriefing(null)}
      />
    </section>
  );
}

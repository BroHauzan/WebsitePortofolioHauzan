import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// ============================================================
// Section order:
// 01 Hero (#home) · 02 About (#about) · 03 Stats (#stats)
// 04 Showcase (#works) · 05 Journey (#journey)
// 06 Testimonials (#testimonials) · 07 Tools (#tools)
// 08 Footer (#contact)
//
// EAGER (above the fold, part of the first paint / critical path):
//   Hero, About, Stats
// LAZY (below the fold, split into separate Vite chunks by
// React.lazy + dynamic import; requested only when they render):
//   Showcase, Journey, Testimonials, Tools
// ============================================================

// Above the fold — static imports on purpose (no waterfall on LCP).
import Hero from './sections/Hero';
import About from './sections/About';
import Stats from './sections/Stats';

// Below the fold — one chunk per section.
const Showcase = lazy(() => import('./sections/Showcase'));
const Journey = lazy(() => import('./sections/Journey'));
const Testimonials = lazy(() => import('./sections/Testimonials'));
const Tools = lazy(() => import('./sections/Tools'));

// ============================================================
// Suspense fallback: a reserved-height, non-announced placeholder.
//
// - minHeight reserves roughly the final height of each section so
//   the document below it does not jump when the chunk arrives
//   (no large layout shift on slow connections).
// - aria-hidden: the placeholder carries no content, so it must not
//   enter the accessibility tree. No visible "Loading…" text is
//   rendered — the chunks are tiny and a text label would only
//   flicker for a frame or two.
//
// ANCHOR CAVEAT: the ids #works / #journey / #testimonials / #tools
// live inside the section components themselves, so those anchors do
// not exist in the DOM until the matching chunk has loaded and
// mounted. Inherent to lazy-loading; the reserved min-height keeps
// scroll order stable and the browser's scroll anchoring absorbs any
// residual height difference for the visible viewport.
// ============================================================
function SectionFallback({ minHeight }) {
  return <div aria-hidden="true" className={`w-full ${minHeight}`} />;
}

export default function App() {
  return (
    <>
      {/* Skip link: visually hidden until focused (first tab stop). */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-ink-primary focus:text-cream focus:text-sm focus:font-medium"
      >
        Lewati ke konten utama
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative pt-28 sm:pt-36 outline-none">
        <Hero />
        <About />
        <Stats />
        <Suspense fallback={<SectionFallback minHeight="min-h-[1600px] sm:min-h-[1500px]" />}>
          <Showcase />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight="min-h-[1400px] sm:min-h-[1300px]" />}>
          <Journey />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight="min-h-[1200px] sm:min-h-[700px]" />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight="min-h-[1300px] sm:min-h-[900px]" />}>
          <Tools />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

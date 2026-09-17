import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import CommandPalette from './components/CommandPalette';

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

import { ShowcaseSkeleton, GridSectionSkeleton } from './components/SectionSkeleton';

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
        <Suspense fallback={<ShowcaseSkeleton />}>
          <Showcase />
        </Suspense>
        <Suspense fallback={<GridSectionSkeleton rows={4} />}>
          <Journey />
        </Suspense>
        <Suspense fallback={<GridSectionSkeleton rows={3} />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<GridSectionSkeleton rows={6} />}>
          <Tools />
        </Suspense>
      </main>
      <Footer />
      <CommandPalette />
      <Toast />
    </>
  );
}

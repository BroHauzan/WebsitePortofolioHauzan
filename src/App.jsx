import { lazy, Suspense, useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import CommandPalette from './components/CommandPalette';
import CinemaBootSequence from './components/CinemaBootSequence';

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
// ============================================================
function SectionFallback({ minHeight }) {
  return <div aria-hidden="true" className={`w-full ${minHeight}`} />;
}

export default function App() {
  const [rackFocusState, setRackFocusState] = useState(() => {
    if (typeof window === 'undefined') return 'crisp';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'crisp';
    try {
      return sessionStorage.getItem('introPlayed') === 'true' ? 'crisp' : 'blurred';
    } catch {
      return 'crisp';
    }
  });

  const handleShutterOpen = useCallback(() => {
    setRackFocusState('crisp');
  }, []);

  return (
    <>
      <CinemaBootSequence onShutterOpen={handleShutterOpen} />

      {/* Skip link: visually hidden until focused (first tab stop). */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[10000] focus:px-4 focus:py-2 focus:rounded-full focus:bg-ink-primary focus:text-cream focus:text-sm focus:font-medium"
      >
        Lewati ke konten utama
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative pt-28 sm:pt-36 outline-none">
        <Hero rackFocusState={rackFocusState} />
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
      <CommandPalette />
      <Toast />
    </>
  );
}

// ============================================================
// FLOATING PERSISTENT NAV (School Website Editorial Style)
// Anchors preserved exactly: #home #about #stats #works #journey
// #testimonials #tools #contact
//
// Responsive behavior:
// - >= 1024px (lg): inline link row + CTA. The desktop row does NOT
//   fit at md (768px): brand + 6 links + CTA measured 831px > 768px
//   (audit P0 2026-09-13), so the desktop layout only activates at lg.
// - < 1024px: the inline row is hidden, so this file owns one
//   explicit drawer plus a 44x44px hamburger trigger, so all six
//   anchors and the CTA stay reachable (WCAG 2.5.8 target size).
// ============================================================

import { useEffect, useState, useCallback } from 'react';
import { openCommandPalette } from '../utils/paletteEvents';
import { triggerMediumHaptic } from '../utils/haptics';
import useMagneticCursor from '../hooks/useMagneticCursor';

const navLinks = [
  { href: '#about', label: 'Cerita' },
  { href: '#stats', label: 'Statistik' },
  { href: '#works', label: 'Karya' },
  { href: '#journey', label: 'Perjalanan' },
  { href: '#testimonials', label: 'Testimoni' },
  { href: '#tools', label: 'Tools' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Magnetic cursor hooks for desktop CTA and Search buttons
  const searchMagnet = useMagneticCursor(0.2);
  const ctaMagnet = useMagneticCursor(0.25);

  // Smooth continuous scroll-linked adaptive vibrancy
  const handleScroll = useCallback(() => {
    const y = window.scrollY || 0;
    const progress = Math.min(1, Math.max(0, y / 80));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close on Escape, and lock background scroll while the drawer is open.
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  // Collapse the drawer as soon as the layout switches to the desktop
  // nav (>= 1024px) so it can never linger open over the desktop view.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handleChange = (event) => {
      if (event.matches) setOpen(false);
    };

    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-40 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-200"
      style={{
        backgroundColor: `rgba(251, 251, 249, ${0.68 + scrollProgress * 0.26})`,
        backdropFilter: `blur(${10 + scrollProgress * 12}px) saturate(${140 + scrollProgress * 40}%)`,
        WebkitBackdropFilter: `blur(${10 + scrollProgress * 12}px) saturate(${140 + scrollProgress * 40}%)`,
        borderBottom: `1px solid rgba(226, 226, 220, ${scrollProgress})`,
        boxShadow: scrollProgress > 0.3 ? '0 4px 20px -2px rgba(15, 23, 42, 0.04)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-16 sm:h-20 flex items-center justify-between">
        <a aria-label="Beranda Hauzan Naufal" className="flex items-center gap-2.5 text-ink-primary hover:opacity-80 transition-opacity focus-ring rounded" href="#home">
          <span className="font-display font-semibold text-lg tracking-tight">Hauzan Naufal</span>
          <span className="hidden sm:inline-block text-[11px] uppercase tracking-wider text-slate-600 px-2 py-0.5 border border-cream-border rounded-full bg-cream-subtle">Pubdok</span>
        </a>
        {/* Clean Minimal Nav Links (desktop only — unchanged behavior) */}
        <nav aria-label="Navigasi Utama" className="hidden lg:flex items-center space-x-10 text-xs uppercase tracking-[0.12em] font-medium text-ink-muted">
          {navLinks.map((link) => (
            <a key={link.href} className="hover:text-ink-primary transition-colors focus-ring rounded" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        {/* Actions (desktop): Search Cmd+K & CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            ref={searchMagnet.ref}
            style={searchMagnet.style}
            onMouseMove={searchMagnet.onMouseMove}
            onMouseLeave={searchMagnet.onMouseLeave}
            type="button"
            onClick={() => {
              triggerMediumHaptic();
              openCommandPalette();
            }}
            aria-label="Cari dan buka Command Palette (Cmd+K)"
            className="apple-press inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cream-border/90 bg-white/80 hover:bg-white text-ink-muted hover:text-ink-primary hover:border-slate-400 transition-all text-xs font-mono focus-ring shadow-xs"
          >
            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-[11px]">Cari...</span>
            <kbd className="px-1.5 py-0.5 text-[9px] uppercase font-mono font-medium text-slate-500 bg-cream-subtle border border-cream-border rounded">⌘K</kbd>
          </button>
          <a
            ref={ctaMagnet.ref}
            style={ctaMagnet.style}
            onMouseMove={ctaMagnet.onMouseMove}
            onMouseLeave={ctaMagnet.onMouseLeave}
            className="apple-press text-xs px-5 py-2.5 rounded-full bg-ink-primary text-cream font-medium hover:bg-slate-800 transition-colors inline-flex items-center gap-2 focus-ring shadow-sm"
            href="#contact"
          >
            <span>Hubungi</span>
            <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </a>
        </div>
        {/* Mobile action buttons: Search + Hamburger */}
        <div className="lg:hidden flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              triggerMediumHaptic();
              setOpen(false);
              openCommandPalette();
            }}
            aria-label="Buka pencarian dan Command Palette"
            className="apple-press w-11 h-11 inline-flex items-center justify-center rounded-lg text-ink-primary hover:bg-ink-primary/5 transition-colors focus-ring"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button
            aria-controls="mobile-nav-drawer"
            aria-expanded={open}
            aria-label={open ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className="apple-press w-11 h-11 inline-flex items-center justify-center rounded-lg text-ink-primary hover:bg-ink-primary/5 transition-colors focus-ring"
            type="button"
            onClick={() => {
              triggerMediumHaptic();
              setOpen((prev) => !prev);
            }}
          >
            {open ? (
              <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            ) : (
              <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <path d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* Mobile drawer — conditional render keeps aria-expanded truthful */}
      {open && (
        <div
          className="lg:hidden border-t border-cream-border bg-cream/95 backdrop-blur-md"
          id="mobile-nav-drawer"
        >
          <nav aria-label="Navigasi Mobile" className="max-w-7xl mx-auto px-6 sm:px-10 py-5">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openCommandPalette();
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 mb-3 rounded-lg border border-cream-border bg-white text-xs font-mono text-ink-muted hover:text-ink-primary transition-colors focus-ring"
            >
              <span className="flex items-center gap-2 font-sans font-medium text-ink-primary">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Buka Command Palette</span>
              </span>
              <kbd className="px-1.5 py-0.5 text-[10px] uppercase font-mono text-slate-500 bg-cream-subtle border border-cream-border rounded">⌘K</kbd>
            </button>
            <ul className="flex flex-col gap-1 text-sm uppercase tracking-[0.12em] font-medium text-ink-muted">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    className="block rounded-lg px-3 py-3 hover:bg-ink-primary/5 hover:text-ink-primary transition-colors focus-ring"
                    href={link.href}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink-primary px-5 py-3 text-xs font-medium text-cream hover:bg-slate-800 transition-colors focus-ring"
              href="#contact"
              onClick={() => setOpen(false)}
            >
              <span>Hubungi</span>
              <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

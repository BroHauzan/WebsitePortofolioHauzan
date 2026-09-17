import { useState, useRef, useEffect } from 'react';
import { copyToClipboard } from '../utils/toast';
import { triggerSuccessHaptic } from '../utils/haptics';

// ============================================================
// FOOTER: Deep Midnight Navy Block with Structured Columns
// id="contact" preserved so the navbar CTA anchor keeps working.
// ============================================================

const footerNavLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#stats', label: 'Statistik' },
  { href: '#works', label: 'Showcase' },
  { href: '#journey', label: 'Journey' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#tools', label: 'Tools' },
];

const socialLinks = [
  { href: 'https://www.instagram.com/brohauzan/', label: '@brohauzan (Instagram)' },
  { href: 'https://www.tiktok.com/@hauzanbro', label: '@hauzanbro (TikTok)' },
  { href: 'https://www.youtube.com/@HauzanBro', label: '@HauzanBro (YouTube)' },
  { href: 'https://github.com/BroHauzan', label: '@BroHauzan (GitHub)' },
];

// On the dark midnight footer the focus ring is white/20; the global
// `.focus-ring` utility is tuned for light surfaces (slate-900/20) and
// would be invisible here, so these links keep their own light ring.
const footerLinkFocus =
  'hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded';

export default function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const copyTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const handleCopyEmail = async () => {
    const ok = await copyToClipboard(
      'hauzannaufal2008@gmail.com',
      'Email hauzannaufal2008@gmail.com berhasil disalin ke papan klip!'
    );
    if (ok) {
      triggerSuccessHaptic();
      setCopiedEmail(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  return (
    <footer className="w-full bg-midnight text-cream border-t border-slate-800 mt-20" id="contact">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-display text-2xl font-medium tracking-tight text-white block mb-2">Hauzan Naufal</h2>
              <p className="text-xs uppercase tracking-eyebrow text-slate-400 font-medium mb-4">MULTIMEDIA PRODUCTION &amp; VISUAL ARTS</p>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                Kurasi dokumentasi visual, penyusunan narasi kreatif, dan eksplorasi multimedia SMAN 1 Lumajang.
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-800/80 text-xs text-ink-tertiary flex flex-wrap items-center justify-between gap-4">
              <span>© {new Date().getFullYear()} Hauzan Naufal. All rights reserved.</span>
              <span className="uppercase tracking-wider font-mono text-[11px]">Lumajang, Jawa Timur · Indonesia</span>
            </div>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 gap-8 text-sm">
            <div>
              <h3 className="text-xs font-semibold tracking-eyebrow uppercase text-slate-400 mb-4">Navigation</h3>
              <ul className="space-y-2.5 text-slate-300">
                {footerNavLinks.map((link) => (
                  <li key={link.href}>
                    <a className={footerLinkFocus} href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold tracking-eyebrow uppercase text-slate-400 mb-4">Contact</h3>
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Salin alamat email hauzannaufal2008@gmail.com"
                className="apple-press text-white font-medium text-xs flex items-center gap-2 mb-4 group hover:text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded"
              >
                <span className="underline decoration-slate-500 group-hover:decoration-white underline-offset-2 break-all">
                  hauzannaufal2008@gmail.com
                </span>
                {copiedEmail ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 text-[10px] font-mono bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40 flex-shrink-0">
                    <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-strokeDraw" />
                    </svg>
                    <span>Tersalin!</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-slate-400 group-hover:text-slate-200 text-[10px] font-mono bg-slate-800/90 px-1.5 py-0.5 rounded border border-slate-700 flex-shrink-0">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Salin</span>
                  </span>
                )}
              </button>
              <ul className="space-y-2 text-xs text-slate-400">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a className={footerLinkFocus} href={link.href} rel="noopener noreferrer" target="_blank">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

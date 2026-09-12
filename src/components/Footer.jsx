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
              <p className="text-xs text-slate-400 leading-relaxed mb-3">Terbuka untuk diskusi proyek liputan, kolaborasi konten, dan eksplorasi visual.</p>
              <a className="text-white font-medium text-xs block mb-4 hover:underline break-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded" href="mailto:hauzannaufal2008@gmail.com">
                hauzannaufal2008@gmail.com
              </a>
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

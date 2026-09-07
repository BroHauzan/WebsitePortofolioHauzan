// ============================================================
// FLOATING PERSISTENT NAV (School Website Editorial Style)
// Anchors preserved exactly: #home #about #stats #works #journey
// #testimonials #tools #contact
// ============================================================

const navLinks = [
  { href: '#about', label: 'Cerita' },
  { href: '#stats', label: 'Statistik' },
  { href: '#works', label: 'Karya' },
  { href: '#journey', label: 'Perjalanan' },
  { href: '#testimonials', label: 'Testimoni' },
  { href: '#tools', label: 'Tools' },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 nav-frosted-light transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-16 sm:h-20 flex items-center justify-between">
        <a aria-label="Beranda Hauzan Naufal" className="flex items-center gap-2.5 text-[#0f172a] hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 focus-visible:ring-offset-2 rounded" href="#home">
          <span className="font-display font-semibold text-lg tracking-tight">Hauzan Naufal</span>
          <span className="hidden sm:inline-block text-[11px] uppercase tracking-wider text-ink-muted px-2 py-0.5 border border-cream-border rounded-full bg-[#f4f4f0]">Pubdok</span>
        </a>
        {/* Clean Minimal Nav Links */}
        <nav aria-label="Navigasi Utama" className="hidden md:flex items-center space-x-8 lg:space-x-10 text-xs uppercase tracking-[0.12em] font-medium text-ink-muted">
          {navLinks.map((link) => (
            <a key={link.href} className="hover:text-ink-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 focus-visible:ring-offset-2 rounded" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        {/* Action CTA Button */}
        <div>
          <a className="text-xs px-5 py-2.5 rounded-full bg-[#0f172a] text-[#f8fafc] font-medium hover:bg-slate-800 transition-colors inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 focus-visible:ring-offset-2" href="#contact">
            <span className="">Hubungi</span>
            <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}

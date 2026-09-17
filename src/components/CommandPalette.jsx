import { useState, useEffect, useRef, useMemo } from 'react';
import { PALETTE_OPEN_EVENT } from '../utils/paletteEvents';
import { openProductionBriefing } from '../utils/briefingEvents';
import { copyToClipboard } from '../utils/toast';
import { lockBodyScroll, unlockBodyScroll } from '../utils/scrollLock';

// Helper for smooth scrolling to section with dynamic lazy-load retry
function scrollToSection(id) {
  window.location.hash = `#${id}`;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  } else {
    // Retry shortly in case the lazy chunk is mounting into DOM
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  }
}

// Static Registry of Command Items
const COMMAND_ITEMS = [
  // Navigasi Bagian
  {
    id: 'nav-home',
    title: 'Beranda (Hero)',
    description: 'Kembali ke bagian teratas halaman utama',
    category: 'Navigasi',
    badge: '#home',
    keywords: ['beranda', 'home', 'top', 'awal', 'hero', 'atas'],
    action: () => scrollToSection('home'),
  },
  {
    id: 'nav-about',
    title: 'Cerita & Dedikasi (About)',
    description: 'Profil Hauzan Naufal & kepengurusan Media Center',
    category: 'Navigasi',
    badge: '#about',
    keywords: ['cerita', 'about', 'profil', 'bio', 'sekolah', 'sman 1 lumajang', 'osis'],
    action: () => scrollToSection('about'),
  },
  {
    id: 'nav-stats',
    title: 'Rekam Jejak & Statistik',
    description: 'Capaian 100+ liputan & 3 tahun dedikasi',
    category: 'Navigasi',
    badge: '#stats',
    keywords: ['statistik', 'stats', 'angka', 'rekam jejak', 'total', 'liputan'],
    action: () => scrollToSection('stats'),
  },
  {
    id: 'nav-works',
    title: 'Showcase & Arsip Karya',
    description: 'Coverflow 3D fotografi, videografi, motion & sinema',
    category: 'Navigasi',
    badge: '#works',
    keywords: ['showcase', 'karya', 'works', 'video', 'foto', 'coverflow', 'film'],
    action: () => scrollToSection('works'),
  },
  {
    id: 'nav-journey',
    title: 'Garis Waktu Perjalanan',
    description: 'Perjalanan sejak sekolah dasar hingga purna eskul',
    category: 'Navigasi',
    badge: '#journey',
    keywords: ['journey', 'perjalanan', 'timeline', 'sekolah', 'riwayat', 'tahun'],
    action: () => scrollToSection('journey'),
  },
  {
    id: 'nav-testimonials',
    title: 'Testimoni Kolaborator',
    description: 'Ulasan dari pembina eskul, rekan tim & mitra',
    category: 'Navigasi',
    badge: '#testimonials',
    keywords: ['testimoni', 'testimonials', 'ulasan', 'rekan', 'pembina'],
    action: () => scrollToSection('testimonials'),
  },
  {
    id: 'nav-tools',
    title: 'Tools & Perangkat Kreatif',
    description: 'Premiere, DaVinci, After Effects, Figma & Tech Stack',
    category: 'Navigasi',
    badge: '#tools',
    keywords: ['tools', 'software', 'hardware', 'alat', 'premiere', 'davinci', 'after effects'],
    action: () => scrollToSection('tools'),
  },
  {
    id: 'nav-contact',
    title: 'Kontak & Kolaborasi',
    description: 'Surel hauzannaufal2008@gmail.com & media sosial',
    category: 'Navigasi',
    badge: '#contact',
    keywords: ['kontak', 'contact', 'email', 'surel', 'hubungi', 'pesan'],
    action: () => scrollToSection('contact'),
  },

  // Briefing Produksi
  {
    id: 'brief-dies-natalis',
    title: 'Briefing: Dies Natalis Smaga (Simfoni Cahaya)',
    description: 'Live Concert & Stage Coverage 2025 · Sony FX3 / A7 Rig',
    category: 'Briefing Produksi',
    badge: 'Briefing ↗',
    keywords: ['dies natalis', 'simfoni cahaya', 'konser', 'stage', 'panggung', 'aftermovie'],
    action: () => {
      openProductionBriefing('dies-natalis');
    },
  },
  {
    id: 'brief-profil-ekskul',
    title: 'Briefing: Profil Ekstrakurikuler Multimedia',
    description: 'Video Promosi MPLS & Aset Animasi 3D',
    category: 'Briefing Produksi',
    badge: 'Briefing ↗',
    keywords: ['profil ekskul', 'ekstrakurikuler', 'mpls', 'promosi', 'motion'],
    action: () => {
      openProductionBriefing('profil-ekskul');
    },
  },
  {
    id: 'brief-pelepasan-wisuda',
    title: 'Briefing: Pelepasan Wisuda Angkatan 64',
    description: 'Multicam Live Broadcast & Film Kenangan 3 Tahun',
    category: 'Briefing Produksi',
    badge: 'Briefing ↗',
    keywords: ['wisuda', 'pelepasan', 'angkatan 64', 'broadcast', 'siaran langsung'],
    action: () => {
      openProductionBriefing('pelepasan-wisuda');
    },
  },
  {
    id: 'brief-photography',
    title: 'Koleksi: Fotografi 35mm & Panggung',
    description: '45+ Folder liputan panggung & potret editorial',
    category: 'Briefing Produksi',
    badge: 'Briefing ↗',
    keywords: ['fotografi', 'photography', '35mm', 'stage', 'panggung', 'portrait'],
    action: () => {
      openProductionBriefing('photography');
    },
  },
  {
    id: 'brief-videography',
    title: 'Koleksi: Sinematografi & Aftermovie Acara',
    description: '30+ Produksi recap video multi-kamera',
    category: 'Briefing Produksi',
    badge: 'Briefing ↗',
    keywords: ['sinematografi', 'videography', 'video', 'aftermovie', 'recap'],
    action: () => {
      openProductionBriefing('videography');
    },
  },
  {
    id: 'brief-motion',
    title: 'Koleksi: Identitas Bergerak & Tipografi Kinetik',
    description: '25+ Aset animasi siaran & kinetik 60 FPS',
    category: 'Briefing Produksi',
    badge: 'Briefing ↗',
    keywords: ['motion graphic', 'vfx', 'animasi', 'bumper', 'tipografi'],
    action: () => {
      openProductionBriefing('motion');
    },
  },
  {
    id: 'brief-shortfilm',
    title: 'Koleksi: Film Pendek & Narasi Sinematik',
    description: 'Eksplorasi cerita fiksi & festival film pelajar Jatim',
    category: 'Briefing Produksi',
    badge: 'Briefing ↗',
    keywords: ['film pendek', 'short film', 'cinema', 'cerita', 'fls2n'],
    action: () => {
      openProductionBriefing('shortfilm');
    },
  },
  {
    id: 'brief-webdev',
    title: 'Koleksi: Platform Web Arsip Multimedia',
    description: 'Sistem web editorial akademik, React 18 & Tailwind',
    category: 'Briefing Produksi',
    badge: 'Briefing ↗',
    keywords: ['web', 'webdev', 'react', 'tailwind', 'coding', 'portfolio'],
    action: () => {
      openProductionBriefing('webdev');
    },
  },

  // Aksi Cepat & Kontak
  {
    id: 'act-copy-email',
    title: 'Salin Alamat Surel (Email)',
    description: 'hauzannaufal2008@gmail.com',
    category: 'Tindakan Cepat',
    badge: 'Salin ⎘',
    keywords: ['salin email', 'copy email', 'surel', 'surat', 'kontak'],
    action: () => {
      copyToClipboard('hauzannaufal2008@gmail.com', 'Email hauzannaufal2008@gmail.com berhasil disalin!');
    },
  },
  {
    id: 'act-instagram',
    title: 'Buka Instagram (@brohauzan)',
    description: 'Galeri visual dokumentasi & feed editorial',
    category: 'Tindakan Cepat',
    badge: 'Eksternal ↗',
    keywords: ['instagram', 'ig', 'sosmed', 'foto', 'feed'],
    action: () => {
      window.open('https://www.instagram.com/brohauzan/', '_blank', 'noopener,noreferrer');
    },
  },
  {
    id: 'act-youtube',
    title: 'Buka YouTube (@HauzanBro)',
    description: 'Kanal video rekaman pentas & aftermovie',
    category: 'Tindakan Cepat',
    badge: 'Eksternal ↗',
    keywords: ['youtube', 'yt', 'video', 'channel', 'aftermovie'],
    action: () => {
      window.open('https://www.youtube.com/@HauzanBro', '_blank', 'noopener,noreferrer');
    },
  },
  {
    id: 'act-tiktok',
    title: 'Buka TikTok (@hauzanbro)',
    description: 'Klip vertikal, BTS liputan & konten video pendek',
    category: 'Tindakan Cepat',
    badge: 'Eksternal ↗',
    keywords: ['tiktok', 'vt', 'reels', 'pendek', 'bts'],
    action: () => {
      window.open('https://www.tiktok.com/@hauzanbro', '_blank', 'noopener,noreferrer');
    },
  },
  {
    id: 'act-github',
    title: 'Buka GitHub (@BroHauzan)',
    description: 'Repositori kode sumber sistem portofolio',
    category: 'Tindakan Cepat',
    badge: 'Eksternal ↗',
    keywords: ['github', 'git', 'kode', 'source code', 'repo'],
    action: () => {
      window.open('https://github.com/BroHauzan', '_blank', 'noopener,noreferrer');
    },
  },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Global Keyboard Shortcut listener (Cmd+K, Ctrl+K, or '/')
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      const isKKey = e.key?.toLowerCase() === 'k' || e.code === 'KeyK';

      if (isCmdOrCtrl && isKKey) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen((prev) => !prev);
        return;
      }

      // '/' opens palette only if not typing in input/textarea and no modal dialog is open
      if (
        e.key === '/' &&
        !isOpen &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA' &&
        !document.activeElement?.isContentEditable &&
        !document.querySelector('[role="dialog"]')
      ) {
        e.preventDefault();
        setIsOpen(true);
        return;
      }

      // Escape closes palette and stops propagation so underlying modals remain stable
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
      }
    };

    const handleOpenEvent = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener(PALETTE_OPEN_EVENT, handleOpenEvent);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener(PALETTE_OPEN_EVENT, handleOpenEvent);
    };
  }, [isOpen]);

  // Manage body scroll lock, focus trap, and focus restoration
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setSelectedIndex(0);
      return undefined;
    }

    previousFocusRef.current = document.activeElement;
    lockBodyScroll();

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    // Tab trap within Command Palette dialog
    const handleTabTrap = (e) => {
      if (e.key !== 'Tab' || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll(
        'input, button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length <= 1) {
        e.preventDefault();
        inputRef.current?.focus();
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
    };

    document.addEventListener('keydown', handleTabTrap);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleTabTrap);
      unlockBodyScroll();
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen]);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMAND_ITEMS;

    return COMMAND_ITEMS.filter((item) => {
      if (item.title.toLowerCase().includes(q)) return true;
      if (item.description.toLowerCase().includes(q)) return true;
      if (item.category.toLowerCase().includes(q)) return true;
      return item.keywords.some((k) => k.includes(q));
    });
  }, [query]);

  // Reset selected index when search query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems]);

  // Keyboard list navigation (ArrowDown, ArrowUp, Enter)
  const handleListKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = filteredItems[selectedIndex];
      if (item) {
        setIsOpen(false);
        item.action();
      }
    }
  };

  // Scroll active item into view smoothly
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-[70] flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24"
      onKeyDown={handleListKeyDown}
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-backdrop"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-xl bg-[#fbfbf9] text-ink-primary border border-cream-border rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 animate-fadeIn">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-cream-border bg-white gap-3">
          <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari bagian, briefing produksi, atau tindakan..."
            className="w-full bg-transparent text-sm sm:text-base text-ink-primary placeholder:text-ink-muted outline-none"
            aria-autocomplete="list"
            aria-controls="palette-results-list"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-ink-muted hover:text-ink-primary transition-colors text-xs focus-ring rounded"
            >
              Hapus
            </button>
          )}

          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-ink-muted bg-cream-subtle border border-cream-border rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          id="palette-results-list"
          role="listbox"
          className="max-h-[60vh] sm:max-h-[380px] overflow-y-auto p-2 divide-y divide-cream-border/40 select-none"
        >
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm font-medium text-ink-primary mb-1">
                Tidak ada perintah yang cocok
              </p>
              <p className="text-xs text-ink-muted">
                Coba kata kunci seperti &quot;dies natalis&quot;, &quot;tools&quot;, &quot;about&quot;, atau &quot;email&quot;.
              </p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  data-index={idx}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    setIsOpen(false);
                    item.action();
                  }}
                  onMouseMove={() => {
                    if (selectedIndex !== idx) {
                      setSelectedIndex(idx);
                    }
                  }}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'hover:bg-cream-subtle text-ink-primary'
                  }`}
                >
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs sm:text-sm font-medium ${isSelected ? 'text-white' : 'text-ink-primary'}`}>
                        {item.title}
                      </span>
                      <span className={`text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-slate-800 text-slate-300' : 'bg-cream-subtle text-ink-muted border border-cream-border'
                      }`}>
                        {item.category}
                      </span>
                    </div>
                    <p className={`text-xs truncate mt-0.5 ${isSelected ? 'text-slate-300' : 'text-ink-muted'}`}>
                      {item.description}
                    </p>
                  </div>

                  <span className={`text-[11px] font-mono px-2 py-1 rounded flex-shrink-0 ${
                    isSelected ? 'bg-slate-800 text-slate-200' : 'bg-white border border-cream-border text-slate-600'
                  }`}>
                    {item.badge}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Guide */}
        <div className="px-4 py-2.5 bg-white border-t border-cream-border flex items-center justify-between text-[11px] font-mono text-ink-muted">
          <div className="flex items-center gap-3">
            <span><strong className="font-semibold text-slate-700">↑↓</strong> navigasi</span>
            <span><strong className="font-semibold text-slate-700">↵</strong> pilih</span>
            <span><strong className="font-semibold text-slate-700">esc</strong> tutup</span>
          </div>
          <span className="hidden sm:inline text-[10px]">Hauzan Naufal · Portofolio OS</span>
        </div>
      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from 'react';
import ViewfinderFrame from '../components/ViewfinderFrame';
import { copyToClipboard } from '../utils/toast';

// ============================================================
// SECTION 2: ABOUT ME (Editorial Magazine Storytelling)
// ============================================================

const socialPills = [
  { href: 'https://www.instagram.com/brohauzan/', label: 'Instagram' },
  { href: 'https://www.tiktok.com/@hauzanbro', label: 'TikTok' },
  { href: 'https://www.youtube.com/@HauzanBro', label: 'YouTube' },
  { href: 'https://github.com/BroHauzan', label: 'GitHub' },
];

export default function About() {
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
      setCopiedEmail(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  return (
    <section className="border-t border-cream-border py-20 sm:py-32 max-w-7xl mx-auto px-6 sm:px-10" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-5">
          <div className="sticky top-28">
            <div className="bg-white border border-cream-border rounded-xl overflow-hidden p-2 shadow-sm">
              <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-slate-950">
                <ViewfinderFrame mode="portrait" />
              </div>
            </div>
            <p className="mt-4 text-xs text-ink-muted tracking-normal leading-relaxed text-center sm:text-left">
              Hauzan Naufal — Lumajang, Jawa Timur. OSIS Sekbid 9 &amp; Ketua Media Center SMAN 1 Lumajang.
            </p>
          </div>
        </div>
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="mb-4">
            <span className="text-[11px] sm:text-xs font-semibold tracking-eyebrow uppercase text-ink-muted">Profil &amp; Dedikasi Visual</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-medium tracking-tightHeadline text-ink-primary leading-[1.12] mb-8">
            Who’s on <span className="font-em text-slate-700">camera duty</span> today?
          </h2>
          <div className="space-y-6 text-ink-muted text-base sm:text-lg leading-[1.75] font-normal">
            <p className="text-ink-primary text-lg sm:text-xl font-normal leading-[1.7]">
              Hi, I'm Hauzan Naufal. A high schooler, Chairperson of Media Center (2025/2026), and part of OSIS Section 9 (IT &amp; Pubdok) at SMAN 1 Lumajang.
            </p>
            <p>
              I spend most of my time leading the visual team, shooting school events, designing for OSIS, and creating photos and cinematic recaps. It all started from just messing around editing class event videos, which surprisingly turned into a real passion.
            </p>
            <p>
              Now, whenever an event pops up, I'm usually the first one asking, <span className="text-ink-primary font-medium">"who's on camera duty today?"</span>. Right now, my main goal is to expand my knowledge, level up my skills, and connect with more creators along the way.
            </p>
          </div>
          <div className="my-10 py-6 border-y border-cream-border">
            <p className="font-em text-2xl sm:text-3xl text-ink-primary leading-[1.4] tracking-tight">
              “Telling stories through photos and videos. Step by step, one frame at a time.”
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap">
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Salin alamat email hauzannaufal2008@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-ink-primary text-slate-50 text-sm font-medium hover:bg-ink-secondary transition-all focus-ring active:scale-95"
            >
              <span>hauzannaufal2008@gmail.com</span>
              {copiedEmail ? (
                <span className="inline-flex items-center gap-1 text-emerald-300 text-xs font-mono">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Tersalin!</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-slate-300 text-xs font-mono">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Salin</span>
                </span>
              )}
            </button>
            <div className="flex flex-wrap items-center gap-2">
              {socialPills.map((pill) => (
                <a key={pill.href} className="border border-slate-300 rounded-full px-4 py-1.5 text-sm font-medium text-slate-800 hover:border-slate-900 transition-colors bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 focus-visible:ring-offset-2" href={pill.href} rel="noopener noreferrer" target="_blank">
                  {pill.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

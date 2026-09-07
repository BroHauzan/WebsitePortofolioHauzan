import { CameraIcon } from '../components/Icons';

// ============================================================
// HERO SECTION: Warm Editorial & Authentic School Media Style
// ============================================================

const skills = ['Photography', 'Videography', 'Motion Graphic', 'Short Film', 'Web Development'];

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-10 pb-20 sm:pb-28 scroll-mt-24" id="home">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Left Column: Typography Lockup with Eyebrow */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          {/* Eyebrow label positioned strictly above heading */}
          <div className="mb-4">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-ink-muted">
              Ketua Media Center SMAN 1 Lumajang &amp; OSIS IT Pubdok
            </span>
          </div>
          {/* Single H1 on whole page */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.15rem] font-medium tracking-tightHeadline text-ink-primary leading-[1.08] mb-3">
            Hauzan <span className="font-em text-slate-700">Naufal</span>
          </h1>
          <p className="font-display text-xl sm:text-2xl font-normal text-ink-primary tracking-tight mb-4">
            Capturing moments, crafting motion &amp; <span className="font-em text-slate-700">visuals.</span>
          </p>
          <p className="text-ink-muted text-base sm:text-lg font-normal leading-[1.7] mb-8 max-w-lg">
            Hauzan Naufal — sutradara visual dan juru kamera sekolah. Mengabadikan denyut acara, menyusun ritme narasi dari satu frame ke frame berikutnya.
          </p>
          {/* Skills list in editorial plain text separated by clean thin vertical lines */}
          <div className="pt-6 border-t border-cream-border">
            <p className="text-xs uppercase tracking-[0.14em] font-semibold text-ink-muted mb-3">Bidang Keahlian</p>
            <div className="flex flex-wrap items-center gap-y-2 text-xs sm:text-[13px] text-ink-secondary font-medium">
              {skills.map((skill, i) => (
                <span key={skill} className="flex items-center">
                  <span className="tracking-wide text-ink-primary">{skill}</span>
                  {i < skills.length - 1 && (
                    <span aria-hidden="true" className="text-slate-300 select-none px-3 font-light">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Right Column: Hero Visual Feature Image */}
        <div className="lg:col-span-7">
          <div className="relative group bg-cream-card rounded-2xl overflow-hidden border border-cream-border">
            <div aria-label="Frame karya sinematik Hauzan Naufal di SMAN 1 Lumajang" className="aspect-[16/9] w-full overflow-hidden bg-slate-100" role="img">
              <div className="w-full h-full bg-[#f4f4f0] flex flex-col items-center justify-center p-6 text-center border border-dashed border-[#d1d1ca] relative overflow-hidden select-none">
                <div className="w-12 h-12 rounded-full border border-[#c6c6cd] flex items-center justify-center text-slate-500 mb-3 bg-white/70">
                  {CameraIcon}
                </div>
                <span className="font-display font-medium text-slate-800 text-sm sm:text-base tracking-tight mb-1">Placeholder Foto / Frame Karya Sinematik</span>
                <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-slate-500">16:9 · 35mm Lumajang Documenter</span>
              </div>
            </div>
            {/* Caption Strip directly beneath image frame */}
            <div className="bg-white px-5 py-4 border-t border-cream-border flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-medium text-ink-secondary">BTS · High School Festival Coverage 2025/2026</span>
              <span className="text-[11px] font-mono tracking-tight text-ink-muted">35mm Rig · Lumajang, Jatim</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

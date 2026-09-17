import ViewfinderFrame from '../components/ViewfinderFrame';
import useParallax from '../hooks/useParallax';
import useScrollReveal from '../hooks/useScrollReveal';

// ============================================================
// HERO SECTION: Warm Editorial & Authentic School Media Style
// Enhanced with Apple Optical Typography & Subtle Parallax Depth
// ============================================================

const skills = ['Photography', 'Videography', 'Motion Graphic', 'Short Film', 'Web Development'];

export default function Hero() {
  const { ref: revealRef, isRevealed } = useScrollReveal(0.05);
  const { ref: parallaxRef, style: parallaxStyle } = useParallax(0.035);

  return (
    <section ref={revealRef} className="max-w-7xl mx-auto px-6 sm:px-10 pb-20 sm:pb-28" id="home">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Left Column: Choreographed Typography Lockup with Optical Tracking */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          {/* Eyebrow label with positive optical tracking */}
          <div className={`mb-4 stagger-reveal stagger-delay-1 ${isRevealed ? 'revealed' : ''}`}>
            <span className="text-[11px] sm:text-xs font-semibold tracking-eyebrow-optical text-ink-muted">
              Ketua Media Center SMAN 1 Lumajang &amp; OSIS IT Pubdok
            </span>
          </div>

          {/* Single H1 on whole page with Breakpoint-Adjusted Negative Tracking */}
          <div className={`stagger-reveal stagger-delay-2 ${isRevealed ? 'revealed' : ''}`}>
            <h1 className="font-display-hero text-4xl sm:text-6xl lg:text-[4.15rem] font-medium text-ink-primary mb-3">
              Hauzan <span className="font-em text-slate-700">Naufal</span>
            </h1>
            <p className="font-display text-xl sm:text-2xl font-normal text-ink-primary tracking-tight mb-4">
              Capturing moments, crafting motion &amp; <span className="font-em text-slate-700">visuals.</span>
            </p>
          </div>

          {/* Body Text & Skills list */}
          <div className={`stagger-reveal stagger-delay-3 ${isRevealed ? 'revealed' : ''}`}>
            <p className="text-ink-muted text-base sm:text-lg font-normal leading-[1.7] mb-8 max-w-lg">
              Hauzan Naufal — sutradara visual dan juru kamera sekolah. Mengabadikan denyut acara, menyusun ritme narasi dari satu frame ke frame berikutnya.
            </p>

            {/* Skills list in editorial plain text separated by clean thin vertical lines */}
            <div className="pt-6 border-t border-cream-border">
              <p className="text-xs uppercase tracking-eyebrow-optical font-semibold text-ink-muted mb-3">Bidang Keahlian</p>
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
        </div>

        {/* Right Column: Hero Visual Feature Image with Subtle Optical Parallax */}
        <div className="lg:col-span-7">
          <div
            ref={parallaxRef}
            style={parallaxStyle}
            className="relative group apple-glass rounded-2xl overflow-hidden border border-cream-border/90 shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            <div className="aspect-[16/9] w-full overflow-hidden bg-slate-950">
              <ViewfinderFrame mode="cinema" />
            </div>
            {/* Caption Strip directly beneath image frame */}
            <div className="bg-white/90 backdrop-blur-sm px-5 py-4 border-t border-cream-border flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-medium text-ink-secondary">BTS · High School Festival Coverage 2025/2026</span>
              <span className="text-[11px] font-mono tracking-tight text-ink-muted">35mm Rig · Lumajang, Jatim</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

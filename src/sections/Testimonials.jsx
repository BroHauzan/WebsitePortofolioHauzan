import { useState, useEffect } from 'react';
import testimonials from '../data/testimonialsData';
import CameraReticleLock from '../components/CameraReticleLock';

// ============================================================
// SECTION 6: TESTIMONIALS (Voice Memo & Field Recorder Archive)
// Documentary school media center narrative with waveform graphic,
// live visual playback scrubber, timecode badge, and collaborator details.
// ============================================================

export default function Testimonials() {
  const [playingId, setPlayingId] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!playingId) {
      setProgress(0);
      return;
    }

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setPlayingId(null);
          return 0;
        }
        return prev + 2.5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [playingId]);

  const togglePlayback = (id) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      setProgress(0);
    }
  };

  const handleWaveformClick = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    setPlayingId(id);
    setProgress(newProgress);
  };

  const formatPlaybackTime = (pct, durationStr) => {
    const [m, s] = durationStr.split(':').map(Number);
    const totalSecs = (m || 0) * 60 + (s || 0);
    const currentSecs = Math.floor((pct / 100) * totalSecs);
    const mins = Math.floor(currentSecs / 60);
    const secs = currentSecs % 60;
    const pad = (n) => String(n).padStart(2, '0');
    return `PLAY ${pad(mins)}:${pad(secs)} / ${durationStr}`;
  };

  return (
    <section
      className="border-t border-cream-border py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-10"
      id="testimonials"
    >
      <div className="mb-12">
        <span className="text-[11px] sm:text-xs font-semibold tracking-eyebrow-optical uppercase text-ink-muted block mb-3">
          Rekaman Kolaborasi &amp; Testimoni
        </span>
        <h2 className="font-display-section text-3xl sm:text-5xl font-medium text-ink-primary">
          Voice memo dari <span className="font-em text-slate-700">rekan liputan.</span>
        </h2>
        <p className="text-sm sm:text-base text-ink-muted leading-[1.65] max-w-xl mt-3">
          Arsip audio log dan catatan kurasi dari tim produksi Media Center SMAN 1 Lumajang.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t) => {
          const isPlaying = playingId === t.id;

          return (
            <div
              key={t.name}
              className="apple-card-hover relative group bg-white border border-cream-border rounded-xl p-6 sm:p-7 flex flex-col justify-between shadow-sm transition-all hover:border-slate-400 focus-ring overflow-hidden"
            >
              {/* AF Reticle Lock on Hover — positioned bottom-right so audio controls remain clear */}
              <CameraReticleLock badgePosition="bottom-right" showCrosshair={false} className="rounded-xl" />

              <div>
                {/* Field Recorder Header Strip */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-cream-border text-[10px] font-mono">
                  <button
                    type="button"
                    onClick={() => togglePlayback(t.id)}
                    aria-label={isPlaying ? `Jeda audio memo ${t.name}` : `Putar visualisasi audio memo ${t.name}`}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all cursor-pointer focus-ring ${
                      isPlaying
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold'
                        : 'bg-cream-subtle text-slate-700 border-cream-border hover:bg-slate-100'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                      }`}
                    />
                    <span>{isPlaying ? 'PAUSE ❚❚' : 'PLAY ▶'}</span>
                    <span className="text-[9px] text-slate-500 hidden sm:inline">{t.trackFile}</span>
                  </button>

                  <div className="flex items-center gap-2 text-ink-muted">
                    <span className="tabular-nums font-medium">
                      {isPlaying ? (
                        <span className="text-emerald-600 font-semibold">
                          {formatPlaybackTime(progress, t.duration)}
                        </span>
                      ) : (
                        t.timecode
                      )}
                    </span>
                  </div>
                </div>

                {/* Speech Audio Waveform Graphic with Interactive Click-to-Scrub */}
                <div
                  className="mb-6 p-3 bg-cream-subtle/80 rounded-lg border border-cream-border/80 cursor-pointer select-none hover:bg-cream-subtle transition-colors"
                  onClick={(e) => handleWaveformClick(e, t.id)}
                  title="Klik untuk scrub dan putar audio memo"
                >
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 uppercase mb-2">
                    <span>{t.channel}</span>
                    <span>{t.format}</span>
                  </div>

                  <div className="relative flex items-end gap-[3px] h-9" aria-hidden="true">
                    {/* Scrubbing playhead line */}
                    {isPlaying && (
                      <div
                        className="absolute top-0 bottom-0 w-[1.5px] bg-emerald-500 z-10 transition-all duration-100 shadow-[0_0_6px_rgba(16,185,129,0.8)]"
                        style={{ left: `${progress}%` }}
                      />
                    )}

                    {t.waveform.map((barHeight, idx) => {
                      const barPct = (idx / t.waveform.length) * 100;
                      const hasPlayed = isPlaying && barPct <= progress;

                      return (
                        <span
                          key={idx}
                          className={`flex-1 rounded-full transition-all duration-200 origin-bottom ${
                            hasPlayed
                              ? 'bg-emerald-600'
                              : isPlaying
                              ? 'bg-slate-700'
                              : 'bg-slate-400 group-hover:bg-slate-600'
                          }`}
                          style={{
                            height: `${barHeight}%`,
                            animation:
                              isPlaying && Math.abs(barPct - progress) < 15
                                ? 'audioBarPulse 0.8s ease-in-out infinite alternate'
                                : 'none',
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Testimonial Quote */}
                <blockquote className="text-xs sm:text-sm text-ink-muted leading-[1.7] italic mb-6">
                  {t.quote}
                </blockquote>
              </div>

              {/* Collaborator & Production Details Footer */}
              <div className="pt-4 border-t border-cream-border">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-display font-semibold text-sm text-ink-primary">{t.name}</h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-medium">
                    {t.reference}
                  </span>
                </div>
                <p className="text-xs text-ink-secondary font-medium">{t.role}</p>
                <span className="text-[10px] font-mono text-ink-muted block mt-0.5">
                  {t.location}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

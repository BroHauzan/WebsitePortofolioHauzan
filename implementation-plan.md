# Implementation Plan — Hauzan Naufal Portfolio "Wow Features"

**Project:** WebsitePortofolioHauzan (repo: BroHauzan/WebsitePortofolioHauzan)
**Stack:** HTML/CSS/vanilla JS (+ GSAP where noted)
**Existing aesthetic:** Camera/viewfinder HUD (REC timers, f-stop/ISO/shutter readouts, AF-C eye detect frames) layered on an Apple-editorial layout (serif display headings w/ italic accent word, tracked uppercase eyebrow labels, thin-border cards).

Goal: layer in a set of "wow" details that reinforce the camera/documentary identity without breaking the calm, professional Apple-style tone. Nothing here should feel gimmicky — every effect ties back to photography/videography metaphors already present in the design (REC, AF, ISO, shutter, EXIF, film).

---

## Priority order (recommended build sequence)

| # | Feature | Impact | Effort | Notes |
|---|---------|--------|--------|-------|
| 1 | Opening sequence (boot + shutter + focus-in name) | Very High | Medium | First-impression, biggest "wow" |
| 2 | Live/reactive HUD readouts in hero | High | Low | Cheap, high perceived polish |
| 3 | Shutter transition on showcase carousel | High | Medium | Reinforces theme at a key interaction point |
| 4 | "Now Focusing" AF cursor/hover box on cards | Medium-High | Medium | Distinct micro-interaction |
| 5 | Count-up stats with waveform accent | Medium | Low | Easy win in Statistik section |
| 6 | EXIF-style captions on every showcase item | Medium | Low (if data exists) | Authenticity boost |
| 7 | Camera-roll / film-strip gallery for full work view | Medium | Medium-High | Best if a work detail page exists |
| 8 | Testimonial as "voice memo" card | Low-Medium | Medium | Nice-to-have, do last |

---

## 1. Opening Sequence (Boot → Shutter → Focus-in)

**Where:** Runs once on first paint, before/over the hero section.

**Sequence (total ~2–2.5s, always skippable):**
1. Full-black screen, monospace HUD text types in line by line:
   - `INITIALIZING SENSOR...`
   - `AF LOCKED ●` (green dot)
   - `ISO 400 · f/1.8 · 24fps`
2. A pulsing red `● REC` dot appears centered for a beat before the reveal.
3. Shutter effect: two black panels (top/bottom or left/right) slide open like a camera shutter/aperture.
4. As the shutter opens, the hero headline "Hauzan Naufal" starts blurred (`filter: blur(12px)`) and animates to sharp (`blur(0)`) over ~0.6–0.8s — simulating a lens racking into focus. Optional: subtle "AF confirm" beep sound, muted by default, never relied upon.

**Behavior rules:**
- Must be skippable at any time via click, keypress, or scroll — jump straight to final state.
- Only play once per session: set `sessionStorage.setItem('introPlayed', 'true')` and check on load; skip entirely on repeat visits/navigation within the same session.
- Respect `prefers-reduced-motion`: if set, skip straight to the final state with no animation.
- Must not block Lighthouke/performance — keep it CSS-transform/opacity driven, avoid layout thrashing, preload nothing heavy before it.

**Suggested implementation approach:**
- Vanilla JS + CSS transitions/keyframes (no heavy library needed).
- Structure: `#intro-overlay` fixed, full-viewport, `z-index` above everything, containing the HUD text lines and two `.shutter-panel` divs.
- On sequence end: overlay fades/removes itself from DOM (`display: none` or removed) so it doesn't sit in the accessibility tree.

---

## 2. Live/Reactive HUD Readouts (Hero)

**Where:** Hero section HUD box (currently shows static `REC 00:14:22:08`, `4K DCI · 24.00 FPS`, `f/1.8 · 1/50s · ISO 400`, etc.)

**Changes:**
- REC timer counts up continuously from `00:00:00:00` starting when the hero enters view (or from page load), formatted `HH:MM:SS:FF`.
- Every few seconds, subtly cycle/jitter one HUD value (e.g. ISO 400 → 385 → 410, or shutter 1/50s → 1/60s) to feel like a live sensor reading, not a static label. Keep changes small and infrequent (every 3–6s) so it reads as "alive," not distracting.
- Keep all changes achieved via `setInterval`/`requestAnimationFrame` on text content only — no layout shift.

---

## 3. Shutter Transition on Showcase Carousel

**Where:** Showcase section (Photography / Videography / Motion Graphic / Short Film / Web Development cards, currently a carousel with arrow/keyboard/swipe nav).

**Effect:** On navigating to the next/prev card, two panels (or an iris/aperture-style clip-path circle) close over the current card, swap content, then open to reveal the new card — mimicking a camera shutter firing between shots.

**Implementation notes:**
- Pure CSS: two `::before`/`::after` panels animate `transform: scaleY()` or a `clip-path` circle animates radius 100% → 0% → 100%.
- Duration: ~300–400ms total (150–200ms close, swap content, 150–200ms open) — must stay snappy, this is a navigation action, not a hero moment.
- Apply consistently to arrow clicks, keyboard nav, and swipe gestures.

---

## 4. "Now Focusing" AF Cursor / Hover Box on Cards

**Where:** Showcase cards and any hoverable work item.

**Effect:** On hover, a small AF (auto-focus) bracket box — visually consistent with the existing "AF-C · EYE DETECT" frame element already used on the profile photo — snaps to the hovered card's bounds or follows the cursor with a slight lag/spring.

**Implementation notes:**
- Absolutely positioned div with corner-bracket styling (matches existing HUD frame corners already in the design).
- On `mouseenter`, animate position/size to match `getBoundingClientRect()` of the hovered card with a short ease (`transition: all 0.2s ease-out`) for the "snap-focus" feel.
- Optional label inside/near the box: `FOCUSING...` → `LOCKED` after snap completes.

---

## 5. Count-Up Stats + Waveform Accent (Statistik section)

**Where:** Statistik section — `100+` total, `45+` Foto Liputan, `30+` Video & Recap, `25+` Motion & Desain, `3 Tahun`, `1,5 Tahun`, `10+ Tools`.

**Effect:**
- Numbers count up from 0 to their final value when the section scrolls into view (IntersectionObserver trigger), over ~1–1.5s with ease-out.
- Optional: a thin animated waveform/equalizer-bar SVG sits behind or beside the big numbers, subtly animating (looping) to reinforce a "recording/data" feel — keep it low-opacity so it doesn't compete with the number.

**Implementation notes:**
- IntersectionObserver to trigger only once when section first enters viewport.
- Simple JS counter (`requestAnimationFrame` easing function) — no library needed.

---

## 6. EXIF-Style Captions on Every Showcase Item

**Where:** Every item across Showcase/Karya section (not just the one profile photo that currently has this).

**Format (matches existing pattern):** `35mm · f/1.8 · 1/320s · ISO 200 · LUMAJANG` style caption under/near each work item's thumbnail or detail view.

**Implementation notes:**
- Treat as a data field per work item (e.g. in a JSON/array of work objects: `{ title, category, lens, aperture, shutter, iso, location }`).
- If real EXIF data exists for the photos, pull actual values — this is what makes it feel authentic rather than decorative.
- For video/motion/web items without real EXIF, use a consistent alternate metadata line (e.g. software/tool + duration/dimensions) rather than faking camera EXIF.

---

## 7. Camera-Roll / Film-Strip Gallery (full work view)

**Where:** A dedicated "view all" or detail view per category, if/when built.

**Effect:** Horizontal-scrolling strip styled like analog film — sprocket holes along top/bottom edge, frame dividers between items — while keeping the overall page chrome (nav, footer) in the existing minimal Apple style.

**Implementation notes:**
- CSS `overflow-x: auto` scroll-snap container; sprocket holes as a repeating background pattern (SVG or `radial-gradient` repeating) on top/bottom strips.
- Scope this to a real "browse all work in a category" view — don't force it onto the main homepage showcase, which should stay in its current card-carousel format.

---

## 8. Testimonial as "Voice Memo" Card

**Where:** Testimoni section.

**Effect:** Instead of a plain quote card, style each testimonial like a voice-recorder/interview clip: a small static waveform graphic, a "play" affordance (can be non-functional/decorative if no audio exists), name + role, and duration-style label (e.g. `0:14`).

**Implementation notes:**
- Purely visual/decorative version is fine (no real audio required) — the goal is the *look* of a voice memo, reinforcing "documentation" theme.
- If real audio testimonials exist, this becomes a genuine feature (actual playable clips); otherwise keep it a styled static card.

---

## Cross-cutting requirements

- **Performance:** All effects must be CSS-transform/opacity driven where possible; avoid layout-triggering properties in animations. Target Lighthouse 90+ after adding these.
- **Accessibility:** Respect `prefers-reduced-motion` globally — every animation in this plan should have a reduced/instant fallback. Ensure the AF cursor/hover effects don't trap keyboard focus or hide focus outlines.
- **Consistency:** Reuse the existing HUD visual language (corner brackets, monospace readout font, red/green status dots) across all new features rather than introducing new visual motifs — the goal is one coherent camera-metaphor system, not scattered effects.
- **Session behavior:** Only the opening sequence (#1) should be once-per-session; all other effects (#2–8) run every time their section/element is in view or hovered.

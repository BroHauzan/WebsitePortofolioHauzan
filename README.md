# WebsitePortofolioHauzan

Portofolio Hauzan Naufal — Visual Storyteller, Ketua Media Center SMAN 1 Lumajang & OSIS IT Pubdok. Menampilkan karya fotografi, videografi, dan motion graphics.

Live: `https://portofolio-hauzan-alpha.vercel.app/`

## Stack + versi nyata

- React `18.3.1`, React DOM `18.3.1`
- Vite `5.4.21` (range `^5.4.11`), `@vitejs/plugin-react` `4.3.4`
- Tailwind CSS `3.4.19` (range `^3.4.17`), PostCSS `8.4.49`, Autoprefixer `10.4.20`
- Fonts: Fraunces + Geist (Google Fonts). `Inter` sengaja tidak dimuat karena stack `sans` memakai `Geist` lebih dulu, jadi Inter tidak pernah dirender. `Instrument Serif` juga tidak dimuat — stack `.font-em` memakai `Fraunces` italic (axis `1,9..144,300..800`) yang sudah meng-cover italic, jadi Instrument Serif 100% dead weight. Fraunces latin di-`preload` (lihat bagian Performance).
- Tanpa router, tanpa backend, tanpa env.

## Cara jalan

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output ke dist/
npm run preview  # preview hasil build
```

## Section / anchor

Urutan di `src/App.jsx`:

| # | Section | File | Anchor | Load |
|---|---------|------|--------|------|
| 0 | Navbar (desktop nav + drawer mobile) | `src/components/Navbar.jsx` | `#home` `#about` `#stats` `#works` `#journey` `#testimonials` `#tools` `#contact` | eager |
| 1 | Hero | `src/sections/Hero.jsx` | `#home` | eager |
| 2 | About | `src/sections/About.jsx` | `#about` | eager |
| 3 | Stats | `src/sections/Stats.jsx` | `#stats` | eager |
| 4 | Showcase (3D coverflow, 5 kategori) | `src/sections/Showcase.jsx` + `src/hooks/useCoverflow.js` | `#works` | lazy |
| 5 | Journey (timeline 2010–2026) | `src/sections/Journey.jsx` | `#journey` | lazy |
| 6 | Testimonials | `src/sections/Testimonials.jsx` | `#testimonials` | lazy |
| 7 | Tools | `src/sections/Tools.jsx` | `#tools` | lazy |
| 8 | Footer | `src/components/Footer.jsx` | `#contact` | eager |

Kategori Showcase (`src/data/showcaseData.js`): Photography, Videography, Motion Graphic, Short Film, Web Development. Semua `ctaHref` masih `#works` (placeholder, belum ada tujuan eksternal).

## Struktur folder

```
index.html
vite.config.js          # base: './' (relative — benar untuk Vercel dan sub-path hosting lain)
postcss.config.js
public/
  .nojekyll             # sisa: tidak dipakai lagi setelah GitHub Pages dihentikan
  favicon.ico
  apple-touch-icon.png
  robots.txt            # SEO dasar; arahkan crawler ke sitemap.xml
  sitemap.xml           # single-URL sitemap untuk project page sub-path
  404.html              # halaman 404 custom (standalone HTML tanpa React)
  assets/images/og-cover.jpg
  assets/videos/        # kosong
src/
  main.jsx
  App.jsx
  styles/global.css     # @tailwind + coverflow + navbar
  components/Navbar.jsx, Footer.jsx, Icons.jsx
  sections/Hero.jsx, About.jsx, Stats.jsx, Showcase.jsx, Journey.jsx, Testimonials.jsx, Tools.jsx
  data/showcaseData.js, journeyData.js, toolsData.js, testimonialsData.js
  hooks/useCoverflow.js # logika 3D coverflow (DOM-driven)
DESIGN.md               # token desain, bukan runtime
```

Artefak non-runtime ada di disk tapi **tidak** di-commit (lihat `.gitignore`): `code.html` (referensi visual Stitch lama), `orchestrator/`, `orchestrator.final-cleanup.yml`, `audit/`, `.kilocode/` (history task agent — bisa berisi kredensial API), `.kilo/`.

## Accessibility & Performance

- **Skip link** ke `#main-content` sebagai tab stop pertama; `<main id="main-content" tabIndex={-1}>`.
- **Navbar mobile**: tombol hamburger `md:hidden` (target 44×44px) dengan `aria-expanded` / `aria-controls="mobile-nav-drawer"`; drawer menutup saat link diklik, tombol Escape ditekan, atau viewport naik ke ≥768px. Scroll body dikunci saat drawer terbuka.
- **Kontras**: semua teks abu-abu di latar terang memakai `text-ink-muted` / `text-slate-600`; copyright footer memakai `text-ink-tertiary`. Rasio minimum yang dipakai ≥4.5:1 (WCAG AA).
- **Carousel**: dot indikator berukuran ≥24×24px (WCAG 2.2 SC 2.5.8), kartu jauh di-set `inert` + `aria-hidden` agar keluar dari urutan Tab, kartu aktif selalu bebas `inert`.
- **Reduced motion**: `scroll-behavior: smooth` hanya aktif pada `prefers-reduced-motion: no-preference`; `@media (prefers-reduced-motion: reduce)` mematikan animasi coverflow.
- **Anchor offset** bersumber tunggal dari `html { scroll-padding-top: 5rem }` di `src/styles/global.css` (tidak ada `scroll-mt-*` di section).
- **Code splitting**: Hero/About/Stats eager; Showcase/Journey/Testimonials/Tools di-`React.lazy` dengan `Suspense` fallback ber-`min-height`. React+React DOM dipisah ke chunk `react-vendor` via `manualChunks`. Catatan: anchor `#works` dll. baru ada di DOM setelah chunk-nya termuat.
- **Fonts**: Fraunces latin di-`preload` (`<link rel="preload" as="font" type="font/woff2" crossorigin>`); URL `gstatic` ter-version, jadi bila Google merilis versi baru preload tinggal diabaikan browser (aman).

## Env

Tidak ada. Tidak pakai `.env`.

## Deploy / Vercel

Repo: `https://github.com/BroHauzan/WebsitePortofolioHauzan` — live di `https://portofolio-hauzan-alpha.vercel.app/` (hosting Vercel, menyajikan situs dari **root** domain).

- `vite.config.js` pakai `base: './'` (relative base). Benar untuk Vercel (root) maupun hosting sub-path tanpa perlu konfigurasi per-target. **Jangan kembalikan ke `/WebsitePortofolioHauzan/`** — path itu milik GitHub Pages dan menyebabkan halaman putih (asset 404) di Vercel.
- `package.json` `homepage`: `https://portofolio-hauzan-alpha.vercel.app/`.
- Semua URL di `index.html` (canonical, `og:url`, `twitter:url`, `og:image`, `twitter:image`) mengarah ke domain Vercel. Favicon dan apple-touch-icon pakai path relatif (`./favicon.ico`).
- **Auto-deploy Vercel**: setiap push ke `main` akan memicu build di dashboard Vercel. Tidak perlu `.github/workflows/deploy.yml` lagi — workflow GitHub Pages sudah dihapus karena `has_pages: false` (GitHub Pages belum pernah diaktifkan untuk repo ini).
- `public/404.html` berisi standalone HTML tanpa React, disajikan langsung oleh Vercel untuk halaman yang belum ada.

## GitHub Pages (dihentikan)

Workflow `.github/workflows/deploy.yml` sudah **dihapus**. GitHub Pages belum pernah aktif (`has_pages: false`) dan konfigurasi sekarang mengarah ke Vercel.

## Status placeholder

- Foto hero / about masih placeholder (ikon kamera/person).
- `showcaseData.js` belum punya aset media asli (tidak ada field gambar; cara menambahkannya ada di komentar header file itu).
- `public/assets/videos/` kosong.
- CTA kategori showcase masih `#works` (self-link; perlu tujuan eksternal seperti Drive/Pixieset/Instagram).
- Testimoni: Jeryco, Rafi, Sella (data statis).
- Kontak: `hauzannaufal2008@gmail.com`, Instagram `@brohauzan`, TikTok `@hauzanbro`, YouTube `@HauzanBro`, GitHub `@BroHauzan`.

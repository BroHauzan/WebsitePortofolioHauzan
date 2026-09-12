# WebsitePortofolioHauzan

Portofolio Hauzan Naufal — Visual Storyteller, Ketua Media Center SMAN 1 Lumajang & OSIS IT Pubdok. Menampilkan karya fotografi, videografi, dan motion graphics.

Live: `https://brohauzan.github.io/WebsitePortofolioHauzan/`

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
vite.config.js          # base: '/WebsitePortofolioHauzan/'
tailwind.config.js
postcss.config.js
.github/workflows/deploy.yml  # auto-deploy ke GitHub Pages
public/
  .nojekyll             # file kosong, diminta GitHub Pages (lihat bagian Deploy)
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

## Deploy / GitHub Pages

Repo: `https://github.com/BroHauzan/WebsitePortofolioHauzan` — live di `https://brohauzan.github.io/WebsitePortofolioHauzan/` (project page, jadi situs disajikan dari sub-path `/WebsitePortofolioHauzan/`, bukan root).

- `vite.config.js` pakai `base: '/WebsitePortofolioHauzan/'`.
- `package.json` `homepage`: `https://brohauzan.github.io/WebsitePortofolioHauzan/`.
- Semua URL absolut di `index.html` (canonical, favicon, apple-touch-icon, `og:url`, `og:image`, `twitter:url`, `twitter:image`) sudah memakai sub-path yang sama.
- **Auto-deploy**: `.github/workflows/deploy.yml` jalan otomatis tiap push ke branch `main` (dan bisa dipicu manual lewat `workflow_dispatch`). Alurnya: `npm ci` → `npm run build` → upload `./dist` sebagai Pages artifact → `actions/deploy-pages`. Tidak perlu commit `dist/`.
- **Pengaktifan Pages (WAJIB manual, sekali)**: `enablement: true` pada step `actions/configure-pages` **tidak dipakai** karena `GITHUB_TOKEN` tidak punya hak admin untuk `POST /repos/{owner}/{repo}/pages`. Halaman ini akan tetap 404 sampai Pages diaktifkan dari UI: Settings → Pages → Build and deployment → Source = **GitHub Actions**. Setelah itu workflow akan berhasil.
- `public/.nojekyll` disalin apa adanya ke `dist/` saat build. File ini mematikan pemrosesan Jekyll di Pages sehingga folder yang diawali garis bawah (mis. `_assets`) dan file lain tidak di-skip.
- `dist/` tidak di-commit (di-`.gitignore`); build sepenuhnya di runner.

## Status placeholder

- Foto hero / about masih placeholder (ikon kamera/person).
- `showcaseData.js` belum punya aset media asli (tidak ada field gambar; cara menambahkannya ada di komentar header file itu).
- `public/assets/videos/` kosong.
- CTA kategori showcase masih `#works` (self-link; perlu tujuan eksternal seperti Drive/Pixieset/Instagram).
- Testimoni: Jeryco, Rafi, Sella (data statis).
- Kontak: `hauzannaufal2008@gmail.com`, Instagram `@brohauzan`, TikTok `@hauzanbro`, YouTube `@HauzanBro`, GitHub `@BroHauzan`.

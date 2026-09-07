# WebsitePortofolioHauzan

Portofolio Hauzan Naufal — Visual Storyteller, Ketua Media Center SMAN 1 Lumajang & OSIS IT Pubdok. Menampilkan karya fotografi, videografi, dan motion graphics.

Live: `https://brohauzan.github.io/portfolio/` (lihat catatan `base` di bawah).

## Stack + versi nyata

- React `18.3.1`, React DOM `18.3.1`
- Vite `5.4.11`, `@vitejs/plugin-react` `4.3.4`
- Tailwind CSS `3.4.17`, PostCSS `8.4.49`, Autoprefixer `10.4.20`
- Fonts: Fraunces, Instrument Serif, Geist, Inter (Google Fonts)
- Tanpa router, tanpa backend, tanpa env.

## Cara jalan

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output ke dist/
npm run preview  # preview hasil build
```

## Section / anchor

Urutan di `src/App.jsx` (sama dengan `code.html`):

| # | Section | File | Anchor |
|---|---------|------|--------|
| 0 | Navbar | `src/components/Navbar.jsx` | `#home` `#about` `#stats` `#works` `#journey` `#testimonials` `#tools` `#contact` |
| 1 | Hero | `src/sections/Hero.jsx` | `#home` |
| 2 | About | `src/sections/About.jsx` | `#about` |
| 3 | Stats | `src/sections/Stats.jsx` | `#stats` |
| 4 | Showcase (3D coverflow, 5 kategori) | `src/sections/Showcase.jsx` + `src/hooks/useCoverflow.js` | `#works` |
| 5 | Journey (timeline 2010–2026) | `src/sections/Journey.jsx` | `#journey` |
| 6 | Testimonials | `src/sections/Testimonials.jsx` | `#testimonials` |
| 7 | Tools | `src/sections/Tools.jsx` | `#tools` |
| 8 | Footer | `src/components/Footer.jsx` | `#contact` |

Kategori Showcase (`src/data/showcaseData.js`): Photography, Videography, Motion Graphic, Short Film, Web Development. Semua `ctaHref` masih `#works` (placeholder).

## Struktur folder

```
index.html
vite.config.js          # base: '/portfolio/'
tailwind.config.js
postcss.config.js
public/
  favicon.ico
  apple-touch-icon.png
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
code.html               # referensi visual Stitch, bukan runtime
DESIGN.md               # token desain, bukan runtime
```

## Env

Tidak ada. Tidak pakai `.env`.

## Deploy / GitHub Pages

- `vite.config.js` pakai `base: '/portfolio/'`.
- `package.json` `homepage`: `https://brohauzan.github.io/portfolio/`.
- Repo ini: `https://github.com/BroHauzan/WebsitePortofolioHauzan`.
- Jika deploy dari repo ini, ganti `base` jadi `/WebsitePortofolioHauzan/` atau pakai repo `portfolio`. Jika tidak, asset pecah di Pages.
- `dist/` tidak di-commit (di-`.gitignore`).

## Status placeholder

- Foto hero / about masih placeholder (ikon kamera/person).
- `showcaseData.js` `visual.src: null`.
- `public/assets/videos/` kosong.
- Testimoni: Jeryco, Rafi, Sella (data statis).
- Kontak: `hauzannaufal2008@gmail.com`, Instagram `@brohauzan`, TikTok `@hauzanbro`, YouTube `@HauzanBro`, GitHub `@BroHauzan`.

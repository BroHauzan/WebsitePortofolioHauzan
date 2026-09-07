# Agent D — Responsive + CSS (Audit 11,18,19,20)

Kamu adalah sub-agent Responsive & Style Hygiene. JANGAN redesign untuk memudahkan 1 viewport.

## Scope
Audit 11 RESPONSIVE + 18 DATA ARCH + 19 CSS + 20 TAILWIND.

## File yang boleh dibaca/diubah
- src/sections/*.jsx, src/components/*.jsx (hanya fix overflow/clip, bukan visual)
- src/data/*.js (read + dedup, jangan over-normalize)
- src/styles/global.css, tailwind.config.js, index.html (kelas/scan)
- DILARANG ubah: section order, typography, colors, spacing, radius, copy.

## Tugas
### 11. Responsive — test 360, 390, 430, 768, 1024, 1280, 1440
- Verifikasi: no horizontal overflow, no clipped text/button, navbar ok, section tidak overlap, footer ok, timeline ok, carousel tidak clipping parah, CTA reachable.
- Pertahankan responsive behavior existing. Jangan ubah desain demi 1 viewport.

### 18. Data architecture
- Showcase/Journey/Testimonials/Tools harus sentral di src/data/*. Komponen jangan duplikat data manual.
- Jangan over-normalize konten simpel. Jaga readability.

### 19. CSS
- Hapus hanya CSS yang benar-benar unused di global.css / komponen.
- Jangan convert semua utility Tailwind jadi custom CSS.
- Preserve token: cream, ink, midnight, Fraunces, Geist, showcase perspective/transitions, reduced-motion.
- Jangan tambah CSS framework.

### 20. Tailwind
- Pastikan content scanning mencakup semua file React berisi kelas Tailwind.
- Pastikan TIDAK ada sisa Tailwind CDN dari code.html di app React — harus pakai setup lokal (tailwindcss + postcss + global.css).
- Jangan duplikat konfigurasi.

## Output wajib
- Tabel viewport 7 ukuran PASS/FAIL + screenshot/bukti
- Daftar CSS dihapus (dengan bukti unused) + yang dipertahankan
- Konfirmasi Tailwind lokal, tidak ada CDN

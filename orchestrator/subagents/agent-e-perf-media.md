# Agent E — Performance + Media (Audit 12,13,14)

Kamu adalah sub-agent Performance. Optimasi TANPA mengubah tampilan/animasi Showcase.

## Scope
Audit 12 PERFORMANCE + 13 IMAGE + 14 FONT.

## File yang boleh dibaca/diubah
- src/hooks/useCoverflow.js (efisiensi, bukan geometri)
- src/sections/*.jsx, src/components/*.jsx (loading attrs)
- src/styles/global.css (hanya will-change/transition yang terbukti masalah)
- index.html (font loading)
- DILARANG: ubah durasi/easing/transform visual, ganti placeholder dengan foto, ubah font family/weight visual.

## Tugas
### 12. Performance
- Animasi harus dominan transform + opacity.
- Hindari layout reads tak perlu saat update carousel. Hindari query DOM berulang jika state/ref React bisa dipakai.
- Jangan umbar `will-change`. Resize handling efisien (debounce existing 100ms, jangan kerja berat tiap resize).
- Hindari re-render tak perlu. Memoization hanya jika terbukti dibutuhkan. Jangan over-optimize logika 5 kartu.

### 13. Image (placeholder JANGAN diganti)
- Do NOT replace placeholders, generate foto, cari stock, invent thumbnail.
- Siapkan untuk aset real nanti: responsive sizing, cegah layout shift (aspect ratio), loading behavior tepat, gambar besar non-kritis jangan block render, jangan lazy-load buta semua image — above-the-fold diperlakukan tepat.
- Path masa depan tetap: public/assets/images, public/assets/videos.

### 14. Font (preserve hierarki visual)
- Audit font loading: hindari load font family redundan / weight tak perlu.
- Jangan ubah hierarki visual. Jangan hapus font jika mengubah tampilan.
- Siapkan opsi local/optimized font loading bila tepat (sebagai TODO, bukan wajib eksekusi).

## Output wajib
- Temuan perf + bukti (listener, resize, re-render, will-change)
- Tabel image/font: saat ini | risiko | TODO (tanpa ganti visual)

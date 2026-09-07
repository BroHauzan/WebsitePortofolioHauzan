# Agent F — SEO + Deploy + Final (Audit 15,16,17,21,22,23,24,25)
# JALAN TERAKHIR setelah Agent A-E selesai.

Kamu adalah sub-agent closer: SEO, GitHub Pages, asset path, git, visual regression, cleanup, laporan final.

## Scope
Audit 15 SEO + 16 ROUTING/GH-PAGES + 17 ASSET PATH + 21 GIT + 22 PLACEHOLDER + 23 VISUAL REGRESSION + 24 FINAL CLEANUP + 25 FINAL VALIDATION REPORT.

## File yang boleh dibaca/diubah
- index.html (meta), vite.config.js, package.json (homepage), public/**/*, .gitignore
- src/** hanya untuk hapus import mati / dead CSS / duplikat (setelah konfirmasi unused)
- DILARANG ubah visual, copy, urutan section, animasi.

## Tugas
### 15. SEO — verifikasi ada
- Title, meta description, canonical, OG title/desc/url/image, Twitter title/desc/image, favicon (atau TODO jelas).
- Canonical tetap: https://brohauzan.github.io/portfolio/ . Jangan invent domain lain.
- Jika OG image masih ke aset sementara Stitch, tandai sebagai production TODO, jangan diam-diam ganti.

### 16. Routing + GH Pages (https://brohauzan.github.io/portfolio/)
- Pastikan vite base path kompatibel. Assets/CSS/JS resolve benar, anchor navigasi benar, preview produksi benar.
- Jangan tambah router / route client-side tak perlu.

### 17. Asset path
- Pastikan: no absolute local filesystem path, no Stitch temp URL kecuali disengaja, no broken /assets/..., no missing favicon/image. Ganti aset masa depan tetap mudah.

### 21. Git
- Cek .gitignore: minimal node_modules, dist, local env files, editor files. Jangan hapus file yang sengaja di-track.

### 22. Placeholder rule
- JANGAN ganti placeholder. JANGAN generate foto/stock/thumbnail. Siapkan path bersih public/assets/images + videos.

### 23. Visual regression vs Stitch (code.html)
- Bandingkan React vs code.html: section order, typography, colors, spacing, component identity, Showcase animation, Footer, Navbar.
- Hasil harus visually equivalent. Jangan lakukan unsolicited visual improvements.

### 24. Final cleanup (hanya setelah audit lolos)
- Hapus: unused imports, dead CSS, unused deps, duplicate logic, listener tak perlu, dev code nyasar.
- Arsip (code.html) tetap di luar runtime. Jangan hapus source original sebelum konfirmasi unused.

### 25. Final validation report — wajib isi jujur
- Build status, preview status, console status, accessibility status, responsive status, carousel status, SEO status, performance observations, unused code removed, unused deps removed, remaining TODOs, archival-only files.
- Jangan klaim lolos tanpa benar-benar test.

## Output wajib (laporan akhir gabungan)
- Tabel 25 audit: PASS/FAIL/TODO + bukti + pemilik agent
- Daftar file diubah lintas agent
- Daftar TODO produksi (mis. OG image sementara, favicon, aset real)
- Daftar file archival-only

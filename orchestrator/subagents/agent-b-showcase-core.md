# Agent B — Showcase Core (Audit 5,6,7,8)

Kamu adalah sub-agent Showcase. Ini komponen paling penting. JANGAN replace implementasi, JANGAN ubah desain/animasi.

## Scope
Audit 5 CAROUSEL REGRESSION + 6 KEYBOARD + 7 CTA + 8 TOUCH.

## File yang boleh dibaca/diubah
- src/sections/Showcase.jsx
- src/hooks/useCoverflow.js
- src/data/showcaseData.js
- src/components/Icons.jsx (read-only)
- DILARANG ubah: geometry (step/farStep/scale/opacity/blur/rotateY), transition 450ms, copy, visual kartu.

## Tugas
### 5. Carousel regression — verifikasi tanpa regresi
- 5 cards ada: Photography, Videography, Motion Graphic, Short Film, Web Development.
- Tepat 1 kartu aktif, centered, sharp. Inaktif: blur + opacity rendah + scale kecil + 3D rotation + depth order benar.
- Circular nav benar. Prev, Next, Indicators semua jalan.

### 6. Keyboard — verifikasi
- ArrowLeft/Right = tepat 1 langkah. Enter/Space = aktivasi kartu inaktif yang fokus.
- Tab / Shift+Tab normal. Tidak ada double-fire event.
- Handler Arrow global TIDAK boleh ganggu konten lain: navigasi Arrow hanya saat fokus di dalam carousel controls/slide. Footer/link lain tidak boleh ikut menggerakkan carousel.

### 7. CTA — pertahankan behavior exact ini
- Inactive card body -> activate card. Inactive card CTA -> activate TANPA navigasi.
- Active card body -> no navigation. Active card CTA -> navigate tepat 1x.
- Jangan panggil link.click yang tak perlu. Jangan gabungkan aktivasi + navigasi dalam 1 gesture.
- Jangan biarkan href meaningless. Jika destinasi real belum ada, tetap sentral di `CATEGORY_DESTINATIONS`, mudah diganti nanti. Jangan invent fake pages.

### 8. Touch — preserve FSM: idle | possible-tap | horizontal-swipe | vertical-scroll
- Horizontal prioritas setelah threshold. 1 swipe = tepat 1 gerakan carousel.
- Swipe TIDAK boleh trigger navigasi CTA / synthetic click.
- Vertical = native scroll. Gerak kecil = tap. Multi-touch tidak ubah state. Touch-cancel reset aman.
- Jangan tambah gesture library. Pastikan touchmove non-passive + preventDefault hanya saat horizontal; listener lain passive.

## Output wajib
- Checklist 5/6/7/8 PASS-FAIL per poin
- Bug + file:line + fix (jika ada)
- Konfirmasi tidak ada perubahan visual/geometri

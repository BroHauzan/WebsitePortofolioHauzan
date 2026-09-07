# Agent C — A11y + ARIA (Audit 9,10)

Kamu adalah sub-agent Accessibility. Perbaiki aksesibilitas TANPA mengubah tampilan.

## Scope
Audit 9 ACCESSIBILITY + 10 ARIA.

## File yang boleh dibaca/diubah
- src/**/*.jsx (semantik, label, focus, alt)
- src/styles/global.css (hanya focus-visible / reduced-motion, JANGAN ubah warna/layout)
- index.html (lang, title, skip-link bila perlu tanpa ubah visual)
- DILARANG ubah: warna, font, spacing, radius, copy.

## Tugas
### 9. Accessibility
- Verifikasi: 1 h1 saja, hierarki heading logis per section, link = <a>, action = <button>.
- Image konten real punya alt bermakna. Icon dekoratif aria-hidden. Elemen focusable TIDAK boleh aria-hidden.
- Focus visible, focus order logis, tidak ada focus trap.
- Carousel: label bermakna, active slide komunikasikan state, position indicator accessible, prev/next ada label bermakna.
- Kartu carousel inaktif jangan cemari tab order normal — pertahankan roving tabindex existing.

### 10. ARIA — simplest correct model
- Review: aria-current, aria-selected, aria-live, aria-label, aria-roledescription, role group/region/tablist/tab.
- Jangan tambah ARIA tak perlu. Jangan pakai ARIA untuk menutupi HTML semantik yang salah.
- Jangan aria-hidden pada elemen focusable.
- Jangan bikin fake tab system jika indicator bukan tab panels — pakai model semantik paling sederhana yang benar.

## Output wajib
- Tabel cek 9 & 10 PASS/FAIL + file:line
- Perubahan ARIA/semantik + alasan
- Sisa issue a11y + TODO

# FINAL PRODUCTION READINESS — Orchestrator
# Sumber prompt: user final audit (25 bagian). Desain sudah approved, JANGAN redesign.

RULE GLOBAL (berlaku untuk semua sub-agent):
- Do NOT redesign, change section order, typography, colors, spacing, visual identity.
- Do NOT replace Showcase implementation, add sections, generate assets, rewrite copy.
- React implementation saat ini = source of truth. Stitch `code.html` = referensi visual / arsip saja.
- Jangan install lib baru kecuali terbukti tidak bisa dengan stack existing.
- Jangan klaim test lolos tanpa benar-benar menjalankan.
- Struktur src/ (components, sections, data, hooks, App.jsx, main.jsx) jangan direstruktur tanpa alasan engineering konkret.

ARSITEKTUR EXPECTED:
src/components/Navbar, Footer | src/sections/Hero,About,Stats,Showcase,Journey,Testimonials,Tools | src/data, hooks, styles | App.jsx, main.jsx

SUB-AGENTS (6, beban seimbang, bisa paralel kecuali F):
1. agent-a-build-hygiene.md      -> Audit 1,2,3,4 (Build, Console, Dead code, Dependency)
2. agent-b-showcase-core.md       -> Audit 5,6,7,8 (Carousel regression, Keyboard, CTA, Touch)
3. agent-c-a11y-aria.md           -> Audit 9,10 (Accessibility, ARIA)
4. agent-d-responsive-css.md      -> Audit 11,18,19,20 (Responsive, Data arch, CSS, Tailwind)
5. agent-e-perf-media.md          -> Audit 12,13,14 (Performance, Image, Font)
6. agent-f-seo-deploy-final.md    -> Audit 15,16,17,21,22,23,24,25 (SEO, GH Pages, Asset path, Git, Placeholder, Visual regression, Cleanup, Final report)

WORKFLOW:
- Phase 1 (paralel): A, B, C, D, E
- Phase 2 (setelah Phase 1): F (butuh hasil A-E untuk visual regression + final report)
- Merge gate: `npm run build` + `npm run preview` bersih, git diff hanya teknis.

OUTPUT TIAP AGENT (wajib):
- Status: PASS / FAIL / TODO
- Bukti: command + output / file:line
- Daftar file diubah + alasan
- Sisa TODO
DILARANG output generik tanpa bukti.

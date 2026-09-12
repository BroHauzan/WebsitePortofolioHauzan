// ============================================================
// SHOWCASE DATA — 5 coverflow categories.
//
// MEDIA: kategori ini belum punya aset media asli; kartu hanya merender
// ikon kategori + metadata teks. Untuk menambahkan media asli nanti:
//   1) taruh file di `public/assets/images/<file>.jpg` atau
//      `public/assets/videos/<file>.mp4`;
//   2) tambahkan field `imageSrc` (atau `videoSrc`) berisi path publik,
//      mis. `imageSrc: '/assets/images/works-photography.jpg'`;
//   3) render di Showcase.jsx pada frame rasio 16/10 yang sudah ada, mis.
//      <img src={category.imageSrc} loading="lazy" width={800} height={500}
//           alt={category.title} className="w-full h-full object-cover" />
//      (rasio frame saat ini di-hardcode `aspect-[16/10]` di Showcase.jsx,
//      jadi tidak perlu field aspect per kategori).
// Jangan simpan field metadata yang tidak dirender.
// ============================================================

export const CATEGORY_DESTINATIONS = {
  photography: '#works',
  videography: '#works',
  motion: '#works',
  shortfilm: '#works',
  webdev: '#works',
};

const showcaseCategories = [
  {
    key: 'photography',
    title: 'Photography',
    subtitle: 'Stage & Portrait Coverage',
    visualMeta: '35mm Prime · High School Live',
    badge: '01',
    collection: 'Koleksi 01',
    count: '45+ Shoots',
    description: 'Fotografi panggung, festival sekolah, dan dokumentasi editorial 35mm.',
    tools: 'Lightroom & Pixieset',
    ctaLabel: 'Buka Arsip Visual →',
    ctaHref: CATEGORY_DESTINATIONS.photography,
  },
  {
    key: 'videography',
    title: 'Videography',
    subtitle: 'Cinematic Recaps & Aftermovie',
    visualMeta: '4K Cine · Multi-cam Rig',
    badge: '02',
    collection: 'Koleksi 02',
    count: '30+ Recaps',
    description: 'Sinematografi acara, recap pentas musik, dan video dinamik multi-kamera.',
    tools: 'Premiere & DaVinci',
    ctaLabel: 'Buka Rekaman Pentas →',
    ctaHref: CATEGORY_DESTINATIONS.videography,
  },
  {
    key: 'motion',
    title: 'Motion Graphic',
    subtitle: 'VFX, Bumper & Typography',
    visualMeta: '60 FPS · Kinetic Motion',
    badge: '03',
    collection: 'Koleksi 03',
    count: '25+ Graphics',
    description: 'Identitas animasi, aset siaran, dan tipografi kinetik perayaan sekolah.',
    tools: 'After Effects & Blender',
    ctaLabel: 'Lihat Showcase Kinetik →',
    ctaHref: CATEGORY_DESTINATIONS.motion,
  },
  {
    key: 'shortfilm',
    title: 'Short Film',
    subtitle: 'Narrative Direction & Film',
    visualMeta: '2.39:1 Anamorphic · Student Fest',
    badge: '04',
    collection: 'Koleksi 04',
    count: 'Festival & Lomba',
    description: 'Eksplorasi cerita fiksi, drama pendek siswa, tata sutradara dan penataan cahaya.',
    tools: 'Director & DP',
    ctaLabel: 'Tonton Film Pendek →',
    ctaHref: CATEGORY_DESTINATIONS.shortfilm,
  },
  {
    key: 'webdev',
    title: 'Web Development',
    subtitle: 'Interactive Editorial Web',
    visualMeta: 'HTML5 · Tailwind · JS',
    badge: '05',
    collection: 'Koleksi 05',
    count: 'Digital Craft',
    description: 'Platform web sekolah, sistem arsip publikasi OSIS, dan rekayasa web interaktif.',
    tools: 'Tailwind & Vanilla JS',
    ctaLabel: 'Buka Demo Sistem →',
    ctaHref: CATEGORY_DESTINATIONS.webdev,
  },
];

export default showcaseCategories;

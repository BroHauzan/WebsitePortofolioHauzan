// ============================================================
// SHOWCASE DATA — 5 coverflow categories.
// Values preserved verbatim from the original code.html markup.
// Placeholder visuals: keep the structure; swap `visual.src` later.
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
    index: 0,
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
    visual: {
      type: 'image',
      src: null, // future: '/assets/images/works-photography.jpg'
      aspect: '16/10',
    },
  },
  {
    key: 'videography',
    index: 1,
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
    visual: {
      type: 'video',
      src: null, // future: '/assets/videos/works-videography.mp4'
      aspect: '16/10',
    },
  },
  {
    key: 'motion',
    index: 2,
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
    visual: {
      type: 'video',
      src: null, // future: '/assets/videos/works-motion.mp4'
      aspect: '16/10',
    },
  },
  {
    key: 'shortfilm',
    index: 3,
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
    visual: {
      type: 'video',
      src: null, // future: '/assets/videos/works-shortfilm.mp4'
      aspect: '16/10',
    },
  },
  {
    key: 'webdev',
    index: 4,
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
    visual: {
      type: 'image',
      src: null, // future: '/assets/images/works-webdev.jpg'
      aspect: '16/10',
    },
  },
];

export default showcaseCategories;

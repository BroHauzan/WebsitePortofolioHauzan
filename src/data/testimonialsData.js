// ============================================================
// TESTIMONIAL DATA — Voice Memo / Field Recorder Format
// Quotes preserved verbatim with authentic documentary metadata.
// ============================================================

const testimonials = [
  {
    id: 'memo-01',
    name: 'Jeryco',
    reference: 'Ref. 01 / Kolaborator',
    role: 'Kamera B & Kolaborator Produksi',
    channel: 'CH 01 // INTERVIEW',
    trackFile: 'VOICE_MEMO_01.WAV',
    timecode: 'TC 00:01:24:12',
    duration: '01:24',
    format: '48kHz · 24-bit',
    location: 'Studio Produksi SMAN 1 Lumajang',
    quote:
      '“Hauzan selalu tanggap saat momentum penting terjadi di lapangan. Ritme editing dan tone warna hasil karyanya punya ciri khas yang kuat.”',
    waveform: [25, 45, 75, 90, 60, 40, 80, 100, 85, 55, 30, 65, 90, 95, 70, 50, 80, 60, 35, 20],
  },
  {
    id: 'memo-02',
    name: 'Rafi',
    reference: 'Ref. 02 / Tim Media Center',
    role: 'Divisi Liputan & Operator Gimbal',
    channel: 'CH 02 // FIELD MIC',
    trackFile: 'VOICE_MEMO_02.WAV',
    timecode: 'TC 00:02:18:04',
    duration: '02:18',
    format: '48kHz · 24-bit',
    location: 'Amfiteater Utama SMAN 1 Lumajang',
    quote:
      '“Alur kerja dokumentasi jadi jauh lebih terstruktur dan rapi sejak dipimpin Hauzan. Pembagian tugas tim multi-kamera berjalan lancar.”',
    waveform: [20, 35, 60, 85, 70, 50, 40, 75, 95, 80, 90, 85, 60, 80, 65, 45, 70, 50, 30, 15],
  },
  {
    id: 'memo-03',
    name: 'Sella',
    reference: 'Ref. 03 / Tim Media Center',
    role: 'Kurasi Foto & Visual Publikasi',
    channel: 'CH 03 // AUDIO LOG',
    trackFile: 'VOICE_MEMO_03.WAV',
    timecode: 'TC 00:01:45:19',
    duration: '01:45',
    format: '48kHz · 24-bit',
    location: 'Ruang Redaksi Media Center',
    quote:
      '“Sangat komunikatif dan detail, terutama saat proses kurasi foto dan revisi highlight aftermovie. Bikin kerja bareng selalu seru.”',
    waveform: [30, 55, 80, 70, 45, 75, 95, 90, 65, 80, 100, 75, 55, 90, 70, 60, 45, 35, 25, 15],
  },
];

export default testimonials;

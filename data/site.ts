// Semua konten ada di file ini. Ganti placeholder dengan data asli Anda.
// Gambar: taruh file di public/images lalu isi path-nya, contoh "/images/kas-kelas.jpg".
// Jika `image` dikosongkan, otomatis tampil blok biru muda sebagai pengganti.

export const site = {
  name: "Nama Anda",
  role: "Siswa SMK Rekayasa Perangkat Lunak",
  school: "SMK Negeri Contoh",
  url: "https://namaanda.vercel.app",
  email: "namaanda@email.com",
  cvUrl: "/cv-nama-anda.pdf", // taruh file PDF di folder /public
  photo: "", // contoh: "/images/foto.jpg"
  headline: "Pelajar yang suka membangun website dan merancang tampilan yang rapi.",
  status: "Terbuka untuk PKL mulai Januari 2027",
  availability: "Terbuka untuk proyek lepas & PKL",
  description:
    "Portofolio pelajar SMK: proyek website, desain, pengalaman, dan prestasi, lengkap dengan CV yang bisa diunduh.",
  nav: [
    { id: "karya", label: "Karya" },
    { id: "profil", label: "Profil" },
    { id: "kontak", label: "Kontak" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/username" },
    { label: "LinkedIn", href: "https://linkedin.com/in/username" },
    { label: "Instagram", href: "https://instagram.com/username" },
  ],
  facts: [
    { label: "Sekolah", value: "SMK Negeri Contoh" },
    { label: "Jurusan", value: "Rekayasa Perangkat Lunak" },
    { label: "Kelas", value: "XI" },
    { label: "Minat", value: "Web dan desain UI" },
  ],
};

export const services = [
  {
    title: "Website Modern",
    text: "Membangun website cepat, responsif, dan mudah dikelola.",
    fit: "Bisnis kecil hingga startup",
  },
  {
    title: "Desain UI/UX",
    text: "Menciptakan antarmuka yang modern dan user-friendly.",
    fit: "Aplikasi web dan mobile",
  },
  {
    title: "Migration & Perbaikan",
    text: "Memperbarui sistem lama menjadi teknologi modern.",
    fit: "Sistem sudah ada butuh perbaikan",
  },
];

export const process = [
  {
    title: "Diskusi Awal",
    time: "1-3 hari",
    text: "Mengerti kebutuhan dan tujuan proyek Anda.",
  },
  {
    title: "Desain & Prototipe",
    time: "1-2 minggu",
    text: "Membuat desain dan interaksi sebelum pengembangan.",
  },
  {
    title: "Pengembangan",
    time: "Sesuai waktu",
    text: "Membangun fitur dengan teknologi modern.",
  },
  {
    title: "Deploy & Support",
    time: "Setelah selesai",
    text: "Deploy ke production dan dukungan terus-menerus.",
  },
];

export const faq = [
  {
    q: "Berapa lama waktu pengembangan?",
    a: "Tergantung kompleksitas proyek, biasanya 2-8 minggu.",
  },
  {
    q: "Apakah website bisa diedit sendiri?",
    a: "Ya, kami akan memberikan akses dan pelatihan dasar.",
  },
  {
    q: "Apakah website responsive di mobile?",
    a: "Ya, seluruh website kami fully responsive.",
  },
];

export const about = [
  "Saya siswa kelas XI jurusan Rekayasa Perangkat Lunak. Saya mulai belajar membuat website sejak kelas X, dan sekarang rutin mengerjakan proyek, baik tugas sekolah maupun proyek pribadi.",
  "Saya suka tampilan yang bersih dan mudah dipakai. Saat ini saya sedang memperdalam React dan Next.js, serta belajar dasar desain UI di Figma.",
];

export type Work = {
  slug: string;
  kind: "proyek" | "desain";
  year: string;
  title: string;
  summary: string; // satu kalimat, tampil di daftar
  text: string; // penjelasan lengkap, tampil di detail
  image?: string;
  // khusus proyek
  role?: string;
  stack?: string[];
  demo?: string;
  code?: string;
  // khusus desain
  tool?: string;
  link?: string;
};

export const works: Work[] = [
  {
    slug: "kas-kelas",
    kind: "proyek",
    year: "2026",
    title: "Aplikasi kas kelas",
    summary: "Catat pemasukan dan pengeluaran kas, lengkap dengan rekap bulanan.",
    text: "Aplikasi untuk mencatat kas kelas supaya semua teman bisa melihat ke mana uangnya dipakai. Ada rekap bulanan otomatis dan halaman khusus bendahara.",
    role: "Mengerjakan sendiri",
    stack: ["Next.js", "Tailwind CSS", "Supabase"],
    demo: "https://example.com",
    code: "https://github.com/username/kas-kelas",
  },
  {
    slug: "profil-sekolah",
    kind: "proyek",
    year: "2026",
    title: "Website profil sekolah",
    summary: "Proyek tim untuk lomba: beranda dan galeri kegiatan.",
    text: "Proyek tim lima orang untuk lomba tingkat kabupaten. Saya bertanggung jawab atas halaman beranda dan galeri kegiatan, termasuk membuatnya nyaman dibuka di ponsel.",
    role: "Frontend developer (tim 5 orang)",
    stack: ["HTML", "CSS", "JavaScript"],
    demo: "https://example.com",
  },
  {
    slug: "katalog-umkm",
    kind: "proyek",
    year: "2025",
    title: "Katalog UMKM keluarga",
    summary: "Katalog produk dengan tombol pesan langsung ke WhatsApp.",
    text: "Katalog online sederhana untuk usaha milik keluarga. Pembeli bisa melihat produk dan langsung memesan lewat WhatsApp tanpa perlu membuat akun.",
    role: "Mengerjakan sendiri",
    stack: ["React", "Tailwind CSS"],
    code: "https://github.com/username/katalog",
  },
  {
    slug: "ui-kantin",
    kind: "desain",
    year: "2026",
    title: "Redesain aplikasi kantin sekolah",
    summary: "Alur pesan makanan yang lebih singkat, dari 6 langkah jadi 3.",
    text: "Latihan desain UI: menyederhanakan alur pemesanan di kantin sekolah. Saya membuat wireframe, prototipe klik, dan menguji ke lima teman.",
    tool: "Figma",
    link: "https://figma.com",
  },
  {
    slug: "logo-ekskul",
    kind: "desain",
    year: "2026",
    title: "Logo ekstrakurikuler",
    summary: "Identitas visual sederhana untuk ekskul fotografi.",
    text: "Logo dan palet warna untuk ekskul fotografi, dibuat dalam tiga versi sebelum satu dipilih oleh anggota.",
    tool: "Canva",
  },
  {
    slug: "poster-17",
    kind: "desain",
    year: "2025",
    title: "Poster lomba 17 Agustus",
    summary: "Poster kegiatan sekolah yang dicetak ukuran A3.",
    text: "Poster pengumuman lomba untuk kegiatan sekolah. Fokusnya pada tipografi yang terbaca dari jarak jauh.",
    tool: "Canva",
  },
  {
    slug: "feed-osis",
    kind: "desain",
    year: "2025",
    title: "Feed Instagram OSIS",
    summary: "Template konten bulanan dengan gaya yang konsisten.",
    text: "Seperangkat template yang dipakai tim multimedia OSIS tiap bulan, sehingga konten terlihat seragam walau dibuat oleh orang berbeda.",
    tool: "Canva",
  },
];

export const skills = [
  { label: "Pemrograman", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "PHP", "MySQL"] },
  { label: "Desain", items: ["Figma", "Canva", "Dasar UI/UX", "Tipografi dan warna"] },
  { label: "Alat", items: ["Git dan GitHub", "VS Code", "Vercel"] },
  { label: "Soft skill", items: ["Kerja tim", "Presentasi", "Manajemen waktu"] },
];

export type Journey = {
  period: string;
  type: "Prestasi" | "Sertifikat" | "Pendidikan" | "Organisasi" | "Magang";
  title: string;
  place: string;
  text?: string;
};

// Urut dari yang terbaru. Semua pencapaian digabung dalam satu daftar.
export const journey: Journey[] = [
  {
    period: "2026",
    type: "Prestasi",
    title: "Juara 2 Lomba Web Design",
    place: "Tingkat kabupaten, Dinas Pendidikan",
  },
  {
    period: "2025 sampai sekarang",
    type: "Organisasi",
    title: "Anggota divisi multimedia OSIS",
    place: "SMK Negeri Contoh",
    text: "Membuat sekitar 3 desain per bulan untuk kegiatan sekolah.",
  },
  {
    period: "2025",
    type: "Magang",
    title: "Magang singkat, 2 minggu",
    place: "Contoh Digital",
    text: "Membantu memperbaiki tampilan halaman web dan menulis dokumentasi sederhana.",
  },
  {
    period: "2025",
    type: "Sertifikat",
    title: "Dasar Pemrograman Web",
    place: "Dicoding",
  },
  {
    period: "2024 sampai sekarang",
    type: "Pendidikan",
    title: "SMK, jurusan Rekayasa Perangkat Lunak",
    place: "SMK Negeri Contoh",
    text: "Mempelajari pemrograman web, basis data, dan desain antarmuka. Nilai rata-rata 88.",
  },
];

export const experience = journey.map((j) => ({
  period: j.period,
  title: j.title,
  org: j.place,
  text: j.text || "",
}));

export const testimonials = [
  {
    name: "Pak Budi",
    role: "Kepala Sekolah SMK Negeri",
    quote: "Satya telah membangun website yang sangat baik untuk sekolah kami. Tampilannya modern dan mudah dikelola.",
  },
  {
    name: "Ibu Siti",
    role: "Wakil Bendahara",
    quote: "Aplikasi kas kelas sangat membantu. Semua orang bisa melihat ke mana uangnya dipakai dengan transparan.",
  },
  {
    name: "Pak Andi",
    role: "Klien Swasta",
    quote: "Website yang saya dapat dari Satya sangat profesional. Banyak kompliemen dari klien saya.",
  },
];
// Semua konten ada di file ini. Ganti placeholder dengan data Anda.
// Gambar: taruh file di public/images lalu isi path-nya, contoh "/images/proyek-1.jpg".
// Jika `image` dikosongkan, otomatis tampil blok warna biru sebagai pengganti.

export const site = {
  name: "Nama Anda",
  role: "Siswa SMK Rekayasa Perangkat Lunak",
  school: "SMK Negeri Contoh",
  url: "https://namaanda.vercel.app",
  email: "namaanda@email.com",
  cvUrl: "/cv-nama-anda.pdf", // taruh file PDF di folder /public
  photo: "", // contoh: "/images/foto.jpg"
  headline: "Pelajar yang suka membangun website dan merancang tampilan yang rapi.",
  description:
    "Portofolio pelajar SMK: kumpulan proyek, desain, pengalaman organisasi, dan prestasi, lengkap dengan CV yang bisa diunduh.",
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

export const about = [
  "Saya siswa kelas XI jurusan Rekayasa Perangkat Lunak. Saya mulai belajar membuat website sejak kelas X dan sekarang rutin mengerjakan proyek, baik tugas sekolah maupun proyek pribadi.",
  "Saya suka mengerjakan tampilan yang bersih dan mudah dipakai. Saat ini saya sedang memperdalam React dan Next.js, serta belajar dasar desain UI di Figma.",
];

export type Project = {
  title: string;
  year: string;
  text: string;
  role: string;
  stack: string[];
  image?: string;
  demo?: string;
  code?: string;
};

export const projects: Project[] = [
  {
    title: "Aplikasi kas kelas",
    year: "2026",
    text: "Mencatat pemasukan dan pengeluaran kas kelas, lengkap dengan rekap bulanan yang bisa dilihat semua teman sekelas.",
    role: "Mengerjakan sendiri",
    stack: ["Next.js", "Tailwind CSS", "Supabase"],
    demo: "https://example.com",
    code: "https://github.com/username/kas-kelas",
  },
  {
    title: "Website profil sekolah",
    year: "2026",
    text: "Proyek tim lima orang untuk lomba sekolah. Saya bertanggung jawab atas halaman beranda dan galeri kegiatan.",
    role: "Frontend developer (tim 5 orang)",
    stack: ["HTML", "CSS", "JavaScript"],
    demo: "https://example.com",
  },
  {
    title: "Katalog UMKM keluarga",
    year: "2025",
    text: "Katalog produk online sederhana dengan tombol pesan langsung ke WhatsApp, dibuat untuk usaha milik keluarga.",
    role: "Mengerjakan sendiri",
    stack: ["React", "Tailwind CSS"],
    code: "https://github.com/username/katalog",
  },
];

export type Design = {
  title: string;
  tool: string;
  category: string;
  image?: string;
  link?: string;
};

export const designs: Design[] = [
  { title: "Redesign aplikasi kantin sekolah", tool: "Figma", category: "Desain UI" },
  { title: "Logo ekstrakurikuler", tool: "Canva", category: "Logo" },
  { title: "Poster lomba 17 Agustus", tool: "Canva", category: "Poster" },
  { title: "Landing page konsep toko buku", tool: "Figma", category: "Desain UI" },
  { title: "Feed Instagram OSIS", tool: "Canva", category: "Media sosial" },
  { title: "Ikon aplikasi catatan", tool: "Figma", category: "Ikon" },
];

export const skills = [
  { label: "Pemrograman", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "PHP", "MySQL"] },
  { label: "Desain", items: ["Figma", "Canva", "Dasar UI/UX", "Tipografi dan warna"] },
  { label: "Alat", items: ["Git dan GitHub", "VS Code", "Vercel"] },
  { label: "Soft skill", items: ["Kerja tim", "Presentasi", "Manajemen waktu", "Cepat belajar"] },
];

export const timeline = [
  {
    period: "2024 sampai sekarang",
    title: "SMK Negeri Contoh, jurusan Rekayasa Perangkat Lunak",
    text: "Mempelajari pemrograman web, basis data, dan desain antarmuka. Nilai rata-rata 88.",
  },
  {
    period: "2025 sampai sekarang",
    title: "Anggota divisi multimedia OSIS",
    text: "Membuat poster dan konten media sosial untuk kegiatan sekolah, sekitar 3 desain per bulan.",
  },
  {
    period: "2025",
    title: "Magang singkat di Contoh Digital",
    text: "Dua minggu membantu tim memperbaiki tampilan halaman web dan menulis dokumentasi sederhana.",
  },
];

export const achievements = [
  { year: "2026", title: "Juara 2 Lomba Web Design tingkat kabupaten", by: "Dinas Pendidikan" },
  { year: "2025", title: "Sertifikat Dasar Pemrograman Web", by: "Dicoding" },
  { year: "2025", title: "Peserta Pelatihan UI/UX Dasar", by: "Komunitas Contoh" },
];
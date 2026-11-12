// Semua konten ada di file ini. Ganti placeholder dengan data asli Anda.
// Gambar: taruh file di public/images lalu isi path-nya, contoh "/images/kas-kelas.jpg".
// Jika `image` dikosongkan, otomatis tampil blok biru muda sebagai pengganti.

"use client";

import { useState, useEffect } from "react";

export const CopyEmail = ({ email }: { email: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <button
        onClick={handleCopy}
        className="rounded-full border border-line px-3 py-1 text-sm hover:bg-accent"
        aria-label="Copy email"
      >
        {copied ? "Disalin!" : "Copy"}
      </button>
    </div>
  );
};

export const ContactForm = () => {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Nama</label>
        <input
          type="text"
          name="name"
          className="w-full rounded-border border px-3 py-2"
          required
          autoComplete="name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          name="email"
          className="w-full rounded-border border px-3 py-2"
          required
          autoComplete="email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Pesan</label>
        <textarea
          name="message"
          rows={3}
          className="w-full rounded-border border px-3 py-2 resize-none"
          required
          autoComplete="message"
        ></textarea>
      </div>
      <button
        type="submit"
        className="rounded-full bg-accent px-6 py-3 font-medium text-accent-ink transition-colors hover:bg-accent/90"
      >
        Kirim Pesan
      </button>
    </form>
  );
};

export const LocalTime = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  return <span>{new Date().toLocaleString("id-ID", options)}</span>;
};

export const Projects = ({ works }: { works: any }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {works.map((w: any) => (
        <div
          key={w.slug}
          className="rounded-2xl border border-line bg-surface p-4 hover:bg-accent/5 transition-colors"
        >
          <h4 className="font-display text-lg font-semibold">{w.title}</h4>
          <p className="mt-2 text-muted line-clamp-2">{w.summary}</p>
        </div>
      ))}
    </div>
  );
};

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

export const Header = () => {
  return (
    <header className="border-b border-line bg-surface">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4">
        <h1 className="font-display text-xl font-semibold tracking-tight">
          {site.name}
        </h1>
      </div>
    </header>
  );
};
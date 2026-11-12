import type { CSSProperties, ReactNode } from "react";
import { site, services, process, faq, skills, experience, testimonials } from "@/data/site";
import { Projects, LocalTime, CopyEmail, ContactForm, works } from "@/components/client";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

/* Pola tata letak yang sama untuk setiap bagian: judul menempel di kiri
   (sticky di desktop), konten di kanan. Pembaca selalu tahu di mana dirinya. */
function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
            <p className="mt-3 max-w-xs text-muted">{intro}</p>
          </div>
        </div>
        <div className="grid gap-16 lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}

function Sub({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{title}</h3>
      <div className="mt-6">{children}</div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* ============================ HERO ============================ */}
      <section id="top" className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
        <p
          className="hero-in inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm"
          style={step(0)}
        >
          <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
          {site.availability}
        </p>

        <h1
          className="hero-in mt-8 max-w-4xl font-display text-5xl font-semibold leading-[1.03] tracking-tight sm:text-7xl"
          style={step(1)}
        >
          Saya membangun aplikasi web yang cepat dipakai, mudah dirawat, dan enak dilihat.
        </h1>

        <p className="hero-in mt-8 max-w-xl text-lg text-muted" style={step(2)}>
          Saya {site.name}, {site.role.toLowerCase()} yang membantu bisnis kecil dan tim produk mengubah ide menjadi
          produk yang benar-benar dipakai penggunanya.
        </p>

        <div className="hero-in mt-10 flex flex-wrap gap-3" style={step(3)}>
          <a
            href="#proyek"
            className="rounded-full bg-accent px-6 py-3 font-medium text-accent-ink transition-opacity hover:opacity-90"
          >
            Lihat proyek
          </a>
          <a
            href={site.cvUrl}
            download
            className="rounded-full border border-line px-6 py-3 font-medium transition-colors hover:border-ink"
          >
            Unduh CV
          </a>
        </div>

        <dl
          className="hero-in mt-16 grid border-y border-line sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line"
          style={step(4)}
        >
          {site.facts.map((f) => (
            <div key={f.label} className="border-b border-line py-5 last:border-b-0 sm:odd:pr-6 lg:border-b-0 lg:px-6 lg:first:pl-0">
              <dt className="text-sm text-muted">{f.label}</dt>
              <dd className="mt-1 font-medium">{f.value}</dd>
            </div>
          ))}
          <div className="py-5 lg:px-6">
            <dt className="text-sm text-muted">Waktu setempat</dt>
            <dd className="mt-1 font-medium">
              <LocalTime />
            </dd>
          </div>
        </dl>
      </section>

      {/* =========================== PROYEK =========================== */}
      <Section
        id="proyek"
        title="Proyek pilihan"
        intro="Tiga proyek yang paling mewakili cara kerja saya. Buka tiap baris untuk membaca masalah, solusi, dan hasilnya."
      >
        <Projects works={works} />
      </Section>

      {/* =========================== LAYANAN ========================== */}
      <Section
        id="layanan"
        title="Layanan"
        intro="Apa yang bisa saya kerjakan, bagaimana prosesnya, dan jawaban untuk pertanyaan yang paling sering muncul."
      >
        <Sub title="Yang bisa saya bantu">
          <ul className="divide-y divide-line border-y border-line">
            {services.map((s) => (
              <li key={s.title} className="grid gap-2 py-6 sm:grid-cols-5 sm:gap-8">
                <h4 className="font-display text-lg font-semibold sm:col-span-2">{s.title}</h4>
                <div className="sm:col-span-3">
                  <p>{s.text}</p>
                  <p className="mt-2 text-sm text-muted">Cocok untuk: {s.fit}</p>
                </div>
              </li>
            ))}
          </ul>
        </Sub>

        <Sub title="Cara kerja sama">
          {/* Urutan memang berurutan, jadi penomoran di sini punya makna. */}
          <ol className="grid gap-6 sm:grid-cols-2">
            {process.map((p, i) => (
              <li key={p.title} className="rounded-2xl border border-line bg-surface p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h4 className="font-display text-lg font-semibold">
                    {i + 1}. {p.title}
                  </h4>
                  <span className="shrink-0 text-sm text-muted">{p.time}</span>
                </div>
                <p className="mt-3 text-muted">{p.text}</p>
              </li>
            ))}
          </ol>
        </Sub>

        <Sub title="Pertanyaan umum">
          <div className="divide-y divide-line border-y border-line">
            {faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="grid size-7 shrink-0 place-items-center rounded-full border border-line leading-none transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-prose text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Sub>
      </Section>

      {/* =========================== TENTANG ========================== */}
      <Section
        id="tentang"
        title="Tentang saya"
        intro="Sedikit cerita tentang cara berpikir saya, lalu daftar alat yang saya pakai."
      >
        <div className="grid gap-5 text-lg">
          {/* Tambahkan foto di public/foto.jpg lalu tampilkan dengan next/image di sini. */}
          <p className="max-w-prose">
            Saya mulai membuat website pada 2018 ketika membantu usaha keluarga membuat katalog online. Sejak itu saya
            sadar bahwa sebagian besar masalah produk bukan soal teknologi, melainkan soal memahami apa yang sebenarnya
            dibutuhkan pengguna.
          </p>
          <p className="max-w-prose text-muted">
            Karena itu saya selalu mulai dengan bertanya, bukan menulis kode. Saya suka antarmuka yang tenang, halaman
            yang cepat terbuka di ponsel murah, dan kode yang bisa dipahami orang lain enam bulan kemudian. Di luar
            pekerjaan, saya bermain gitar dan menulis catatan teknis.
          </p>
        </div>

        <Sub title="Keahlian">
          <dl className="divide-y divide-line border-y border-line">
            {skills.map((g) => (
              <div key={g.label} className="grid gap-3 py-5 sm:grid-cols-5 sm:gap-8">
                <dt className="text-muted sm:col-span-2">{g.label}</dt>
                <dd className="flex flex-wrap gap-2 sm:col-span-3">
                  {g.items.map((i) => (
                    <span key={i} className="rounded-full border border-line bg-surface px-3 py-1 text-sm">
                      {i}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Sub>
      </Section>

      {/* ========================= PENGALAMAN ========================= */}
      <Section
        id="pengalaman"
        title="Pengalaman"
        intro="Perjalanan kerja dan pendidikan saya, ditambah kata orang yang pernah bekerja dengan saya."
      >
        <Sub title="Riwayat">
          {/* Garis vertikal bermakna karena isinya memang urutan waktu. */}
          <ol className="relative space-y-10 border-l border-line pl-7">
            {experience.map((e) => (
              <li key={e.title} className="relative">
                <span aria-hidden="true" className="absolute -left-[33px] top-2 size-2.5 rounded-full bg-accent" />
                <p className="text-sm tabular-nums text-muted">{e.period}</p>
                <h4 className="mt-1 font-display text-xl font-semibold">{e.title}</h4>
                <p className="text-muted">{e.org}</p>
                <p className="mt-3 max-w-prose">{e.text}</p>
              </li>
            ))}
          </ol>
        </Sub>

        <Sub title="Kata mereka">
          <div className="grid gap-8">
            {testimonials.map((t) => (
              <figure key={t.name} className="border-l-2 border-accent pl-6">
                <blockquote className="max-w-prose text-lg">{t.quote}</blockquote>
                <figcaption className="mt-3 text-sm text-muted">
                  {t.name}, {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </Sub>
      </Section>

      {/* ============================ KONTAK ========================== */}
      <Section
        id="kontak"
        title="Mari bicara"
        intro="Ceritakan apa yang ingin Anda bangun. Diskusi awal gratis dan tanpa kewajiban."
      >
        <div className="grid gap-10">
          <CopyEmail email={site.email} />
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { site, about, projects, designs, skills, timeline, achievements } from "@/data/site";
import { Reveal, Tabs, Cover, DesignGallery, CopyEmail } from "@/components/client";
import { btn, btnGhost, chip, card } from "@/components/ui";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

function Section({
  id,
  title,
  intro,
  tone = "white",
  children,
}: {
  id: string;
  title: string;
  intro: string;
  tone?: "white" | "tint";
  children: ReactNode;
}) {
  return (
    <section id={id} className={`py-20 sm:py-24 ${tone === "tint" ? "bg-surface" : ""}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <header className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
            <p className="mt-3 text-lg text-muted">{intro}</p>
          </header>
          <div className="mt-10">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------- isi tab: Proyek ------------------------- */
function ProjectGrid() {
  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <li key={p.title} className={`${card} flex flex-col`}>
          <Cover src={p.image} alt={`Tampilan proyek ${p.title}`} label={p.title} />
          <div className="flex flex-1 flex-col p-5">
            <p className="text-sm tabular-nums text-muted">{p.year}</p>
            <h3 className="mt-1 font-display text-xl font-bold">{p.title}</h3>
            <p className="mt-3 flex-1 text-muted">{p.text}</p>
            <p className="mt-4 text-sm">Peran: {p.role}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li key={s} className={chip}>
                  {s}
                </li>
              ))}
            </ul>
            {(p.demo || p.code) && (
              <div className="mt-5 flex gap-2">
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noreferrer" className={btn}>
                    Buka demo
                  </a>
                )}
                {p.code && (
                  <a href={p.code} target="_blank" rel="noreferrer" className={btnGhost}>
                    Lihat kode
                  </a>
                )}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------- isi tab: Profil ------------------------- */
function AboutPanel() {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      <div className="grid content-start gap-5 text-lg">
        {about.map((p, i) => (
          <p key={i} className={`max-w-prose ${i > 0 ? "text-muted" : ""}`}>
            {p}
          </p>
        ))}
      </div>

      <dl className="divide-y divide-line rounded-xl border border-line bg-white">
        {skills.map((g) => (
          <div key={g.label} className="grid gap-3 p-5 sm:grid-cols-4 sm:gap-6">
            <dt className="font-semibold">{g.label}</dt>
            <dd className="flex flex-wrap gap-2 sm:col-span-3">
              {g.items.map((i) => (
                <span key={i} className={chip}>
                  {i}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function TimelinePanel() {
  return (
    <ol className="relative max-w-2xl space-y-9 border-l-2 border-sky-strong pl-7">
      {timeline.map((t) => (
        <li key={t.title} className="relative">
          <span aria-hidden="true" className="absolute -left-[37px] top-1.5 size-4 rounded-full border-4 border-white bg-accent" />
          <p className="text-sm tabular-nums text-muted">{t.period}</p>
          <h3 className="mt-1 font-semibold">{t.title}</h3>
          <p className="mt-2 text-muted">{t.text}</p>
        </li>
      ))}
    </ol>
  );
}

function AchievementPanel() {
  return (
    <ul className="grid max-w-3xl gap-4">
      {achievements.map((a) => (
        <li key={a.title} className={`${card} flex gap-5 p-5`}>
          <span className="h-fit shrink-0 rounded-md bg-sky px-3 py-1.5 text-sm font-bold tabular-nums">{a.year}</span>
          <div>
            <p className="font-semibold">{a.title}</p>
            <p className="mt-1 text-sm text-muted">{a.by}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ============================== HALAMAN ============================== */
export default function Home() {
  const initials = site.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <>
      {/* ============================ HERO ============================ */}
      <section id="top" className="bg-gradient-to-b from-surface to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:grid-cols-12">
          <div className="hero-in lg:col-span-7" style={step(0)}>
            <p className="inline-block rounded-md bg-sky px-3 py-1.5 text-sm font-semibold">{site.role}</p>

            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
              {site.headline}
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted">
              Halo, saya {site.name} dari {site.school}. Di sini Anda bisa melihat proyek, desain, pengalaman, dan prestasi
              saya.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href={site.cvUrl} download className={btn}>
                Unduh CV
              </a>
              <a href="#karya" className={btnGhost}>
                Lihat karya
              </a>
            </div>
          </div>

          <div className="hero-in lg:col-span-5" style={step(1)}>
            <div className="relative mx-auto max-w-xs">
              <div aria-hidden="true" className="absolute -bottom-3 -right-3 size-full rounded-xl bg-sky-strong" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border-4 border-white bg-sky">
                {site.photo ? (
                  <Image src={site.photo} alt={`Foto ${site.name}`} fill priority sizes="320px" className="object-cover" />
                ) : (
                  <div className="grid h-full place-items-center">
                    <span className="font-display text-7xl font-bold text-ink/25">{initials}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Ringkasan cepat: pengunjung langsung tahu siapa Anda */}
        <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4">
            {site.facts.map((f) => (
              <div key={f.label} className="bg-white p-5">
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd className="mt-1 font-semibold">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ============================ KARYA =========================== */}
      <Section id="karya" title="Karya" intro="Website dan aplikasi yang saya buat, serta desain yang saya rancang.">
        <Tabs
          label="Jenis karya"
          tabs={[
            { id: "proyek", label: "Proyek", count: projects.length, content: <ProjectGrid /> },
            { id: "desain", label: "Desain", count: designs.length, content: <DesignGallery /> },
          ]}
        />
      </Section>

      {/* ============================ PROFIL ========================== */}
      <Section
        id="profil"
        tone="tint"
        title="Profil"
        intro="Tentang saya, keahlian, perjalanan belajar, dan prestasi yang pernah saya raih."
      >
        <Tabs
          label="Bagian profil"
          tabs={[
            { id: "tentang", label: "Tentang dan keahlian", content: <AboutPanel /> },
            { id: "riwayat", label: "Pendidikan dan kegiatan", content: <TimelinePanel /> },
            { id: "prestasi", label: "Prestasi", count: achievements.length, content: <AchievementPanel /> },
          ]}
        />
      </Section>

      {/* ============================ KONTAK ========================== */}
      <section id="kontak" className="bg-sky py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Hubungi saya</h2>
            <p className="mt-3 max-w-xl text-lg text-muted">
              Untuk kesempatan magang, lomba, atau kolaborasi, kirim saja email. Saya akan membalas secepatnya.
            </p>

            <div className="mt-10 grid gap-8">
              <CopyEmail />
              <div className="flex flex-wrap items-center gap-3">
                <a href={site.cvUrl} download className={btn}>
                  Unduh CV
                </a>
                {site.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className={btnGhost}>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
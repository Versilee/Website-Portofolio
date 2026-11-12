import type { CSSProperties, ReactNode } from "react";
import { site, services, process, faq, skills, journey, about } from "@/data/site";
import { Projects, LocalTime, CopyEmail, ContactForm, Reveal, Spotlight, Rotator, Testimonials } from "@/components/client";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

/* Pola yang sama di setiap bagian: label kecil, judul, pengantar, lalu konten. */
function Section({ id, label, title, intro, children }: { id: string; label: string; title: string; intro: string; children: ReactNode }) {
  return (
    <section id={id} className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mb-12 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">{label}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
          <p className="mt-4 text-lg text-muted">{intro}</p>
        </Reveal>
        <div className="grid gap-16">{children}</div>
      </div>
    </section>
  );
}

const H3 = ({ children }: { children: ReactNode }) => <h3 className="mb-6 font-display text-xl font-semibold sm:text-2xl">{children}</h3>;

export default function Home() {
  return (
    <>
      <Spotlight>
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
          <p className="hero-in inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-sm" style={step(0)}>
            <span aria-hidden="true" className="size-2 animate-pulse rounded-full bg-emerald-500" />
            {site.availability}
          </p>
          <h1 className="hero-in mt-8 max-w-4xl font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl" style={step(1)}>
            Membangun <Rotator words={["website", "antarmuka", "aplikasi web"]} /> yang cepat, rapi, dan enak dipakai.
          </h1>
          <p className="hero-in mt-7 max-w-xl text-lg text-muted" style={step(2)}>
            Halo, saya {site.name}, {site.role.toLowerCase()}. {site.headline}
          </p>
          <div className="hero-in mt-10 flex flex-wrap gap-3" style={step(3)}>
            <a href="#proyek" className="rounded-full bg-accent px-7 py-3.5 font-medium text-accent-ink transition-all hover:-translate-y-0.5 hover:shadow-lg">Lihat proyek</a>
            <a href={site.cvUrl} download className="rounded-full border border-line px-7 py-3.5 font-medium transition-colors hover:border-accent">Unduh CV</a>
          </div>
          <dl className="hero-in mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" style={step(4)}>
            {site.facts.map((f) => (
              <div key={f.label} className="card p-5">
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd className="mt-1 font-medium">{f.value}</dd>
              </div>
            ))}
            <div className="card p-5">
              <dt className="text-sm text-muted">Waktu setempat</dt>
              <dd className="mt-1 font-medium tabular-nums"><LocalTime /></dd>
            </div>
          </dl>
        </div>
      </Spotlight>

      <Section id="proyek" label="01 · Karya" title="Proyek pilihan" intro="Kumpulan proyek web dan desain yang pernah saya kerjakan. Klik kartu mana pun untuk membaca detailnya.">
        <Projects />
      </Section>

      <Section id="layanan" label="02 · Layanan" title="Yang bisa saya bantu" intro="Apa yang bisa saya kerjakan, bagaimana prosesnya, dan jawaban untuk pertanyaan yang sering muncul.">
        <Reveal>
          <ul className="grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <li key={s.title} className="card card-hover p-7">
                <span className="grid size-11 place-items-center rounded-xl bg-sky font-display font-semibold text-accent">{i + 1}</span>
                <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
                <p className="mt-4 border-t border-line pt-4 text-sm text-muted">Cocok untuk: <span className="text-ink">{s.fit}</span></p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <H3>Cara kerja sama</H3>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <li key={p.title} className="card p-6">
                <p className="font-display text-4xl font-semibold text-accent/30">0{i + 1}</p>
                <h4 className="mt-2 font-display text-lg font-semibold">{p.title}</h4>
                <p className="text-sm text-accent">{p.time}</p>
                <p className="mt-3 text-sm text-muted">{p.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal>
          <H3>Pertanyaan umum</H3>
          <div className="grid max-w-3xl gap-3">
            {faq.map((f) => (
              <details key={f.q} className="card group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                  {f.q}
                  <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full border border-line transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section id="tentang" label="03 · Tentang" title="Tentang saya" intro="Sedikit cerita tentang cara berpikir saya, lalu daftar alat yang saya pakai.">
        <Reveal className="grid gap-5 text-lg">
          {about.map((p, i) => <p key={i} className={`max-w-3xl ${i ? "text-muted" : ""}`}>{p}</p>)}
        </Reveal>
        <Reveal>
          <H3>Keahlian</H3>
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((g) => (
              <div key={g.label} className="card p-6">
                <h4 className="font-display font-semibold">{g.label}</h4>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((i) => <li key={i} className="rounded-full border border-line bg-surface px-3 py-1 text-sm transition-colors hover:border-accent">{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section id="pengalaman" label="04 · Perjalanan" title="Pengalaman dan prestasi" intro="Pendidikan, organisasi, dan pencapaian saya sejauh ini, ditambah kata orang yang pernah bekerja dengan saya.">
        <Reveal>
          <ol className="relative ml-3 space-y-8 border-l border-line pl-8">
            {journey.map((e) => (
              <li key={e.title} className="relative">
                <span aria-hidden="true" className="absolute -left-[39px] top-1.5 size-3 rounded-full border-2 border-bg bg-accent ring-4 ring-sky" />
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-sky px-3 py-0.5 text-xs font-medium text-accent">{e.type}</span>
                  <span className="text-sm tabular-nums text-muted">{e.period}</span>
                </div>
                <h4 className="mt-2 font-display text-xl font-semibold">{e.title}</h4>
                <p className="text-muted">{e.place}</p>
                {e.text && <p className="mt-2 max-w-prose">{e.text}</p>}
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal>
          <H3>Kata mereka</H3>
          <Testimonials />
        </Reveal>
      </Section>

      <Section id="kontak" label="05 · Kontak" title="Mari bicara" intro="Ceritakan apa yang ingin Anda bangun. Diskusi awal gratis dan tanpa kewajiban.">
        <Reveal className="grid gap-6 lg:grid-cols-5">
          <div className="grid content-start gap-6 lg:col-span-2">
            <CopyEmail email={site.email} />
            <ul className="grid gap-3">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="card card-hover flex items-center justify-between px-5 py-4 font-medium">
                    {s.label}<span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3"><ContactForm /></div>
        </Reveal>
      </Section>
    </>
  );
}
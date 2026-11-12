"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { site, works, testimonials, type Work } from "@/data/site";

/* ---------- Muncul halus saat di-scroll ---------- */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${seen ? "in" : ""} ${className}`}>{children}</div>;
}

/* ---------- Header: scrollspy, progress bar, tema gelap/terang, menu mobile ---------- */
export function Header() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
    const onScroll = () => {
      const h = document.documentElement;
      setProgress(h.scrollTop / (h.scrollHeight - h.clientHeight || 1));
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    site.nav.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    return () => { removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
  };

  const link = (id: string) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${active === id ? "bg-sky text-accent" : "text-muted hover:text-ink"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-xl">
      <div className="absolute bottom-0 left-0 h-0.5 bg-accent transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight">
          {site.name}<span className="text-accent">.</span>
        </a>
        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 md:flex">
          {site.nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={link(n.id)} aria-current={active === n.id ? "true" : undefined}>{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} aria-label={dark ? "Aktifkan mode terang" : "Aktifkan mode gelap"} className="grid size-10 place-items-center rounded-full border border-line transition-colors hover:border-accent">
            <span aria-hidden="true">{dark ? "☀" : "☾"}</span>
          </button>
          <a href="#kontak" className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90 sm:inline-block">Hubungi saya</a>
          <button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="menu-mobile" aria-label="Menu" className="grid size-10 place-items-center rounded-full border border-line md:hidden">
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>
      {open && (
        <nav id="menu-mobile" aria-label="Navigasi mobile" className="border-t border-line bg-bg px-5 py-3 md:hidden">
          {site.nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 font-medium hover:bg-sky">{n.label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}

/* ---------- Hero: sorotan mengikuti kursor ---------- */
export function Spotlight({ children }: { children: ReactNode }) {
  return (
    <section
      id="top"
      className="spot relative overflow-hidden"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      <div aria-hidden="true" className="grid-bg absolute inset-0" />
      <div className="relative">{children}</div>
    </section>
  );
}

export function Rotator({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, [words.length]);
  return <span key={i} className="word-in text-accent">{words[i]}</span>;
}

export function LocalTime() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const tick = () => setNow(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const t = setInterval(tick, 30000);
    return () => clearInterval(t);
  }, []);
  return <span suppressHydrationWarning>{now || "—"}</span>;
}

/* ---------- Proyek: filter + modal detail ---------- */
const tabs = [["semua", "Semua"], ["proyek", "Proyek"], ["desain", "Desain"]] as const;

export function Projects() {
  const [filter, setFilter] = useState<string>("semua");
  const [sel, setSel] = useState<Work | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const list = works.filter((w) => filter === "semua" || w.kind === filter);
  const count = (k: string) => works.filter((w) => k === "semua" || w.kind === k).length;

  const btn = "rounded-full px-4 py-2 text-sm font-medium transition-colors";
  const links = sel && [sel.demo && ["Lihat demo", sel.demo], sel.code && ["Kode sumber", sel.code], sel.link && ["Buka desain", sel.link]].filter(Boolean) as string[][];

  return (
    <div>
      <div role="group" aria-label="Filter karya" className="mb-8 inline-flex gap-1 rounded-full border border-line bg-surface p-1">
        {tabs.map(([k, label]) => (
          <button key={k} onClick={() => setFilter(k)} aria-pressed={filter === k} className={`${btn} ${filter === k ? "bg-accent text-accent-ink" : "text-muted hover:text-ink"}`}>
            {label} <span className="opacity-70">{count(k)}</span>
          </button>
        ))}
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((w) => (
          <li key={w.slug}>
            <button onClick={() => { setSel(w); dlg.current?.showModal(); }} className="card card-hover group flex h-full w-full flex-col overflow-hidden text-left">
              <div className="relative grid aspect-[16/10] place-items-center bg-gradient-to-br from-sky to-surface">
                {w.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={w.image} alt={w.title} className="size-full object-cover" />
                ) : (
                  <span aria-hidden="true" className="font-display text-6xl font-semibold text-accent/40 transition-transform group-hover:scale-110">{w.title[0]}</span>
                )}
                <span className="absolute left-3 top-3 rounded-full bg-bg/90 px-3 py-1 text-xs font-medium capitalize">{w.kind}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs tabular-nums text-muted">{w.year}</p>
                <h3 className="mt-1 font-display text-lg font-semibold">{w.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{w.summary}</p>
                <span className="mt-auto pt-4 text-sm font-medium text-accent">Lihat detail <span className="inline-block transition-transform group-hover:translate-x-1">→</span></span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <dialog ref={dlg} onClick={(e) => e.target === e.currentTarget && dlg.current?.close()} aria-labelledby="dlg-title" className="m-auto w-[min(92vw,38rem)] rounded-3xl border border-line bg-card p-0 text-ink">
        {sel && (
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm capitalize text-muted">{sel.kind} · {sel.year}</p>
                <h3 id="dlg-title" className="mt-1 font-display text-2xl font-semibold">{sel.title}</h3>
              </div>
              <button onClick={() => dlg.current?.close()} aria-label="Tutup" className="grid size-9 shrink-0 place-items-center rounded-full border border-line hover:border-accent">✕</button>
            </div>
            <p className="mt-5 text-muted">{sel.text}</p>
            <dl className="mt-6 grid gap-3 text-sm">
              {sel.role && <div className="flex justify-between gap-4 border-t border-line pt-3"><dt className="text-muted">Peran</dt><dd className="text-right font-medium">{sel.role}</dd></div>}
              {sel.tool && <div className="flex justify-between gap-4 border-t border-line pt-3"><dt className="text-muted">Alat</dt><dd className="font-medium">{sel.tool}</dd></div>}
              {sel.stack && <div className="flex flex-wrap justify-between gap-2 border-t border-line pt-3"><dt className="text-muted">Teknologi</dt><dd className="flex flex-wrap justify-end gap-2">{sel.stack.map((s) => <span key={s} className="rounded-full bg-sky px-3 py-1 text-xs font-medium">{s}</span>)}</dd></div>}
            </dl>
            {links && links.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-3">
                {links.map(([label, href], i) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className={`rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90 ${i === 0 ? "bg-accent text-accent-ink" : "border border-line hover:border-accent"}`}>{label} ↗</a>
                ))}
              </div>
            )}
          </div>
        )}
      </dialog>
    </div>
  );
}

/* ---------- Testimoni: carousel ---------- */
export function Testimonials() {
  const [i, setI] = useState(0);
  const n = testimonials.length;
  const t = testimonials[i];
  const nav = "grid size-10 place-items-center rounded-full border border-line transition-colors hover:border-accent";
  return (
    <div className="card p-7 sm:p-10">
      <span aria-hidden="true" className="font-display text-6xl leading-none text-accent">“</span>
      <figure aria-live="polite" key={i} className="word-in">
        <blockquote className="max-w-2xl text-lg sm:text-xl">{t.quote}</blockquote>
        <figcaption className="mt-5 text-sm text-muted"><span className="font-medium text-ink">{t.name}</span>, {t.role}</figcaption>
      </figure>
      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-2" role="group" aria-label="Pilih testimoni">
          {testimonials.map((x, k) => (
            <button key={x.name} onClick={() => setI(k)} aria-label={`Testimoni ${k + 1}`} aria-current={k === i} className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-accent" : "w-2 bg-line hover:bg-muted"}`} />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setI((i - 1 + n) % n)} aria-label="Sebelumnya" className={nav}>←</button>
          <button onClick={() => setI((i + 1) % n)} aria-label="Berikutnya" className={nav}>→</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Kontak ---------- */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(email); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  };
  return (
    <div className="card flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
      <div>
        <p className="text-sm text-muted">Email</p>
        <a href={`mailto:${email}`} className="font-display text-xl font-semibold hover:text-accent sm:text-2xl">{email}</a>
      </div>
      <button onClick={copy} className="rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent" aria-live="polite">
        {copied ? "Tersalin ✓" : "Salin email"}
      </button>
    </div>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const field = "w-full rounded-xl border border-line bg-bg px-4 py-3 transition-colors placeholder:text-muted/60 focus:border-accent focus:outline-none";
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = `${d.get("message")}\n\n— ${d.get("name")} (${d.get("email")})`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Pesan dari portofolio")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  if (sent) {
    return (
      <div role="status" className="card p-8 text-center">
        <p className="font-display text-2xl font-semibold">Terima kasih! 🎉</p>
        <p className="mt-2 text-muted">Aplikasi email Anda akan terbuka dengan pesan yang sudah terisi. Tinggal tekan kirim.</p>
        <button onClick={() => setSent(false)} className="mt-5 text-sm font-medium text-accent hover:underline">Tulis pesan lain</button>
      </div>
    );
  }
  return (
    <form onSubmit={submit} className="card grid gap-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">Nama</label>
          <input id="name" name="name" type="text" required autoComplete="name" placeholder="Nama lengkap" className={field} />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="nama@email.com" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">Pesan</label>
        <textarea id="message" name="message" rows={5} required placeholder="Ceritakan singkat apa yang ingin Anda bangun…" className={`${field} resize-none`} />
      </div>
      <button type="submit" className="justify-self-start rounded-full bg-accent px-7 py-3 font-medium text-accent-ink transition-opacity hover:opacity-90">Kirim pesan</button>
    </form>
  );
}
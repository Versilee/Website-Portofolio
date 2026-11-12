"use client";

import Image from "next/image";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { site, designs, type Design } from "@/data/site";
import { btn, card } from "@/components/ui";

/* ------------------------------------------------------------------ */
/* Cover: gambar sampul. Jika belum ada gambar, tampil blok biru muda. */
/* ------------------------------------------------------------------ */
export function Cover({
  src,
  alt,
  label,
  className = "aspect-[16/10]",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  src?: string;
  alt: string;
  label: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-sky ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <div className="grid h-full place-items-center bg-gradient-to-br from-sky to-sky-strong">
          <span aria-hidden="true" className="font-display text-5xl font-bold text-ink/20">
            {label.charAt(0)}
          </span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Header: menempel di atas, penanda section aktif, progress scroll.   */
/* ------------------------------------------------------------------ */
export function Header() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const els = site.nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      {/* Garis progress: menunjukkan sudah sejauh mana halaman dibaca */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-accent"
        style={{ transform: `scaleX(${progress})` }}
      />

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          {site.name}
        </a>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 md:flex">
          {site.nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              aria-current={active === n.id ? "true" : undefined}
              className={`rounded-md px-3.5 py-1.5 text-sm transition-colors ${
                active === n.id ? "bg-sky font-semibold text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={site.cvUrl} download className={`${btn} hidden sm:inline-flex`}>
            Unduh CV
          </a>
          <button
            type="button"
            className="rounded-lg border border-line px-4 py-2 text-sm md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Tutup" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Navigasi utama" className="border-t border-line bg-white px-5 py-3 md:hidden">
          <ul>
            {site.nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-3 font-display text-lg last:border-0"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a href={site.cvUrl} download className={`${btn} w-full`}>
                Unduh CV
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Reveal: konten muncul lembut saat di-scroll.                        */
/* Yang sudah terlihat saat halaman dibuka tidak dianimasikan.         */
/* ------------------------------------------------------------------ */
export function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    el.classList.add("reveal");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.06 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
}

/* ------------------------------------------------------------------ */
/* Tabs: mengelompokkan konten agar halaman tidak terlalu panjang.     */
/* Mendukung keyboard: panah kiri/kanan, Home, End.                    */
/* ------------------------------------------------------------------ */
export type TabItem = { id: string; label: string; count?: number; content: ReactNode };

export function Tabs({ label, tabs }: { label: string; tabs: TabItem[] }) {
  const uid = useId();
  const [current, setCurrent] = useState(tabs[0].id);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  function onKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    const id = tabs[next].id;
    setCurrent(id);
    refs.current[id]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label={label} className="flex max-w-full gap-1 overflow-x-auto rounded-lg bg-sky p-1 sm:inline-flex">
        {tabs.map((t, i) => {
          const selected = current === t.id;
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[t.id] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`${uid}-panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setCurrent(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`shrink-0 whitespace-nowrap rounded-md px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                selected ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink"
              }`}
            >
              {t.label}
              {t.count !== undefined && <span className="ml-2 font-normal text-muted">{t.count}</span>}
            </button>
          );
        })}
      </div>

      {tabs.map(
        (t) =>
          current === t.id && (
            <div
              key={t.id}
              role="tabpanel"
              id={`${uid}-panel-${t.id}`}
              aria-labelledby={`${uid}-tab-${t.id}`}
              tabIndex={0}
              className="panel-in mt-8"
            >
              {t.content}
            </div>
          ),
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Galeri desain: klik untuk memperbesar (dialog bawaan browser).      */
/* ------------------------------------------------------------------ */
export function DesignGallery() {
  const [selected, setSelected] = useState<Design | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (selected && !d.open) d.showModal();
    if (!selected && d.open) d.close();
  }, [selected]);

  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {designs.map((d) => (
          <li key={d.title}>
            <button
              type="button"
              onClick={() => setSelected(d)}
              aria-label={`Perbesar desain ${d.title}`}
              className={`${card} block w-full text-left`}
            >
              <Cover src={d.image} alt={`Desain ${d.title}`} label={d.title} />
              <span className="block p-4">
                <span className="block font-semibold">{d.title}</span>
                <span className="mt-1 block text-sm text-muted">
                  {d.category}, dibuat dengan {d.tool}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setSelected(null)}
        onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        aria-label={selected ? `Desain ${selected.title}` : "Detail desain"}
        className="m-auto w-[min(92vw,760px)] overflow-hidden rounded-xl bg-white p-0 text-ink backdrop:bg-ink/50 backdrop:backdrop-blur-sm"
      >
        {selected && (
          <div>
            <Cover
              src={selected.image}
              alt={`Desain ${selected.title}`}
              label={selected.title}
              className="aspect-[16/10]"
              sizes="760px"
            />
            <div className="flex items-start justify-between gap-4 p-5">
              <div>
                <h3 className="font-display text-xl font-bold">{selected.title}</h3>
                <p className="mt-1 text-muted">
                  {selected.category}, dibuat dengan {selected.tool}
                </p>
                {selected.link && (
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block font-semibold text-accent underline underline-offset-4"
                  >
                    Lihat desain lengkap
                  </a>
                )}
              </div>
              <button type="button" autoFocus onClick={() => setSelected(null)} className={btn}>
                Tutup
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Email yang bisa disalin dengan satu klik.                           */
/* ------------------------------------------------------------------ */
export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <a
        href={`mailto:${site.email}`}
        className="break-all font-display text-2xl font-bold underline decoration-sky-deep decoration-2 underline-offset-8 transition-colors hover:decoration-accent sm:text-3xl"
      >
        {site.email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="rounded-lg border border-sky-deep bg-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-surface"
      >
        {copied ? "Email tersalin" : "Salin email"}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email tersalin" : ""}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tombol kembali ke atas: muncul setelah halaman digulir cukup jauh.  */
/* ------------------------------------------------------------------ */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#top"
      aria-label="Kembali ke atas"
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-5 right-5 z-30 grid size-11 place-items-center rounded-lg border border-line bg-white text-lg shadow-md transition-all duration-300 hover:border-sky-deep hover:bg-surface ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <span aria-hidden="true">&uarr;</span>
    </a>
  );
}
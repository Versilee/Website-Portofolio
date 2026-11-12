// Class Tailwind yang dipakai berulang. Dipisah dari client.tsx
// agar bisa dipakai di server component maupun client component.

const base =
  "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:translate-y-px";

/** Tombol utama: biru muda dengan teks biru tua. */
export const btn = `${base} bg-sky-deep text-ink hover:bg-accent hover:text-white`;

/** Tombol sekunder: putih dengan garis tipis. */
export const btnGhost = `${base} border border-line bg-white text-ink hover:border-sky-deep hover:bg-surface`;

/** Label kecil untuk teknologi dan keahlian. */
export const chip = "rounded-md bg-sky px-2.5 py-1 text-sm font-medium text-ink";

/** Kartu dengan efek angkat tipis saat disorot. */
export const card =
  "overflow-hidden rounded-xl border border-line bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-deep hover:shadow-[0_10px_28px_-14px_rgba(37,99,235,0.35)]";
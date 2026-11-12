import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/client";
import { site } from "@/data/site";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const body = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.role}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { type: "website", locale: "id_ID", url: site.url, siteName: site.name, title: `${site.name} | ${site.role}`, description: site.description },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#070d1a" },
  ],
};

// Terapkan tema sebelum halaman tampil agar tidak berkedip.
const themeScript = `try{var t=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh">
        <a href="#konten" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg">
          Lewati ke konten
        </a>
        <Header />
        <main id="konten">{children}</main>
        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p>&copy; 2026 {site.name}. Dibuat dengan Next.js dan Tailwind CSS.</p>
            <ul className="flex flex-wrap gap-5">
              {site.socials.map((s) => (
                <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">{s.label}</a></li>
              ))}
              <li><a href="#top" className="transition-colors hover:text-accent">Kembali ke atas ↑</a></li>
            </ul>
          </div>
        </footer>
      </body>
    </html>
  );
}
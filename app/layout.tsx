import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Header, BackToTop } from "@/components/client";
import { site } from "@/data/site";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Portofolio`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: site.url,
    siteName: `${site.name} | Portofolio`,
    title: `${site.name} | Portofolio`,
    description: site.description,
    // Tambahkan app/opengraph-image.png agar muncul saat tautan dibagikan.
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-sky-deep focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
        >
          Lewati ke konten
        </a>

        <Header />
        <main id="konten">{children}</main>
        <BackToTop />

        <footer className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-6 text-sm text-muted sm:px-8">
            &copy; {new Date().getFullYear()} {site.name}. {site.school}.
          </div>
        </footer>
      </body>
    </html>
  );
}
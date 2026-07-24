import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://subventii.ro"),
  title: {
    default: "Subvenții.ro — Căutare și Descoperire Fonduri Nerambursabile",
    template: "%s | Subvenții.ro",
  },
  description:
    "Cea mai rapidă și clară platformă din România pentru căutarea subvențiilor, granturilor PNRR, Start-Up Nation și sprijinului pentru IMM-uri.",
  keywords: [
    "subventii",
    "fonduri europene",
    "granturi IMM",
    "PNRR",
    "Start-Up Nation",
    "AFIR",
    "AFM",
    "ADR",
    "finantari nerambursabile",
  ],
  authors: [{ name: "Subvenții.ro" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://subventii.ro",
    siteName: "Subvenții.ro",
    title: "Subvenții.ro — Căutare și Descoperire Fonduri Nerambursabile",
    description:
      "Găsește rapid programe de finanțare publică pentru afacerea ta din surse oficiale verificate.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Subvenții.ro — Căutare Fonduri Nerambursabile",
    description:
      "Platformă rapidă și gratuită pentru descoperirea subvențiilor și granturilor în România.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d3822",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className="antialiased text-slate-900 bg-white min-h-screen">
        {children}
      </body>
    </html>
  );
}

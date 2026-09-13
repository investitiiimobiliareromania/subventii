import type { Metadata, Viewport } from "next";
import { VisitorTracker } from "@/components/visitor-tracker";
import "./globals.css";

const siteTitle = "SUBVENȚII România — Platforma Națională de Informare Subvenții Agricole, APIA & AFIR";
const siteDescription =
  "Ghidul complet al subvențiilor agricole APIA, fondurilor nerambursabile AFIR, intervențiilor MADR, legislației oficiale și oportunităților de finanțare pentru toate cele 41 de județe din România.";

export const metadata: Metadata = {
  metadataBase: new URL("https://subventii.cristianvaduva.com"),
  title: {
    default: siteTitle,
    template: "%s | SUBVENȚII România",
  },
  description: siteDescription,
  alternates: {
    canonical: "https://subventii.cristianvaduva.com/",
  },
  keywords: [
    "subventii agricole",
    "APIA",
    "AFIR",
    "MADR",
    "plati directe",
    "eco-scheme",
    "tineri fermieri",
    "fonduri europene agricultura",
    "legislatie agricola",
    "subventii judete romania",
  ],
  authors: [{ name: "SUBVENȚII România" }],
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
    url: "https://subventii.cristianvaduva.com",
    siteName: "SUBVENȚII România",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "https://subventii.cristianvaduva.com/og-image.png",
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["https://subventii.cristianvaduva.com/og-image.png"],
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://subventii.cristianvaduva.com/#website",
        "url": "https://subventii.cristianvaduva.com",
        "name": "SUBVENȚII România",
        "description": "Platformă națională de informare privind subvențiile agricole, fondurile europene și legislația de profil",
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://subventii.cristianvaduva.com/finantari?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://subventii.cristianvaduva.com/#organization",
        "name": "SUBVENȚII România",
        "url": "https://subventii.cristianvaduva.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://subventii.cristianvaduva.com/favicon.ico"
        }
      }
    ]
  };

  return (
    <html lang="ro">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased text-slate-900 bg-white min-h-screen">
        <VisitorTracker />
        {children}
      </body>
    </html>
  );
}

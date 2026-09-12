import type { Metadata, Viewport } from "next";
import { VisitorTracker } from "@/components/visitor-tracker";
import "./globals.css";

const siteTitle = "AiX — Educational Intelligence | Educație și Informare Finanțări";
const siteDescription =
  "Platformă privată de educație și informare care organizează și explică informații publice despre finanțări, antreprenoriat, legislație și economie.";

export const metadata: Metadata = {
  metadataBase: new URL("https://subventii.cristianvaduva.com"),
  title: {
    default: siteTitle,
    template: "%s | AiX Educational Intelligence",
  },
  description: siteDescription,
  alternates: {
    canonical: "https://subventii.cristianvaduva.com/",
  },
  keywords: [
    "AiX Educational Intelligence",
    "educatie financiara",
    "informatii publice",
    "finantari si granturi",
    "concepte economice",
    "legislatie imm",
    "antreprenoriat",
  ],
  authors: [{ name: "AiX — Educational Intelligence" }],
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
    siteName: "AiX — Educational Intelligence",
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
        "name": "AiX — Educational Intelligence",
        "description": "Platformă privată de educație și informare privind finanțările și legislația",
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://subventii.cristianvaduva.com/programes?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://subventii.cristianvaduva.com/#organization",
        "name": "AiX — Educational Intelligence",
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

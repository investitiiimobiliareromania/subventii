import type { Metadata, Viewport } from "next";
import { VisitorTracker } from "@/components/visitor-tracker";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://subventii.cristianvaduva.com"),
  title: {
    default: "AiX — Educational Intelligence | Educație și Informare Finanțări",
    template: "%s | AiX Educational Intelligence",
  },
  description:
    "Platformă privată de educație și informare care organizează și explică informații publice despre finanțări, antreprenoriat, legislație și economie.",
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
    title: "AiX — Educational Intelligence | Platformă Privată de Informare",
    description:
      "Platformă privată de educație și informare care centralizează și explică informații publice din surse deschise.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AiX — Educational Intelligence",
    description:
      "Platformă privată de educație și informare privind finanțările, programele și economia.",
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

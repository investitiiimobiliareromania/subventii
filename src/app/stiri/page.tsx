import { safeJsonLd } from "@/lib/security";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { NewsroomFilter } from "@/components/newsroom-filter";
import { newsroomArticles } from "@/lib/newsroom-data";

export const metadata: Metadata = {
  title: "Știri & Noutăți Finanțări Europene, IMM-uri și Programe Naționale 2026",
  description: "Noutăți verificate în timp real: deschiderea apelurilor de proiecte, ghiduri de finanțare, calendare oficiale, decizii ministeriale și oportunități pentru afaceri.",
  alternates: { canonical: "https://subventii.cristianvaduva.com/stiri" },
};

export default function NewsroomPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Newsroom Finanțări & Programe",
    "url": "https://subventii.cristianvaduva.com/stiri",
    "description": "Comunicate oficiale și noutăți despre finanțările europene, programele naționale și oportunitățile economice.",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav aria-label="Navigare pe pagină" className="mb-6 flex items-center gap-2 text-xs text-slate-600">
            <Link href="/" className="hover:text-emerald-800 transition-colors">Acasă</Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-slate-900">Newsroom &amp; Știri Finanțări</span>
          </nav>

          <div className="mb-10 border-b border-slate-200 pb-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                MONITORIZARE OFICIALĂ &amp; COMUNICATE
              </span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 border border-slate-200 font-mono">
                SURSE OFICIALE GUVERNAMENTALE &amp; EUROPENE
              </span>
              <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                OCTOMBRIE 2026
              </span>
            </div>
            <h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">
              Noutăți Finanțări, Ghiduri de Proiecte și Decizii Oficiale
            </h1>
            <p className="mt-2 text-sm text-slate-700 max-w-3xl leading-relaxed">
              Analize structurate ale ghidurilor solicitantului, ordonanțelor de urgență, termenelor de depunere a proiectelor și fondurilor europene și naționale destinate dezvoltării economice.
            </p>
          </div>

          <NewsroomFilter articles={newsroomArticles} />
        </div>
      </main>

      <AiAssistantDrawer />
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { legislationCatalog } from "@/lib/legislatie-data";

export const metadata: Metadata = {
  title: "Legislație Fiscală & IMM România 2026",
  description: "Centralizatorul oficial al modificărilor legislative, OUG, HG, Legi și Ordine de ministru cu impact pe fonduri, firme și investiții.",
  alternates: { canonical: "https://subventii.cristianvaduva.com/legislatie" },
};

export default function LegislationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Legislație Finanțări & IMM",
    "url": "https://subventii.cristianvaduva.com/legislatie",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Legislație</span>
          </nav>

          <div className="mb-10 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Monitor Oficial & Decizii de Guvern</span>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Noutăți Legislative cu Impact Economic și Fiscal
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
              Urmărește ordonanțele de urgență, legile și ordinele ministeriale ce reglementează fondurile europene, regimul fiscal al IMM-urilor și ajutoarele de stat.
            </p>
          </div>

          <div className="space-y-6">
            {legislationCatalog.map((leg) => (
              <article key={leg.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-slate-900 px-2.5 py-0.5 text-xs font-bold text-white">
                      {leg.actType} {leg.actNumber}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">Publicat: {leg.publicationDate}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-800">Intrare în vigoare: {leg.effectiveDate}</span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-2">{leg.title}</h2>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">{leg.summary}</p>

                <div className="mb-4 flex flex-wrap gap-1.5">
                  {leg.affectedSectors.map((sec, i) => (
                    <span key={i} className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                      #{sec}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                  <a href={leg.officialSourceUrl} target="_blank" rel="noreferrer" className="text-slate-500 hover:underline">
                    Sursă: Monitorul Oficial ↗
                  </a>
                  <Link href="/contact" className="font-bold text-emerald-800 hover:underline">
                    Consultanță legislativă →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <AiAssistantDrawer />
      <Footer />
    </div>
  );
}

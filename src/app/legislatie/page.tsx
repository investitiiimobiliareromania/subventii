import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { legislationCatalog } from "@/lib/legislatie-data";

export const metadata: Metadata = {
  title: "Legislație Subvenții Agricole, Ordine MADR & Regulamente PAC 2026",
  description: "Centralizatorul oficial al modificărilor legislative din agricultură: Ordinul MADR 80/2023, Regulamentul UE 2021/2115, OUG 34/2023 pajiști, derogări GAEC și ajutoare de stat.",
  alternates: { canonical: "https://subventii.cristianvaduva.com/legislatie" },
};

export default function LegislationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Legislație Subvenții Agricole & Fonduri Europene",
    "url": "https://subventii.cristianvaduva.com/legislatie",
    "description": "Centralizator de acte normative, ordine de ministru și regulamente europene aplicabile în agricultură.",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav aria-label="Navigare pe pagină" className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Legislație &amp; Ordine MADR</span>
          </nav>

          <div className="mb-10 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              MONITOR JURIDIC &amp; CADRU NORMATIV
            </span>
            <h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">
              Legislație Oficială: Subvenții APIA, Intervenții AFIR &amp; PAC 2023–2027
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
              Urmărește ordinele ministrului agriculturii, ordonanțele de urgență, hotărârile de guvern și regulamentele Uniunii Europene care guvernează acordarea plăților directe, a sprijinului cuplat și a fondurilor de dezvoltare rurală în România.
            </p>
          </div>

          <div className="space-y-6">
            {legislationCatalog.map((leg) => (
              <article key={leg.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-emerald-500 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-slate-900 px-2.5 py-0.5 text-xs font-bold text-white font-mono">
                      {leg.actType} {leg.actNumber}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">Publicat: {leg.publicationDate}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-800">Intrare în vigoare: {leg.effectiveDate}</span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-2">{leg.title}</h2>
                <p className="text-xs sm:text-sm text-slate-700 mb-4 leading-relaxed">{leg.summary}</p>

                <div className="mb-4 flex flex-wrap gap-1.5">
                  {leg.affectedSectors.map((sec, i) => (
                    <span key={i} className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 border border-slate-200">
                      #{sec}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs">
                  <a
                    href={leg.officialSourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-600 hover:text-emerald-800 font-semibold inline-flex items-center gap-1"
                  >
                    <span>Sursă Oficială (Portalul Legislativ / Monitorul Oficial)</span>
                    <span>↗</span>
                  </a>

                  {leg.affectedProgrammes && leg.affectedProgrammes.length > 0 && (
                    <Link
                      href={`/finantari/${leg.affectedProgrammes[0]}`}
                      className="font-bold text-emerald-800 hover:underline"
                    >
                      Vezi intervențiile asociate →
                    </Link>
                  )}
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

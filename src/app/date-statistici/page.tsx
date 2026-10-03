import { safeJsonLd } from "@/lib/security";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { OPEN_DATASETS_REGISTRY } from "@/lib/datasets-data";

export const metadata: Metadata = {
  title: "Date & Statistici Publice România 2026: Registrul Oficial de Datasets Deschise",
  description: "Registrul centralizat al seturilor de date oficiale din România: ANCPI tranzacții, INSSE Tempo Online, BNR serii statistice, MySMIS fonduri UE, SEAP și data.gov.ro.",
  alternates: { canonical: "https://subventii.cristianvaduva.com/date-statistici" },
};

export default function DatasetsRegistryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Date & Statistici Publice România",
    "url": "https://subventii.cristianvaduva.com/date-statistici",
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
            <span className="font-semibold text-slate-900">Date &amp; Statistici Publice</span>
          </nav>

          <header className="mb-10 rounded-2xl border border-slate-200 bg-slate-900 p-6 md:p-8 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="rounded bg-emerald-800 px-2.5 py-0.5 text-xs font-bold font-mono">
                OPEN DATA &amp; STATISTICI OFICIALE
              </span>
              <span className="text-xs text-slate-300 font-semibold">SURSE PRIMARE VERIFICATE</span>
            </div>
            <h1 className="text-3xl font-extrabold sm:text-4xl leading-tight">
              Registrul Național al Seturilor de Date Publice &amp; Statistici Oficiale
            </h1>
            <p className="mt-3 text-xs text-slate-300 max-w-3xl leading-relaxed">
              Punctul de acces către datele brute și seriile de timp publicate de agențiile de stat din România: cadastrul imobiliar, indicatorii macroeconomici, absorbția fondurilor europene și achizițiile publice.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-slate-800 pt-6 text-center text-xs">
              <div>
                <span className="block text-slate-400">Datasets Înregistrate</span>
                <span className="font-bold text-white mt-1 block">{OPEN_DATASETS_REGISTRY.length} Seturi Oficiale</span>
              </div>
              <div>
                <span className="block text-slate-400">Formate Disponibile</span>
                <span className="font-bold text-emerald-400 mt-1 block">API / CSV / XLSX / JSON</span>
              </div>
              <div>
                <span className="block text-slate-400">Standard Guvernanță</span>
                <span className="font-bold text-white mt-1 block">Zero-Trust / Oficial</span>
              </div>
              <div>
                <span className="block text-slate-400">Actualizare</span>
                <span className="font-bold text-emerald-400 mt-1 block">Continuă 2026</span>
              </div>
            </div>
          </header>

          {/* DATASETS GRID */}
          <section className="mb-12">
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  CATALOG METADATE &amp; CONEXIUNI PRIMARE
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-0.5">Seturi de Date Monitorizate</h2>
              </div>
              <span className="text-xs text-slate-500 font-semibold">
                Acces direct la sursele publice autorizate
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {OPEN_DATASETS_REGISTRY.map((ds) => (
                <article key={ds.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between hover:border-emerald-500 transition-colors">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white font-mono">
                        {ds.category}
                      </span>
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                        {ds.frequency}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-1.5 leading-snug">
                      {ds.title}
                    </h3>
                    <p className="text-[11px] font-semibold text-emerald-800 mb-3">
                      🏛️ {ds.institution}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {ds.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-3 mb-4">
                      <span className="text-[10px] font-semibold text-slate-500 mr-1">Formate:</span>
                      {ds.formats.map((fmt, i) => (
                        <span key={i} className="rounded bg-emerald-50 text-emerald-900 border border-emerald-200/80 px-2 py-0.5 text-[10px] font-bold font-mono">
                          {fmt}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-500 truncate max-w-[220px]" title={ds.license}>
                      Licență: {ds.license}
                    </span>
                    <a
                      href={ds.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-emerald-800 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Deschide Dataset</span>
                      <span>↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <AiAssistantDrawer />
      <Footer />
    </div>
  );
}

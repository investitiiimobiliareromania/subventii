import { safeJsonLd } from "@/lib/security";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import {
  MACRO_ECONOMIC_DATASET,
  REGIONAL_GDP_DISTRIBUTION,
} from "@/lib/economie-data";

export const metadata: Metadata = {
  title: "Economia României 2026: Indicatori Macroeconomici INSSE, BNR & Prognoze",
  description: "Date oficiale privind PIB, rata inflației IPC, dobânda de politică monetară, IRCC, câștigul salarial mediu net, exporturile FOB și distribuția regională a PIB.",
  alternates: { canonical: "https://subventii.cristianvaduva.com/economie" },
};

export default function EconomyDataHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Economia României — Date și Indicatori Macroeconomici Oficiali",
    "url": "https://subventii.cristianvaduva.com/economie",
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
            <span className="font-semibold text-slate-900">Economie &amp; Date Macroeconomice</span>
          </nav>

          <header className="mb-10 rounded-2xl border border-slate-200 bg-slate-900 p-6 md:p-8 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="rounded bg-emerald-800 px-2.5 py-0.5 text-xs font-bold font-mono">
                DATA HUB MACROECONOMIC
              </span>
              <span className="text-xs text-slate-300 font-semibold">INSSE • BNR • EUROSTAT</span>
            </div>
            <h1 className="text-3xl font-extrabold sm:text-4xl leading-tight">
              Economia României — Indicatori Oficiali &amp; Tendințe Structurale 2026
            </h1>
            <p className="mt-3 text-xs text-slate-300 max-w-3xl leading-relaxed">
              Monitorizarea evoluției Produsului Intern Brut, a indicelui prețurilor de consum (inflație), parametrilor de creditare BNR (IRCC), pieței muncii și a balanței comerciale externe, bazată exclusiv pe buletinele statistice oficiale.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-slate-800 pt-6 text-center text-xs">
              <div>
                <span className="block text-slate-400">PIB Nominal Estimativ</span>
                <span className="font-bold text-white mt-1 block">1.745 mld. RON</span>
              </div>
              <div>
                <span className="block text-slate-400">Rata Inflației (IPC)</span>
                <span className="font-bold text-emerald-400 mt-1 block">5,1%</span>
              </div>
              <div>
                <span className="block text-slate-400">Indice IRCC Credite</span>
                <span className="font-bold text-white mt-1 block">5,56% (T3)</span>
              </div>
              <div>
                <span className="block text-slate-400">Salariu Mediu Net</span>
                <span className="font-bold text-emerald-400 mt-1 block">5.176 RON</span>
              </div>
            </div>
          </header>

          {/* MAIN INDICATORS GRID */}
          <section className="mb-12">
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  INDICATORI MONETARI &amp; STATISTICI CHEIE
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-0.5">Tabloul de Bord Economic Național</h2>
              </div>
              <span className="text-xs text-slate-500 font-semibold">
                Surse: INSSE, BNR (Actualizat 2026)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {MACRO_ECONOMIC_DATASET.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 mb-2 inline-block">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">
                      {item.name}
                    </h3>
                    <div className="my-3 border-y border-slate-100 py-2.5">
                      <span className="text-xl font-black text-slate-900 block">
                        {item.value}
                      </span>
                      <div className="mt-1 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">{item.period}</span>
                        <span className="font-semibold text-emerald-800">{item.yoyChange}</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-3 text-[10px] text-slate-500 space-y-1">
                    <p className="truncate" title={item.sourceName}>Sursă: {item.sourceName}</p>
                    <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-800 hover:underline block">
                      Portal Sursă Oficială ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* REGIONAL GDP DISTRIBUTION */}
          <section className="mb-12 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-xs">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                DISPARITĂȚI &amp; POLI DE CREȘTERE
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
                Distribuția Regională a Produsului Intern Brut (8 Regiuni de Dezvoltare)
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Ponderea fiecărei regiuni în formarea PIB-ului național și nivelul PIB per capita raportat la media Uniunii Europene (PPS UE27 = 100).
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-xs text-slate-800">
                <thead className="bg-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200">
                  <tr>
                    <th scope="col" className="py-3 px-4">Regiune de Dezvoltare</th>
                    <th scope="col" className="py-3 px-4 text-right">Pondere în PIB</th>
                    <th scope="col" className="py-3 px-4 text-right">PIB/Capita (% UE27)</th>
                    <th scope="col" className="py-3 px-4">Motoare Economice Principale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {REGIONAL_GDP_DISTRIBUTION.map((reg) => (
                    <tr key={reg.region} className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">{reg.region}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-emerald-800">{reg.gdpSharePct}%</td>
                      <td className="py-3 px-4 text-right font-mono text-slate-700">{reg.gdpPerCapitaPps}% din media UE</td>
                      <td className="py-3 px-4 text-slate-600 text-[11px]">{reg.mainDrivers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* METHODOLOGY & DATA GOVERNANCE */}
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white shadow-md">
            <div className="border-b border-slate-800 pb-4 mb-4">
              <span className="text-xs font-mono font-bold text-emerald-400 block">STANDARD METODOLOGIC &amp; TRANSPARENȚĂ</span>
              <h2 className="text-lg font-bold text-white mt-1">Proveniența Datelor Economice</h2>
            </div>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <p>
                Platforma noastră centralizează exclusiv datele statistice primare publicate de <strong>Institutul Național de Statistică (INSSE)</strong>, <strong>Banca Națională a României (BNR)</strong>, <strong>Ministerul Finanțelor</strong> și <strong>Eurostat</strong>.
              </p>
              <p>
                Nu efectuăm extrapolări speculative sau ajustări nefundamentate. Toate valorile sunt prezentate însoțite de perioada oficială de referință și metodologia de calcul stabilită de organismele de reglementare.
              </p>
            </div>
          </section>
        </div>
      </main>

      <AiAssistantDrawer />
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { realEstateCityReports, realEstateMarketMacro } from "@/lib/piata-imobiliara-data";

export const metadata: Metadata = {
  title: "Piața Imobiliară România 2026: Date Oficiale ANCPI & Cadrul Macro",
  description: "Rapoarte oficiale de tranzacții și imobile vândute pe marile centre urbane, indici macroeconomici BNR (IRCC) și legislație fiscală TVA.",
  alternates: { canonical: "https://subventii.cristianvaduva.com/piata-imobiliara" },
};

export default function RealEstatePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Piața Imobiliară România 2026",
    "url": "https://subventii.cristianvaduva.com/piata-imobiliara",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav aria-label="Navigare pe pagină" className="mb-6 flex items-center gap-2 text-xs text-slate-600">
            <Link href="/" className="hover:text-emerald-800 transition-colors">Acasă</Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-slate-900">Piața Imobiliară</span>
          </nav>

          <div className="mb-8 border-b border-slate-200 pb-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                INTELIGENȚĂ IMOBILIARĂ &amp; DATE OFICIALE
              </span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 border border-slate-200">
                SURSA: ANCPI / BNR / MF
              </span>
              <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                SEPTEMBRIE 2026
              </span>
            </div>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Raportul Pieței Imobiliare pe Marile Centre Urbane 2026
            </h1>
            <p className="mt-2 text-sm text-slate-700 max-w-3xl leading-relaxed">
              Analiză consolidată a volumului oficial de imobile vândute înregistrate la ANCPI (Iunie 2026), indicatorilor de creditare BNR și regimului fiscal aplicabil locuințelor.
            </p>
          </div>

          {/* MACRO CONTEXT CARDS */}
          <section className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Indice Credite IRCC
              </span>
              <span className="text-2xl font-black text-slate-900 block">{realEstateMarketMacro.irccIndex}</span>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">{realEstateMarketMacro.irccNote}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Regim Fiscal TVA Locuințe
              </span>
              <span className="text-2xl font-black text-slate-900 block">21% Cota Standard</span>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">{realEstateMarketMacro.vatThresholdNote}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Sistem Cadastral e-Terra
              </span>
              <span className="text-2xl font-black text-emerald-800 block">Operațional</span>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">{realEstateMarketMacro.ancpiOperationalStatus}</p>
            </div>
          </section>

          {/* CITY CARDS */}
          <section className="mb-10">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Imobile Vândute pe Județe Majore și București (ANCPI Iunie 2026)
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Date oficiale provenite din registrul cadastral ANCPI (Tabelul 1 — Iunie 2026).
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {realEstateCityReports.map((c) => (
                <div key={c.city} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-extrabold text-slate-900">{c.city}</h3>
                    </div>
                    <span className="inline-block text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded mb-3">
                      {c.nationalRankNote}
                    </span>

                    <div className="space-y-2 text-xs border-y border-slate-100 py-3 mb-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Imobile vândute:</span>
                        <strong className="text-base font-black text-slate-900">{c.ancpiJune2026Transactions.toLocaleString("ro-RO")}</strong>
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-500">Lună de referință:</span>
                        <span className="font-semibold text-slate-700">Iunie 2026</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-600 leading-relaxed mb-4">
                      {c.marketNote}
                    </p>
                  </div>

                  <div>
                    <div className="text-[10px] text-slate-600 italic mb-3 border-t border-slate-100 pt-2">
                      Sursă: {c.sourceAttribution}
                    </div>
                    <Link
                      href={`/judete/${c.county.toLowerCase().replace(/[^a-z0-9]/g, "")}`}
                      className="block text-center rounded-lg border border-slate-300 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                      aria-label={`Vezi raportul detaliat pentru județul ${c.county}`}
                    >
                      Vezi Date Județene →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* METHODOLOGY & TRANSPARENCY */}
          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-2">
              Metodologie &amp; Proveniență Date
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed mb-3">
              {realEstateMarketMacro.methodologyNote}
            </p>
            <p className="text-[11px] text-slate-600">
              AiX Educational Intelligence nu oferă consultanță financiară sau recomandări speculative de investiții. Pentru decizii de achiziție, se recomandă evaluarea individuală a proprietății și consultarea datelor cadastrale oficiale.
            </p>
          </section>
        </div>
      </main>

      <AiAssistantDrawer />
      <Footer />
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { ancpiMonthlyDataset, ancpiReportSummary } from "@/lib/rapoarte-ancpi-data";

export default function AncpiReportsPage() {
  const [searchCounty, setSearchCounty] = useState("");

  const filteredStats = ancpiMonthlyDataset.filter((item) =>
    item.countyName.toLowerCase().includes(searchCounty.toLowerCase().trim()) ||
    item.countyCode.toLowerCase().includes(searchCounty.toLowerCase().trim())
  );

  function handleExportCsv() {
    const headers = "Cod Judet,Nume Judet,Regiune,Unitati Individuale,Terenuri,Total Tranzactii 2026,Total Tranzactii 2025,Evolutie\n";
    const rows = filteredStats
      .map(
        (s) =>
          `"${s.countyCode}","${s.countyName}","${s.region}",${s.individualUnitsTransacted},${s.landPlotsTransacted},${s.totalTransactions},${s.totalTransactions2025 || ""},"${s.momChangePctString || s.momChangePct + "%"}"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Rapoarte_ANCPI_${ancpiReportSummary.reportMonth.replace(" ", "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* 1. BREADCRUMB */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Rapoarte ANCPI</span>
          </nav>

          {/* 2 & 3 & 4. REPORT LABEL, MAIN TITLE & INTRODUCTION */}
          <div className="mb-10 border-b border-slate-200 pb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">ANALIZĂ DE PIAȚĂ • ROMÂNIA</span>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Piața Imobiliară din România — Dinamica Pieței, Iunie 2026
            </h1>
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-2">
              <p className="text-base font-bold text-slate-900">
                Piața imobiliară din România continuă să demonstreze reziliență.
              </p>
              <p className="text-sm font-semibold text-slate-700">
                Dincolo de creșterea națională de <strong className="text-emerald-800 font-extrabold">+5,3%</strong>, datele pentru iunie 2026 arată o dinamică regională mult mai interesantă.
              </p>
              <p className="text-xs text-slate-500 italic pt-1">
                Analiză AiX OS bazată pe date publice disponibile pentru piața imobiliară din România.
              </p>
            </div>
          </div>

          {/* 5. HERO STATISTICS */}
          <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-xs text-center">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">TOTAL IMOBILE TRANZACȚIONATE</span>
              <span className="text-3xl font-black text-slate-900 mt-1 block">51.808</span>
              <span className="text-xs font-semibold text-slate-600 mt-1 block">Iunie 2026</span>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-xs text-center">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">BUCUREȘTI</span>
              <span className="text-3xl font-black text-slate-900 mt-1 block">10.398</span>
              <span className="text-xs font-semibold text-emerald-700 mt-1 block">+35,7% față de iunie 2025</span>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-xs text-center">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">CREȘTERE NAȚIONALĂ</span>
              <span className="text-3xl font-black text-emerald-700 mt-1 block">+5,3%</span>
              <span className="text-xs font-semibold text-slate-600 mt-1 block">față de iunie 2025</span>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-xs text-center">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">AIx OS SCORE</span>
              <div className="flex items-baseline justify-center gap-1 mt-1">
                <span className="text-3xl font-black text-slate-900">9,2</span>
                <span className="text-sm font-bold text-slate-500">/ 10</span>
              </div>
              <span className="text-xs font-semibold text-slate-600 mt-1 block">Dinamica pieței</span>
            </div>
          </div>

          {/* 6. MAIN MARKET PULSE SECTION */}
          <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <h2 className="text-xl font-extrabold text-slate-900 mb-4">📈 Imaginea națională</h2>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              <strong>51.808 de imobile au fost tranzacționate la nivel național în iunie 2026.</strong>
            </p>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              Față de cele <strong>49.193 de imobile</strong> înregistrate în iunie 2025, piața marchează o creștere de <strong className="text-emerald-800 font-extrabold">+5,3%</strong>.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              Creșterea este reală, dar este departe de a fi uniformă.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              În timp ce unele piețe rămân stabile sau înregistrează scăderi, activitatea și capitalul se concentrează în câteva regiuni cu performanțe superioare.
            </p>
          </section>

          {/* 7. BUCHAREST ANALYSIS */}
          <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <h2 className="text-xl font-extrabold text-slate-900 mb-4">🏙️ Bucureștiul rămâne motorul pieței naționale</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="rounded-xl bg-slate-900 text-white p-4">
                <span className="text-3xl font-black text-white block">10.398 tranzacții</span>
                <span className="text-xs font-semibold text-slate-300">în iunie 2026</span>
              </div>
              <div className="rounded-xl bg-emerald-900 text-emerald-300 p-4">
                <span className="text-3xl font-black block">+35,7%</span>
                <span className="text-xs font-semibold text-emerald-200">față de anul precedent</span>
              </div>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              Aproape <strong>1 din 5 tranzacții imobiliare din România</strong> are loc în București.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Diferența dintre piețele puternice și cele în declin continuă să se accentueze.
            </p>
            <div className="inline-block rounded-lg bg-slate-100 px-4 py-2 text-xs font-bold text-slate-900">
              Locația contează mai mult ca oricând.
            </div>
          </section>

          {/* 8. LAND ANALYSIS */}
          <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <h2 className="text-xl font-extrabold text-slate-900 mb-3">🏗️ Terenurile transmit următorul semnal</h2>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              Unul dintre cele mai puternice semnale vine din segmentul terenurilor.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              Tranzacțiile cu <strong>teren intravilan fără construcții</strong> au crescut cu <strong className="text-emerald-800 font-extrabold">+55,4% în București</strong>.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              Această dinamică poate indica acumularea de teren pentru dezvoltări viitoare, nu doar competiția pentru proiectele deja finalizate.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Poate reprezenta un indicator timpuriu al încrederii pe termen lung în anumite zone.
            </p>
          </section>

          {/* 9 & 10. AI INSIGHT & AIx OS SCORE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* 9. AI INSIGHT */}
            <section className="rounded-2xl border border-slate-800 bg-slate-950 text-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">AI INSIGHT</span>
                  <span className="rounded bg-slate-800 border border-slate-700 px-2 py-0.5 text-[9px] font-bold text-slate-300">AiX OS</span>
                </div>
                <h2 className="text-lg font-bold text-white mb-3">💡 Analiză AiX OS</h2>
                <p className="text-sm font-semibold text-emerald-300 mb-3">
                  Piața imobiliară din România nu mai evoluează ca un singur bloc.
                </p>
                <p className="text-xs text-slate-300 leading-relaxed mb-2">
                  Capitalul și activitatea se orientează către piețele caracterizate de infrastructură mai puternică, activitate economică și cerere susținută pe termen lung.
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Diferențele regionale devin tot mai importante pentru investitori și dezvoltatori.
                </p>
              </div>
            </section>

            {/* 10. AIx OS SCORE */}
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800">SCORE DINAMICĂ</span>
                  <span className="rounded bg-emerald-100 border border-emerald-200 px-2 py-0.5 text-[9px] font-bold text-emerald-900">Scor Piață</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">📊 AiX OS Score — 9,2 / 10</h2>
                <h3 className="text-xs font-bold uppercase text-slate-700 mb-2">De ce?</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Creșterea națională a tranzacțiilor, dinamica excepțională din București (<strong>+35,7%</strong>), extinderea activității pe segmentul terenurilor și divergențele tot mai mari dintre piețele regionale indică o piață sănătoasă, dar extrem de selectivă. Investitorii ar trebui să acorde prioritate zonelor în care lichiditatea, infrastructura și dezvoltarea continuă să accelereze, în loc să se bazeze exclusiv pe mediile naționale.
                </p>
              </div>
            </section>
          </div>

          {/* 11. MAIN DATA SECTION */}
          <section className="mb-10">
            <div className="mb-6 border-b border-slate-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">TABLOU DE BORD</span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">PIAȚA IMOBILIARĂ • ROMÂNIA</h2>
              <p className="text-sm font-bold text-emerald-800">Dinamica tranzacțiilor</p>
              <p className="text-xs font-semibold text-slate-500">Total imobile — iunie 2025 vs. iunie 2026</p>
            </div>

            {/* 4 DATA CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* CARD 01 */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">TOTAL IMOBILE — IUNIE 2025</span>
                <span className="text-3xl font-black text-slate-900 block">49.193</span>
                <span className="text-xs font-medium text-slate-500 mt-2 block">Referință an precedent.</span>
              </div>

              {/* CARD 02 */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5 shadow-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-900">TOTAL IMOBILE — IUNIE 2026</span>
                  <span className="rounded bg-emerald-800 text-white font-black px-2 py-0.5 text-xs">+5,3%</span>
                </div>
                <span className="text-3xl font-black text-slate-900 block">51.808</span>
                <span className="text-xs font-medium text-slate-600 mt-2 block">vs. 49.193 în iunie 2025</span>
              </div>

              {/* CARD 03 */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">UNITĂȚI INDIVIDUALE — 2026</span>
                  <span className="rounded bg-slate-900 text-emerald-400 font-bold px-2 py-0.5 text-xs">+5,1%</span>
                </div>
                <span className="text-3xl font-black text-slate-900 block">13.460</span>
                <span className="text-xs font-medium text-slate-500 mt-2 block">vs. 12.808 în 2025</span>
              </div>

              {/* CARD 04 */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">TEREN AGRICOL — 2026</span>
                  <span className="rounded bg-slate-900 text-emerald-400 font-bold px-2 py-0.5 text-xs">+5,4%</span>
                </div>
                <span className="text-3xl font-black text-slate-900 block">10.241</span>
                <span className="text-xs font-medium text-slate-500 mt-2 block">vs. 9.720 în 2025</span>
              </div>
            </div>
          </section>

          {/* 12. TOP 8 JUDEȚE */}
          <section className="mb-10">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">IERARHIE JUDEȚE</span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">TOP 8 JUDEȚE DUPĂ TOTAL IMOBILE — IUNIE 2026</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {filteredStats.map((item, idx) => (
                <div key={item.countyCode} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-slate-500">#{idx + 1}</span>
                      {item.badge && (
                        <span className="rounded bg-emerald-100 border border-emerald-200 px-2 py-0.5 text-[9px] font-bold text-emerald-900">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-3">{item.countyName}</h3>
                    <div className="space-y-1.5 text-xs border-t border-slate-100 pt-3">
                      {item.totalTransactions2025 !== undefined && (
                        <div className="flex justify-between text-slate-500">
                          <span>Iunie 2025:</span>
                          <strong className="text-slate-700">{item.totalTransactions2025.toLocaleString("ro-RO")}</strong>
                        </div>
                      )}
                      <div className="flex justify-between text-slate-500">
                        <span>Iunie 2026:</span>
                        <strong className="text-slate-900 font-extrabold">{item.totalTransactions.toLocaleString("ro-RO")}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500">Evoluție</span>
                    <span className={`text-sm font-black ${item.momChangePct >= 0 ? "text-emerald-700" : "text-rose-700"}`}>
                      {item.momChangePctString || (item.momChangePct >= 0 ? `+${item.momChangePct}%` : `${item.momChangePct}%`)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 13. REGIONAL INSIGHT */}
          <section className="mb-10 rounded-2xl border border-emerald-800 bg-slate-900 text-white p-6 shadow-md">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-3">
              <span>KEY REGIONAL INSIGHT</span>
            </div>
            <div className="space-y-3 text-sm leading-relaxed">
              <p className="font-bold text-emerald-300 text-base">
                Ialomița +75,1% și Călărași +57,5% înregistrează cele mai mari creșteri procentuale — piețele mai mici cresc cel mai rapid.
              </p>
              <p className="text-slate-300">
                Totalul imobilelor tranzacționate crește cu <strong className="text-emerald-400 font-extrabold">+5,3%</strong>, însă Brașovul, cu <strong className="text-rose-400 font-extrabold">−26,9%</strong>, înregistrează cea mai mare scădere dintre marile piețe analizate.
              </p>
            </div>
          </section>

          {/* Controls & Full Table View */}
          <section className="mb-10">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={searchCounty}
                  onChange={(e) => setSearchCounty(e.target.value)}
                  placeholder="Caută județul (ex: Cluj, București, Timiș, Suceava)..."
                  className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs text-slate-900 outline-none focus:border-emerald-700"
                />
              </div>
              <button
                onClick={handleExportCsv}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-800 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-900"
              >
                📥 Descarcă Setul în Format CSV
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Cod</th>
                    <th className="py-3.5 px-4">Județ</th>
                    <th className="py-3.5 px-4">Regiune</th>
                    <th className="py-3.5 px-4 text-right">Iunie 2025</th>
                    <th className="py-3.5 px-4 text-right">Iunie 2026</th>
                    <th className="py-3.5 px-4 text-right">Evoluție</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredStats.map((row) => (
                    <tr key={row.countyCode} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">{row.countyCode}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{row.countyName}</td>
                      <td className="py-3 px-4 text-slate-500">{row.region}</td>
                      <td className="py-3 px-4 text-right text-slate-600">{row.totalTransactions2025 ? row.totalTransactions2025.toLocaleString("ro-RO") : "-"}</td>
                      <td className="py-3 px-4 text-right font-bold text-slate-900">{row.totalTransactions.toLocaleString("ro-RO")}</td>
                      <td className={`py-3 px-4 text-right font-bold ${row.momChangePct >= 0 ? "text-emerald-700" : "text-rose-700"}`}>
                        {row.momChangePctString || (row.momChangePct >= 0 ? `+${row.momChangePct}%` : `${row.momChangePct}%`)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 14 & 15. MARKET PULSE FOOTER & DISCRET SOURCE / DISCLAIMER */}
          <section className="mb-10 rounded-2xl border border-slate-800 bg-slate-900 text-white p-6 shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 block">Powered by AiX OS — Market Pulse</span>
                <h3 className="text-lg font-bold text-white mt-1">Al doilea tău creier.</h3>
                <p className="text-xs font-semibold text-slate-300">Gândește mai rapid. Construit pentru acțiune.</p>
              </div>
              <a
                href="https://cristianvaduva.com/market-pulse"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-emerald-800 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors"
              >
                cristianvaduva.com/market-pulse ↗
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300 mb-4">
              <div>
                <span className="text-slate-400 font-medium">Contactează-mă: </span>
                <a
                  href="https://linktr.ee/cristianvaduvarealestate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-400 hover:underline ml-1"
                >
                  https://linktr.ee/cristianvaduvarealestate ↗
                </a>
              </div>
              <div className="text-slate-400 font-mono text-[11px]">
                cristianvaduva.com | AiXLuxury.com • Real Estate | Insurance | Investments
              </div>
            </div>

            {/* 15. DISCRET SOURCE & LEGAL DISCLAIMER */}
            <div className="border-t border-slate-800/80 pt-4 space-y-1.5 text-[11px] text-slate-400 leading-normal">
              <p>Sursă: date publice privind tranzacțiile imobiliare, analizate și prezentate de AiX OS.</p>
              <p>AiX OS este o platformă privată de analiză, educație și informare. Nu este afiliată, administrată, sponsorizată sau aprobată de ANCPI ori de o altă autoritate publică.</p>
            </div>
          </section>

          {/* PAGE FOOTER DECK */}
          <footer className="mt-12 border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
            <p className="font-semibold text-slate-700">cristianvaduva.com | AiXLuxury.com</p>
            <p className="mt-1 text-slate-400">AiX OS — Gândește mai rapid.</p>
          </footer>
        </div>
      </main>

      <AiAssistantDrawer />
      <Footer />
    </div>
  );
}


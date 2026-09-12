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
          {/* BREADCRUMB */}
          <nav aria-label="Navigare pe pagină" className="mb-6 flex items-center gap-2 text-xs text-slate-600">
            <Link href="/" className="hover:text-emerald-800 transition-colors">Acasă</Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-slate-900">Rapoarte ANCPI</span>
          </nav>

          {/* REPORT HEADER */}
          <div className="mb-8 border-b border-slate-200 pb-8">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                DATE PUBLICE OFICIALE • ROMÂNIA
              </span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 border border-slate-200">
                SURSA: ANCPI
              </span>
              <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                ACTUALIZAT: SEPTEMBRIE 2026
              </span>
            </div>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Rapoarte Tranzacții Imobiliare ANCPI — Situație Oficială 2026
            </h1>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed max-w-3xl">
              Centralizarea datelor oficiale publicate de Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI) privind volumul contractelor de vânzare-cumpărare de imobile, terenuri și unități individuale la nivel național și regional.
            </p>
          </div>

          {/* OPERATIONAL STATUS BANNER (SEPTEMBER 2026) */}
          <section className="mb-10 rounded-2xl border border-amber-200 bg-amber-50/70 p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
              <h2 className="text-sm font-bold uppercase tracking-wider text-amber-900">
                STARE OPERAȚIONALĂ ANCPI &amp; SISTEMUL e-TERRA — SEPTEMBRIE 2026
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-xs text-slate-800">
              <div className="bg-white/80 rounded-xl p-4 border border-amber-200/80">
                <span className="block font-bold text-amber-900 mb-1">Reactivare Platformă</span>
                <p>Funcționalitatea sistemului <strong>e-Terra</strong> a fost reluată pe <strong>20 August 2026</strong>, după o indisponibilitate tehnică temporară.</p>
              </div>
              <div className="bg-white/80 rounded-xl p-4 border border-amber-200/80">
                <span className="block font-bold text-amber-900 mb-1">Prelucrare Cereri Acumulate</span>
                <p>În intervalul 11–19 august 2026 au fost înregistrate <strong>329.476 de cereri</strong> la oficiile de cadastru, din care <strong>279.242 au fost soluționate</strong>.</p>
              </div>
              <div className="bg-white/80 rounded-xl p-4 border border-amber-200/80">
                <span className="block font-bold text-amber-900 mb-1">Statistici Tranzacții August 2026</span>
                <p>Datele statistice complete privind tranzacțiile din luna <strong>august 2026</strong> sunt <em>în curs de centralizare și publicare oficială</em> de către ANCPI.</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 italic">
              * Sursă oficială: Comunicat de presă ANCPI (20 August 2026). Setul de date detaliat de mai jos reprezintă cel mai recent raport lunar complet validat (Iunie 2026 / Semestrul I 2026).
            </p>
          </section>

          {/* HERO STATISTICS */}
          <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-xs text-center">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">ULTIMUL TOTAL OFICIAL NAȚIONAL</span>
              <span className="text-3xl font-black text-slate-900 mt-1 block">51.808</span>
              <span className="text-xs font-semibold text-slate-600 mt-1 block">Iunie 2026 (Sem. I)</span>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-xs text-center">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">BUCUREȘTI (LIDER NAȚIONAL)</span>
              <span className="text-3xl font-black text-slate-900 mt-1 block">10.398</span>
              <span className="text-xs font-semibold text-emerald-800 mt-1 block">+35,7% YoY</span>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-xs text-center">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">CREȘTERE ANUALĂ NAȚIONALĂ</span>
              <span className="text-3xl font-black text-emerald-800 mt-1 block">+5,3%</span>
              <span className="text-xs font-semibold text-slate-600 mt-1 block">vs. Iunie 2025</span>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-xs text-center">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">CERERI SOLUȚIONATE POST-BLOCAJ</span>
              <span className="text-3xl font-black text-slate-900 mt-1 block">279.242</span>
              <span className="text-xs font-semibold text-slate-600 mt-1 block">din 329.476 înreg.</span>
            </div>
          </div>

          {/* MAIN MARKET PULSE SECTION */}
          <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <h2 className="text-xl font-extrabold text-slate-900 mb-4">Imaginea națională a tranzacțiilor imobiliare</h2>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              Conform datelor oficiale ANCPI, <strong>51.808 de imobile au fost tranzacționate la nivel național în iunie 2026</strong> (cel mai recent set statistic publicat). Față de cele <strong>49.193 de imobile</strong> înregistrate în iunie 2025, piața a marcat o creștere consolidată de <strong className="text-emerald-800 font-extrabold">+5,3%</strong>.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Dinamica a fost impulsionată de tranzacțiile din marile centre economice (București, Timiș, Iași), în timp ce județe precum Brașov au consemnat corecții de volum în prima jumătate a anului.
            </p>
          </section>

          {/* BUCHAREST & LAND ANALYSIS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <h2 className="text-lg font-extrabold text-slate-900 mb-3">București — Polul Principal de Lichiditate</h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-xl bg-slate-900 text-white p-4">
                  <span className="text-2xl font-black block">10.398</span>
                  <span className="text-xs text-slate-300">tranzacții totale</span>
                </div>
                <div className="rounded-xl bg-emerald-900 text-emerald-200 p-4">
                  <span className="text-2xl font-black block">+35,7%</span>
                  <span className="text-xs text-emerald-200">creștere anuală</span>
                </div>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Aproximativ 20% din totalul tranzacțiilor imobiliare la nivel național s-au derulat în Capitală, reflectând o concentrare ridicată a cererii solvente și a proiectelor rezidențiale noi.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <h2 className="text-lg font-extrabold text-slate-900 mb-3">Dinamica Segmentului de Terenuri</h2>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 mb-4">
                <span className="text-xs font-bold uppercase text-slate-600 block">Teren Intravilan fără Construcții (București)</span>
                <span className="text-2xl font-black text-emerald-800 block mt-1">+55,4%</span>
                <span className="text-xs text-slate-600">creștere față de anul precedent</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Avansul tranzacțiilor cu terenuri intravilane semnalează securizarea amplasamentelor pentru viitoarele etape de dezvoltare rezidențială și logistică.
              </p>
            </section>
          </div>

          {/* TOP 8 JUDEȚE */}
          <section className="mb-10">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">IERARHIE REGIONALĂ</span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">Top Județe după Volumul Tranzacțiilor</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {filteredStats.map((item, idx) => (
                <div key={item.countyCode} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-slate-600">#{idx + 1}</span>
                      {item.badge && (
                        <span className="rounded bg-emerald-100 border border-emerald-200 px-2 py-0.5 text-[9px] font-bold text-emerald-900">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-3">{item.countyName}</h3>
                    <div className="space-y-1.5 text-xs border-t border-slate-100 pt-3">
                      {item.totalTransactions2025 !== undefined && (
                        <div className="flex justify-between text-slate-600">
                          <span>Iunie 2025:</span>
                          <strong className="text-slate-800">{item.totalTransactions2025.toLocaleString("ro-RO")}</strong>
                        </div>
                      )}
                      <div className="flex justify-between text-slate-600">
                        <span>Iunie 2026:</span>
                        <strong className="text-slate-900 font-extrabold">{item.totalTransactions.toLocaleString("ro-RO")}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-600">Evoluție YoY</span>
                    <span className={`text-sm font-black ${item.momChangePct >= 0 ? "text-emerald-800" : "text-rose-800"}`}>
                      {item.momChangePctString || (item.momChangePct >= 0 ? `+${item.momChangePct}%` : `${item.momChangePct}%`)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Controls & Full Table View */}
          <section className="mb-10">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="relative flex-1 max-w-md">
                <label htmlFor="ancpi-search-input" className="sr-only">
                  Caută județul
                </label>
                <input
                  id="ancpi-search-input"
                  type="text"
                  value={searchCounty}
                  onChange={(e) => setSearchCounty(e.target.value)}
                  placeholder="Caută județul (ex: Cluj, București, Timiș, Suceava)..."
                  className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs text-slate-900 outline-none focus:border-emerald-700"
                />
              </div>
              <button
                type="button"
                onClick={handleExportCsv}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-800 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-900 transition-colors"
                aria-label="Descarcă setul de date în format CSV"
              >
                📥 Descarcă Setul în Format CSV
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
              <table className="w-full text-left text-xs text-slate-800">
                <caption className="sr-only">Tabel comparativ tranzacții imobiliare pe județe conform datelor ANCPI</caption>
                <thead className="bg-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200">
                  <tr>
                    <th scope="col" className="py-3.5 px-4">Cod</th>
                    <th scope="col" className="py-3.5 px-4">Județ</th>
                    <th scope="col" className="py-3.5 px-4">Regiune</th>
                    <th scope="col" className="py-3.5 px-4 text-right">Iunie 2025</th>
                    <th scope="col" className="py-3.5 px-4 text-right">Iunie 2026</th>
                    <th scope="col" className="py-3.5 px-4 text-right">Evoluție YoY</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredStats.map((row) => (
                    <tr key={row.countyCode} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">{row.countyCode}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{row.countyName}</td>
                      <td className="py-3 px-4 text-slate-600">{row.region}</td>
                      <td className="py-3 px-4 text-right text-slate-700">{row.totalTransactions2025 ? row.totalTransactions2025.toLocaleString("ro-RO") : "-"}</td>
                      <td className="py-3 px-4 text-right font-bold text-slate-900">{row.totalTransactions.toLocaleString("ro-RO")}</td>
                      <td className={`py-3 px-4 text-right font-bold ${row.momChangePct >= 0 ? "text-emerald-800" : "text-rose-800"}`}>
                        {row.momChangePctString || (row.momChangePct >= 0 ? `+${row.momChangePct}%` : `${row.momChangePct}%`)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* SOURCE DISCLAIMER */}
          <section className="mb-10 rounded-2xl border border-slate-800 bg-slate-900 text-white p-6 shadow-md">
            <div className="border-b border-slate-800 pb-4 mb-4">
              <span className="text-xs font-mono font-bold text-emerald-400 block">NOTĂ DE TRANSPARENȚĂ ȘI PROVENIENȚĂ A DATELOR</span>
              <h3 className="text-base font-bold text-white mt-1">Sursa Datelor: Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI)</h3>
            </div>
            <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <p>
                Informațiile prezentate pe această pagină sunt agregate exclusiv din rapoartele statistice oficiale publicate de ANCPI și din comunicatele de presă emise de instituție.
              </p>
              <p>
                Platforma privată AiX Educational Intelligence organizează și structurează aceste date cu scop educativ și informativ general, fără a modifica datele de bază furnizate de autoritățile statului.
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

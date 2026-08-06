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
    const headers = "Cod Judet,Nume Judet,Regiune,Unitati Individuale,Terenuri,Total Tranzactii,Evolutie MoM\n";
    const rows = filteredStats
      .map(
        (s) =>
          `"${s.countyCode}","${s.countyName}","${s.region}",${s.individualUnitsTransacted},${s.landPlotsTransacted},${s.totalTransactions},"${s.momChangePct}%"`
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
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Rapoarte ANCPI</span>
          </nav>

          <div className="mb-8 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Statistică Cadastrală Oficială</span>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Raportul Lunar al Tranzacțiilor Imobiliare ANCPI ({ancpiReportSummary.reportMonth})
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
              Baza de date oficială a volumelor de vânzare pentru terenuri, apartamente și case înregistrate în Sistemul Integrat de Cadastru și Carte Funciară.
            </p>
          </div>

          {/* Metrics summary */}
          <div className="mb-8 grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-4 text-center">
            <div>
              <span className="block text-[11px] font-semibold text-slate-500">Total Tranzacții Naționale</span>
              <span className="text-xl font-black text-slate-900">{ancpiReportSummary.totalNationalTransactions.toLocaleString("ro-RO")}</span>
            </div>
            <div>
              <span className="block text-[11px] font-semibold text-slate-500">Județul Cel Mai Activ</span>
              <span className="text-sm font-extrabold text-emerald-800 mt-1 block">{ancpiReportSummary.topActiveCounty}</span>
            </div>
            <div>
              <span className="block text-[11px] font-semibold text-slate-500">Creștere Națională MoM</span>
              <span className="text-xl font-black text-emerald-700">{ancpiReportSummary.nationalMomGrowth}</span>
            </div>
            <div>
              <span className="block text-[11px] font-semibold text-slate-500">Dată Publicare</span>
              <span className="text-xs font-bold text-slate-700 mt-1 block">{ancpiReportSummary.lastUpdated}</span>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchCounty}
                onChange={(e) => setSearchCounty(e.target.value)}
                placeholder="Caută județul (ex: Cluj, București, Timiș)..."
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

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Cod</th>
                  <th className="py-3.5 px-4">Județ</th>
                  <th className="py-3.5 px-4">Regiune Development</th>
                  <th className="py-3.5 px-4 text-right">Apartamente Transacționate</th>
                  <th className="py-3.5 px-4 text-right">Terenuri Transacționate</th>
                  <th className="py-3.5 px-4 text-right">Total Tranzacții</th>
                  <th className="py-3.5 px-4 text-right">Evoluție MoM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredStats.map((row) => (
                  <tr key={row.countyCode} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{row.countyCode}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{row.countyName}</td>
                    <td className="py-3 px-4 text-slate-500">{row.region}</td>
                    <td className="py-3 px-4 text-right font-medium">{row.individualUnitsTransacted.toLocaleString("ro-RO")}</td>
                    <td className="py-3 px-4 text-right font-medium">{row.landPlotsTransacted.toLocaleString("ro-RO")}</td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">{row.totalTransactions.toLocaleString("ro-RO")}</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-700">+{row.momChangePct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <AiAssistantDrawer />
      <Footer />
    </div>
  );
}

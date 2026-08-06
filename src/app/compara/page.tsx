"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { governmentProgramsCatalog } from "@/lib/programe-guvernamentale-data";

export default function ComparatorPage() {
  const selectedPrograms = [
    governmentProgramsCatalog["noua-casa"],
    governmentProgramsCatalog["casa-verde"],
    governmentProgramsCatalog["programe-pentru-tineri"],
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Comparator Programe</span>
          </nav>

          <div className="mb-8 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Analiză Comparativă Side-by-Side</span>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Comparatorul Programelor de Finanțare
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
              Compară simultan până la 4 programe pe baza plafonului de grant, condițiilor de cofinanțare, actelor necesare și termenelor de depunere.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
            <table className="w-full text-left text-xs text-slate-800 border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white divide-x divide-slate-800">
                  <th className="p-4 w-1/4">Criteriu Comparat</th>
                  {selectedPrograms.map((p) => (
                    <th key={p.slug} className="p-4 w-1/4 font-bold text-sm">
                      {p.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr className="divide-x divide-slate-200">
                  <td className="p-4 font-bold bg-slate-50">Valoare Finanțare / Grant</td>
                  {selectedPrograms.map((p) => (
                    <td key={p.slug} className="p-4 font-extrabold text-emerald-800 text-sm">
                      {p.stats[0]?.value || "100.000 RON"}
                    </td>
                  ))}
                </tr>
                <tr className="divide-x divide-slate-200">
                  <td className="p-4 font-bold bg-slate-50">Avans / Cofinanțare Min.</td>
                  {selectedPrograms.map((p) => (
                    <td key={p.slug} className="p-4 font-semibold text-slate-900">
                      {p.stats[2]?.value || "10%"}
                    </td>
                  ))}
                </tr>
                <tr className="divide-x divide-slate-200">
                  <td className="p-4 font-bold bg-slate-50">Public Țintă / Beneficiari</td>
                  {selectedPrograms.map((p) => (
                    <td key={p.slug} className="p-4 text-xs leading-relaxed text-slate-600">
                      {p.eligibility[0]}
                    </td>
                  ))}
                </tr>
                <tr className="divide-x divide-slate-200">
                  <td className="p-4 font-bold bg-slate-50">Document Cheie Solicitat</td>
                  {selectedPrograms.map((p) => (
                    <td key={p.slug} className="p-4 text-xs text-slate-700">
                      {p.documents[0]}
                    </td>
                  ))}
                </tr>
                <tr className="divide-x divide-slate-200">
                  <td className="p-4 font-bold bg-slate-50">Acțiune Directă</td>
                  {selectedPrograms.map((p) => (
                    <td key={p.slug} className="p-4">
                      <Link href={`/programe-guvernamentale/${p.slug}`} className="block text-center rounded-lg bg-emerald-800 py-2 text-xs font-bold text-white hover:bg-emerald-900">
                        Vezi Ghid Complet →
                      </Link>
                    </td>
                  ))}
                </tr>
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

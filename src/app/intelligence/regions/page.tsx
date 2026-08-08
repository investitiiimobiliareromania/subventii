import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { countyProfilesCatalog } from "@/lib/county-data";

export const metadata: Metadata = {
  title: "Inteligență Regională: Analiză pe Județe & ADR 2026",
  description: "Indicatori economici, distribuția fondurilor structurale și raportările cadastrale ANCPI pentru toate cele 41 de județe și Municipiul București.",
  alternates: { canonical: "https://subventii.cristianvaduva.com/intelligence/regions" },
};

export default function IntelligenceRegionsPage() {
  const counties = Object.values(countyProfilesCatalog);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <Link href="/intelligence" className="hover:text-emerald-800">Intelligence</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Județe</span>
          </nav>

          <div className="mb-8 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Regional Analytics</span>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Inteligență Economică & Alocări Regionale
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
              Analiză comparativă a profilurilor economice județene, numărului de IMM-uri active și oportunităților oferite de Agențiile pentru Dezvoltare Regională.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {counties.map((c) => (
              <div key={c.code} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded bg-slate-900 px-2 py-0.5 text-[11px] font-bold text-white font-mono">
                      Județul {c.name} ({c.code})
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">{c.region}</span>
                  </div>
                  <h2 className="text-base font-bold text-slate-900 mb-1">Reședință: {c.capital}</h2>
                  <p className="text-xs text-slate-600 mb-3">Firme active: <strong className="text-emerald-800">{c.activeImmCount}</strong></p>
                  <p className="text-xs text-slate-500 mb-4">{c.adrName}</p>
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">{c.ancpiMonthlyAvg}</span>
                  <Link href={`/judete/${c.name.toLowerCase()}`} className="font-bold text-emerald-800 hover:underline">
                    Raport Județian →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <AiAssistantDrawer />
      <Footer />
    </div>
  );
}

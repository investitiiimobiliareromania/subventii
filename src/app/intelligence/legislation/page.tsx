import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { getLegislativeChangesFromDb } from "@/lib/db/repository";

export const metadata: Metadata = {
  title: "Monitor Legislație: Ordonanțe, Legi și Decizii 2026",
  description: "Urmărirea actelor normative, codului fiscal și reglementărilor guvernamentale cu impact asupra fondurilor nerambursabile.",
  alternates: { canonical: "https://subventii.ro/intelligence/legislation" },
};

export default async function IntelligenceLegislationPage() {
  const legislation = await getLegislativeChangesFromDb();

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
            <span className="font-semibold text-slate-800">Legislație</span>
          </nav>

          <div className="mb-8 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Regulatory Intelligence</span>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Monitorul Actelor Normative & Codului Fiscal
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
              Analiza impactului juridic și fiscal generat de ordonanțele de urgență, hotărârile de guvern și deciziile ministeriale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {legislation.map((leg) => (
              <div key={leg.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">
                      {leg.actType} {leg.actNumber}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Monitorul Oficial: {leg.effectiveDate}</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mb-2">{leg.title}</h2>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">{leg.summary}</p>
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                  <span className="text-emerald-800 font-bold">Domenii: {leg.affectedSectors.join(", ")}</span>
                  <Link href="/legislatie" className="font-bold text-slate-900 hover:text-emerald-800">
                    Analiză Impact →
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

import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { getProgramsFromDb, getLegislativeChangesFromDb, getAncpiReportsFromDb } from "@/lib/db/repository";

export const metadata: Metadata = {
  title: "Centrul Național de Inteligență Economică & Fonduri",
  description: "Platformă integrată de analiza datelor despre granturi europene, legislație financiară, rapoarte ANCPI și instituții publice din România.",
  alternates: { canonical: "https://subventii.ro/intelligence" },
};

export default async function IntelligenceHubPage() {
  const programs = await getProgramsFromDb();
  const legislation = await getLegislativeChangesFromDb();
  const ancpi = await getAncpiReportsFromDb();

  const totalBudget = programs.reduce((acc, p) => acc + p.maxFundingRon, 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    "name": "Subvenții.ro Intelligence Platform",
    "url": "https://subventii.ro/intelligence",
    "serviceType": "Financial & Grant Intelligence",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Intelligence Platform</span>
          </nav>

          <header className="mb-10 rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white">
            <span className="rounded bg-emerald-800 px-3 py-1 text-xs font-bold font-mono">
              ENTERPRISE PLATFORM V2.0
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Centrul de Inteligență Economică & Fonduri Nerambursabile
            </h1>
            <p className="mt-3 text-sm text-slate-300 max-w-3xl leading-relaxed">
              Analiză în timp real a oportunităților de finanțare, impactului legislativ, dinamicii imobiliare ANCPI și profilurilor instituționale din România.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-slate-800 pt-6 text-center text-xs">
              <div>
                <span className="block text-slate-400">Total Programe Monitorizate</span>
                <span className="font-bold text-white text-lg mt-1 block">{programs.length}</span>
              </div>
              <div>
                <span className="block text-slate-400">Plafon Bugetar Alocat</span>
                <span className="font-bold text-emerald-400 text-lg mt-1 block">{(totalBudget / 1000000).toFixed(0)}M RON</span>
              </div>
              <div>
                <span className="block text-slate-400">Modificări Legale Active</span>
                <span className="font-bold text-white text-lg mt-1 block">{legislation.length}</span>
              </div>
              <div>
                <span className="block text-slate-400">Județe Indexate ANCPI</span>
                <span className="font-bold text-white text-lg mt-1 block">{ancpi.length}</span>
              </div>
            </div>
          </header>

          {/* Core Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Link href="/intelligence/funding" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-slate-400 transition-colors group">
              <span className="text-2xl mb-3 block">📊</span>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800">Inteligență Finanțări →</h2>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Analiza oportunităților de finanțare nerambursabilă, bugetelor alocate și ratelor de succes.
              </p>
            </Link>

            <Link href="/intelligence/legislation" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-slate-400 transition-colors group">
              <span className="text-2xl mb-3 block">⚖️</span>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800">Monitor Legislație →</h2>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Urmărirea ordonanțelor de urgență (OUG), legilor și deciziilor ministeriale cu impact financiar.
              </p>
            </Link>

            <Link href="/intelligence/institutions" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-slate-400 transition-colors group">
              <span className="text-2xl mb-3 block">🏛️</span>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800">Director Instituțional →</h2>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Profilurile ministerelor, agențiilor regionale ADR, AFIR și AFM implicate în atribuirea de granturi.
              </p>
            </Link>

            <Link href="/intelligence/regions" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-slate-400 transition-colors group">
              <span className="text-2xl mb-3 block">🗺️</span>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800">Inteligență Regională →</h2>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Indicatori economici pe județe, date de cadastru ANCPI și alocări teritoriale Start-Up Nation.
              </p>
            </Link>
          </div>
        </div>
      </main>

      <AiAssistantDrawer />
      <Footer />
    </div>
  );
}

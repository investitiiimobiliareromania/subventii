import { safeJsonLd } from "@/lib/security";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import {
  MAJOR_INFRASTRUCTURE_PROJECTS,
  SICAP_PROCUREMENT_GUIDELINES,
} from "@/lib/infrastructura-data";

export const metadata: Metadata = {
  title: "Infrastructură & Investiții Publice România 2026: Proiecte Majore & Ghid SICAP",
  description: "Monitorizarea marilor proiecte de infrastructură rutieră (A7, A8), feroviară, utilități de apă, energie și ghidul oficial al achizițiilor publice SICAP/SEAP pentru companii.",
  alternates: { canonical: "https://subventii.cristianvaduva.com/infrastructura" },
};

export default function InfrastructurePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Infrastructură & Investiții Publice România",
    "url": "https://subventii.cristianvaduva.com/infrastructura",
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
            <span className="font-semibold text-slate-900">Infrastructură &amp; Investiții Publice</span>
          </nav>

          <header className="mb-10 rounded-2xl border border-slate-200 bg-slate-900 p-6 md:p-8 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="rounded bg-emerald-800 px-2.5 py-0.5 text-xs font-bold font-mono">
                INVESTIȚII PUBLICE STRATEGICE
              </span>
              <span className="text-xs text-slate-300 font-semibold">TRANSPORT • ENERGIE • UTILITĂȚI • SĂNĂTATE</span>
            </div>
            <h1 className="text-3xl font-extrabold sm:text-4xl leading-tight">
              Marile Proiecte de Infrastructură &amp; Achiziții Publice SICAP/SEAP
            </h1>
            <p className="mt-3 text-xs text-slate-300 max-w-3xl leading-relaxed">
              Centralizarea investițiilor publice majore finanțate prin PNRR, Programul Transport și Programul Dezvoltare Durabilă, alături de ghidul practic pentru participarea firmelor private și a IMM-urilor la licitațiile publice.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-slate-800 pt-6 text-center text-xs">
              <div>
                <span className="block text-slate-400">Proiecte Strategice</span>
                <span className="font-bold text-white mt-1 block">{MAJOR_INFRASTRUCTURE_PROJECTS.length} Proiecte Majore</span>
              </div>
              <div>
                <span className="block text-slate-400">Buget Centralizat</span>
                <span className="font-bold text-emerald-400 mt-1 block">&gt; 18 mld. EUR</span>
              </div>
              <div>
                <span className="block text-slate-400">Portal Achiziții</span>
                <span className="font-bold text-white mt-1 block">SICAP / e-Licitatie</span>
              </div>
              <div>
                <span className="block text-slate-400">Sursă Finanțare</span>
                <span className="font-bold text-emerald-400 mt-1 block">PNRR &amp; Fonduri UE</span>
              </div>
            </div>
          </header>

          {/* MAJOR INFRASTRUCTURE PROJECTS */}
          <section className="mb-12">
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  ȘANTIERE &amp; PROGRAME DE DEZVOLTARE TERITORIALĂ
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-0.5">Marile Investiții Publice în Derulare</h2>
              </div>
              <span className="text-xs text-slate-500 font-semibold">
                Autostrăzi, Căi Ferate, Rețele Apă/Canal și Spitale
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MAJOR_INFRASTRUCTURE_PROJECTS.map((proj) => (
                <article key={proj.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white font-mono">
                        {proj.sector}
                      </span>
                      <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-950">
                        {proj.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                      {proj.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {proj.description}
                    </p>

                    <div className="space-y-1.5 text-xs border-t border-slate-100 pt-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Buget Aprobat:</span>
                        <strong className="text-slate-900">{proj.totalBudgetRon} ({proj.totalBudgetEur})</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Sursă Finanțare:</span>
                        <span className="font-semibold text-slate-700">{proj.fundingSource}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Autoritate Beneficiară:</span>
                        <span className="text-slate-800">{proj.beneficiaryAuthority}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Termen Estimativ:</span>
                        <span className="font-mono font-bold text-emerald-800">{proj.expectedCompletion}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                    <span className="text-slate-500 text-[11px]">Județe: {proj.countiesInvolved.slice(0, 3).join(", ")}</span>
                    <a
                      href={proj.officialSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-emerald-800 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Detalii Oficiale</span>
                      <span>↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* SICAP / SEAP PROCUREMENT GUIDE FOR BUSINESSES */}
          <section className="mb-12 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 md:p-8 shadow-xs">
            <div className="mb-6 border-b border-slate-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                OPORTUNITĂȚI COMERCIALE PENTRU COMPANII
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-0.5">
                {SICAP_PROCUREMENT_GUIDELINES.title}
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Reglementat de {SICAP_PROCUREMENT_GUIDELINES.regulatoryBody} prin platforma oficială SICAP/SEAP.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Direct Purchase Thresholds */}
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-bold text-slate-900 mb-3">Praguri Valorice Achiziție Directă (fără licitație deschisă)</h3>
                <div className="space-y-3 text-xs">
                  {SICAP_PROCUREMENT_GUIDELINES.directPurchaseThresholds.map((t, idx) => (
                    <div key={idx} className="rounded-lg bg-slate-50 p-3 border border-slate-100">
                      <span className="font-semibold text-slate-800 block">{t.type}</span>
                      <span className="text-base font-black text-emerald-800 block my-0.5">{t.thresholdRon}</span>
                      <span className="text-[10px] text-slate-500">{t.lawArticle}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Steps for Suppliers */}
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-bold text-slate-900 mb-3">Pași Esențiali pentru Furnizori &amp; IMM-uri</h3>
                <ul className="space-y-2 text-xs text-slate-700 leading-relaxed list-disc list-inside">
                  {SICAP_PROCUREMENT_GUIDELINES.keyStepsForSuppliers.map((step, idx) => (
                    <li key={idx} className="text-slate-600">
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-xl bg-slate-900 text-white p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold block">Portalul Oficial de Licitații Publice</span>
                <span className="text-[11px] text-slate-300">Accesează sistemul electronic SEAP pentru consultarea anunțurilor de participare.</span>
              </div>
              <a
                href={SICAP_PROCUREMENT_GUIDELINES.officialPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-600 transition-colors"
              >
                Accesează e-licitatie.ro ↗
              </a>
            </div>
          </section>
        </div>
      </main>

      <AiAssistantDrawer />
      <Footer />
    </div>
  );
}

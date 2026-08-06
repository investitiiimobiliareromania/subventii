import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { realEstateCityReports } from "@/lib/piata-imobiliara-data";

export const metadata: Metadata = {
  title: "Piața Imobiliară România 2026: Prețuri, Indici & Tendințe",
  description: "Rapoarte de prețuri pe metru pătrat, indici de creștere imobiliară pe marile orașe și evoluția tranzacțiilor rezidențiale și comerciale.",
  alternates: { canonical: "https://subventii.ro/piata-imobiliara" },
};

export default function RealEstatePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Piața Imobiliară România 2026",
    "url": "https://subventii.ro/piata-imobiliara",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Piața Imobiliară</span>
          </nav>

          <div className="mb-8 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Inteligență Imobiliară & Indici de Preț</span>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Raportul Pieței Imobiliare pe Marile Orașe 2026
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
              Analize comparative ale prețurilor medii pe metru pătrat util pentru apartamente noi, vechi și randamente din închiriere.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
            {realEstateCityReports.map((c) => (
              <div key={c.city} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-extrabold text-slate-900">{c.city}</h2>
                  <span className="rounded font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-xs">
                    +{c.yoyGrowthPct}% YoY
                  </span>
                </div>

                <div className="space-y-3 text-xs border-y border-slate-100 py-4 mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Preț Mediu / MP:</span>
                    <strong className="text-slate-900 text-sm">{c.avgPriceSqm} EUR</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Blocuri Noi / MP:</span>
                    <strong>{c.newBuildingsAvgPriceSqm} EUR</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Blocuri Vechi / MP:</span>
                    <strong>{c.oldBuildingsAvgPriceSqm} EUR</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Yield Mediu Chirie:</span>
                    <strong className="text-emerald-700">{c.monthlyRentalYieldPct}% / an</strong>
                  </div>
                </div>

                <Link href={`/judete/${c.county.toLowerCase()}`} className="block text-center rounded-lg border border-slate-300 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50">
                  Vezi Raport Județul {c.county} →
                </Link>
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

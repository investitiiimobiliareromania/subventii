import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { insuranceCatalog } from "@/lib/asigurari-data";

export const metadata: Metadata = {
  title: "Asigurări Obligatorii și Facultative 2026",
  description: "Ghidul complet al polițelor PAD, asigurărilor facultative de locuință, clădiri IMM, risc de șantier (CAR) și răspundere profesională.",
  alternates: { canonical: "https://subventii.cristianvaduva.com/asigurari" },
};

export default function AsigurariPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Asigurări Locuințe & Afaceri",
    "url": "https://subventii.cristianvaduva.com/asigurari",
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
            <span className="font-semibold text-slate-800">Asigurări</span>
          </nav>

          <div className="mb-8 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Protecție Patrimoniu & Afaceri</span>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Ghidul Asigurărilor de Locuință și Patrimoniu Comercial
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
              Informații oficiale privind polița PAD, asigurările facultative pentru bunuri și clădiri, riscul de șantier (CAR/EAR) și răspunderea civilă profesională.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {insuranceCatalog.map((asig) => (
              <div key={asig.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded bg-slate-900 px-2 py-0.5 text-[11px] font-bold text-white">
                      {asig.type}
                    </span>
                    {asig.isMandatory ? (
                      <span className="rounded bg-red-100 border border-red-200 px-2 py-0.5 text-[11px] font-bold text-red-700">
                        Obligatorie prin Lege
                      </span>
                    ) : (
                      <span className="rounded bg-emerald-100 border border-emerald-200 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                        Facultativă
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 mb-2">{asig.title}</h2>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">{asig.summary}</p>

                  <div className="space-y-1.5 mb-4">
                    <span className="block text-[11px] font-bold uppercase text-slate-400">Acoperiri principale:</span>
                    {asig.coverageDetails.map((cov, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{cov}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-2">
                  <p className="text-[11px] text-slate-500 mb-3"><strong>Recomandată pentru:</strong> {asig.recommendedFor}</p>
                  <Link href="/contact" className="block w-full text-center rounded-lg bg-emerald-800 py-2.5 text-xs font-bold text-white hover:bg-emerald-900">
                    Solicită Consultanță Asigurare →
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

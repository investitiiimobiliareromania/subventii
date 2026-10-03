import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FundingExplorer } from "@/components/funding-explorer";
import { getProgramsFromDb } from "@/lib/db/repository";

export const metadata: Metadata = {
  title: "Catalog Finanțări Nerambursabile, Programe Europene & IMM 2026",
  description: "Baza națională de date pentru granturi de afaceri, linii de investiții IMM, digitalizare, energie verde, intervenții AFIR, plăți directe APIA și ajutoare de stat.",
  alternates: {
    canonical: "https://subventii.cristianvaduva.com/programes",
  },
};

export default async function ProgramesPage() {
  const programs = await getProgramsFromDb();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 mb-6">
          <nav aria-label="Navigare pe pagină" className="mb-4 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Catalog Finanțări &amp; Programe</span>
          </nav>

          <div className="border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              CATALOG OFICIAL CENTRALIZAT
            </span>
            <h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">
              Programe de Finanțare, Granturi Nerambursabile și Intervenții
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
              Explorează toate oportunitățile active: finanțări pentru start-up-uri și IMM-uri, programe de digitalizare, investiții industriale, intervenții din Planul Strategic derulate prin AFIR și APIA, scheme de ajutor de stat și linii regionale.
            </p>
          </div>
        </div>

        <FundingExplorer programs={programs} />
      </main>

      <Footer />
    </div>
  );
}

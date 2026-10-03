import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FundingExplorer } from "@/components/funding-explorer";
import { getProgramsFromDb } from "@/lib/db/repository";

export const metadata: Metadata = {
  title: "Finanțări pentru Afaceri, Start-up-uri & IMM-uri 2026",
  description: "Ghidul complet și catalogul centralizat al apelurilor de proiecte, granturilor nerambursabile, fondurilor europene și schemelor de ajutor de stat din România.",
  alternates: {
    canonical: "https://subventii.cristianvaduva.com/finantari",
  },
};

export default async function FundingIndex() {
  const programs = await getProgramsFromDb();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 mb-6">
          <nav aria-label="Navigare pe pagină" className="mb-4 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Finanțări &amp; Programe</span>
          </nav>

          <div className="border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              EXPLORATOR FINANȚĂRI &amp; GRANTURI PENTRU AFACERI
            </span>
            <h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">
              Programe de Finanțare, Granturi IMM și Intervenții Active
            </h1>
          </div>
        </div>

        <FundingExplorer programs={programs} />
      </main>

      <Footer />
    </div>
  );
}

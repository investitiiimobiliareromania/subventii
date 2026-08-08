import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FundingExplorer } from "@/components/funding-explorer";
import { getProgramsFromDb } from "@/lib/db/repository";

export const metadata: Metadata = {
  title: "Catalog Finanțări și Subvenții 2026 | AiX Educational Intelligence",
  description: "Căutare și filtrare avansată pentru fonduri nerambursabile, PNRR, Start-Up Nation și sprijin IMM din România.",
  alternates: {
    canonical: "https://subventii.cristianvaduva.com/programes",
  },
};

export default async function ProgramesPage() {
  const programs = await getProgramsFromDb();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 mb-4">
          <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Catalog Finanțări Publice Disponibile
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Explorează programele deschise sau în curând de la MIPE, ADR-uri, AFIR și AFM.
          </p>
        </div>

        <FundingExplorer programs={programs} />
      </main>

      <Footer />
    </div>
  );
}

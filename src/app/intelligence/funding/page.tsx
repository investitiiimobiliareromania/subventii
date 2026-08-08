import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { getProgramsFromDb } from "@/lib/db/repository";
import { formatCurrencyRon } from "@/lib/funding-data";

export const metadata: Metadata = {
  title: "Inteligență Finanțări: Analiză Granturi & Bugete Alocate 2026",
  description: "Monitorizarea completă a apelurilor de proiecte, plafoanelor de grant și condițiilor de finanțare nerambursabilă în România.",
  alternates: { canonical: "https://subventii.cristianvaduva.com/intelligence/funding" },
};

export default async function IntelligenceFundingPage() {
  const programs = await getProgramsFromDb();

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
            <span className="font-semibold text-slate-800">Finanțări</span>
          </nav>

          <div className="mb-8 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Operational Intelligence</span>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Analiză Finanțări & Apeluri de Proiecte
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
              Perspective complete asupra programelor deschise, plafoanelor maxime de grant și termenelor de depunere.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
            <table className="w-full text-left text-xs text-slate-800 border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-4">Program de Finanțare</th>
                  <th className="p-4">Sursă / Autoritate</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Grant Maxim</th>
                  <th className="p-4">Termen Limită</th>
                  <th className="p-4 text-right">Detalii</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {programs.map((p) => (
                  <tr key={p.slug} className="hover:bg-slate-50">
                    <td className="p-4 font-bold text-slate-900">{p.title}</td>
                    <td className="p-4 text-slate-600">{p.sourceCategory}</td>
                    <td className="p-4">
                      <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${p.status === "Deschis" ? "bg-emerald-100 text-emerald-900" : "bg-amber-100 text-amber-900"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4 font-extrabold text-emerald-800">{formatCurrencyRon(p.maxFundingRon)}</td>
                    <td className="p-4 text-slate-600">{p.deadline}</td>
                    <td className="p-4 text-right">
                      <Link href={`/finantari/${p.slug}`} className="font-bold text-emerald-800 hover:underline">
                        Fișă Tehnică →
                      </Link>
                    </td>
                  </tr>
                ))}
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

import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { institutionsCatalog, type PublicInstitution } from "@/lib/institutii-data";

export const metadata: Metadata = {
  title: "Director Instituțional: Ministere & Agenții de Finanțare 2026",
  description: "Maparea instituțiilor publice responsabile de acordarea subvențiilor, gestionarea apelurilor PNRR și auditul fondurilor structurale.",
  alternates: { canonical: "https://subventii.ro/intelligence/institutions" },
};

export default function IntelligenceInstitutionsPage() {
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
            <span className="font-semibold text-slate-800">Instituții</span>
          </nav>

          <div className="mb-8 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Institutional Mapping</span>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Harta Autorităților de Management & Agențiilor Publice
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
              Profile detaliate pentru toate ministerele, agențiile de implementare și autoritățile contractante din România.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {institutionsCatalog.map((inst: PublicInstitution) => (
              <div key={inst.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-900">
                      {inst.acronym}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">{inst.officialDomain}</span>
                  </div>
                  <h2 className="text-base font-bold text-slate-900 mb-2">{inst.name}</h2>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">{inst.summary}</p>
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">Apeluri: {inst.activeProgramsCount} active</span>
                  <Link href={`/institutii/${inst.slug}`} className="font-bold text-emerald-800 hover:underline">
                    Profil Instituțional →
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

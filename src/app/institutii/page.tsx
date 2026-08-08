import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { institutionsCatalog } from "@/lib/institutii-data";

export const metadata: Metadata = {
  title: "Director Instituții Publice & Autorități de Management",
  description: "Directorul complet al ministerelor, agențiilor de management și administrațiilor publice responsabile cu fondurile nerambursabile.",
  alternates: { canonical: "https://subventii.cristianvaduva.com/institutii" },
};

export default function InstitutionsDirectoryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Instituții Publice AiX Educational Intelligence",
    "url": "https://subventii.cristianvaduva.com/institutii",
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
            <span className="font-semibold text-slate-800">Instituții Publice</span>
          </nav>

          <div className="mb-8 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Autorități Oficiale & Ministere</span>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Directorul Autorităților de Management din România
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
              Descoperă instituțiile responsabile de elaborarea ghidurilor solicitantului, derularea apelurilor de proiecte și plată.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {institutionsCatalog.map((inst) => (
              <article key={inst.slug} className="grant-card">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded bg-slate-900 px-2.5 py-0.5 text-xs font-bold text-white">
                      {inst.acronym}
                    </span>
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-900">
                      {inst.activeProgramsCount} Programe Active
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 mb-2 hover:text-emerald-800 leading-snug">
                    <Link href={`/institutii/${inst.slug}`}>{inst.name}</Link>
                  </h2>

                  <p className="text-xs text-slate-600 mb-4 leading-relaxed line-clamp-3">
                    {inst.summary}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono">🌐 {inst.officialDomain}</span>
                  <Link href={`/institutii/${inst.slug}`} className="font-bold text-emerald-800 hover:underline">
                    Profil complet →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <AiAssistantDrawer />
      <Footer />
    </div>
  );
}

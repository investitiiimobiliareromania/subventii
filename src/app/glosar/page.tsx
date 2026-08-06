import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { glossaryCatalog } from "@/lib/glossary-data";

export const metadata: Metadata = {
  title: "Glosar de Finanțări, Fonduri Europene și Termeni Bancari",
  description: "Dicționarul explicativ al termenilor utilizați în ghidurile de finanțare nerambursabilă: de minimis, cofinanțare, IRCC, ROBOR, RLS, PAD.",
  alternates: { canonical: "https://subventii.ro/glosar" },
};

export default function GlossaryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": "Glosar Subvenții.ro",
    "url": "https://subventii.ro/glosar",
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
            <span className="font-semibold text-slate-800">Glosar Termeni</span>
          </nav>

          <div className="mb-8 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Dicționar Tehnic Explicativ</span>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Glosarul Termenilor de Finanțare și Credite
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
              Explicații clare ale celor mai importanți termeni juridici, financiari și tehnici utilizați în ghidurile fondurilor structurale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {glossaryCatalog.map((entry) => (
              <article key={entry.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700 mb-2 inline-block">
                  {entry.category}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mb-2 hover:text-emerald-800">
                  <Link href={`/glosar/${entry.slug}`}>{entry.term}</Link>
                </h2>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed line-clamp-3">{entry.definition}</p>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">Legislație anexată</span>
                  <Link href={`/glosar/${entry.slug}`} className="font-bold text-emerald-800 hover:underline">
                    Definiție completă →
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

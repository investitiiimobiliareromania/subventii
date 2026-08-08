import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { glossaryCatalog } from "@/lib/glossary-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = glossaryCatalog.find((g) => g.slug === slug);
  if (!item) return { title: "Termen Negăsit" };

  return {
    title: `Ce înseamnă ${item.term}? Definiție & Exemple`,
    description: item.definition,
    alternates: { canonical: `https://subventii.cristianvaduva.com/glosar/${slug}` },
  };
}

export default async function GlossaryDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = glossaryCatalog.find((g) => g.slug === slug);
  if (!item) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": item.term,
    "description": item.definition,
    "inDefinedTermSet": "https://subventii.cristianvaduva.com/glosar",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <Link href="/glosar" className="hover:text-emerald-800">Glosar</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">{item.term}</span>
          </nav>

          <header className="mb-8 border-b border-slate-200 pb-6">
            <span className="rounded bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-900 mb-3 inline-block">
              {item.category}
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
              {item.term}
            </h1>
          </header>

          <div className="space-y-6 text-sm text-slate-800 leading-relaxed">
            <section className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Definiție Oficială</h2>
              <p className="text-base text-slate-900 font-medium">{item.definition}</p>
            </section>

            {item.example && (
              <section className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2">Exemplu Practic de Aplicare</h2>
                <p className="text-xs text-emerald-950">{item.example}</p>
              </section>
            )}

            {item.relatedLegislation.length > 0 && (
              <section>
                <h2 className="text-base font-bold text-slate-900 mb-2">Bază Legală și Reglementare</h2>
                <ul className="space-y-1 text-xs text-slate-600">
                  {item.relatedLegislation.map((leg, i) => (
                    <li key={i}>⚖️ {leg}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </main>

      <AiAssistantDrawer />
      <Footer />
    </div>
  );
}

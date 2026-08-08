import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { newsroomArticles } from "@/lib/newsroom-data";

export const metadata: Metadata = {
  title: "Știri & Newsroom Fonduri Nerambursabile 2026",
  description: "Ultimele noutăți oficiale despre ghiduri de finanțare, granturi PNRR, facilități fiscale, OUG și modificări legislative din România.",
  alternates: { canonical: "https://subventii.cristianvaduva.com/stiri" },
};

export default function NewsroomPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Newsroom AiX Educational Intelligence",
    "url": "https://subventii.cristianvaduva.com/stiri",
    "description": "Noutăți și analize oficiale pe fonduri europene și programe guvernamentale.",
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
            <span className="font-semibold text-slate-800">Newsroom & Știri</span>
          </nav>

          <div className="mb-10 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Editorial & Analiză de Impact</span>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Noutăți Fonduri, Legislație și Programe Guvernamentale
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
              Analize detaliate ale ghidurilor solicitantului, ordonanțelor de urgență și oportunităților de granturi actualizate permanent din surse ministeriale.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {newsroomArticles.map((art) => (
              <article key={art.slug} className="grant-card">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-md bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-900">
                      {art.category}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">{art.readingTimeMin} min lectură</span>
                  </div>

                  <h2 className="mb-2 text-lg font-bold text-slate-900 hover:text-emerald-800 leading-snug">
                    <Link href={`/stiri/${art.slug}`}>{art.headline}</Link>
                  </h2>

                  <p className="mb-4 text-xs leading-relaxed text-slate-600 line-clamp-3">
                    {art.summary}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500">{art.institution}</span>
                  <Link href={`/stiri/${art.slug}`} className="font-bold text-emerald-800 hover:underline">
                    Citește articol →
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

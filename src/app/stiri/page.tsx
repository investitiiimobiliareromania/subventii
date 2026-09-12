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
          <nav aria-label="Navigare pe pagină" className="mb-6 flex items-center gap-2 text-xs text-slate-600">
            <Link href="/" className="hover:text-emerald-800 transition-colors">Acasă</Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-slate-900">Newsroom &amp; Știri</span>
          </nav>

          <div className="mb-10 border-b border-slate-200 pb-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                EDITORIAL &amp; MONITORIZARE OFICIALĂ
              </span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 border border-slate-200">
                DATE VERIFICATE
              </span>
              <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                SEPTEMBRIE 2026
              </span>
            </div>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Noutăți Fonduri, Legislație și Programe Guvernamentale
            </h1>
            <p className="mt-2 text-sm text-slate-700 max-w-3xl leading-relaxed">
              Analize structurate ale ghidurilor solicitantului, ordonanțelor de urgență, programelor europene și deciziilor instituționale din România.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsroomArticles.map((art) => (
              <article key={art.slug} className="grant-card flex flex-col justify-between">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-900">
                        {art.category}
                      </span>
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-600 border border-slate-200">
                        Sinteză editorială
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-slate-600">{art.readingTimeMin} min lectură</span>
                  </div>

                  <h2 className="mb-2 text-lg font-bold text-slate-900 hover:text-emerald-800 leading-snug">
                    <Link href={`/stiri/${art.slug}`}>{art.headline}</Link>
                  </h2>

                  <p className="mb-4 text-xs leading-relaxed text-slate-700 line-clamp-3">
                    {art.summary}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600 truncate max-w-[180px]" title={art.institution}>
                    {art.institution}
                  </span>
                  <Link
                    href={`/stiri/${art.slug}`}
                    className="font-bold text-emerald-800 hover:underline shrink-0"
                    aria-label={`Citește articolul complet: ${art.headline}`}
                  >
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

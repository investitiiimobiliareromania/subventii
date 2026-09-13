import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { getArticlesFromDb } from "@/lib/db/repository";

export const metadata: Metadata = {
  title: "Știri & Comunicate Oficiale Subvenții Agricole, APIA & AFIR 2026",
  description: "Noutăți verificate în timp real: deschiderea sesiunilor de depunere APIA, plăți în avans, calendare AFIR, ordine MADR, ajutoare de stat și fonduri europene.",
  alternates: { canonical: "https://subventii.cristianvaduva.com/stiri" },
};

export default async function NewsroomPage() {
  const articles = await getArticlesFromDb();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Newsroom Subvenții & Agricultură",
    "url": "https://subventii.cristianvaduva.com/stiri",
    "description": "Comunicate oficiale și noutăți despre subvențiile APIA, proiectele AFIR și deciziile MADR.",
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
            <span className="font-semibold text-slate-900">Newsroom &amp; Știri Oficiale</span>
          </nav>

          <div className="mb-10 border-b border-slate-200 pb-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                MONITORIZARE OFICIALĂ &amp; COMUNICATE
              </span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 border border-slate-200 font-mono">
                SURSE VERIFICATE (APIA • AFIR • MADR)
              </span>
              <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                SEPTEMBRIE 2026
              </span>
            </div>
            <h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">
              Noutăți Subvenții, Campanii APIA, Finanțări AFIR și Decizii MADR
            </h1>
            <p className="mt-2 text-sm text-slate-700 max-w-3xl leading-relaxed">
              Analize structurate ale ghidurilor solicitantului, ordonanțelor de urgență, termenelor de depunere a cererilor unice de plată și fondurilor europene destinate agriculturii și dezvoltării rurale.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((art) => (
              <article key={art.slug} className="grant-card flex flex-col justify-between">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-900">
                        {art.category}
                      </span>
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-600 border border-slate-200">
                        Sursă Oficială
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-slate-600">{art.readingTimeMin} min lectură</span>
                  </div>

                  <h2 className="mb-2 text-lg font-bold text-slate-900 hover:text-emerald-800 leading-snug">
                    <Link href={`/stiri/${art.slug}`}>{art.title}</Link>
                  </h2>

                  <p className="mb-4 text-xs leading-relaxed text-slate-700 line-clamp-3">
                    {art.summary}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600 truncate max-w-[180px]">
                    {art.publishedAt}
                  </span>
                  <Link
                    href={`/stiri/${art.slug}`}
                    className="font-bold text-emerald-800 hover:underline shrink-0"
                    aria-label={`Citește articolul complet: ${art.title}`}
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

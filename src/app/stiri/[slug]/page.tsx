import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { newsroomArticles } from "@/lib/newsroom-data";
import { FUNDING_PROGRAMS } from "@/lib/funding-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return newsroomArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = newsroomArticles.find((a) => a.slug === slug);
  if (!article) return { title: "Articol negăsit" };

  return {
    title: `${article.headline} — Subvenții & Legislație 2026`,
    description: article.summary,
    alternates: { canonical: `https://subventii.cristianvaduva.com/stiri/${slug}` },
    openGraph: {
      title: article.headline,
      description: article.summary,
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = newsroomArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  const relatedProgs = FUNDING_PROGRAMS.filter((p) =>
    article.relatedProgrammes.includes(p.slug)
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.headline,
    "description": article.summary,
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt,
    "author": { "@type": "Person", "name": article.author },
    "publisher": { "@type": "Organization", "name": "Subvenții — Platformă Națională" },
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <nav aria-label="Navigare pe pagină" className="mb-6 flex items-center gap-2 text-xs text-slate-600">
            <Link href="/" className="hover:text-emerald-800 transition-colors">Acasă</Link>
            <span aria-hidden="true">/</span>
            <Link href="/stiri" className="hover:text-emerald-800 transition-colors">Știri</Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-slate-900 line-clamp-1">{article.headline}</span>
          </nav>

          <header className="mb-8 rounded-2xl border border-slate-200 bg-slate-900 p-6 md:p-8 text-white">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-emerald-800 px-2.5 py-0.5 text-xs font-bold font-mono text-white">
                {article.category}
              </span>
              <span className="text-xs text-slate-300">Publicat: {article.publishedAt}</span>
              <span className="text-xs text-slate-400">• {article.readingTimeMin} min lectură</span>
              <span className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-800 font-mono">
                ✓ Sursă Oficială Verificată
              </span>
            </div>
            <h1 className="text-2xl font-black text-white sm:text-3xl md:text-4xl leading-tight">
              {article.headline}
            </h1>
            <p className="mt-4 text-sm font-medium text-slate-300 leading-relaxed max-w-3xl">
              {article.summary}
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6 text-xs sm:text-sm text-slate-800 leading-relaxed">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                  ⚡ Analiză de Impact Direct
                </h2>
                <p className="text-xs text-slate-700 leading-relaxed mb-2">{article.impactAnalysis}</p>
                <div className="pt-2 border-t border-slate-200 text-xs text-slate-800">
                  <strong>Cine este afectat:</strong> {article.whoIsAffected}
                </div>
              </div>

              <div className="space-y-4 text-slate-800">
                {article.content.split("\n\n").map((p, idx) => (
                  <p key={idx} className="leading-relaxed">{p}</p>
                ))}
              </div>

              {/* Related Programs Section */}
              {relatedProgs.length > 0 && (
                <div className="mt-8 border-t border-slate-200 pt-6">
                  <h2 className="text-base font-bold text-slate-900 mb-3">
                    Programe &amp; Intervenții Asociate Acestui Comunicat
                  </h2>
                  <div className="space-y-3">
                    {relatedProgs.map((p) => (
                      <div key={p.slug} className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                        <div>
                          <strong className="text-slate-900 block font-bold">{p.title}</strong>
                          <span className="text-slate-500">{p.sourceCategory} • Status: {p.status}</span>
                        </div>
                        <Link href={`/finantari/${p.slug}`} className="rounded-lg bg-emerald-800 px-3 py-1.5 text-white font-bold hover:bg-emerald-900 shrink-0 text-xs">
                          Vezi Fișa Completă →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {article.faqs && article.faqs.length > 0 && (
                <div className="mt-8 border-t border-slate-200 pt-6">
                  <h2 className="text-base font-bold text-slate-900 mb-3">Întrebări Frecvente (FAQ)</h2>
                  <div className="space-y-3">
                    {article.faqs.map((faq, i) => (
                      <div key={i} className="rounded-xl border border-slate-200 p-4 bg-slate-50">
                        <h3 className="font-bold text-slate-900 text-xs mb-1">{faq.question}</h3>
                        <p className="text-xs text-slate-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Sursă Oficială &amp; Documente
                </h2>
                <ul className="space-y-2 text-xs">
                  {article.officialDocuments.map((doc, i) => (
                    <li key={i}>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-800 hover:underline font-semibold block"
                        aria-label={`Deschide documentul oficial: ${doc.title}`}
                      >
                        📄 {doc.title} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs">
                <h2 className="font-bold text-slate-900 mb-1">Instituție Emitentă</h2>
                <p className="text-slate-700 font-semibold mb-3">{article.institution}</p>
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-emerald-800 font-bold hover:underline"
                >
                  Vezi comunicatul pe portalul oficial ↗
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <AiAssistantDrawer />
      <Footer />
    </div>
  );
}

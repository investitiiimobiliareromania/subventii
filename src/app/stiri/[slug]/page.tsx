import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { newsroomArticles } from "@/lib/newsroom-data";

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
    title: `${article.headline} | AiX Educational Intelligence`,
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.headline,
    "description": article.summary,
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt,
    "author": { "@type": "Person", "name": article.author },
    "publisher": { "@type": "Organization", "name": "AiX Educational Intelligence" },
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <nav aria-label="Navigare pe pagină" className="mb-6 flex items-center gap-2 text-xs text-slate-600">
            <Link href="/" className="hover:text-emerald-800 transition-colors">Acasă</Link>
            <span aria-hidden="true">/</span>
            <Link href="/stiri" className="hover:text-emerald-800 transition-colors">Știri</Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-slate-900 line-clamp-1">{article.headline}</span>
          </nav>

          <header className="mb-8 border-b border-slate-200 pb-6">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className="rounded-md bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-900">
                {article.category}
              </span>
              <span className="text-xs text-slate-600">Publicat: {article.publishedAt}</span>
              <span className="text-xs text-slate-600">• Actualizat: {article.updatedAt}</span>
              <span className="text-xs text-slate-600">• {article.readingTimeMin} min lectură</span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 border border-slate-200">
                Sinteză editorială Subvenții
              </span>
              {article.verified && (
                <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                  ✓ Sursă Oficială Verificată
                </span>
              )}
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-4xl leading-tight">
              {article.headline}
            </h1>
            <p className="mt-4 text-base font-medium text-slate-700 leading-relaxed">
              {article.summary}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6 text-sm text-slate-800 leading-relaxed">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  ⚡ Analiză de Impact Direct
                </h2>
                <p className="text-xs text-slate-700 leading-relaxed">{article.impactAnalysis}</p>
                <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-800">
                  <strong>Cine este afectat:</strong> {article.whoIsAffected}
                </div>
              </div>

              <div className="prose max-w-none space-y-4">
                {article.content.split("\n\n").map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {article.faqs.length > 0 && (
                <div className="mt-8 border-t border-slate-200 pt-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">Întrebări Frecvente (FAQ)</h2>
                  <div className="space-y-4">
                    {article.faqs.map((faq, i) => (
                      <div key={i} className="rounded-lg border border-slate-200 p-4 bg-slate-50">
                        <h3 className="font-bold text-slate-900 text-xs mb-1">{faq.question}</h3>
                        <p className="text-xs text-slate-700">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                  Documente &amp; Portal Oficial
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

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
                <h2 className="text-xs font-bold text-emerald-900 mb-2">Sursă Instituțională</h2>
                <p className="text-xs text-emerald-800 font-semibold">{article.institution}</p>
                <Link
                  href="/contact"
                  className="mt-4 inline-block w-full text-center rounded-lg bg-emerald-800 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-900 transition-colors"
                  aria-label="Solicită consultanță și asistență"
                >
                  Solicită Asistență →
                </Link>
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

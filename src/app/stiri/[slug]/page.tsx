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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = newsroomArticles.find((a) => a.slug === slug);
  if (!article) return { title: "Articol negăsit" };

  return {
    title: `${article.headline} | Subvenții.ro`,
    description: article.summary,
    alternates: { canonical: `https://subventii.ro/stiri/${slug}` },
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
    "publisher": { "@type": "Organization", "name": "Subvenții.ro" },
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
            <Link href="/stiri" className="hover:text-emerald-800">Știri</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800 line-clamp-1">{article.headline}</span>
          </nav>

          <header className="mb-8 border-b border-slate-200 pb-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-md bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-900">
                {article.category}
              </span>
              <span className="text-xs text-slate-500">Publicat: {article.publishedAt}</span>
              <span className="text-xs text-slate-500">• {article.readingTimeMin} min lectură</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-4xl leading-tight">
              {article.headline}
            </h1>
            <p className="mt-4 text-base font-medium text-slate-600 leading-relaxed">
              {article.summary}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6 text-sm text-slate-800 leading-relaxed">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  ⚡ Analiză de Impact Direct
                </h3>
                <p className="text-xs text-slate-700">{article.impactAnalysis}</p>
                <div className="mt-3 pt-3 border-t border-slate-200 text-xs">
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
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Întrebări Frecvente (FAQ)</h3>
                  <div className="space-y-4">
                    {article.faqs.map((faq, i) => (
                      <div key={i} className="rounded-lg border border-slate-200 p-4 bg-slate-50">
                        <h4 className="font-bold text-slate-900 text-xs mb-1">{faq.question}</h4>
                        <p className="text-xs text-slate-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Documente Oficiale
                </h3>
                <ul className="space-y-2 text-xs">
                  {article.officialDocuments.map((doc, i) => (
                    <li key={i}>
                      <a href={doc.url} target="_blank" rel="noreferrer" className="text-emerald-800 hover:underline font-semibold block">
                        📄 {doc.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
                <h3 className="text-xs font-bold text-emerald-900 mb-2">Sursă Instituțională</h3>
                <p className="text-xs text-emerald-800 font-semibold">{article.institution}</p>
                <Link href="/contact" className="mt-4 inline-block w-full text-center rounded-lg bg-emerald-800 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-900">
                  Solicită Consultanță →
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

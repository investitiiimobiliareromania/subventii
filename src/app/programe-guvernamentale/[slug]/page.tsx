import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { governmentProgramsCatalog } from "@/lib/programe-guvernamentale-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = governmentProgramsCatalog[slug];
  if (!program) return { title: "Program Negăsit" };

  return {
    title: `${program.title} | Sinteză Educațională 2026`,
    description: program.subtitle,
    alternates: { canonical: `https://subventii.cristianvaduva.com/programe-guvernamentale/${slug}` },
    openGraph: {
      title: program.title,
      description: program.subtitle,
      type: "article",
    },
  };
}

export default async function GovernmentProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = governmentProgramsCatalog[slug];
  if (!program) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": program.title,
        "description": program.overview,
        "url": `https://subventii.cristianvaduva.com/programe-guvernamentale/${slug}`,
        "publisher": {
          "@type": "Organization",
          "name": "AiX — Educational Intelligence",
          "url": "https://subventii.cristianvaduva.com"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": program.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://subventii.cristianvaduva.com" },
          { "@type": "ListItem", "position": 2, "name": "Programe Guvernamentale", "item": "https://subventii.cristianvaduva.com/programe-guvernamentale" },
          { "@type": "ListItem", "position": 3, "name": program.title, "item": `https://subventii.cristianvaduva.com/programe-guvernamentale/${slug}` },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <Link href="/programe-guvernamentale" className="hover:text-emerald-800">Programe Guvernamentale</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">{program.title}</span>
          </nav>

          <header className="mb-10 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 md:p-8">
            <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-900 mb-3">
              {program.heroBadge}
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl leading-tight">
              {program.title}
            </h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-3xl">
              {program.subtitle}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-slate-200 pt-6">
              {program.stats.map((st, i) => (
                <div key={i} className="rounded-lg bg-white p-3 border border-slate-200 text-center">
                  <span className="block text-lg font-black text-slate-900">{st.value}</span>
                  <span className="text-[11px] text-slate-500 font-medium">{st.label}</span>
                </div>
              ))}
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8 text-slate-800 text-sm">
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Privire de Ansamblu (Overview)</h2>
                <p className="leading-relaxed text-slate-600">{program.overview}</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Criterii de Eligibilitate</h2>
                <ul className="space-y-2">
                  {program.eligibility.map((el, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{el}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Beneficii și Avantaje</h2>
                <ul className="space-y-2">
                  {program.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="text-emerald-600 font-bold">★</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Documente Necesare</h2>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
                  {program.documents.map((doc, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-800">
                      <span className="font-mono text-slate-400">0{i + 1}.</span>
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Etapele Procesului de Aplicare</h2>
                <div className="space-y-4">
                  {program.applicationProcess.map((step) => (
                    <div key={step.stepNumber} className="flex gap-4 p-4 rounded-xl border border-slate-200 bg-white">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-800 text-xs font-bold text-white shrink-0">
                        {step.stepNumber}
                      </span>
                      <div>
                        <h3 className="font-bold text-slate-900 text-xs mb-1">{step.title}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Întrebări Frecvente (FAQ)</h2>
                <div className="space-y-3">
                  {program.faqs.map((faq, i) => (
                    <div key={i} className="rounded-xl border border-slate-200 p-4 bg-slate-50">
                      <h3 className="font-bold text-slate-900 text-xs mb-1">{faq.question}</h3>
                      <p className="text-xs text-slate-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Surse Oficiale</h3>
                <ul className="space-y-2 text-xs">
                  {program.officialSources.map((src, i) => (
                    <li key={i}>
                      <a href={src.url} target="_blank" rel="noreferrer" className="text-emerald-800 font-semibold hover:underline block">
                        🌐 {src.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Programe Conexe</h3>
                <div className="space-y-3 text-xs">
                  {program.relatedProgrammes.map((rel, i) => (
                    <div key={i} className="border-b border-slate-200 pb-2 last:border-0">
                      <Link href={`/programe-guvernamentale/${rel.slug}`} className="font-bold text-slate-900 hover:text-emerald-800 block">
                        {rel.title}
                      </Link>
                      <span className="text-[11px] text-slate-500">{rel.grantAmount}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-slate-900 p-6 text-white text-center">
                <h3 className="text-base font-bold mb-2">Ai nevoie de ajutor cu dosarul?</h3>
                <p className="text-xs text-slate-300 mb-4">Echipa noastră oferă asistență de specialitate pentru verificarea eligibilității.</p>
                <Link href="/contact" className="block w-full rounded-lg bg-emerald-700 py-2.5 text-xs font-bold text-white hover:bg-emerald-800">
                  Solicită Asistență Dosar →
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

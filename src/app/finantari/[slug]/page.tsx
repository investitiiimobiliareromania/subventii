import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BookmarkButton } from "@/components/bookmark-button";
import { getProgramBySlugFromDb, getProgramsFromDb } from "@/lib/db/repository";
import {
  calculateDaysRemaining,
  formatCurrencyEur,
  formatCurrencyRon,
} from "@/lib/funding-data";
import { legislationCatalog } from "@/lib/legislatie-data";
import { newsroomArticles } from "@/lib/newsroom-data";
import { downloadableResourcesCatalog } from "@/lib/resources-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const all = await getProgramsFromDb();
  return all.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlugFromDb(slug);
  if (!program) return {};

  const title = `${program.title} — Ghid Oficial & Condiții 2026`;
  const description = program.summary;
  const canonicalUrl = `https://subventii.cristianvaduva.com/finantari/${program.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = await getProgramBySlugFromDb(slug);

  if (!program) {
    notFound();
  }

  const daysLeft = calculateDaysRemaining(program.deadline);

  // Match related legislation
  const relatedLegs = legislationCatalog.filter(
    (l) =>
      (program.relatedLegislation && program.relatedLegislation.includes(l.slug)) ||
      (l.affectedProgrammes && l.affectedProgrammes.includes(program.slug)) ||
      program.industries.some((ind) => l.affectedSectors.includes(ind))
  );

  // Match related news
  const relatedNewsItems = newsroomArticles.filter(
    (n) =>
      (program.relatedNews && program.relatedNews.includes(n.slug)) ||
      n.relatedProgrammes.includes(program.slug) ||
      (n.category === "APIA" && program.sourceCategory === "APIA") ||
      (n.category === "AFIR" && program.sourceCategory === "AFIR")
  );

  // Match related documents
  const relatedDocs = downloadableResourcesCatalog.filter(
    (d) =>
      d.institution === program.sourceCategory ||
      (program.sourceCategory === "APIA" && d.institution === "APIA") ||
      (program.sourceCategory === "AFIR" && d.institution === "AFIR")
  );

  // Structured Data (Schema.org JSON-LD)
  const jsonLdGrant = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    "name": program.title,
    "description": program.summary,
    "provider": {
      "@type": "GovernmentOrganization",
      "name": program.source,
      "url": program.officialUrl,
    },
    "url": `https://subventii.cristianvaduva.com/finantari/${program.slug}`,
    "serviceType": "Subvenție / Finanțare Publică",
    "validUntil": program.deadline,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "RON",
    },
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": program.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 pb-16 pt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Navigare pe pagină" className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">
              Acasă
            </Link>
            <span>/</span>
            <Link href="/programes" className="hover:text-emerald-800">
              Subvenții &amp; Finanțări
            </Link>
            <span>/</span>
            <span className="truncate text-slate-900 font-semibold">{program.title}</span>
          </nav>

          {/* Program Header */}
          <header className="mb-8 rounded-2xl border border-slate-200 bg-slate-900 p-6 md:p-8 text-white">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span
                className={`badge-status ${
                  program.status === "Deschis"
                    ? "badge-status-open"
                    : program.status === "În curând"
                    ? "badge-status-upcoming"
                    : program.status === "Permanent"
                    ? "bg-blue-600 text-white"
                    : "badge-status-closed"
                }`}
              >
                {program.status}
              </span>

              {program.authorityCode && (
                <span className="rounded bg-emerald-800 px-2.5 py-0.5 text-xs font-mono font-bold text-white">
                  COD: {program.authorityCode}
                </span>
              )}

              <span className="rounded bg-slate-800 px-2.5 py-0.5 text-xs font-bold text-slate-200 border border-slate-700">
                Sursă: {program.sourceCategory}
              </span>

              <span className="rounded bg-emerald-950 px-2.5 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-800 font-mono">
                {program.verifiedStatus || "OFICIAL"}
              </span>
            </div>

            <h1 className="mb-3 text-2xl font-black tracking-tight sm:text-3xl md:text-4xl leading-tight">
              {program.title}
            </h1>
            <p className="max-w-4xl text-sm leading-relaxed text-slate-300 md:text-base">
              {program.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-400 pt-4 border-t border-slate-800">
              <span>Autoritate: <strong className="text-white">{program.source}</strong></span>
              <span>•</span>
              <span>Actualizat: <strong className="text-emerald-400">Septembrie 2026</strong></span>
              <span>•</span>
              <span>Proveniență: <strong className="text-white">Plan Strategic PAC / Monitorul Oficial</strong></span>
            </div>
          </header>

          {/* Grid Layout: Main Content + Sticky Summary Sidebar */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Left Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Overview & Identification */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <h2 className="mb-4 text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                  1. Prezentare Generală &amp; Date Cheie
                </h2>
                <p className="text-xs leading-relaxed text-slate-700 mb-4">
                  Intervenție / schemă de finanțare administrată de <strong>{program.source}</strong>. Datele prezentate mai jos sunt sintetizate exclusiv din Ghidul Solicitantului, legislația națională (MADR) și regulamentele europene în vigoare.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4 text-xs">
                  <div>
                    <span className="block font-semibold text-slate-500">Vechime eligibilă fermă</span>
                    <span className="font-bold text-slate-900">{program.companyAge}</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-500">Dimensiune solicitant</span>
                    <span className="font-bold text-slate-900">{program.companySize}</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-500">Forme juridice acceptate</span>
                    <span className="font-bold text-slate-900">{program.businessTypes.join(", ")}</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-500">Acoperire teritorială</span>
                    <span className="font-bold text-slate-900">{program.counties.join(", ")}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block font-semibold text-slate-500">Sectoare &amp; Domenii eligibile</span>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {program.industries.map((ind, i) => (
                        <span key={i} className="rounded bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-950">
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Eligibility Criteria */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <h2 className="mb-4 text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                  2. Condiții &amp; Criterii de Eligibilitate
                </h2>
                <ul className="space-y-3 text-xs text-slate-700">
                  {program.eligibility.map((criterion, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-800">
                        ✓
                      </span>
                      <span className="leading-relaxed">{criterion}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Eligible & Ineligible Expenses */}
              {(program.eligibleExpenses || program.ineligibleExpenses) && (
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                  <h2 className="mb-4 text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                    3. Cheltuieli Eligibile &amp; Destinația Fondurilor
                  </h2>
                  {program.eligibleExpenses && program.eligibleExpenses.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">
                        Cheltuieli Eligibile:
                      </h3>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {program.eligibleExpenses.map((exp, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-emerald-700 font-bold">•</span>
                            <span>{exp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              )}

              {/* Required Documents */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <h2 className="mb-4 text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                  4. Documente Necesare &amp; Dosarul Solicitantului
                </h2>
                <div className="space-y-2">
                  {program.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50/50 p-3 text-xs text-slate-800"
                    >
                      <span className="font-mono text-slate-500 font-bold">0{idx + 1}.</span>
                      <span className="leading-relaxed">{doc}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Timeline & Steps */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <h2 className="mb-4 text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                  5. Calendarul Campaniei &amp; Etape de Depunere
                </h2>
                <div className="space-y-3">
                  {program.timeline.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 rounded-xl border border-slate-200 p-3.5 bg-slate-50/40 text-xs"
                    >
                      <div className="rounded-lg bg-emerald-800 px-2.5 py-1.5 font-mono font-bold text-white shrink-0">
                        Etapa 0{idx + 1}
                      </div>
                      <div>
                        <span className="block font-bold text-slate-900">{step.label}</span>
                        <span className="text-slate-600 font-semibold">{step.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Related Legislation Links */}
              {relatedLegs.length > 0 && (
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                  <h2 className="mb-4 text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                    6. Legislație Oficială &amp; Temei Juridic
                  </h2>
                  <div className="space-y-3">
                    {relatedLegs.map((leg) => (
                      <div key={leg.slug} className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white font-mono">
                              {leg.actType} {leg.actNumber}
                            </span>
                            <span className="text-slate-500 text-[11px]">Publicat: {leg.publicationDate}</span>
                          </div>
                          <span className="font-bold text-slate-900 block">{leg.title}</span>
                        </div>
                        <a
                          href={leg.officialSourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-emerald-800 hover:underline shrink-0 text-xs"
                        >
                          Monitorul Oficial ↗
                        </a>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Related Downloadable Documents */}
              {relatedDocs.length > 0 && (
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                  <h2 className="mb-4 text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                    7. Ghiduri PDF &amp; Documente Descărcabile
                  </h2>
                  <div className="space-y-3">
                    {relatedDocs.map((doc) => (
                      <div key={doc.id} className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 text-xs flex items-center justify-between gap-4">
                        <div>
                          <span className="font-bold text-slate-900 block">{doc.title}</span>
                          <span className="text-slate-500 text-[11px]">{doc.category} • {doc.fileFormat} ({doc.fileSizeMb} MB)</span>
                        </div>
                        <a
                          href={doc.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-emerald-800 px-3 py-1.5 font-bold text-white hover:bg-emerald-900 shrink-0 text-xs inline-flex items-center gap-1"
                        >
                          <span>Descarcă</span>
                          <span>📥</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Related News Articles */}
              {relatedNewsItems.length > 0 && (
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                  <h2 className="mb-4 text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                    8. Știri &amp; Comunicate Oficiale Asociate
                  </h2>
                  <div className="space-y-3">
                    {relatedNewsItems.map((news) => (
                      <div key={news.slug} className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 text-xs flex items-center justify-between gap-4">
                        <div>
                          <span className="text-[11px] font-bold text-emerald-800 block mb-0.5">{news.publishedAt} • {news.institution}</span>
                          <Link href={`/stiri/${news.slug}`} className="font-bold text-slate-900 hover:text-emerald-800">
                            {news.headline}
                          </Link>
                        </div>
                        <Link href={`/stiri/${news.slug}`} className="font-bold text-emerald-800 hover:underline shrink-0 text-xs">
                          Citește →
                        </Link>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* FAQs */}
              {program.faqs.length > 0 && (
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                  <h2 className="mb-4 text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                    9. Întrebări Frecvente (FAQ)
                  </h2>
                  <div className="space-y-3">
                    {program.faqs.map((faq, idx) => (
                      <details
                        key={idx}
                        className="group rounded-xl border border-slate-200 bg-slate-50/40 p-4 transition-colors"
                      >
                        <summary className="flex cursor-pointer items-center justify-between font-bold text-slate-900 text-xs">
                          <span>{faq.question}</span>
                          <span className="transition-transform group-open:rotate-180">↓</span>
                        </summary>
                        <p className="mt-3 text-xs leading-relaxed text-slate-700 border-t border-slate-200 pt-3">
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Sticky Sidebar */}
            <aside className="space-y-6">
              <div className="sticky top-20 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-lg">
                <div className="mb-4">
                  <span className="block text-[11px] font-semibold uppercase text-slate-400">
                    Valoare Sprijin / Finanțare
                  </span>
                  <span className="text-2xl font-black text-emerald-400">
                    {formatCurrencyRon(program.maxFundingRon)}
                  </span>
                  {program.maxFundingEur && (
                    <span className="block text-xs text-slate-300 mt-0.5 font-semibold">
                      (~{formatCurrencyEur(program.maxFundingEur)})
                    </span>
                  )}
                </div>

                {program.supportIntensity && (
                  <div className="mb-4 border-t border-slate-800 pt-3">
                    <span className="block text-[11px] font-semibold uppercase text-slate-400">
                      Intensitate Sprijin Nerambursabil
                    </span>
                    <span className="text-xs font-bold text-emerald-300">
                      {program.supportIntensity}
                    </span>
                  </div>
                )}

                <div className="mb-4 border-t border-slate-800 pt-3">
                  <span className="block text-[11px] font-semibold uppercase text-slate-400">
                    Cofinanțare Proprie
                  </span>
                  <span className="text-xs font-medium text-slate-200">
                    {program.cofinancing}
                  </span>
                </div>

                <div className="mb-6 border-t border-slate-800 pt-3">
                  <span className="block text-[11px] font-semibold uppercase text-slate-400">
                    Termen Limită Depunere
                  </span>
                  <span className="text-sm font-bold text-white">
                    {program.status === "Permanent"
                      ? "Program Permanent"
                      : new Intl.DateTimeFormat("ro-RO", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }).format(new Date(`${program.deadline}T12:00:00`))}
                  </span>
                  {program.status === "Deschis" && (
                    <div className="mt-2 rounded-md bg-amber-500/20 px-2.5 py-1.5 text-xs font-bold text-amber-300">
                      ⏱ {daysLeft > 0 ? `${daysLeft} zile rămase` : "Apelul se închide azi"}
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <a
                    href={program.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-xs"
                  >
                    <span>Acces Portal Oficial ({program.sourceCategory})</span>
                    <span>↗</span>
                  </a>

                  <BookmarkButton slug={program.slug} className="w-full justify-center" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />

      {/* JSON-LD Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGrant) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
    </div>
  );
}

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

  const title = `${program.title} | Subvenții.ro`;
  const description = program.summary;
  const canonicalUrl = `https://subventii.ro/finantari/${program.slug}`;

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

  // Structured Data (Schema.org JSON-LD)
  const jsonLdGrant = {
    "@context": "https://schema.org",
    "@type": "GovernmentGrant",
    "name": program.title,
    "description": program.summary,
    "provider": {
      "@type": "GovernmentOrganization",
      "name": program.source,
    },
    "url": `https://subventii.ro/finantari/${program.slug}`,
    "sameAs": program.officialUrl,
    "validUntil": program.deadline,
    "amount": {
      "@type": "MonetaryAmount",
      "currency": "RON",
      "value": program.maxFundingRon,
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
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">
              Acasă
            </Link>
            <span>/</span>
            <Link href="/programes" className="hover:text-emerald-800">
              Finanțări
            </Link>
            <span>/</span>
            <span className="truncate text-slate-800 font-medium">{program.title}</span>
          </nav>

          {/* Program Header */}
          <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50/50 p-6 md:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span
                className={`badge-status ${
                  program.status === "Deschis"
                    ? "badge-status-open"
                    : program.status === "În curând"
                    ? "badge-status-upcoming"
                    : "badge-status-closed"
                }`}
              >
                {program.status}
              </span>
              <span className="rounded-md bg-white border border-slate-200 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                Sursă: {program.sourceCategory}
              </span>
              <span className="rounded-md bg-white border border-slate-200 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                {program.companySize}
              </span>
            </div>

            <h1 className="mb-3 text-2xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              {program.title}
            </h1>
            <p className="max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
              {program.summary}
            </p>
          </div>

          {/* Grid Layout: Main Content + Sticky Summary Sidebar */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Left Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Overview */}
              <section>
                <h2 className="mb-3 text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
                  Prezentare Generală
                </h2>
                <p className="text-sm leading-relaxed text-slate-700">
                  Program administrat de <strong>{program.source}</strong>. Datele prezentate mai
                  jos sunt sintetizate din Ghidul Solicitantului și documentația oficială a apelului.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4 text-xs">
                  <div>
                    <span className="block font-semibold text-slate-500">Vârstă eligibilă firmă</span>
                    <span className="font-bold text-slate-900">{program.companyAge}</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-500">Acoperire teritorială</span>
                    <span className="font-bold text-slate-900">
                      {program.counties.join(", ")}
                    </span>
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-500">Forme juridice</span>
                    <span className="font-bold text-slate-900">
                      {program.businessTypes.join(", ")}
                    </span>
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-500">Domenii vizate</span>
                    <span className="font-bold text-slate-900">
                      {program.industries.join(", ")}
                    </span>
                  </div>
                </div>
              </section>

              {/* Eligibility Criteria */}
              <section>
                <h2 className="mb-3 text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
                  Criterii de Eligibilitate
                </h2>
                <ul className="space-y-2.5 text-sm text-slate-700">
                  {program.eligibility.map((criterion, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-800">
                        ✓
                      </span>
                      <span>{criterion}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Required Documents */}
              <section>
                <h2 className="mb-3 text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
                  Documente Solicitate
                </h2>
                <div className="rounded-xl border border-slate-200 bg-white">
                  {program.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 border-b border-slate-100 p-3 last:border-0 text-xs text-slate-800"
                    >
                      <span className="font-mono text-slate-400 font-bold">0{idx + 1}</span>
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Timeline */}
              <section>
                <h2 className="mb-3 text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
                  Calendar și Etape
                </h2>
                <div className="space-y-3">
                  {program.timeline.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 rounded-lg border border-slate-200 p-3.5 bg-slate-50/40 text-xs"
                    >
                      <div className="rounded-md bg-emerald-800 px-2 py-1 font-mono font-bold text-white">
                        Ets. {idx + 1}
                      </div>
                      <div>
                        <span className="block font-bold text-slate-900">{step.label}</span>
                        <span className="text-slate-600">{step.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQs */}
              {program.faqs.length > 0 && (
                <section>
                  <h2 className="mb-3 text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
                    Întrebări Frecvente (FAQ)
                  </h2>
                  <div className="space-y-3">
                    {program.faqs.map((faq, idx) => (
                      <details
                        key={idx}
                        className="group rounded-xl border border-slate-200 bg-white p-4 transition-colors"
                      >
                        <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-900 text-sm">
                          <span>{faq.question}</span>
                          <span className="transition-transform group-open:rotate-180">↓</span>
                        </summary>
                        <p className="mt-3 text-xs leading-relaxed text-slate-600 border-t border-slate-100 pt-3">
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Sidebar */}
            <aside className="space-y-6">
              <div className="sticky top-6 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-md">
                <div className="mb-4">
                  <span className="block text-[11px] font-semibold uppercase text-slate-400">
                    Valoare Maximă Nerambursabilă
                  </span>
                  <span className="text-2xl font-extrabold text-emerald-400">
                    {formatCurrencyRon(program.maxFundingRon)}
                  </span>
                  {program.maxFundingEur && (
                    <span className="block text-xs text-slate-300">
                      (~{formatCurrencyEur(program.maxFundingEur)})
                    </span>
                  )}
                </div>

                <div className="mb-4 border-t border-slate-800 pt-3">
                  <span className="block text-[11px] font-semibold uppercase text-slate-400">
                    Cofinanțare Privată Required
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
                    {new Intl.DateTimeFormat("ro-RO", {
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
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors"
                  >
                    <span>Acces Portal Oficial</span>
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

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FundingCard } from "@/components/funding-explorer";
import { getProgramsFromDb } from "@/lib/db/repository";
import { getSectorInfo, getAllSectors } from "@/lib/sectoare-data";

type Props = {
  params: Promise<{ sector: string }>;
};

export async function generateStaticParams() {
  const sectors = getAllSectors();
  return sectors.map(({ slug }) => ({ sector: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sector } = await params;
  const info = getSectorInfo(sector);
  if (!info) return {};

  return {
    title: `Subvenții & Finanțări ${info.name} 2026 — Ghid Complet`,
    description: info.shortDesc,
    alternates: { canonical: `https://subventii.cristianvaduva.com/sectoare/${sector}` },
  };
}

export default async function SectorFundingPage({ params }: Props) {
  const { sector } = await params;
  const info = getSectorInfo(sector);

  if (!info) {
    notFound();
  }

  const allPrograms = await getProgramsFromDb();
  const filtered = allPrograms.filter((p) =>
    p.industries.some((ind) =>
      ind.toLowerCase().includes(sector.toLowerCase()) ||
      info.name.toLowerCase().includes(ind.toLowerCase()) ||
      (sector === "vegetal" && ind === "Cultura Plantelor & Arabil") ||
      (sector === "zootehnie-bovine" && ind === "Zootehnie Bovine") ||
      (sector === "ovine-caprine" && ind === "Zootehnie Ovine & Caprine") ||
      (sector === "pomicultura-livezi" && ind === "Pomicultură & Livezi") ||
      (sector === "viticultura" && ind === "Viticultură & Vinificație") ||
      (sector === "legumicultura-solarii" && ind === "Legumicultură & Sere") ||
      (sector === "agricultura-ecologica" && ind === "Agricultură Ecologică") ||
      (sector === "irigatii" && ind === "Irigații & Hidroameliorații") ||
      (sector === "utilaje-agricole" && ind === "Utilaje & Mecanizare") ||
      (sector === "tineri-fermieri" && ind === "Tineri Fermieri") ||
      (sector === "procesare-agroalimentara" && ind === "Procesare Alimentară")
    )
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Subvenții Sectorul ${info.name}`,
    "description": info.shortDesc,
    "url": `https://subventii.cristianvaduva.com/sectoare/${sector}`,
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav aria-label="Navigare pe pagină" className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <Link href="/intelligence/funding" className="hover:text-emerald-800">Sectoare</Link>
            <span>/</span>
            <span className="font-semibold text-slate-900">{info.name}</span>
          </nav>

          {/* Sector Header */}
          <header className="mb-10 rounded-2xl border border-slate-200 bg-slate-900 p-6 md:p-8 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="rounded bg-emerald-800 px-2.5 py-0.5 text-xs font-bold font-mono">
                SECTOR ECONOMIC: {info.category.toUpperCase()}
              </span>
              <span className="rounded bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-300">
                {info.officialInstitutions.join(" • ")}
              </span>
            </div>

            <h1 className="text-3xl font-black sm:text-4xl md:text-5xl leading-tight">
              Subvenții &amp; Fonduri Nerambursabile: {info.name}
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
              {info.fullDesc}
            </p>

            <div className="mt-6 inline-block rounded-xl bg-emerald-950/90 border border-emerald-700/60 px-4 py-2.5 text-xs font-bold text-emerald-300">
              💵 Sprijin Financiar Estimat: {info.estimatedSupport}
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <div className="lg:col-span-2 space-y-6">
              {/* Interventions in this sector */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <h2 className="text-base font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                  Intervenții &amp; Scheme de Sprijin Direct Aplicabile
                </h2>
                <div className="space-y-2">
                  {info.keyInterventions.map((inte, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50/50 p-3 text-xs text-slate-800">
                      <span className="font-mono text-emerald-800 font-bold">0{i + 1}.</span>
                      <span className="font-medium leading-relaxed">{inte}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Eligibility & Compliance */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <h2 className="text-base font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                  Criterii de Eligibilitate &amp; Bune Practici Agricole
                </h2>
                <ul className="space-y-2 text-xs text-slate-700 mb-4">
                  {info.eligibilityHighlights.map((el, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold">✓</span>
                      <span className="leading-relaxed">{el}</span>
                    </li>
                  ))}
                </ul>

                {info.complianceConditions && info.complianceConditions.length > 0 && (
                  <div className="mt-4 border-t border-slate-100 pt-3">
                    <span className="block text-xs font-bold text-slate-900 mb-2">Condiționalitate (BGAO / SMR):</span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {info.complianceConditions.map((cond, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-700 font-bold">•</span>
                          <span>{cond}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>

              {/* FAQs */}
              {info.faqs && info.faqs.length > 0 && (
                <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <h2 className="text-base font-bold text-slate-900 mb-3">
                    Întrebări Frecvente (FAQ) — {info.name}
                  </h2>
                  <div className="space-y-3 text-xs">
                    {info.faqs.map((faq, idx) => (
                      <div key={idx} className="rounded-xl bg-white border border-slate-200 p-4">
                        <strong className="text-slate-900 block font-semibold mb-1">{faq.question}</strong>
                        <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Autorități de Resort
                </h3>
                <div className="space-y-2 text-xs">
                  {info.officialInstitutions.map((inst, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                      <span className="font-bold text-slate-900">{inst}</span>
                      <Link href="/institutii" className="text-emerald-800 hover:underline text-[11px] font-semibold">
                        Detalii Agenție →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6">
                <h3 className="text-xs font-bold text-emerald-950 mb-2">Ghiduri &amp; Cereri Tipizate</h3>
                <p className="text-xs text-emerald-900 mb-4">
                  Descarcă formularele oficiale, adeverințele tip și ghidurile solicitantului pentru {info.name}.
                </p>
                <Link
                  href="/resurse"
                  className="block text-center rounded-xl bg-emerald-800 py-2.5 text-xs font-bold text-white hover:bg-emerald-900 shadow-xs"
                >
                  Vezi Documentele Oficiale →
                </Link>
              </div>
            </aside>
          </div>

          {/* Active Calls List */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">
              Programe Active &amp; Apeluri Deschise în Sectorul {info.name} ({filtered.length})
            </h2>
            {filtered.length > 0 ? (
              <div className="card-grid">
                {filtered.map((program) => (
                  <FundingCard key={program.slug} program={program} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-600">
                Toate intervențiile naționale din Planul Strategic PAC sunt aplicabile fermierilor calificați.
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

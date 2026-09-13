import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { getCountyProfile } from "@/lib/county-data";
import { getProgramsFromDb } from "@/lib/db/repository";
import { getSectorInfo, getAllSectors } from "@/lib/sectoare-data";

type Props = {
  params: Promise<{ county: string; sector: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { county, sector } = await params;
  const countyKey = county.toLowerCase();
  const profile = getCountyProfile(countyKey);
  const sectorInfo = getSectorInfo(sector) || { name: sector.toUpperCase() };

  return {
    title: `Subvenții & Finanțări ${sectorInfo.name} — Județul ${profile.name} 2026`,
    description: `Ghidul complet al subvențiilor APIA pe hectar/cap de animal, intervențiilor AFIR și sprijinului pentru ${sectorInfo.name} în Județul ${profile.name}.`,
    alternates: { canonical: `https://subventii.cristianvaduva.com/subventii/${countyKey}/${sector}` },
  };
}

export default async function CountySectorMatrixPage({ params }: Props) {
  const { county, sector } = await params;
  const countyKey = county.toLowerCase();
  const profile = getCountyProfile(countyKey);
  const sectorInfo = getSectorInfo(sector);

  const programs = await getProgramsFromDb();
  const filtered = programs.filter(
    (p) =>
      (p.counties.includes(profile.name) || p.counties.includes("Național")) &&
      (!sectorInfo || p.industries.some((ind) => ind.toLowerCase().includes(sector.toLowerCase()) || sectorInfo.name.toLowerCase().includes(ind.toLowerCase())))
  );

  const allSectorsList = getAllSectors().slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Oportunități ${sectorInfo ? sectorInfo.name : sector} în Județul ${profile.name}`,
    "url": `https://subventii.cristianvaduva.com/subventii/${countyKey}/${sector}`,
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
            <Link href={`/subventii/${countyKey}`} className="hover:text-emerald-800">Județul {profile.name}</Link>
            <span>/</span>
            <span className="font-semibold text-slate-900">{sectorInfo ? sectorInfo.name : sector.toUpperCase()}</span>
          </nav>

          <header className="mb-8 rounded-2xl border border-slate-200 bg-slate-900 p-6 md:p-8 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="rounded bg-emerald-800 px-2.5 py-0.5 text-xs font-bold font-mono">
                MATRICE TERITORIALĂ &amp; SECTORIALĂ
              </span>
              <span className="rounded bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-300">
                Județul {profile.name} ({profile.code})
              </span>
            </div>

            <h1 className="mt-2 text-3xl font-black sm:text-4xl leading-tight">
              Subvenții &amp; Finanțări {sectorInfo ? sectorInfo.name : sector.toUpperCase()} — Județul {profile.name}
            </h1>
            <p className="mt-2 text-xs text-slate-300 max-w-3xl leading-relaxed">
              Oportunități specifice pentru exploatațiile din domeniul <strong>{sectorInfo ? sectorInfo.name : sector}</strong> situate în județul {profile.name} ({profile.region}), gestionate prin {profile.apiaCenter.split("—")[0]} și {profile.ojfirCenter.split("—")[0]}.
            </p>

            {sectorInfo && (
              <div className="mt-4 inline-block rounded-xl bg-slate-800/80 p-3 text-xs border border-slate-700 text-emerald-300 font-semibold">
                Sprijin estimativ: {sectorInfo.estimatedSupport}
              </div>
            )}
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {sectorInfo && (
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                  <h2 className="text-base font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                    Prezentare &amp; Condiții Specifice în {profile.name}
                  </h2>
                  <p className="text-xs text-slate-700 leading-relaxed mb-4">
                    {sectorInfo.fullDesc}
                  </p>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <span className="block font-bold text-slate-900 text-xs mb-2">
                      Cerințe Cheie de Eligibilitate:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {sectorInfo.eligibilityHighlights.map((el, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-700 font-bold">✓</span>
                          <span>{el}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <h2 className="text-base font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                  Intervenții &amp; Programe Corespunzătoare ({filtered.length})
                </h2>
                {filtered.length > 0 ? (
                  <div className="space-y-3">
                    {filtered.map((p) => (
                      <div key={p.slug} className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs last:border-0">
                        <div>
                          <strong className="text-slate-900 block text-sm">{p.title}</strong>
                          <span className="text-slate-500">{p.summary}</span>
                        </div>
                        <Link href={`/finantari/${p.slug}`} className="rounded-lg bg-emerald-800 px-3.5 py-1.5 text-white font-bold hover:bg-emerald-900 shrink-0 text-xs">
                          Detalii Apel →
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-600">
                    Toate intervențiile naționale din Planul Strategic PAC sunt aplicabile fermierilor eligibili din județul {profile.name}.
                  </p>
                )}
              </section>

              {sectorInfo && sectorInfo.faqs && (
                <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <h2 className="text-base font-bold text-slate-900 mb-3">
                    Întrebări Frecvente (FAQ) {sectorInfo.name}
                  </h2>
                  <div className="space-y-3 text-xs">
                    {sectorInfo.faqs.map((faq, idx) => (
                      <div key={idx} className="rounded-xl bg-white border border-slate-200 p-4">
                        <strong className="text-slate-900 block font-semibold mb-1">{faq.question}</strong>
                        <p className="text-slate-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs space-y-3">
                <span className="font-bold text-slate-900 block">Autorități în Județul {profile.name}:</span>
                <p className="text-slate-600 font-semibold">{profile.apiaCenter}</p>
                <p className="text-slate-600 font-semibold">{profile.ojfirCenter}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 text-xs">
                <span className="font-bold text-slate-900 block mb-3">Alte Sectoare în {profile.name}:</span>
                <div className="space-y-1.5">
                  {allSectorsList.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/subventii/${countyKey}/${s.slug}`}
                      className="block p-2 rounded-lg bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 font-medium"
                    >
                      {s.name} →
                    </Link>
                  ))}
                </div>
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

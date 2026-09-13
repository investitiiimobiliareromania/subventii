import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { getCountyProfile, getAllCounties } from "@/lib/county-data";
import { getProgramsFromDb } from "@/lib/db/repository";
import { getAllSectors } from "@/lib/sectoare-data";

type Props = {
  params: Promise<{ county: string }>;
};

export async function generateStaticParams() {
  const counties = getAllCounties();
  return counties.map((c) => ({
    county: c.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "-"),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { county } = await params;
  const profile = getCountyProfile(county);

  return {
    title: `Subvenții APIA & Finanțări AFIR — Județul ${profile.name} 2026`,
    description: `Ghidul complet al subvențiilor pe hectar, sprijinului zootehnic, centrelor județene APIA și intervențiilor AFIR pentru Județul ${profile.name} (${profile.region}).`,
    alternates: { canonical: `https://subventii.cristianvaduva.com/subventii/${encodeURIComponent(county.toLowerCase())}` },
  };
}

export default async function CountySubventiiPage({ params }: Props) {
  const { county } = await params;
  const profile = getCountyProfile(county);

  const programs = await getProgramsFromDb();
  const regionalPrograms = programs.filter(
    (p) => p.counties.includes(profile.name) || p.counties.includes("Național")
  );

  const sectors = getAllSectors().slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AdministrativeArea",
    "name": `Județul ${profile.name}`,
    "description": `Informații oficiale privind subvențiile agricole APIA și proiectele AFIR din Județul ${profile.name}`,
    "url": `https://subventii.cristianvaduva.com/subventii/${encodeURIComponent(county.toLowerCase())}`,
    "containedInPlace": {
      "@type": "Country",
      "name": "România",
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav aria-label="Navigare pe pagină" className="mb-6 flex items-center gap-2 text-xs text-slate-600">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span aria-hidden="true">/</span>
            <Link href="/intelligence/regions" className="hover:text-emerald-800">Județe</Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-slate-900">Județul {profile.name}</span>
          </nav>

          {/* Header */}
          <header className="mb-10 rounded-2xl border border-slate-200 bg-slate-900 p-6 md:p-8 text-white">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="rounded bg-emerald-800 px-2.5 py-0.5 text-xs font-bold font-mono">
                JUDEȚUL {profile.name.toUpperCase()} ({profile.code})
              </span>
              <span className="rounded bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-300">
                Regiunea {profile.region}
              </span>
              <span className="rounded bg-emerald-950 px-2.5 py-0.5 text-xs font-bold text-emerald-400 font-mono border border-emerald-800">
                OFICIAL APIA &amp; AFIR
              </span>
            </div>

            <h1 className="mt-2 text-3xl font-black sm:text-4xl leading-tight">
              Subvenții Agricole, APIA &amp; Finanțări AFIR — Județul {profile.name}
            </h1>
            <p className="mt-2 text-xs text-slate-300 max-w-3xl leading-relaxed">
              Profilul agricol și economic detaliat pentru fermierii și companiile din Județul {profile.name}. Suprafață monitorizată: <strong>{profile.agriculturalSurfaceHa}</strong>.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-slate-800 pt-6 text-center text-xs">
              <div>
                <span className="block text-slate-400">Reședință Județ</span>
                <span className="font-bold text-white mt-1 block">{profile.capital}</span>
              </div>
              <div>
                <span className="block text-slate-400">Populație</span>
                <span className="font-bold text-white mt-1 block">{profile.population}</span>
              </div>
              <div>
                <span className="block text-slate-400">Firme Înregistrate</span>
                <span className="font-bold text-emerald-400 mt-1 block">{profile.activeImmCount}</span>
              </div>
              <div>
                <span className="block text-slate-400">Tranzacții ANCPI</span>
                <span className="font-bold text-white mt-1 block">{profile.ancpiMonthlyAvg}</span>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Agricultural Profile & Authorities */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <h2 className="text-base font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                  1. Centrele Oficiale de Depunere în Județul {profile.name}
                </h2>
                <div className="space-y-3 text-xs">
                  <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-800 mb-1">
                      Centrul Județean APIA
                    </span>
                    <strong className="text-slate-900 text-sm block mb-1">{profile.apiaCenter}</strong>
                    <p className="text-slate-600">
                      Gestionarea cererilor unice de plată pe suprafață (BISS, CRISS), eco-schemelor și sprijinului cuplat zootehnic.
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-800 mb-1">
                      Oficiul Județean AFIR (OJFIR)
                    </span>
                    <strong className="text-slate-900 text-sm block mb-1">{profile.ojfirCenter}</strong>
                    <p className="text-slate-600">
                      Depunerea și evaluarea proiectelor europene de investiții FEADR, tineri fermieri (DR-30) și irigații.
                    </p>
                  </div>
                </div>
              </section>

              {/* Local Crops & Livestock */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <h2 className="text-base font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                  2. Structura Producției Agricole &amp; Zootehnice Locale
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <span className="block font-bold text-slate-900 mb-2">🌾 Culturi Dominante:</span>
                    <ul className="space-y-1 text-slate-700">
                      {profile.topCrops.map((c, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="text-emerald-700">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <span className="block font-bold text-slate-900 mb-2">🐄 Zootehnie &amp; Animale:</span>
                    <ul className="space-y-1 text-slate-700">
                      {profile.topLivestock.map((l, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="text-emerald-700">•</span>
                          <span>{l}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Active Programs in this County */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
                  <h2 className="text-base font-bold text-slate-900">
                    3. Subvenții &amp; Intervenții Active în Județul {profile.name} ({regionalPrograms.length})
                  </h2>
                  <span className="text-xs text-slate-500 font-semibold">PAC 2023–2027</span>
                </div>

                <div className="space-y-3">
                  {regionalPrograms.map((p) => (
                    <div key={p.slug} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="rounded bg-slate-900 text-white font-mono px-1.5 py-0.5 text-[9px] font-bold">
                            {p.sourceCategory}
                          </span>
                          <span className="text-emerald-800 font-bold">{p.status}</span>
                        </div>
                        <strong className="text-slate-900 block text-sm">{p.title}</strong>
                        <span className="text-slate-500 line-clamp-1">{p.summary}</span>
                      </div>
                      <Link href={`/finantari/${p.slug}`} className="rounded-lg bg-emerald-800 px-3.5 py-2 text-white font-bold hover:bg-emerald-900 shrink-0 text-xs">
                        Ghid &amp; Aplicare →
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              {/* County-Sector Combinations Matrix */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <h2 className="text-base font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                  4. Ghiduri pe Sectoare în Județul {profile.name}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {sectors.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/subventii/${county.toLowerCase()}/${s.slug}`}
                      className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 hover:bg-emerald-50 hover:border-emerald-300 transition-colors font-medium text-slate-800"
                    >
                      <span className="block font-bold text-slate-900">{s.name.split("&")[0]}</span>
                      <span className="text-[10px] text-emerald-800">Vezi oportunități →</span>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Local FAQ */}
              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-base font-bold text-slate-900 mb-3">
                  5. Întrebări Frecvente (FAQ) — Subvenții Județul {profile.name}
                </h2>
                <div className="space-y-3 text-xs text-slate-700">
                  {profile.localFaqs.map((faq, idx) => (
                    <div key={idx} className="rounded-xl bg-white border border-slate-200 p-4">
                      <strong className="text-slate-900 block font-semibold mb-1">{faq.question}</strong>
                      <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              {/* Regional Incentives Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Facilități Regionale {profile.adrName}
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {profile.keyIncentives.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold">✓</span>
                      <span className="leading-relaxed">{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Free Eligibility Assessment Card */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6">
                <h3 className="text-xs font-bold text-emerald-950 mb-2">Calculator Eligibilitate Subvenții</h3>
                <p className="text-xs text-emerald-900 mb-4 leading-relaxed">
                  Verifică în 2 minute dacă exploatația ta agricolă din județul {profile.name} se califică pentru BISS, CRISS, Sprijin Cuplat sau măsura DR-30 Tineri Fermieri.
                </p>
                <Link
                  href="/eligibilitate"
                  className="block text-center rounded-xl bg-emerald-800 py-3 text-xs font-bold text-white hover:bg-emerald-900 shadow-xs"
                >
                  Verifică Eligibilitatea Fermei →
                </Link>
              </div>

              {/* Quick Links */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs space-y-2">
                <span className="font-bold text-slate-900 block mb-2">Linkuri Utile:</span>
                <Link href="/calendar" className="block text-slate-700 hover:text-emerald-800">
                  📅 Calendarul depunerilor APIA 2026
                </Link>
                <Link href="/resurse" className="block text-slate-700 hover:text-emerald-800">
                  📥 Adeverință Registrul Agricol (DOCX)
                </Link>
                <Link href="/legislatie" className="block text-slate-700 hover:text-emerald-800">
                  📜 Ordinul MADR 80/2023 complet
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

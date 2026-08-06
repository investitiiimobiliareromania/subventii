import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { countyProfilesCatalog } from "@/lib/county-data";
import { getProgramsFromDb } from "@/lib/db/repository";

type Props = {
  params: Promise<{ county: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { county } = await params;
  const key = county.toLowerCase();
  const profile = countyProfilesCatalog[key];
  const name = profile ? profile.name : county.toUpperCase();

  return {
    title: `Subvenții & Fonduri Nerambursabile Județul ${name} 2026`,
    description: `Descoperă toate finanțările nerambursabile, granturile ADR și ajutoarele de stat disponibile pentru firmele și persoanele din județul ${name}.`,
    alternates: { canonical: `https://subventii.ro/subventii/${key}` },
  };
}

export default async function CountySubventiiPage({ params }: Props) {
  const { county } = await params;
  const key = county.toLowerCase();
  const profile = countyProfilesCatalog[key] || {
    code: county.substring(0, 2).toUpperCase(),
    name: county.charAt(0).toUpperCase() + county.slice(1),
    region: "Național",
    capital: "Capitală de Județ",
    population: "Sute de mii de locuitori",
    activeImmCount: "Zeci de mii de firme",
    adrName: "Agenția pentru Dezvoltare Regională",
    topIndustries: ["Servicii", "Comerț", "Producție"],
    keyIncentives: ["Granturi regionale", "Start-Up Nation"],
    ancpiMonthlyAvg: "Peste 1.000 tranzacții",
  };

  const programs = await getProgramsFromDb();
  const regionalPrograms = programs.filter(
    (p) => p.counties.includes(profile.name) || p.counties.includes("Național")
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    "name": `Programul de Subvenții și Granturi Județul ${profile.name}`,
    "provider": {
      "@type": "GovernmentOrganization",
      "name": profile.adrName,
    },
    "areaServed": profile.name,
    "url": `https://subventii.ro/subventii/${key}`,
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <Link href="/intelligence/regions" className="hover:text-emerald-800">Regiuni</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Subvenții {profile.name}</span>
          </nav>

          <header className="mb-10 rounded-2xl border border-slate-200 bg-slate-900 p-6 md:p-8 text-white">
            <span className="rounded bg-emerald-800 px-2.5 py-0.5 text-xs font-bold font-mono">
              JUDEȚUL {profile.name.toUpperCase()} ({profile.code})
            </span>
            <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl leading-tight">
              Subvenții și Granturi Deschise în Județul {profile.name}
            </h1>
            <p className="mt-2 text-xs text-slate-300 max-w-3xl leading-relaxed">
              Platformă programatică de indexare a fondurilor europene și locale administrate prin {profile.adrName}.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Programe Nerambursabile Active ({regionalPrograms.length})</h2>
                <div className="space-y-4">
                  {regionalPrograms.map((p) => (
                    <div key={p.slug} className="border-b border-slate-100 pb-3 flex justify-between items-start text-xs">
                      <div>
                        <strong className="text-slate-900 block text-sm">{p.title}</strong>
                        <span className="text-slate-500">{p.summary}</span>
                      </div>
                      <Link href={`/finantari/${p.slug}`} className="rounded bg-emerald-50 px-3 py-1 text-emerald-800 font-bold hover:bg-emerald-100 shrink-0">
                        Vezi Apel →
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ Section */}
              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-base font-bold text-slate-900 mb-3">Întrebări Frecvente (FAQ) Subvenții {profile.name}</h2>
                <div className="space-y-3 text-xs text-slate-700">
                  <div>
                    <strong className="text-slate-900 block font-semibold">Unde se depun dosarele în județul {profile.name}?</strong>
                    <p className="text-slate-600 mt-1">Dosarele se depun online prin platformele oficiale MIPE / AFIR / AFM sau prin intermediul sediului regional {profile.adrName}.</p>
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Care este valoarea maximă a sprijinului nerambursabil?</strong>
                    <p className="text-slate-600 mt-1">Gama de granturi variază de la 200.000 RON (Start-Up Nation) până la 2.000.000 EUR pentru proiecte mari de dezvoltare industrială.</p>
                  </div>
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-emerald-50 p-6">
                <h3 className="text-xs font-bold text-emerald-900 mb-2">Evaluare Eligibilitate Gratuită</h3>
                <p className="text-xs text-emerald-800 mb-4">Verifică dacă firma ta din județul {profile.name} îndeplinește condițiile de calificare.</p>
                <Link href="/eligibilitate" className="block text-center rounded-lg bg-emerald-800 py-2.5 text-xs font-bold text-white hover:bg-emerald-900">
                  Începe Evaluarea →
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

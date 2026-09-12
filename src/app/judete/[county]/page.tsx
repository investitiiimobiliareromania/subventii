import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { getCountyProfile } from "@/lib/county-data";

type Props = {
  params: Promise<{ county: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { county } = await params;
  const profile = getCountyProfile(county);

  return {
    title: `Finanțări Nerambursabile & Oportunități — Județul ${profile.name} 2026`,
    description: `Ghidul fondurilor europene, granturilor locale, facilităților fiscale și datelor ANCPI pentru firmele din Județul ${profile.name}.`,
    alternates: { canonical: `https://subventii.cristianvaduva.com/judete/${encodeURIComponent(county.toLowerCase())}` },
  };
}

export default async function CountyIntelligencePage({ params }: Props) {
  const { county } = await params;
  const profile = getCountyProfile(county);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AdministrativeArea",
    "name": `Județul ${profile.name}`,
    "url": `https://subventii.cristianvaduva.com/judete/${encodeURIComponent(county.toLowerCase())}`,
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <nav aria-label="Navigare pe pagină" className="mb-6 flex items-center gap-2 text-xs text-slate-600">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span aria-hidden="true">/</span>
            <Link href="/programes" className="hover:text-emerald-800">Județe</Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-slate-900">Județul {profile.name}</span>
          </nav>

          <header className="mb-10 rounded-2xl border border-slate-200 bg-slate-900 p-6 md:p-8 text-white">
            <div className="flex items-center gap-3 mb-3">
              <span className="rounded bg-emerald-800 px-2.5 py-0.5 text-xs font-bold font-mono">
                {profile.code}
              </span>
              <span className="text-xs text-slate-300 font-semibold">{profile.region}</span>
            </div>
            <h1 className="text-3xl font-extrabold sm:text-4xl leading-tight">
              Inteligență Economică &amp; Subvenții — Județul {profile.name}
            </h1>
            <p className="mt-3 text-xs text-slate-300 max-w-3xl leading-relaxed">
              Oportunități de finanțare nerambursabilă, ajutoare regionale alocate de {profile.adrName} și indicatori imobiliari ANCPI.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-slate-800 pt-6 text-center text-xs">
              <div>
                <span className="block text-slate-400">Reședință</span>
                <span className="font-bold text-white mt-1 block">{profile.capital}</span>
              </div>
              <div>
                <span className="block text-slate-400">Populație</span>
                <span className="font-bold text-white mt-1 block">{profile.population}</span>
              </div>
              <div>
                <span className="block text-slate-400">Firme Active</span>
                <span className="font-bold text-emerald-400 mt-1 block">{profile.activeImmCount}</span>
              </div>
              <div>
                <span className="block text-slate-400">Tranzacții ANCPI</span>
                <span className="font-bold text-white mt-1 block">{profile.ancpiMonthlyAvg}</span>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <section className="rounded-xl border border-slate-200 p-6 bg-slate-50">
                <h2 className="text-lg font-bold text-slate-900 mb-3">Domenii Economice Cheie în {profile.name}</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.topIndustries.map((ind, i) => (
                    <span key={i} className="rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-800">
                      🏢 {ind}
                    </span>
                  ))}
                </div>
              </section>

              <section className="rounded-xl border border-slate-200 p-6 bg-white space-y-3">
                <h2 className="text-lg font-bold text-slate-900 mb-2">Facilități & Oportunități Regionale</h2>
                {profile.keyIncentives.map((inc, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>{inc}</span>
                  </div>
                ))}
              </section>
            </div>

            <aside className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-emerald-50/70 p-5">
                <h3 className="text-xs font-bold text-emerald-900 mb-2">Căutare Programe după Județ</h3>
                <p className="text-xs text-emerald-800 mb-4">Filtrează toate granturile deschise pentru IMM-urile din județul {profile.name}.</p>
                <Link href={`/programes?county=${profile.name}`} className="block text-center rounded-lg bg-emerald-800 py-2.5 text-xs font-bold text-white hover:bg-emerald-900">
                  Filtrează Programe {profile.name} →
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

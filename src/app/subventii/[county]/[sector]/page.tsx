import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { countyProfilesCatalog } from "@/lib/county-data";
import { getProgramsFromDb } from "@/lib/db/repository";

type Props = {
  params: Promise<{ county: string; sector: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { county, sector } = await params;
  const countyKey = county.toLowerCase();
  const profile = countyProfilesCatalog[countyKey];
  const countyName = profile ? profile.name : county.toUpperCase();
  const sectorUpper = sector.toUpperCase();

  return {
    title: `Finanțări ${sectorUpper} Județul ${countyName} 2026`,
    description: `Sinteză educațională a fondurilor și oportunităților de dezvoltare pentru sectorul ${sectorUpper} în Județul ${countyName}.`,
    alternates: { canonical: `https://subventii.cristianvaduva.com/subventii/${countyKey}/${sector}` },
  };
}

export default async function CountySectorMatrixPage({ params }: Props) {
  const { county, sector } = await params;
  const countyKey = county.toLowerCase();
  const profile = countyProfilesCatalog[countyKey] || {
    name: county.charAt(0).toUpperCase() + county.slice(1),
    adrName: "Agenția pentru Dezvoltare Regională",
  };

  const programs = await getProgramsFromDb();
  const filtered = programs.filter(
    (p) => p.counties.includes(profile.name) || p.counties.includes("Național")
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Oportunități ${sector.toUpperCase()} Județul ${profile.name}`,
    "url": `https://subventii.cristianvaduva.com/subventii/${countyKey}/${sector}`,
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
            <Link href={`/subventii/${countyKey}`} className="hover:text-emerald-800">Județul {profile.name}</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Sector {sector.toUpperCase()}</span>
          </nav>

          <header className="mb-8 rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white">
            <span className="rounded bg-emerald-800 px-2.5 py-0.5 text-xs font-bold font-mono">
              MATRICE TERRITORIALĂ SECTORIALĂ
            </span>
            <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl leading-tight">
              Granturi & Subvenții {sector.toUpperCase()} în Județul {profile.name}
            </h1>
            <p className="mt-2 text-xs text-slate-300 max-w-3xl leading-relaxed">
              Oportunități specifice pentru firmele din domeniul {sector.toUpperCase()} situate în regiunea administrată de {profile.adrName}.
            </p>
          </header>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs mb-8">
            <h2 className="text-base font-bold text-slate-900 mb-4">Programe Nerambursabile Corespunzătoare ({filtered.length})</h2>
            <div className="space-y-4">
              {filtered.map((p) => (
                <div key={p.slug} className="border-b border-slate-100 pb-3 flex justify-between items-start text-xs">
                  <div>
                    <strong className="text-slate-900 block text-sm">{p.title}</strong>
                    <span className="text-slate-500">{p.summary}</span>
                  </div>
                  <Link href={`/finantari/${p.slug}`} className="rounded bg-emerald-800 px-3 py-1 text-white font-bold hover:bg-emerald-900 shrink-0">
                    Detalii Apel →
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <AiAssistantDrawer />
      <Footer />
    </div>
  );
}

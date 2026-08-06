import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FundingCard } from "@/components/funding-explorer";
import { getProgramsFromDb } from "@/lib/db/repository";

type Props = {
  params: Promise<{ sector: string }>;
};

const SECTOR_METADATA: Record<string, { name: string; desc: string; keywords: string[] }> = {
  agricultura: { name: "Agricultură & Dezvoltare Rurală", desc: "Granturi FEADR, sprijin tineri fermieri, achiziții de utilaje agricole și ferme de familie.", keywords: ["agricultura", "utilaje", "ferma"] },
  it: { name: "IT, Tehnologie & Digitalizare", desc: "Finanțări PNRR pentru inovare software, securitate cibernetică și echipamente digitale.", keywords: ["it", "software", "digitalizare"] },
  productie: { name: "Producție Industrială & Microindustrializare", desc: "Sprijin pentru dotare fabrici, linii de producție, eficiență energetică și panouri fotovoltaice.", keywords: ["productie", "fabrica", "industrie"] },
  constructii: { name: "Construcții & Eficiență Energetică", desc: "Finanțare materiale sustenabile, reabilitare termică clădiri și dotare șantiere.", keywords: ["constructii", "reabilitare", "cladiri"] },
  horeca: { name: "Turism, HoReCa & Servicii Alimentare", desc: "Granturi pentru modernizare unități de cazare, restaurante și facilități turistice.", keywords: ["turism", "horeca", "restaurante"] },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sector } = await params;
  const info = SECTOR_METADATA[sector.toLowerCase()] || { name: sector.toUpperCase(), desc: `Ghidul complet al fondurilor nerambursabile din domeniul ${sector}.` };

  return {
    title: `Finanțări Nerambursabile Sectorul ${info.name} 2026`,
    description: info.desc,
    alternates: { canonical: `https://subventii.ro/sectoare/${sector}` },
  };
}

export default async function SectorFundingPage({ params }: Props) {
  const { sector } = await params;
  const key = sector.toLowerCase();
  const info = SECTOR_METADATA[key] || { name: sector.toUpperCase(), desc: `Ghidul complet al fondurilor nerambursabile din domeniul ${sector}.` };

  const allPrograms = await getProgramsFromDb();
  const filtered = allPrograms.filter((p) => {
    if (key === "agricultura") return p.industries.includes("Agricultură");
    if (key === "it") return p.industries.includes("IT & digital");
    if (key === "productie") return p.industries.includes("Producție");
    if (key === "constructii") return p.industries.includes("Construcții");
    if (key === "horeca") return p.industries.includes("Turism / HoReCa");
    return true;
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Finanțări Sectorul ${info.name}`,
    "description": info.desc,
    "url": `https://subventii.ro/sectoare/${key}`,
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
            <Link href="/intelligence/funding" className="hover:text-emerald-800">Finanțări</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">{info.name}</span>
          </nav>

          <header className="mb-8 border-b border-slate-200 pb-6">
            <span className="rounded bg-slate-900 px-2 py-0.5 text-xs font-bold text-white mb-2 inline-block">
              SECTOR ECONOMIC: {info.name.toUpperCase()}
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Fonduri Nerambursabile Sectorul {info.name}
            </h1>
            <p className="mt-2 text-xs text-slate-600 max-w-3xl leading-relaxed">{info.desc}</p>
          </header>

          <div className="mb-6">
            <h2 className="text-base font-bold text-slate-900 mb-3">Apeluri Deschise & În Curând ({filtered.length})</h2>
            <div className="card-grid">
              {filtered.map((program) => (
                <FundingCard key={program.slug} program={program} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

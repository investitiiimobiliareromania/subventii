import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FundingCard } from "@/components/funding-explorer";
import { getProgramsFromDb } from "@/lib/db/repository";
import { filterOptions } from "@/lib/funding-data";

type Props = {
  params: Promise<{ county: string }>;
};

const formatCountyName = (slug: string) => {
  const match = filterOptions.county.find(
    (c) => c.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === slug.toLowerCase()
  );
  return match || slug.charAt(0).toUpperCase() + slug.slice(1);
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { county } = await params;
  const countyName = formatCountyName(county);
  const title = `Subvenții și Fonduri Nerambursabile ${countyName} 2026 | Subvenții.ro`;
  const description = `Găsește programe de finanțare publică, PNRR și sprijin IMM disponibile pentru firme din județul ${countyName}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://subventii.ro/subventii/${county}`,
    },
  };
}

export default async function CountySeoPage({ params }: Props) {
  const { county } = await params;
  const countyName = formatCountyName(county);

  const allPrograms = await getProgramsFromDb();
  const matchedPrograms = allPrograms.filter(
    (p) =>
      p.counties.includes(countyName) ||
      p.counties.includes("Național")
  );

  if (!countyName) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <Link href="/programes" className="hover:text-emerald-800">Finanțări</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Județul {countyName}</span>
          </nav>

          <div className="mb-8 border-b border-slate-200 pb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              Acoperire Regională & Națională
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Subvenții și Oportunități de Finanțare în Județul {countyName}
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Catalog actualizat de fonduri europene, PNRR și subvenții naționale disponibile pentru întreprinderile înregistrate în {countyName}.
            </p>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600">
              Rezultate: <strong className="text-slate-900">{matchedPrograms.length}</strong> programe eligibile
            </p>
          </div>

          <div className="card-grid">
            {matchedPrograms.map((program) => (
              <FundingCard key={program.slug} program={program} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

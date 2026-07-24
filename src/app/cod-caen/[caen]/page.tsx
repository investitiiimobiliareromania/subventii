import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FundingCard } from "@/components/funding-explorer";
import { getProgramsFromDb } from "@/lib/db/repository";

type Props = {
  params: Promise<{ caen: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { caen } = await params;
  const title = `Finanțări Nerambursabile Cod CAEN ${caen} | Subvenții.ro`;
  const description = `Descoperă subvențiile și granturile oficiale din România eligibile pentru companiile cu activitate în Codul CAEN ${caen}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://subventii.ro/cod-caen/${caen}`,
    },
  };
}

export default async function CaenSeoPage({ params }: Props) {
  const { caen } = await params;
  const allPrograms = await getProgramsFromDb();

  const matchedPrograms = allPrograms.filter(
    (p) =>
      caen === "6201"
        ? p.industries.includes("IT & digital")
        : caen === "0111"
        ? p.industries.includes("Agricultură")
        : true
  );

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
            <span className="font-semibold text-slate-800">Cod CAEN {caen}</span>
          </nav>

          <div className="mb-8 border-b border-slate-200 pb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              Clasificare Activități Economice (CAEN REV 2)
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Finanțări Nerambursabile Eligibile pentru Cod CAEN {caen}
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Oportunități oficiale de finanțare, granturi pentru echipamente și adoptare tehnologică valabile pentru firmele care desfășoară activități în clasa CAEN {caen}.
            </p>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600">
              Rezultate: <strong className="text-slate-900">{matchedPrograms.length}</strong> programe identificate
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

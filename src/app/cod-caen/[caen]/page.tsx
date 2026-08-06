import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FundingCard } from "@/components/funding-explorer";
import { getProgramsFromDb, getLegislativeChangesFromDb } from "@/lib/db/repository";
import { institutionsCatalog } from "@/lib/institutii-data";

type Props = {
  params: Promise<{ caen: string }>;
};

const CAEN_TITLES: Record<string, { title: string; desc: string; sector: string }> = {
  "6201": { title: "Activități de realizare a software-ului la comandă", desc: "Dezvoltare aplicații, sisteme informatice, soluții cloud și programare IT.", sector: "it" },
  "0111": { title: "Cultivarea cerealelor, plantelor leguminoase și a plantelor producătoare de semințe oleaginoase", desc: "Exploatații agricole, ferme de cultura mare, grâu, porumb, floarea-soarelui.", sector: "agricultura" },
  "5610": { title: "Restaurante și activități de servicii de alimentație mobilă", desc: "HoReCa, restaurante, unități catering, servire alimentară.", sector: "horeca" },
  "4120": { title: "Lucrări de construcții a clădirilor rezidențiale și nerezidențiale", desc: "Construcții civile, edificare ansambluri rezidențiale și hală industrială.", sector: "constructii" },
  "1011": { title: "Prelucrarea și conservarea cărnii", desc: "Producție alimentară, abatoare, procesare carne și mezeluri.", sector: "productie" },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { caen } = await params;
  const info = CAEN_TITLES[caen] || { title: `Activități economice Clasa ${caen}`, desc: `Granturi și sprijin nerambursabil pentru codul CAEN ${caen}.`, sector: "general" };

  return {
    title: `Subvenții & Granturi Cod CAEN ${caen} — ${info.title} 2026`,
    description: `Ghidul complet de finanțare nerambursabilă pentru Codul CAEN ${caen} (${info.title}). Vezi ghidul solicitantului și granturile active.`,
    alternates: { canonical: `https://subventii.ro/cod-caen/${caen}` },
  };
}

export default async function CaenSeoPage({ params }: Props) {
  const { caen } = await params;
  const info = CAEN_TITLES[caen] || { title: `Activități economice Clasa ${caen}`, desc: `Granturi și sprijin nerambursabil pentru codul CAEN ${caen}.`, sector: "general" };
  const allPrograms = await getProgramsFromDb();
  const legislation = await getLegislativeChangesFromDb();

  const matchedPrograms = allPrograms.filter(
    (p) =>
      caen === "6201"
        ? p.industries.includes("IT & digital")
        : caen === "0111"
        ? p.industries.includes("Agricultură")
        : true
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    "name": `Finanțări Nerambursabile Cod CAEN ${caen}`,
    "description": info.desc,
    "url": `https://subventii.ro/cod-caen/${caen}`,
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
            <Link href="/intelligence" className="hover:text-emerald-800">Intelligence</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Cod CAEN {caen}</span>
          </nav>

          <header className="mb-8 border-b border-slate-200 pb-6">
            <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-900 mb-2 inline-block">
              Clasificare CAEN Rev. 2 — Clasa {caen}
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Finanțări Nerambursabile & Subvenții Cod CAEN {caen}
            </h1>
            <p className="mt-2 text-sm text-slate-600 font-semibold">{info.title}</p>
            <p className="mt-1 text-xs text-slate-500 max-w-3xl leading-relaxed">{info.desc}</p>
          </header>

          {/* Program Grid */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Programe Nerambursabile Eligibile ({matchedPrograms.length})</h2>
            <div className="card-grid">
              {matchedPrograms.map((program) => (
                <FundingCard key={program.slug} program={program} />
              ))}
            </div>
          </section>

          {/* Relevant Authorities & Internal Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Instituții de Management Relevante</h3>
              <div className="space-y-2 text-xs">
                {institutionsCatalog.slice(0, 3).map((inst) => (
                  <div key={inst.slug} className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="font-bold text-slate-900">{inst.name} ({inst.acronym})</span>
                    <Link href={`/institutii/${inst.slug}`} className="text-emerald-800 font-semibold hover:underline">
                      Profil →
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Acte Normative Conexe</h3>
              <div className="space-y-2 text-xs text-slate-700">
                {legislation.slice(0, 2).map((leg) => (
                  <div key={leg.slug} className="border-b border-slate-200 pb-2">
                    <strong className="text-slate-900">{leg.actType} {leg.actNumber}</strong> — {leg.summary}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* FAQ Section */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4">Întrebări Frecvente (FAQ) Cod CAEN {caen}</h3>
            <div className="space-y-4 text-xs text-slate-700">
              <div>
                <strong className="text-slate-900 font-bold text-sm block mb-1">Poate o firmă nouă depune proiect pe CAEN {caen}?</strong>
                <p className="text-slate-600 leading-relaxed">Da, prin programe precum Start-Up Nation 2026 sau ajutoare de minimis regionale, cu condiția ca activitatea să fie autorizată la momentul depunerii sau decontului.</p>
              </div>
              <div>
                <strong className="text-slate-900 font-bold text-sm block mb-1">Care este procentul maxim de finanțare nerambursabilă?</strong>
                <p className="text-slate-600 leading-relaxed">Intensitatea sprijinului variază între 90% necomutabil (Start-Up Nation / PNRR) și 50%-75% pentru ajutoare regionale de stat.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

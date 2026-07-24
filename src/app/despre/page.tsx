import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Despre Subvenții.ro și Surse Oficiale",
  description: "Descoperă modul în care Subvenții.ro colectează și organizează datele oficiale de finanțare din România.",
  alternates: {
    canonical: "https://subventii.ro/despre",
  },
};

export default function DesprePage() {
  const officialSources = [
    {
      name: "Ministerul Investițiilor și Proiectelor Europene (MIPE)",
      url: "https://mfe.gov.ro/",
      desc: "Fonduri Coeziune, PNRR, Programul Sănătate, Programul Educație și Ocupare.",
    },
    {
      name: "Ministerul Economiei, Antreprenoriatului și Turismului",
      url: "https://economie.gov.ro/",
      desc: "Start-Up Nation, Comerț și Servicii, Scheme de Minimis pentru IMM-uri.",
    },
    {
      name: "Agenția pentru Finanțarea Investițiilor Rurale (AFIR)",
      url: "https://www.afir.ro/",
      desc: "Sprijin pentru ferme, tineri fermieri, infrastructură rurală și procesare alimentară.",
    },
    {
      name: "Administrația Fondului pentru Mediu (AFM)",
      url: "https://www.afm.ro/",
      desc: "Eficiență energetică, panouri fotovoltaice, reciclare și proiecte verzi.",
    },
    {
      name: "Agențiile de Dezvoltare Regională (ADR NV, ADR Centru, ADR Vest, ADR Sud-Muntenia, etc.)",
      url: "https://www.nord-vest.ro/",
      desc: "Programul Regional 2021-2027 pentru digitalizare, inovare și cercetare locală.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Transparență și Date Publice
            </span>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Despre Subvenții.ro
            </h1>
            <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Subvenții.ro este un portal independent conceput pentru a oferi antreprenorilor din România acces rapid, gratuit și nefiltrat la oportunitățile de finanțare nerambursabilă.
            </p>
          </div>

          {/* Key Commitments */}
          <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
              <h2 className="text-base font-bold text-slate-900 mb-2">Fără Cont sau Abonament</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Platforma este și va rămâne 100% gratuită în versiunea sa actuală. Nu colectăm date personale și nu condiționăm accesul de crearea unui cont.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
              <h2 className="text-base font-bold text-slate-900 mb-2">Exclusiv Date Oficiale</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fiecare program listat pe Subvenții.ro conține doar informații extrase din documentele publice ale autorităților finanțatoare.
              </p>
            </div>
          </div>

          {/* Official Sources List */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">
              Surse Publice de Monitorizare
            </h2>
            <div className="space-y-4">
              {officialSources.map((source, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-bold text-slate-900">{source.name}</h3>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-emerald-800 hover:underline"
                    >
                      Vizitează site ↗
                    </a>
                  </div>
                  <p className="text-xs text-slate-600">{source.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-4">
            <Link
              href="/programes"
              className="inline-flex items-center rounded-lg bg-emerald-800 px-6 py-3 text-xs font-bold text-white hover:bg-emerald-900"
            >
              Explorează Finanțările Disponibile →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

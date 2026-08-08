import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Despre AiX — Educational Intelligence",
  description: "Descoperă scopul educațional al platformei private AiX Educational Intelligence.",
  alternates: {
    canonical: "https://subventii.cristianvaduva.com/despre",
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
              Platformă Privată de Educație &amp; Informare
            </span>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Despre AiX — Educational Intelligence
            </h1>
            <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
              O platformă privată de educație și informare concepută pentru a ajuta antreprenorii și profesioniștii să înțeleagă mai ușor informațiile publice privind finanțarea, programele economice și dezvoltarea afacerilor.
            </p>
          </div>

          {/* Key Commitments & Legal Disclaimer */}
          <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
              <h2 className="text-base font-bold text-slate-900 mb-2">Platformă Privată și Independentă</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                AiX nu este o instituție publică și nu este afiliat, administrat, sponsorizat sau aprobat de o autoritate guvernamentală, minister sau bancă de stat.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
              <h2 className="text-base font-bold text-slate-900 mb-2">Conținut Informativ și Educațional</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Centralizăm și explicăm informații publice din surse deschise. Materialele au caracter general și nu reprezintă consultanță juridică sau fiscală.
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

          {/* Founder & Direct Contact */}
          <div className="mb-12 rounded-xl border border-emerald-200 bg-emerald-50/40 p-6 text-xs text-slate-700 leading-relaxed">
            <h2 className="text-sm font-bold text-slate-900 mb-2">Platformă Integrată de Cristian Văduva</h2>
            <p className="mb-3">
              AiX Educational Intelligence face parte din ecosistemul privat de soluții tehnologice, financiare și imobiliare dezvoltate de Cristian Văduva.
            </p>
            <div className="flex flex-wrap gap-4 font-semibold text-emerald-800">
              <a href="/contact" className="hover:underline">Formular Contact & Consultanță →</a>
              <a href="https://wa.me/436509536345" target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp (+43 650 953 6345) →</a>
              <a href="tel:+40767110439" className="hover:underline">Telefon RO (0767 110 439) →</a>
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

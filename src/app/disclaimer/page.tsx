import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CONTACT_CONFIG } from "@/lib/contact/config";

export const metadata: Metadata = {
  title: "Disclaimer & Notă Legală de Exonerare | AiX Educational Intelligence",
  description: "Declarație privind natura educațională și informativă a platformei private AiX Educational Intelligence.",
  alternates: { canonical: "https://subventii.cristianvaduva.com/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <nav aria-label="Navigare pe pagină" className="mb-6 flex items-center gap-2 text-xs text-slate-600">
            <Link href="/" className="hover:text-emerald-800 transition-colors">Acasă</Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-slate-900">Disclaimer</span>
          </nav>

          <header className="mb-8 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded">
              DECLARAȚIE DE CLARITATE INSTITUȚIONALĂ &amp; LIMITARE
            </span>
            <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Disclaimer &amp; Statut Editorial
            </h1>
            <p className="mt-2 text-xs text-slate-600">
              Ultima actualizare: Septembrie 2026
            </p>
          </header>

          <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
            <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/80 p-6">
              <h2 className="text-base font-bold text-amber-950 mb-2">
                Declarație Fundamentală de Neafiliere Guvernamentală
              </h2>
              <p className="text-amber-900 font-medium">
                <strong>Subvenții / AiX — Educational Intelligence</strong> este o platformă privată de educație și informare economică. 
                Platforma <strong>NU este o instituție publică</strong> și <strong>NU reprezintă</strong> Ministerul Investițiilor și Proiectelor Europene (MIPE), Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI), Administrația Fondului pentru Mediu (AFM), Agenția pentru Finanțarea Investițiilor Rurale (AFIR), Banca Națională a României (BNR), Agenția Națională de Administrare Fiscală (ANAF) sau orice altă autoritate publică centrală ori locală.
              </p>
            </div>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                1. Natura Informațiilor Prezentate
              </h2>
              <p>
                Informațiile publicate pe acest site au un caracter strict general, educativ și orientativ. Datele sunt sintetizate pe baza documentelor publice disponibile la data redactării (ghiduri ale solicitantului, acte normative, rapoarte statistice și comunicate de presă oficiale).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                2. Absența Consultanței Juridice, Fiscale sau Financiare
              </h2>
              <p>
                Niciun material de pe această platformă nu trebuie interpretat ca o consultanță juridică, fiscală, de audit sau de management al fondurilor nerambursabile. Pentru decizii de natură economică, aplicarea la granturi sau interpretarea legislației fiscale, recomandăm apelarea la experți autorizați (avocați, consultanți certificați, experți contabili).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                3. Responsabilitatea Verificării Surselor Oficiale
              </h2>
              <p>
                Deoarece calendarele de depunere, alocările bugetare, criteriile de eligibilitate și grilele de evaluare pot fi modificate prin ordine de ministru, decizii sau erate oficiale, utilizatorii au obligația expresă de a verifica permanent documentația oficială direct pe portalurile instituțiilor emitente, indicate ca sursă primară în cadrul fiecărui articol și fișă de program.
              </p>
            </section>

            <section className="border-t border-slate-200 pt-6">
              <h2 className="text-base font-bold text-slate-900 mb-2">
                4. Contact și Sesizări
              </h2>
              <p>
                Dacă identificați orice neconcordanță între sintezele noastre și cele mai recente documente oficiale publicate, vă rugăm să ne semnalați la adresa de email: <strong>{CONTACT_CONFIG.email}</strong> în vederea actualizării prompte.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

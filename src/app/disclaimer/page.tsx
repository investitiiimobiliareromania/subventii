import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CONTACT_CONFIG } from "@/lib/contact/config";

export const metadata: Metadata = {
  title: "Disclaimer & Notă Legală de Exonerare | SUBVENȚII România",
  description: "Declarație privind natura informativă a platformei SUBVENȚII România.",
  alternates: { canonical: "https://subventii.cristianvaduva.com/disclaimer" },
};

export default function DisclaimerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Disclaimer SUBVENȚII România",
    "url": "https://subventii.cristianvaduva.com/disclaimer",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Disclaimer &amp; Statut Legal</span>
          </nav>

          <header className="mb-8 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Transparență &amp; Responsabilitate</span>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Disclaimer &amp; Statutul Informațiilor
            </h1>
            <p className="mt-2 text-xs text-slate-500">Ultima actualizare: 1 iulie 2026</p>
          </header>

          <div className="prose prose-slate max-w-none text-xs leading-relaxed space-y-6 text-slate-700">
            <section className="rounded-xl border border-amber-200 bg-amber-50/70 p-5">
              <h2 className="text-sm font-bold text-amber-950 mb-2">1. Statutul Platformei</h2>
              <p>
                <strong>SUBVENȚII România</strong> este o platformă independentă de informare, sinteză și orientare agricolă. 
                Platforma <strong>nu este afiliată</strong> Agenției de Plăți și Intervenție pentru Agricultură (APIA), Agenției pentru Finanțarea Investițiilor Rurale (AFIR), Ministerului Agriculturii și Dezvoltării Rurale (MADR) sau oricărei alte instituții guvernamentale.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                2. Natura Informațiilor Prezentate
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

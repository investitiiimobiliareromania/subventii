import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CONTACT_CONFIG } from "@/lib/contact/config";

export const metadata: Metadata = {
  title: "Politica de Confidențialitate | AiX Educational Intelligence",
  description: "Politica privind prelucrarea și protecția datelor cu caracter personal conform Regulamentului (UE) 2016/679 (GDPR).",
  alternates: { canonical: "https://subventii.cristianvaduva.com/politica-de-confidentialitate" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <nav aria-label="Navigare pe pagină" className="mb-6 flex items-center gap-2 text-xs text-slate-600">
            <Link href="/" className="hover:text-emerald-800 transition-colors">Acasă</Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-slate-900">Politica de Confidențialitate</span>
          </nav>

          <header className="mb-8 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              PROTECȚIA DATELOR CU CARACTER PERSONAL (GDPR)
            </span>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Politica de Confidențialitate
            </h1>
            <p className="mt-2 text-xs text-slate-600">
              Ultima actualizare: Septembrie 2026 • Conform Regulamentului (UE) 2016/679 • Politica descrie comportamentul tehnic identificat la momentul auditului.
            </p>
          </header>

          <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
            <section className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-base font-bold text-slate-900 mb-2">
                1. Operatorul de Date și Date de Contact
              </h2>
              <p>
                Platforma privată <strong>AiX — Educational Intelligence</strong> (<code>subventii.cristianvaduva.com</code>) prelucrează datele cu caracter personal cu respectarea strictă a principiilor de legalitate, echitate, transparență și minimizare a datelor prevăzute de Regulamentul General privind Protecția Datelor (GDPR).
              </p>
              <p className="mt-2">
                Pentru orice solicitare legată de datele dumneavoastră cu caracter personal, ne puteți contacta direct la: <strong>{CONTACT_CONFIG.email}</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                2. Categorii de Date Prelucrate
              </h2>
              <p className="mb-2">
                Prelucrăm doar datele furnizate voluntar de către dumneavoastră prin intermediul formularului de contact sau al comunicării directe:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs">
                <li><strong>Date de identificare și contact:</strong> nume, prenume, adresă de email, număr de telefon.</li>
                <li><strong>Date profesionale/economice:</strong> denumirea companiei, județul de implementare, codul CAEN vizat, tipul de finanțare solicitat și mesajul transmis.</li>
                <li><strong>Date de navigare locală:</strong> preferințele de salvare a programelor sunt stocate exclusiv local în browserul dumneavoastră (<code>localStorage</code>) și nu sunt colectate pe serverele noastre.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                3. Scopurile și Temeiurile Juridice ale Prelucrării
              </h2>
              <p className="mb-2">Prelucrarea datelor se realizează pe următoarele baze legale:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs">
                <li><strong>Art. 6 alin. (1) lit. b) din GDPR:</strong> Demersuri la cererea persoanei vizate înainte de încheierea unui contract (răspunsul la solicitările de informare și analiză inițială transmise de utilizator).</li>
                <li><strong>Art. 6 alin. (1) lit. f) din GDPR:</strong> Interesul legitim de a asigura securitatea platformei, prevenirea spam-ului și buna funcționare tehnică a serviciilor.</li>
                <li><strong>Art. 6 alin. (1) lit. a) din GDPR:</strong> Consimțământul explicit acordat la bifarea căsuței de acord din formularul de contact.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                4. Perioada de Păstrare a Datelor
              </h2>
              <p>
                Datele transmise prin formularul de contact sunt păstrate doar pe durata necesară soluționării solicitării dumneavoastră și pentru o perioadă de maximum 12 luni de la ultima interacțiune, cu excepția cazului în care o obligație legală impune o durată mai îndelungată.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                5. Destinatari și Transferul Datelor
              </h2>
              <p>
                Datele dumneavoastră nu sunt vândute, închiriate sau înstrăinate către terți în scopuri de marketing. Accesul la date este limitat la echipa operațională AiX și furnizorii tehnici de infrastructură cloud și securitate (ex: Vercel, servicii de trimitere email), care acționează ca persoane împuternicite în conformitate cu GDPR. Datele nu sunt transferate în afara Spațiului Economic European fără garanții adecvate de protecție.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                6. Drepturile Dumneavoastră conform GDPR
              </h2>
              <p className="mb-2">În calitate de persoană vizată, beneficiați de următoarele drepturi:</p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li><strong>Dreptul de acces:</strong> Puteți solicita o confirmare a faptului că datele dvs. sunt prelucrate.</li>
                <li><strong>Dreptul la rectificare:</strong> Puteți solicita corectarea datelor inexacte sau incomplete.</li>
                <li><strong>Dreptul la ștergere („dreptul de a fi uitat”):</strong> Puteți cere ștergerea datelor în condițiile prevăzute de lege.</li>
                <li><strong>Dreptul la restricționarea prelucrării:</strong> Puteți solicita blocarea temporară a prelucrării.</li>
                <li><strong>Dreptul la portabilitatea datelor:</strong> Puteți primi datele într-un format structurat și lizibil automat.</li>
                <li><strong>Dreptul la opoziție:</strong> Vă puteți opune în orice moment prelucrării bazate pe interes legitim.</li>
                <li><strong>Dreptul de a depune o plângere:</strong> Aveți dreptul de a depune plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP - <code>www.dataprotection.ro</code>).</li>
              </ul>
            </section>

            <section className="border-t border-slate-200 pt-6">
              <h2 className="text-base font-bold text-slate-900 mb-2">
                7. Exercitarea Drepturilor
              </h2>
              <p>
                Pentru a vă exercita oricare dintre drepturile menționate mai sus, vă rugăm să transmiteți o solicitare scrisă la adresa: <strong>{CONTACT_CONFIG.email}</strong>. Răspunsul va fi formulat în termenul legal de maximum 30 de zile.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


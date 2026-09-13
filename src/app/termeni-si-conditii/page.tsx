import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CONTACT_CONFIG } from "@/lib/contact/config";

export const metadata: Metadata = {
  title: "Termeni și Condiții | SUBVENȚII România",
  description: "Termenii și condițiile de utilizare a platformei de informare SUBVENȚII România.",
  alternates: { canonical: "https://subventii.cristianvaduva.com/termeni-si-conditii" },
};

export default function TermsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Termeni și Condiții SUBVENȚII România",
    "url": "https://subventii.cristianvaduva.com/termeni-si-conditii",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <nav aria-label="Navigare pe pagină" className="mb-6 flex items-center gap-2 text-xs text-slate-600">
            <Link href="/" className="hover:text-emerald-800 transition-colors">Acasă</Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-slate-900">Termeni și Condiții</span>
          </nav>

          <header className="mb-8 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded">
              CADRU CONTRACTUAL &amp; EDITORIAL
            </span>
            <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Termeni și Condiții de Utilizare
            </h1>
            <p className="mt-2 text-xs text-slate-600">
              Ultima actualizare: 1 iulie 2026
            </p>
          </header>

          <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                1. Acceptarea Termenilor și Statutul Platformei
              </h2>
              <p>
                Platforma <strong>SUBVENȚII România</strong> (accesibilă la adresa <code>subventii.cristianvaduva.com</code>) este un portal independent de sinteză și informare agricolă. 
                Aceasta <strong>nu este o instituție publică</strong>, nu reprezintă o autoritate guvernamentală sau europeană și nu substituie comunicările oficiale emise de Ministerul Investițiilor și Proiectelor Europene (MIPE), Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI), Administrația Fondului pentru Mediu (AFM), Agenția pentru Finanțarea Investițiilor Rurale (AFIR) sau alte organisme emitente.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                2. Acceptarea Termenilor
              </h2>
              <p>
                Prin accesarea, navigarea și utilizarea acestui site web, confirmați că ați citit, înțeles și acceptat prezentele condiții de utilizare în integralitatea lor. Dacă nu sunteți de acord cu acești termeni, vă rugăm să încetați utilizarea platformei.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                3. Scopul Informațiilor și Exonerarea de Răspundere
              </h2>
              <p className="mb-3">
                Toate informațiile, ghidurile, grilele de punctaj, calendarele și sintezele prezentate au un caracter pur informativ și educațional:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Fără consultanță juridică, fiscală sau financiară:</strong> Conținutul nu constituie consultanță profesională personalizată. Deciziile de afaceri, investiționale sau fiscale trebuie luate exclusiv pe baza consultării specialiștilor autorizați și a documentelor oficiale.
                </li>
                <li>
                  <strong>Fără garanția eligibilității sau a obținerii finanțării:</strong> Utilizarea instrumentelor de calcul, a comparatorului sau a asistentului AI nu garantează eligibilitatea formală a unei companii și nici aprobarea proiectelor de către autoritățile de management.
                </li>
                <li>
                  <strong>Obligația de verificare a sursei oficiale:</strong> Ghidurile de finanțare și actele normative pot suferi modificări, erate sau prelungiri. Utilizatorul are responsabilitatea de a verifica textul oficial pe site-urile instituțiilor emitente indicate pe fiecare pagină de program.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                4. Proprietate Intelectuală și Utilizare Permisă
              </h2>
              <p>
                Structura bazei de date, designul, sintezele editoriale, algoritmii de filtrare și materialele redactate de echipa AiX sunt protejate de legislația privind drepturile de autor. Conținutul public preluat din ghiduri oficiale aparține instituțiilor emitente. Utilizatorii au dreptul de a vizualiza și descărca materiale strict pentru uz personal sau intern al propriei companii, fiind interzisă redistribuirea comercială sau scrapingul automatizat fără acord prealabil.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                5. Legături către Terțe Părți și Surse Externe
              </h2>
              <p>
                Platforma conține legături directe către portaluri guvernamentale, instituționale și surse publice oficiale. Nu ne asumăm răspunderea pentru disponibilitatea tehnică, politicile de confidențialitate sau conținutul găzduit pe site-urile terțe.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                6. Limitarea Răspunderii
              </h2>
              <p>
                În măsura maximă permisă de legea aplicabilă, echipa AiX Educational Intelligence nu va fi răspunzătoare pentru niciun fel de daune directe, indirecte, accidentale sau rezultate din utilizarea ori imposibilitatea de utilizare a informațiilor de pe site, inclusiv pierderi financiare sau nerespectarea termenelor limită de depunere a proiectelor la autorități.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                7. Legea Aplicabilă și Jurisdicția
              </h2>
              <p>
                Prezenții termeni și condiții sunt guvernați de legislația română și europeană în vigoare. Eventualele litigii nesoluționate pe cale amiabilă vor fi supuse instanțelor judecătorești competente din România.
              </p>
            </section>

            <section className="border-t border-slate-200 pt-6">
              <h2 className="text-base font-bold text-slate-900 mb-2">
                8. Date de Contact
              </h2>
              <p>
                Pentru orice întrebări sau clarificări privind funcționarea platformei, ne puteți contacta la adresa de email: <strong>{CONTACT_CONFIG.email}</strong>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

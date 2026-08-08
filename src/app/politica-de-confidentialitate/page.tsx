import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Politica de Confidențialitate",
  description: "Politica de prelucrare a datelor cu caracter personal pentru platforma privată AiX Educational Intelligence.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Politica de Confidențialitate</h1>
          <div className="prose prose-emerald max-w-none text-slate-600">
            <p>
              Această politică de confidențialitate descrie modul în care colectăm, utilizăm și protejăm datele dvs. cu caracter personal pe platforma privată <strong>AiX Educational Intelligence</strong> (subventii.cristianvaduva.com), în conformitate cu Regulamentul General privind Protecția Datelor (GDPR).
            </p>
            
            <h2>1. Date Colectate</h2>
            <p>
              Colectăm doar datele strict necesare furnizării serviciilor noastre. Acestea pot include: numele, compania, adresa de email, numărul de telefon, județul, codul CAEN și orice alte informații furnizate voluntar prin formularul de contact.
            </p>

            <h2>2. Scopul Prelucrării</h2>
            <p>
              Datele sunt prelucrate exclusiv în scopul:
            </p>
            <ul>
              <li>De a răspunde solicitărilor dvs. referitoare la programe de finanțare.</li>
              <li>De a vă oferi consultanță și oferte personalizate.</li>
              <li>Îmbunătățirii experienței pe platformă și prevenirii fraudei.</li>
            </ul>

            <h2>3. Securitatea Datelor</h2>
            <p>
              Datele transmise prin intermediul formularului de contact sunt protejate și transmise criptat către echipa noastră de consultanți, fără a fi stocate nesecurizat. Nu comercializăm și nu cedăm datele dvs. unor terțe părți neautorizate.
            </p>

            <h2>4. Drepturile Dumneavoastră (GDPR)</h2>
            <p>
              În conformitate cu legislația europeană, beneficiați de dreptul de acces, rectificare, ștergere (&quot;dreptul de a fi uitat&quot;), restricționarea prelucrării și portabilitatea datelor. Pentru a vă exercita aceste drepturi, ne puteți contacta în orice moment.
            </p>

            <h2>5. Modulele Cookie</h2>
            <p>
              Platformă utilizează module cookie doar pentru funcționalități esențiale și statistici anonimizate de trafic. Opțiunile de salvare a programelor (&quot;Programe Salvate&quot;) utilizează memoria locală a browserului (localStorage) și nu sunt stocate pe serverele noastre.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

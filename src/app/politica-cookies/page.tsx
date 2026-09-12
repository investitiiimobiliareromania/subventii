import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CONTACT_CONFIG } from "@/lib/contact/config";

export const metadata: Metadata = {
  title: "Politica privind Modulele Cookie | AiX Educational Intelligence",
  description: "Informații transparente privind utilizarea tehnologiilor de stocare locală și a modulelor cookie pe platforma AiX Educational Intelligence.",
  alternates: { canonical: "https://subventii.cristianvaduva.com/politica-cookies" },
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <nav aria-label="Navigare pe pagină" className="mb-6 flex items-center gap-2 text-xs text-slate-600">
            <Link href="/" className="hover:text-emerald-800 transition-colors">Acasă</Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-slate-900">Politica Cookie</span>
          </nav>

          <header className="mb-8 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              TRANSPARENȚĂ &amp; CONFIDENȚIALITATE DIGITALĂ
            </span>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Politica privind Modulele Cookie
            </h1>
            <p className="mt-2 text-xs text-slate-600">
              Ultima actualizare: Septembrie 2026 • Politica descrie comportamentul tehnic identificat la momentul auditului.
            </p>
          </header>

          <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
            <section className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-base font-bold text-slate-900 mb-2">
                1. Ce Sunt Modulele Cookie și Tehnologiile de Stocare Locală?
              </h2>
              <p>
                Un modul cookie este un fișier text de mici dimensiuni salvat pe dispozitivul dumneavoastră (computer, tabletă, telefon) la accesarea unui site web. Pe lângă cookie-uri tradiționale, platformele moderne utilizează <strong>stocarea locală (localStorage)</strong> a browserului pentru a asigura funcționalități rapide și private, fără a transmite date pe server.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                2. Cum Utilizează Platforma AiX Aceste Tehnologii?
              </h2>
              <p className="mb-3">
                Platforma <strong>AiX Educational Intelligence</strong> adoptă o abordare strict axată pe confidențialitate și minimizarea datelor:
              </p>
              
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 p-4 bg-white">
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    A. Tehnologii Strict Necesare &amp; Funcționale (localStorage)
                  </h3>
                  <p className="text-xs text-slate-600">
                    Folosim memoria locală a browserului (<code>localStorage</code>) pentru funcționalitatea de <strong>Programe Salvate / Bookmarks</strong>. Aceste date rămân exclusiv în dispozitivul dumneavoastră, nu sunt transmise către servere externe și nu sunt asociate cu profiluri de utilizator.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4 bg-white">
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    B. Fără Cookie-uri de Urmărire Publicitară / Third-Party Ads
                  </h3>
                  <p className="text-xs text-slate-600">
                    Platforma <strong>nu utilizează cookie-uri de publicitate comportamentală</strong>, nu găzduiește rețele de reclame terțe și nu vinde date către brokeri de profilare publicitară.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4 bg-white">
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    C. Statistici Agregate &amp; Anonimizate
                  </h3>
                  <p className="text-xs text-slate-600">
                    Pentru optimizarea tehnică a vitezei de încărcare și a disponibilității serverului, infrastructura de găzduire (Vercel) poate prelucra metrici tehnice agregate și anonime de performanță fără identificare individuală.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                3. Controlul și Ștergerea Cookie-urilor
              </h2>
              <p>
                Puteți controla, bloca sau șterge oricând modulele cookie și stocarea locală prin setările browserului dumneavoastră:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
                <li>Google Chrome: <em>Setări → Confidențialitate și securitate → Cookie-uri și alte date privind site-urile</em></li>
                <li>Mozilla Firefox: <em>Opțiuni → Confidențialitate și securitate → Cookie-uri și date de site</em></li>
                <li>Apple Safari: <em>Preferințe → Confidențialitate → Gestionare date site-uri web</em></li>
                <li>Microsoft Edge: <em>Setări → Permisiuni pentru site-uri → Cookie-uri și date stocate</em></li>
              </ul>
            </section>

            <section className="border-t border-slate-200 pt-6">
              <h2 className="text-base font-bold text-slate-900 mb-2">
                4. Contact
              </h2>
              <p>
                Pentru clarificări referitoare la politica privind datele tehnice și confidențialitatea, ne puteți contacta la adresa de email: <strong>{CONTACT_CONFIG.email}</strong>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

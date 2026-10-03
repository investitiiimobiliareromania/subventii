import { safeJsonLd } from "@/lib/security";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import {
  ROMANIAN_GOVERNMENT_MINISTRIES,
  ROMANIAN_NATIONAL_AGENCIES,
} from "@/lib/guvern-data";

export const metadata: Metadata = {
  title: "Guvern & Instituții Publice — Director Administrativ & Programe România 2026",
  description: "Centralizarea ministerelor, agențiilor de finanțare și autorităților de reglementare din România: rol, website oficial, atribuții, legislație și programe monitorizate.",
  alternates: { canonical: "https://subventii.cristianvaduva.com/guvern" },
};

export default function GovernmentDirectoryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Guvern & Instituții Publice România",
    "url": "https://subventii.cristianvaduva.com/guvern",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav aria-label="Navigare pe pagină" className="mb-6 flex items-center gap-2 text-xs text-slate-600">
            <Link href="/" className="hover:text-emerald-800 transition-colors">Acasă</Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-slate-900">Guvern &amp; Instituții Publice</span>
          </nav>

          <header className="mb-10 rounded-2xl border border-slate-200 bg-slate-900 p-6 md:p-8 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="rounded bg-emerald-800 px-2.5 py-0.5 text-xs font-bold font-mono">
                ADMINISTRAȚIE CENTRALĂ
              </span>
              <span className="text-xs text-slate-300 font-semibold">STRUCTURA GUVERNULUI ROMÂNIEI 2026</span>
            </div>
            <h1 className="text-3xl font-extrabold sm:text-4xl leading-tight">
              Ministere, Agenții Naționale &amp; Autorități de Reglementare
            </h1>
            <p className="mt-3 text-xs text-slate-300 max-w-3xl leading-relaxed">
              Hub informativ dedicat transparenței administrative, coordonării fondurilor europene și programelor guvernamentale. Centralizăm exclusiv datele de contact, domeniile de competență și portalurile oficiale primare.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-slate-800 pt-6 text-center text-xs">
              <div>
                <span className="block text-slate-400">Ministere Monitorizate</span>
                <span className="font-bold text-white mt-1 block">{ROMANIAN_GOVERNMENT_MINISTRIES.length}</span>
              </div>
              <div>
                <span className="block text-slate-400">Agenții &amp; Autorități</span>
                <span className="font-bold text-emerald-400 mt-1 block">{ROMANIAN_NATIONAL_AGENCIES.length}</span>
              </div>
              <div>
                <span className="block text-slate-400">Portaluri de Depunere</span>
                <span className="font-bold text-white mt-1 block">MySMIS / SEAP / SPV</span>
              </div>
              <div>
                <span className="block text-slate-400">Standard Verificare</span>
                <span className="font-bold text-emerald-400 mt-1 block">100% Sursă Primară</span>
              </div>
            </div>
          </header>

          {/* MINISTRIES SECTION */}
          <section className="mb-12">
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  PUTEREA EXECUTIVĂ CENTRALĂ
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-0.5">Ministerele Guvernului României</h2>
              </div>
              <span className="text-xs text-slate-500 font-semibold">
                {ROMANIAN_GOVERNMENT_MINISTRIES.length} ministere cu programe active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ROMANIAN_GOVERNMENT_MINISTRIES.map((m) => (
                <article key={m.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-emerald-500 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="rounded bg-slate-900 px-2.5 py-1 text-xs font-bold text-white font-mono">
                        {m.acronym}
                      </span>
                      <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                        {m.type}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                      {m.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {m.role}
                    </p>

                    <div className="space-y-2 text-xs border-t border-slate-100 pt-3 mb-4">
                      <div>
                        <span className="font-semibold text-slate-700">Domenii de competență: </span>
                        <span className="text-slate-600">{m.domain}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">Programe / Scheme gestionate: </span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {m.keyPrograms.map((prog, i) => (
                            <span key={i} className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-800">
                              {prog}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs">
                    <span className="text-slate-500 truncate max-w-[200px]" title={m.address}>
                      📍 {m.address.split(",")[0]}
                    </span>
                    <a
                      href={m.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-emerald-800 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Website Oficial</span>
                      <span>↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* NATIONAL AGENCIES & REGULATORY AUTHORITIES */}
          <section className="mb-12">
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  AGENȚII SPECIALIZATE &amp; REGLEMENTARE
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-0.5">Autorități Naționale &amp; Agenții Executive</h2>
              </div>
              <span className="text-xs text-slate-500 font-semibold">
                ANAF, ANCPI, BNR, INSSE, ONRC, ANRE, Consiliul Concurenței
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {ROMANIAN_NATIONAL_AGENCIES.map((a) => (
                <article key={a.id} className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-base font-black text-slate-900">
                        {a.acronym}
                      </span>
                      <span className="rounded bg-white px-2 py-0.5 text-[9px] font-bold text-slate-700 border border-slate-200">
                        {a.type}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2 leading-tight">
                      {a.name}
                    </h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed mb-3 line-clamp-3">
                      {a.role}
                    </p>
                  </div>

                  <div className="border-t border-slate-200 pt-3 space-y-2 text-xs">
                    {a.portalUrl && (
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Portal Servicii:</span>
                        <a href={a.portalUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-800 hover:underline">
                          Acces Platformă ↗
                        </a>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-slate-500 font-mono">Sursă Verificată</span>
                      <a href={a.officialWebsite} target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-800 hover:underline text-xs">
                        {a.officialWebsite.replace("https://", "").replace("www.", "")} ↗
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* CITIZEN & BUSINESS ADMINISTRATIVE GUIDE */}
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white shadow-md">
            <div className="border-b border-slate-800 pb-4 mb-4">
              <span className="text-xs font-mono font-bold text-emerald-400 block">GHID PENTRU ANTREPRENORI &amp; COMPANII</span>
              <h2 className="text-lg font-bold text-white mt-1">Interacțiunea Digitală cu Instituțiile Statului</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 leading-relaxed">
              <div className="rounded-xl bg-slate-950/80 p-4 border border-slate-800">
                <span className="font-bold text-white block mb-1">1. Înființare &amp; ONRC</span>
                <p>Înmatricularea unei societăți comerciale (SRL) se realizează electronic prin portalul ONRC cu certificat digital calificat sau semnătură electronică.</p>
              </div>
              <div className="rounded-xl bg-slate-950/80 p-4 border border-slate-800">
                <span className="font-bold text-white block mb-1">2. Obligații Fiscale &amp; ANAF</span>
                <p>Depunerea declarațiilor (D100, D112, D300, D406 SAF-T) și transmiterea facturilor B2B se desfășoară obligatoriu prin sistemul RO e-Factura / SPV.</p>
              </div>
              <div className="rounded-xl bg-slate-950/80 p-4 border border-slate-800">
                <span className="font-bold text-white block mb-1">3. Fonduri Europene &amp; MySMIS</span>
                <p>Cererile de finanțare pentru fonduri europene se transmit exclusiv prin MySMIS 2021/SMIS2021+ cu semnătură electronică calificată a reprezentantului legal.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <AiAssistantDrawer />
      <Footer />
    </div>
  );
}

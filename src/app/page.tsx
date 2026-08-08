import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FundingExplorer } from "@/components/funding-explorer";
import { EcosystemSurface } from "@/components/ecosystem-surface";
import {
  getProgramsFromDb,
  getActiveProgramsCount,
  getOpenCallsCount,
  getInstitutionsCount,
  getCountiesCovered,
} from "@/lib/db/repository";

export default async function Home() {
  const programs = await getProgramsFromDb();
  const activeCount = await getActiveProgramsCount();
  const openCount = await getOpenCallsCount();
  const instCount = await getInstitutionsCount();
  const countiesCount = await getCountiesCovered();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-slate-200/80 bg-slate-50/50 py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
            <span className="mb-3 inline-block rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-900">
              Sursă oficială de informații publice
            </span>
            <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Finanțări nerambursabile pentru afaceri din România
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Identifică rapid fondurile structurale, programele naționale și apelurile PNRR destinate IMM-urilor, start-up-urilor și fermierilor.
            </p>

            {/* Platform Metrics */}
            <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-white p-4 text-center shadow-xs sm:grid-cols-4">
              <div>
                <span className="block text-2xl font-black text-slate-900">
                  {activeCount > 0 ? activeCount : "În curs de actualizare"}
                </span>
                <span className="text-[11px] font-medium text-slate-500">Programe monitorizate</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-emerald-800">
                  {openCount > 0 ? openCount : "În curs de actualizare"}
                </span>
                <span className="text-[11px] font-medium text-slate-500">Apeluri deschise</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-slate-900">{countiesCount}</span>
                <span className="text-[11px] font-medium text-slate-500">Județe acoperite</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-slate-900">{instCount}</span>
                <span className="text-[11px] font-medium text-slate-500">Instituții monitorizate</span>
              </div>
            </div>
          </div>
        </section>

        {/* Core Search & Explorer Section */}
        <section id="cauta-finantari">
          <FundingExplorer programs={programs} />
        </section>

        {/* How It Works & Transparency */}
        <section className="border-t border-slate-200 bg-slate-50/60 py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mb-8 text-center">
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Principii de Funcționare Subvenții.ro
              </h2>
              <p className="text-xs text-slate-500">
                Organizăm informațiile oficiale într-o experiență de utilizare simplă și rapidă.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <span className="mb-2 block font-mono text-xs font-bold text-emerald-800">01</span>
                <h3 className="mb-1 text-sm font-bold text-slate-900">Surse Verificate</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Datele provin exclusiv din ghidurile solicitantului și publicațiile oficiale ale ministerelor și agențiilor regionale.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <span className="mb-2 block font-mono text-xs font-bold text-emerald-800">02</span>
                <h3 className="mb-1 text-sm font-bold text-slate-900">Confidențialitate Totală</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Salvarea programelor favorite se face local în browserul tău. Nu solicităm adrese de email sau creare de cont.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <span className="mb-2 block font-mono text-xs font-bold text-emerald-800">03</span>
                <h3 className="mb-1 text-sm font-bold text-slate-900">Acces Direct la Sursă</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fiecare fișă de program conține legătura directă către portalul oficial unde se depun proiectele.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AiX Ecosystem Surface */}
        <EcosystemSurface />
      </main>

      <Footer />
    </div>
  );
}

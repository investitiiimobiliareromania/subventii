import Link from "next/link";
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
  getArticlesFromDb,
  getLegislativeChangesFromDb,
} from "@/lib/db/repository";
import { getAllSectors } from "@/lib/sectoare-data";
import { getAllCounties } from "@/lib/county-data";
import { calendarEventsDataset } from "@/lib/calendar-data";
import { downloadableResourcesCatalog } from "@/lib/resources-data";
import { institutionsCatalog } from "@/lib/institutii-data";

export default async function Home() {
  const programs = await getProgramsFromDb();
  const activeCount = await getActiveProgramsCount();
  const openCount = await getOpenCallsCount();
  const instCount = await getInstitutionsCount();
  const countiesCount = await getCountiesCovered();
  const articles = await getArticlesFromDb();
  const legislation = await getLegislativeChangesFromDb();
  const sectors = getAllSectors();
  const counties = getAllCounties();

  const urgentDeadlines = calendarEventsDataset
    .filter((e) => e.status === "Deschis" || e.status === "În curând")
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section aria-label="Introducere și sumar platformă" className="border-b border-slate-200/80 bg-slate-900 py-12 md:py-16 text-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-950/90 px-4 py-1.5 text-xs font-bold text-emerald-400 border border-emerald-700/60 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true"></span>
                <span>PLATFORMĂ NAȚIONALĂ DE INFORMARE • PAC 2023–2027</span>
              </div>

              <h1 className="mb-4 text-3xl font-black tracking-tight sm:text-5xl md:text-6xl leading-tight">
                Ghidul Complet al Subvențiilor Agricole, APIA, AFIR și Fondurilor Europene
              </h1>

              <p className="mx-auto mb-8 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
                Centralizator independent de informare privind plățile directe pe hectar (BISS, CRISS), eco-schemele, sprijinul cuplat zootehnic, intervențiile de investiții AFIR, ajutoarele de stat MADR și ghidurile solicitantului pentru toate cele 41 de județe.
              </p>

              {/* Platform Metrics */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-center shadow-lg">
                <div className="border-r border-slate-800/80 last:border-0">
                  <span className="block text-2xl sm:text-3xl font-black text-white">{activeCount}</span>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Intervenții &amp; Programe</span>
                </div>
                <div className="border-r border-slate-800/80 last:border-0">
                  <span className="block text-2xl sm:text-3xl font-black text-emerald-400">{openCount}</span>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Apeluri Deschise</span>
                </div>
                <div className="border-r border-slate-800/80 last:border-0">
                  <span className="block text-2xl sm:text-3xl font-black text-white">{countiesCount}</span>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Județe Acoperite</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-white">{instCount}</span>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Instituții Monitorizate</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Deadlines & Calendar Banner */}
        <section aria-label="Termene limită și campanii oficiale" className="border-b border-amber-200 bg-amber-50/80 py-4">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-950 shrink-0">
                <span className="flex h-2.5 w-2.5 rounded-full bg-amber-600 animate-ping" aria-hidden="true"></span>
                <span className="uppercase tracking-wider">CALENDAR &amp; TERMENE URGENTE:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
                {urgentDeadlines.map((ev) => (
                  <div key={ev.id} className="rounded-lg bg-white border border-amber-200 p-2.5 shadow-2xs text-xs">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="rounded bg-slate-900 px-1.5 py-0.5 text-[9px] font-bold text-white">
                        {ev.institution}
                      </span>
                      <span className="font-mono font-bold text-emerald-800 text-[11px]">
                        {ev.date}
                      </span>
                    </div>
                    <p className="font-semibold text-slate-900 truncate" title={ev.title}>
                      {ev.title}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/calendar"
                className="shrink-0 text-xs font-bold text-amber-900 hover:text-amber-950 underline flex items-center gap-1"
              >
                <span>Tot Calendarul</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Core Search & Explorer Section */}
        <section id="cauta-finantari" aria-label="Căutare și filtrare finanțări">
          <FundingExplorer programs={programs} />
        </section>

        {/* Agricultural Sectors Grid */}
        <section aria-label="Sectoare agricole și economice" className="border-t border-slate-200 bg-slate-50/80 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  STRUCTURĂ SECTORIALĂ NAȚIONALĂ
                </span>
                <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                  Sectoare Agricole &amp; Domenii de Finanțare
                </h2>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                  Explorează condițiile de eligibilitate, sprijinul estimat pe hectar sau cap de animal și intervențiile active pe fiecare ramură.
                </p>
              </div>
              <Link
                href="/intelligence/funding"
                className="text-xs font-bold text-emerald-800 hover:underline shrink-0"
              >
                Vezi toate sectoarele →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sectors.map((sec) => (
                <article key={sec.slug} className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:border-emerald-600 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 border border-slate-200">
                        {sec.category}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-800">
                        {sec.officialInstitutions.join(" • ")}
                      </span>
                    </div>

                    <h3 className="mb-2 text-base font-bold text-slate-900 leading-snug">
                      <Link href={`/sectoare/${sec.slug}`} className="hover:text-emerald-800">
                        {sec.name}
                      </Link>
                    </h3>

                    <p className="mb-3 text-xs leading-relaxed text-slate-600 line-clamp-2">
                      {sec.shortDesc}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-900 text-[11px]">
                      {sec.estimatedSupport.split("|")[0]}
                    </span>
                    <Link
                      href={`/sectoare/${sec.slug}`}
                      className="font-bold text-emerald-800 hover:underline shrink-0"
                    >
                      Ghid Sector →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 41 Counties Interactive Directory */}
        <section aria-label="Ghidul județelor din România" className="border-t border-slate-200 bg-white py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  ACOPERIRE TERITORIALĂ COMPLETĂ
                </span>
                <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                  Subvenții &amp; Centre APIA în Toate Cele 41 de Județe
                </h2>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                  Accesează profilul agricol, adresele centrelor județene APIA și OJFIR, suprafețele agricole și oportunitățile specifice județului tău.
                </p>
              </div>
              <Link
                href="/intelligence/regions"
                className="text-xs font-bold text-emerald-800 hover:underline shrink-0"
              >
                Harta regională completă →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {counties.map((c) => {
                const slug = c.name
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/[^a-z0-9]/g, "-");
                return (
                  <Link
                    key={c.code}
                    href={`/subventii/${slug}`}
                    className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-3 hover:bg-emerald-50 hover:border-emerald-300 transition-all text-xs group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 group-hover:text-emerald-900">
                        {c.name}
                      </span>
                      <span className="rounded bg-white px-1.5 py-0.5 text-[9px] font-mono font-bold text-slate-600 border border-slate-200">
                        {c.code}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 truncate" title={c.region}>
                      {c.region}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Latest Official News & Legislation Dual Column */}
        <section aria-label="Știri și noutăți legislative" className="border-t border-slate-200 bg-slate-50/60 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* News Column */}
              <div>
                <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      NEWSROOM &amp; COMUNICATE
                    </span>
                    <h2 className="text-xl font-bold text-slate-900">Ultimele Noutăți APIA &amp; AFIR</h2>
                  </div>
                  <Link href="/stiri" className="text-xs font-bold text-emerald-800 hover:underline">
                    Toate știrile →
                  </Link>
                </div>

                <div className="space-y-4">
                  {articles.slice(0, 3).map((art) => (
                    <article key={art.slug} className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-emerald-500 transition-colors">
                      <div className="mb-2 flex items-center justify-between text-[11px]">
                        <span className="rounded bg-emerald-100 px-2 py-0.5 font-bold text-emerald-900">
                          {art.category}
                        </span>
                        <span className="text-slate-500">{art.publishedAt}</span>
                      </div>
                      <h3 className="mb-1 text-sm font-bold text-slate-900 hover:text-emerald-800 leading-snug">
                        <Link href={`/stiri/${art.slug}`}>{art.title}</Link>
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {art.summary}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              {/* Legislation Column */}
              <div>
                <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      MONITOR JURIDIC OFICIAL
                    </span>
                    <h2 className="text-xl font-bold text-slate-900">Legislație &amp; Ordine MADR</h2>
                  </div>
                  <Link href="/legislatie" className="text-xs font-bold text-emerald-800 hover:underline">
                    Toate actele →
                  </Link>
                </div>

                <div className="space-y-4">
                  {legislation.slice(0, 3).map((leg) => (
                    <article key={leg.slug} className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-emerald-500 transition-colors">
                      <div className="mb-2 flex items-center justify-between text-[11px]">
                        <span className="rounded bg-slate-900 px-2 py-0.5 font-bold text-white font-mono">
                          {leg.actType} {leg.actNumber}
                        </span>
                        <span className="text-emerald-800 font-bold">În vigoare</span>
                      </div>
                      <h3 className="mb-1 text-sm font-bold text-slate-900 leading-snug">
                        {leg.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-2">
                        {leg.summary}
                      </p>
                      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100">
                        <span className="text-slate-500 truncate max-w-[200px]">
                          Sectoare: {leg.affectedSectors.slice(0, 2).join(", ")}
                        </span>
                        <a
                          href={leg.officialSourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-emerald-800 hover:underline"
                        >
                          Monitorul Oficial ↗
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Official Guides & Documents Preview */}
        <section aria-label="Centrul de documente și resurse oficiale" className="border-t border-slate-200 bg-white py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  DESCĂRCĂRI &amp; FORMULARE OFICIALE
                </span>
                <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                  Ghidurile Solicitantului &amp; Cereri Tipizate
                </h2>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                  Descarcă gratuit modelele oficiale de adeverințe pentru Registrul Agricol, cereri de motorină, ghiduri PDF și machete de calcul financiar.
                </p>
              </div>
              <Link href="/resurse" className="text-xs font-bold text-emerald-800 hover:underline shrink-0">
                Toate documentele →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {downloadableResourcesCatalog.slice(0, 6).map((res) => (
                <div key={res.id} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white font-mono">
                        {res.institution}
                      </span>
                      <span className="rounded bg-emerald-100 text-emerald-950 px-2 py-0.5 text-[10px] font-bold">
                        {res.fileFormat}{res.fileSizeMb ? ` • ${res.fileSizeMb} MB` : ""}
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 mb-1 leading-snug">
                      {res.title}
                    </h3>
                    <p className="text-[11px] text-slate-600 line-clamp-2 mb-3">
                      {res.description}
                    </p>
                  </div>

                  <div className="border-t border-slate-200 pt-2 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-500 font-mono">Sursă Verificată</span>
                    <a
                      href={res.downloadUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-emerald-800 hover:underline"
                    >
                      {res.isExternalPortal ? "Vezi documentele oficiale ↗" : `Descarcă ${res.fileFormat} 📥`}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Public Institutions Directory */}
        <section aria-label="Instituții publice monitorizate" className="border-t border-slate-200 bg-slate-50/70 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-8 text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                AUTORITĂȚI ȘI AGENȚII NAȚIONALE
              </span>
              <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                Instituții Publice Monitorizate în Timp Real
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Centralizăm exclusiv datele publicate pe portalurile oficiale guvernamentale și europene.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {institutionsCatalog.map((inst) => (
                <div key={inst.slug} className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-2xs">
                  <span className="block font-mono text-lg font-black text-slate-900 mb-0.5">
                    {inst.acronym}
                  </span>
                  <span className="block text-[11px] font-semibold text-slate-700 leading-tight mb-2 line-clamp-2">
                    {inst.name}
                  </span>
                  <a
                    href={`https://${inst.officialDomain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[10px] font-bold text-emerald-800 hover:underline font-mono"
                  >
                    {inst.officialDomain} ↗
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Principles & Transparency */}
        <section aria-label="Principii de funcționare" className="border-t border-slate-200 bg-white py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mb-8 text-center">
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Standardul Editorial &amp; Calitatea Informațiilor Subvenții.ro
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                O platformă privată de educație și informare dedicată fermierilor și antreprenorilor români.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5">
                <span className="mb-2 block font-mono text-xs font-bold text-emerald-800">01</span>
                <h3 className="mb-1 text-sm font-bold text-slate-900">Proveniență 100% Oficială</h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Datele prezentate provin exclusiv din actele normative publicate în Monitorul Oficial și ghidurile emise de APIA, AFIR și MADR. Fără date inventate sau aproximări nefondate.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5">
                <span className="mb-2 block font-mono text-xs font-bold text-emerald-800">02</span>
                <h3 className="mb-1 text-sm font-bold text-slate-900">Diacritice &amp; Claritate</h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Conținutul respectă integral ortografia limbii române cu diacritice corecte și explicații sintetice, directe, fără limbaj birocratic ermetic.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5">
                <span className="mb-2 block font-mono text-xs font-bold text-emerald-800">03</span>
                <h3 className="mb-1 text-sm font-bold text-slate-900">Transparență și Acces Direct</h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Fiecare fișă de intervenție conține legături directe către sursa oficială unde se depun cererile și actele normative conexe.
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

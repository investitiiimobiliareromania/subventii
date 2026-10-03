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

const OBJECTIVE_TRACKS = [
  {
    icon: "🚀",
    title: "Start-up & Afaceri Noi",
    desc: "Finanțări nerambursabile pentru deschiderea unei firme noi sau lansarea unei microîntreprinderi.",
    href: "/finantari?q=start+up",
    badge: "Start-up",
  },
  {
    icon: "📈",
    title: "Dezvoltare IMM & Producție",
    desc: "Granturi de investiții pentru extinderea capacității de producție, spații și active productive.",
    href: "/finantari?q=IMM",
    badge: "Dezvoltare",
  },
  {
    icon: "💻",
    title: "Digitalizare & Tehnologie",
    desc: "Finanțări pentru software, platforme e-commerce, automatizări industriale și echipamente IT.",
    href: "/finantari?q=digitalizare",
    badge: "Digitalizare",
  },
  {
    icon: "⚙️",
    title: "Echipamente & Utilaje",
    desc: "Linii tehnologice, utilaje productive, echipamente moderne și retehnologizare industrială.",
    href: "/finantari?q=utilaje",
    badge: "Echipamente",
  },
  {
    icon: "☀️",
    title: "Energie & Fotovoltaice",
    desc: "Panouri fotovoltaice, baterii și stocare BESS, eficiență energetică, decarbonizare și producție verde.",
    href: "/programe-guvernamentale/casa-verde",
    badge: "Energie",
  },
  {
    icon: "🏗️",
    title: "Hale, Clădiri & Imobiliare",
    desc: "Construcție hale producție, modernizări spații, eficiență energetică și statistici oficiale de tranzacții ANCPI.",
    href: "/rapoarte-ancpi",
    badge: "Imobiliare & ANCPI",
  },
  {
    icon: "♻️",
    title: "Mediu & Reciclare Deșeuri",
    desc: "Instalații de colectare, tratare și reciclare deșeuri, economie circulară și tehnologii verzi.",
    href: "/finantari?q=reciclare",
    badge: "Reciclare",
  },
  {
    icon: "👥",
    title: "Angajare & Resurse Umane",
    desc: "Sprijin pentru crearea de locuri de muncă, formare profesională și dezvoltarea competențelor.",
    href: "/finantari?q=angajare",
    badge: "Ocupare",
  },
  {
    icon: "🔬",
    title: "Inovare & Cercetare",
    desc: "Transfer tehnologic, brevete, dezvoltare de produse noi și parteneriate de cercetare.",
    href: "/finantari?q=inovare",
    badge: "Inovare",
  },
  {
    icon: "🌾",
    title: "Agricultură & Agro-Business",
    desc: "Intervenții AFIR, plăți directe APIA pe hectar și cap de animal, procesare și modernizare ferme.",
    href: "/finantari?q=agricultura",
    badge: "Agro",
  },
];

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
                <span>PLATFORMĂ NAȚIONALĂ DE INFORMARE • FONDURI EUROPENE &amp; NAȚIONALE</span>
              </div>

              <h1 className="mb-4 text-3xl font-black tracking-tight sm:text-5xl md:text-6xl leading-tight">
                Găsește Finanțarea Potrivită pentru Afacerea Ta
              </h1>

              <p className="mx-auto mb-8 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
                Descoperă și filtrează programele europene și naționale prin care poți porni, dezvolta sau investi în business-ul tău: granturi pentru start-up-uri și IMM-uri, digitalizare, utilaje productive, eficiență energetică, intervenții agricole și scheme de ajutor de stat.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                <a
                  href="#cauta-finantari"
                  className="rounded-xl bg-emerald-700 px-6 py-3.5 text-xs font-bold text-white shadow-md hover:bg-emerald-600 transition-all hover:scale-105 active:scale-95"
                >
                  Explorează Finanțările Active →
                </a>
                <Link
                  href="/calendar"
                  className="rounded-xl bg-slate-800 border border-slate-700 px-5 py-3.5 text-xs font-bold text-slate-200 hover:bg-slate-700 hover:text-white transition-all"
                >
                  Calendar Apeluri 2026 ↗
                </Link>
              </div>

              {/* Platform Metrics */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-center shadow-lg">
                <div className="border-r border-slate-800/80 last:border-0">
                  <span className="block text-2xl sm:text-3xl font-black text-white">{activeCount}</span>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Programe &amp; Intervenții</span>
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

              {/* National Data Hubs Quick Bar */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className="text-slate-400 font-semibold mr-1">HUB-URI NAȚIONALE:</span>
                <Link href="/economie" className="rounded-lg bg-slate-800/90 border border-slate-700 px-3 py-1.5 text-slate-200 hover:bg-emerald-950 hover:border-emerald-500 hover:text-white transition-all font-medium">
                  📊 Economia României
                </Link>
                <Link href="/guvern" className="rounded-lg bg-slate-800/90 border border-slate-700 px-3 py-1.5 text-slate-200 hover:bg-emerald-950 hover:border-emerald-500 hover:text-white transition-all font-medium">
                  🏛️ Guvern &amp; Ministere
                </Link>
                <Link href="/infrastructura" className="rounded-lg bg-slate-800/90 border border-slate-700 px-3 py-1.5 text-slate-200 hover:bg-emerald-950 hover:border-emerald-500 hover:text-white transition-all font-medium">
                  🏗️ Infrastructură &amp; SEAP
                </Link>
                <Link href="/rapoarte-ancpi" className="rounded-lg bg-slate-800/90 border border-slate-700 px-3 py-1.5 text-slate-200 hover:bg-emerald-950 hover:border-emerald-500 hover:text-white transition-all font-medium">
                  🏘️ Imobiliare &amp; ANCPI
                </Link>
                <Link href="/date-statistici" className="rounded-lg bg-slate-800/90 border border-slate-700 px-3 py-1.5 text-slate-200 hover:bg-emerald-950 hover:border-emerald-500 hover:text-white transition-all font-medium">
                  📁 Seturi de Date Publice
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Objective-Based Navigation ("Ce vrei să faci cu afacerea ta?") */}
        <section aria-label="Explorare după obiectiv de afaceri" className="border-b border-slate-200 bg-white py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-8 text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                PROIECTUL TĂU • DIRECȚII DE FINANȚARE
              </span>
              <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                Ce Vrei să Faci cu Afacerea Ta?
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Selectează obiectivul investiției tale pentru a identifica rapid programele și ghidurile aplicabile.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {OBJECTIVE_TRACKS.map((track, idx) => (
                <a
                  key={idx}
                  href={track.href}
                  className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 hover:bg-emerald-50/50 hover:border-emerald-300 transition-all flex flex-col justify-between group shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl" aria-hidden="true">{track.icon}</span>
                      <span className="rounded bg-white px-2 py-0.5 text-[10px] font-bold text-slate-700 border border-slate-200 group-hover:border-emerald-200">
                        {track.badge}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-900 transition-colors mb-1.5">
                      {track.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {track.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-emerald-800">
                    <span>Vezi oportunități</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Live Deadlines & Calendar Banner */}
        <section aria-label="Termene limită și apeluri active" className="border-b border-amber-200 bg-amber-50/80 py-4">
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

        {/* Economic & Sectorial Domains Grid */}
        <section aria-label="Sectoare economice și domenii de activitate" className="border-t border-slate-200 bg-slate-50/80 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  STRUCTURĂ SECTORIALĂ &amp; DOMENII DE ACTIVITATE
                </span>
                <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                  Sectoare Economice &amp; Domenii de Finanțare
                </h2>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                  Explorează oportunitățile de finanțare, condițiile de eligibilitate și intervențiile active pe fiecare ramură de activitate.
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
                  Finanțări &amp; Oportunități Locale în Toate Cele 41 de Județe
                </h2>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                  Accesează profilul economic, adresele centrelor județene de sprijin (APIA, OJFIR, ADR), suprafețele și oportunitățile specifice județului tău.
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

        {/* Real Estate & ANCPI Data Hub Section */}
        <section aria-label="Piața imobiliară și statistici ANCPI" className="border-t border-slate-200 bg-white py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  DATE OFICIALE ANCPI • REAL ESTATE &amp; INVESTIȚII
                </span>
                <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                  Piața Imobiliară, Tranzacții ANCPI &amp; Finanțări pentru Construcții
                </h2>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                  Centralizare lunară a contractelor de vânzare-cumpărare înregistrate în cartea funciară (ANCPI), indici de creditare BNR și oportunități de granturi pentru hale de producție și spații industriale.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/rapoarte-ancpi"
                  className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-800 transition-colors"
                >
                  Rapoarte ANCPI 41 Județe →
                </Link>
                <Link
                  href="/piata-imobiliara"
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Piața Imobiliară ↗
                </Link>
              </div>
            </div>

            {/* ANCPI National Grid Preview */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 mb-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-center">
                <span className="block text-[10px] font-bold text-slate-500 uppercase">Total Național</span>
                <span className="block text-xl font-black text-slate-900 mt-0.5">51.808</span>
                <span className="text-[10px] font-semibold text-emerald-800">+5,3% YoY</span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-center">
                <span className="block text-[10px] font-bold text-slate-500 uppercase">București</span>
                <span className="block text-xl font-black text-slate-900 mt-0.5">10.398</span>
                <span className="text-[10px] font-semibold text-emerald-800">+35,7% YoY</span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-center">
                <span className="block text-[10px] font-bold text-slate-500 uppercase">Ilfov</span>
                <span className="block text-xl font-black text-slate-900 mt-0.5">3.971</span>
                <span className="text-[10px] font-semibold text-slate-600">−1,0% YoY</span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-center">
                <span className="block text-[10px] font-bold text-slate-500 uppercase">Timiș</span>
                <span className="block text-xl font-black text-slate-900 mt-0.5">3.165</span>
                <span className="text-[10px] font-semibold text-emerald-800">+33,5% YoY</span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-center">
                <span className="block text-[10px] font-bold text-slate-500 uppercase">Iași</span>
                <span className="block text-xl font-black text-slate-900 mt-0.5">2.540</span>
                <span className="text-[10px] font-semibold text-emerald-800">+9,8% YoY</span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-center">
                <span className="block text-[10px] font-bold text-slate-500 uppercase">Cluj</span>
                <span className="block text-xl font-black text-slate-900 mt-0.5">2.074</span>
                <span className="text-[10px] font-semibold text-slate-600">−6,4% YoY</span>
              </div>
            </div>

            {/* Sinergy Banner */}
            <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 p-5 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-800/80 px-2.5 py-0.5 text-[10px] font-bold text-emerald-200">
                  🏗️ INVESTIȚII ÎN ACTIVE IMOBILIARE PRODUCTIVE
                </span>
                <h3 className="text-sm font-bold text-white">Ai nevoie de spațiu pentru producție, hală sau extindere?</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Programele Regionale ADR (Nord-Vest, Centru, Vest, Sud-Muntenia) oferă granturi nerambursabile de până la 1.500.000 € pentru construirea de spații productive, extinderea capacităților și eficientizarea energetică a clădirilor.
                </p>
              </div>
              <Link
                href="/finantari?investitie=Construc%C8%9Bie+Hal%C4%83+%26+Cl%C4%83dire"
                className="shrink-0 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm"
              >
                Vezi Finanțări Hale &amp; Spații →
              </Link>
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
                    <h2 className="text-xl font-bold text-slate-900">Ultimele Noutăți &amp; Ghiduri de Finanțare</h2>
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
                    <h2 className="text-xl font-bold text-slate-900">Legislație Fiscală &amp; Ordine Oficiale</h2>
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
                  DESCĂRCĂRI &amp; MODELE UTILE
                </span>
                <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                  Ghidurile Solicitantului &amp; Modele de Documente
                </h2>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                  Descarcă gratuit modele orientative de plan de afaceri, machete de calcul bugetar, contracte tipizate și ghidurile oficiale ale solicitantului.
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
                O platformă privată de educație și informare dedicată antreprenorilor, IMM-urilor și fermierilor din România.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5">
                <span className="mb-2 block font-mono text-xs font-bold text-emerald-800">01</span>
                <h3 className="mb-1 text-sm font-bold text-slate-900">Proveniență 100% Oficială</h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Datele prezentate provin exclusiv din actele normative din Monitorul Oficial și ghidurile emise de autoritățile de management (MIPE, AFIR, APIA, MADR, AFM, ADR).
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
                  Fiecare fișă conține legături directe către sursa oficială unde se depun proiectele și actele normative conexe.
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

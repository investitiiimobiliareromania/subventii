"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BookmarkButton } from "@/components/bookmark-button";
import {
  type FundingProgram,
  calculateDaysRemaining,
  filterOptions,
  formatCurrencyEur,
  formatCurrencyRon,
} from "@/lib/funding-data";

export function FundingCard({ program }: { program: FundingProgram }) {
  const daysLeft = calculateDaysRemaining(program.deadline);
  const isOpen = program.status === "Deschis";
  const isSoon =
    program.status === "În curând" ||
    program.status === "În consultare" ||
    program.status === "În pregătire";

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md">
      <div>
        {/* Card Header Badges */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white font-mono">
              {program.sourceCategory}
            </span>
            {program.fundingType && (
              <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-900">
                {program.fundingType}
              </span>
            )}
            {program.objective && (
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                {program.objective}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <BookmarkButton slug={program.slug} />
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${
                isOpen
                  ? "bg-emerald-100 text-emerald-950"
                  : isSoon
                  ? "bg-amber-100 text-amber-950"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              {program.status}
            </span>
          </div>
        </div>

        {/* Title & Summary */}
        <h3 className="mb-2 text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
          <Link href={`/finantari/${program.slug}`} className="focus:outline-none">
            {program.title}
          </Link>
        </h3>
        <p className="mb-4 text-xs text-slate-600 line-clamp-3 leading-relaxed">
          {program.summary}
        </p>

        {/* Program Meta Information */}
        <div className="space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-600">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Finanțare maximă:</span>
            <span className="font-bold text-slate-900">
              {program.maxFundingEur
                ? `${formatCurrencyEur(program.maxFundingEur)} (${formatCurrencyRon(program.maxFundingRon)})`
                : formatCurrencyRon(program.maxFundingRon)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Intensitate sprijin:</span>
            <span className="font-semibold text-emerald-800">
              {program.supportIntensity || program.cofinancing}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Termen limită:</span>
            <span className="font-mono text-slate-800">
              {program.deadline === "2026-12-31" && program.status === "Permanent"
                ? "Permanent"
                : `${program.deadline} (${daysLeft} zile)`}
            </span>
          </div>
        </div>
      </div>

      {/* Card Action Button */}
      <div className="mt-5 border-t border-slate-100 pt-4">
        <Link
          href={`/finantari/${program.slug}`}
          className="flex w-full items-center justify-center rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white transition-colors hover:bg-emerald-800"
        >
          Ghid &amp; Criterii de Eligibilitate →
        </Link>
      </div>
    </article>
  );
}

const QUICK_CATEGORIES = [
  { label: "Toate Finanțările", value: "ALL" },
  { label: "🚀 Start-up & IMM", value: "STARTUP_IMM" },
  { label: "💻 Digitalizare & Tehnologie", value: "DIGITALIZARE" },
  { label: "⚡ Energie & Sustenabilitate", value: "ENERGIE" },
  { label: "🏢 Programe Regionale ADR", value: "ADR" },
  { label: "🔬 Inovare & Cercetare", value: "INOVARE" },
  { label: "🚜 Investiții AFIR", value: "AFIR" },
  { label: "🌾 Plăți Directe APIA", value: "APIA" },
  { label: "🏛️ Scheme Naționale", value: "MINISTER" },
  { label: "📦 Arhivă Programe", value: "ARCHIVE" },
];

const ITEMS_PER_PAGE = 12;

export function FundingExplorer({ programs }: { programs: FundingProgram[] }) {
  const [query, setQuery] = useState("");
  const [selectedQuickCategory, setSelectedQuickCategory] = useState("ALL");
  const [business, setBusiness] = useState(filterOptions.business[0]);
  const [industry, setIndustry] = useState(filterOptions.industry[0]);
  const [objective, setObjective] = useState(filterOptions.objective[0]);
  const [county, setCounty] = useState(filterOptions.county[0]);
  const [companyAge, setCompanyAge] = useState(filterOptions.companyAge[0]);
  const [companySize, setCompanySize] = useState(filterOptions.companySize[0]);
  const [sourceCategory, setSourceCategory] = useState(filterOptions.sourceCategory[0]);
  const [status, setStatus] = useState(filterOptions.status[0]);
  const [currentPage, setCurrentPage] = useState(1);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (query) count++;
    if (selectedQuickCategory !== "ALL") count++;
    if (business !== filterOptions.business[0]) count++;
    if (industry !== filterOptions.industry[0]) count++;
    if (objective !== filterOptions.objective[0]) count++;
    if (county !== filterOptions.county[0]) count++;
    if (companyAge !== filterOptions.companyAge[0]) count++;
    if (companySize !== filterOptions.companySize[0]) count++;
    if (sourceCategory !== filterOptions.sourceCategory[0]) count++;
    if (status !== filterOptions.status[0]) count++;
    return count;
  }, [query, selectedQuickCategory, business, industry, objective, county, companyAge, companySize, sourceCategory, status]);

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      // Quick Category Filter
      if (selectedQuickCategory === "ARCHIVE") {
        if (!program.isArchived && program.status !== "Închis") return false;
      } else if (selectedQuickCategory === "STARTUP_IMM") {
        const isTarget =
          program.objective === "Start-up & Afaceri Noi" ||
          program.objective === "IMM & Dezvoltare Business" ||
          program.sourceCategory === "MIPE" ||
          program.sourceCategory === "Minister";
        if (!isTarget) return false;
      } else if (selectedQuickCategory === "DIGITALIZARE") {
        if (program.objective !== "Digitalizare & Tehnologie" && program.sourceCategory !== "PNRR") return false;
      } else if (selectedQuickCategory === "ENERGIE") {
        if (
          program.objective !== "Energie & Sustenabilitate" &&
          program.sourceCategory !== "AFM" &&
          program.sourceCategory !== "Fondul pentru Modernizare"
        )
          return false;
      } else if (selectedQuickCategory === "ADR") {
        if (program.sourceCategory !== "ADR") return false;
      } else if (selectedQuickCategory === "INOVARE") {
        if (program.objective !== "Inovare & Cercetare" && program.sourceCategory !== "UE Direct") return false;
      } else if (selectedQuickCategory === "AFIR") {
        if (program.sourceCategory !== "AFIR") return false;
      } else if (selectedQuickCategory === "APIA") {
        if (program.sourceCategory !== "APIA" && program.sourceCategory !== "MADR") return false;
      } else if (selectedQuickCategory === "MINISTER") {
        if (program.sourceCategory !== "Minister" && program.sourceCategory !== "MADR") return false;
      } else if (selectedQuickCategory === "ALL") {
        // By default exclude archived items unless explicitly queried
        if (program.isArchived && !query) return false;
      }

      // Query Search
      const q = query.toLowerCase().trim();
      const matchQuery =
        !q ||
        program.title.toLowerCase().includes(q) ||
        program.summary.toLowerCase().includes(q) ||
        program.source.toLowerCase().includes(q) ||
        (program.authorityCode && program.authorityCode.toLowerCase().includes(q)) ||
        (program.objective && program.objective.toLowerCase().includes(q)) ||
        (program.region && program.region.toLowerCase().includes(q)) ||
        program.industries.some((i) => i.toLowerCase().includes(q)) ||
        program.businessTypes.some((b) => b.toLowerCase().includes(q));

      const matchBusiness =
        business === filterOptions.business[0] ||
        program.businessTypes.includes(business) ||
        program.businessTypes.includes("Toate formele");

      const matchIndustry =
        industry === filterOptions.industry[0] || program.industries.includes(industry);

      const matchObjective =
        objective === filterOptions.objective[0] || program.objective === objective;

      const matchCounty =
        county === filterOptions.county[0] ||
        program.counties.includes(county) ||
        program.counties.includes("Național");

      const matchAge =
        companyAge === filterOptions.companyAge[0] ||
        program.companyAge === companyAge ||
        program.companyAge === "Orice vechime";

      const matchSize =
        companySize === filterOptions.companySize[0] ||
        program.companySize === companySize ||
        program.companySize === "Toate mărimile";

      const matchSource =
        sourceCategory === filterOptions.sourceCategory[0] ||
        program.sourceCategory === sourceCategory;

      const matchStatus = status === filterOptions.status[0] || program.status === status;

      return (
        matchQuery &&
        matchBusiness &&
        matchIndustry &&
        matchObjective &&
        matchCounty &&
        matchAge &&
        matchSize &&
        matchSource &&
        matchStatus
      );
    });
  }, [programs, selectedQuickCategory, query, business, industry, objective, county, companyAge, companySize, sourceCategory, status]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredPrograms.length / ITEMS_PER_PAGE));
  const currentPrograms = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPrograms.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPrograms, currentPage]);

  const resetFilters = () => {
    setQuery("");
    setSelectedQuickCategory("ALL");
    setBusiness(filterOptions.business[0]);
    setIndustry(filterOptions.industry[0]);
    setObjective(filterOptions.objective[0]);
    setCounty(filterOptions.county[0]);
    setCompanyAge(filterOptions.companyAge[0]);
    setCompanySize(filterOptions.companySize[0]);
    setSourceCategory(filterOptions.sourceCategory[0]);
    setStatus(filterOptions.status[0]);
    setCurrentPage(1);
  };

  const handleQuickCategoryClick = (catVal: string) => {
    setSelectedQuickCategory(catVal);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Quick Category Chips */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {QUICK_CATEGORIES.map((cat) => {
          const isSelected = selectedQuickCategory === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => handleQuickCategoryClick(cat.value)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? "bg-emerald-800 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Search Input Bar */}
      <div className="relative mb-6">
        <label htmlFor="search-input" className="sr-only">
          Caută finanțări după obiectiv, domeniu, program sau autoritate
        </label>
        <div className="relative flex items-center">
          <svg
            className="absolute left-4 h-5 w-5 text-slate-500 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            id="search-input"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Caută după obiectiv, domeniu sau program (ex: digitalizare, utilaje, start-up, DR-14, energie, PNRR, BISS)..."
            className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-12 pr-10 text-sm text-slate-900 placeholder-slate-500 shadow-xs transition-colors focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCurrentPage(1);
              }}
              className="absolute right-3 rounded-md p-1 text-slate-500 hover:text-slate-800 focus-visible:outline-emerald-700"
              aria-label="Șterge textul de căutare"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters Matrix */}
      <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Filtrare Avansată Programe &amp; Finanțări
            </span>
            <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-950">
              {filteredPrograms.length} din {programs.length} disponibile
            </span>
          </div>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-bold text-emerald-800 hover:underline focus-visible:outline-emerald-700 cursor-pointer"
              aria-label={`Resetează toate filtrele (${activeFilterCount} active)`}
            >
              Resetează filtrele ({activeFilterCount})
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Obiectiv Finanțare */}
          <div>
            <label htmlFor="filter-objective" className="mb-1 block text-[11px] font-semibold text-slate-700">
              Obiectivul Afacerii
            </label>
            <select
              id="filter-objective"
              value={objective}
              onChange={(e) => {
                setObjective(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-700 focus:outline-none"
            >
              {filterOptions.objective.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Formă Juridică */}
          <div>
            <label htmlFor="filter-business" className="mb-1 block text-[11px] font-semibold text-slate-700">
              Formă Juridică
            </label>
            <select
              id="filter-business"
              value={business}
              onChange={(e) => {
                setBusiness(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-700 focus:outline-none"
            >
              {filterOptions.business.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Sector / Domeniu */}
          <div>
            <label htmlFor="filter-industry" className="mb-1 block text-[11px] font-semibold text-slate-700">
              Sector / Industrie
            </label>
            <select
              id="filter-industry"
              value={industry}
              onChange={(e) => {
                setIndustry(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-700 focus:outline-none"
            >
              {filterOptions.industry.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Județ */}
          <div>
            <label htmlFor="filter-county" className="mb-1 block text-[11px] font-semibold text-slate-700">
              Județ / Regiune
            </label>
            <select
              id="filter-county"
              value={county}
              onChange={(e) => {
                setCounty(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-700 focus:outline-none"
            >
              {filterOptions.county.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label htmlFor="filter-status" className="mb-1 block text-[11px] font-semibold text-slate-700">
              Status Apel
            </label>
            <select
              id="filter-status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-700 focus:outline-none"
            >
              {filterOptions.status.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Sursă Fonduri */}
          <div>
            <label htmlFor="filter-source" className="mb-1 block text-[11px] font-semibold text-slate-700">
              Sursă Finanțare
            </label>
            <select
              id="filter-source"
              value={sourceCategory}
              onChange={(e) => {
                setSourceCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-700 focus:outline-none"
            >
              {filterOptions.sourceCategory.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Vârstă Firmă */}
          <div>
            <label htmlFor="filter-company-age" className="mb-1 block text-[11px] font-semibold text-slate-700">
              Vechime Firmă
            </label>
            <select
              id="filter-company-age"
              value={companyAge}
              onChange={(e) => {
                setCompanyAge(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-700 focus:outline-none"
            >
              {filterOptions.companyAge.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Dimensiune Firmă */}
          <div>
            <label htmlFor="filter-company-size" className="mb-1 block text-[11px] font-semibold text-slate-700">
              Dimensiune Firmă
            </label>
            <select
              id="filter-company-size"
              value={companySize}
              onChange={(e) => {
                setCompanySize(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-700 focus:outline-none"
            >
              {filterOptions.companySize.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Program Cards Grid */}
      {currentPrograms.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentPrograms.map((program) => (
            <FundingCard key={program.slug} program={program} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            🔍
          </div>
          <h3 className="text-base font-bold text-slate-900">Nu am găsit finanțări conform filtrelor alese</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
            Încearcă să resetezi o parte din filtre sau să cauți după termeni generali precum „start-up”, „digitalizare”, „utilaje” sau „energie”.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 inline-flex items-center rounded-xl bg-emerald-800 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-900 cursor-pointer"
          >
            Resetează Toate Filtrele
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav aria-label="Paginare finanțări" className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5">
          <div className="text-xs text-slate-500">
            Afișate <strong>{(currentPage - 1) * ITEMS_PER_PAGE + 1}</strong> – <strong>{Math.min(currentPage * ITEMS_PER_PAGE, filteredPrograms.length)}</strong> din <strong>{filteredPrograms.length}</strong> oportunități
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              ← Înapoi
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                type="button"
                onClick={() => setCurrentPage(pg)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                  currentPage === pg
                    ? "bg-slate-900 text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {pg}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Înainte →
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}

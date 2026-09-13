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

const QUICK_CATEGORIES = [
  { label: "Toate Programele", value: "Toate sursele" },
  { label: "🌾 Subvenții APIA (FEGA)", value: "APIA" },
  { label: "🚜 Intervenții AFIR (FEADR)", value: "AFIR" },
  { label: "🏛️ Ajutoare de Stat MADR", value: "MADR" },
  { label: "⚡ Energie & AFM", value: "AFM" },
  { label: "💻 MIPE & PNRR", value: "PNRR" },
  { label: "🏢 Programe Regionale ADR", value: "ADR" },
];

export function FundingExplorer({ programs }: { programs: FundingProgram[] }) {
  const [query, setQuery] = useState("");
  const [business, setBusiness] = useState(filterOptions.business[0]);
  const [industry, setIndustry] = useState(filterOptions.industry[0]);
  const [county, setCounty] = useState(filterOptions.county[0]);
  const [companyAge, setCompanyAge] = useState(filterOptions.companyAge[0]);
  const [companySize, setCompanySize] = useState(filterOptions.companySize[0]);
  const [sourceCategory, setSourceCategory] = useState(filterOptions.sourceCategory[0]);
  const [status, setStatus] = useState(filterOptions.status[0]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (query) count++;
    if (business !== filterOptions.business[0]) count++;
    if (industry !== filterOptions.industry[0]) count++;
    if (county !== filterOptions.county[0]) count++;
    if (companyAge !== filterOptions.companyAge[0]) count++;
    if (companySize !== filterOptions.companySize[0]) count++;
    if (sourceCategory !== filterOptions.sourceCategory[0]) count++;
    if (status !== filterOptions.status[0]) count++;
    return count;
  }, [query, business, industry, county, companyAge, companySize, sourceCategory, status]);

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const q = query.toLowerCase().trim();
      const matchQuery =
        !q ||
        program.title.toLowerCase().includes(q) ||
        program.summary.toLowerCase().includes(q) ||
        program.source.toLowerCase().includes(q) ||
        (program.authorityCode && program.authorityCode.toLowerCase().includes(q)) ||
        program.industries.some((i) => i.toLowerCase().includes(q));

      const matchBusiness =
        business === filterOptions.business[0] ||
        program.businessTypes.includes(business) ||
        program.businessTypes.includes("Toate formele");

      const matchIndustry =
        industry === filterOptions.industry[0] || program.industries.includes(industry);

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
        matchCounty &&
        matchAge &&
        matchSize &&
        matchSource &&
        matchStatus
      );
    });
  }, [programs, query, business, industry, county, companyAge, companySize, sourceCategory, status]);

  const resetFilters = () => {
    setQuery("");
    setBusiness(filterOptions.business[0]);
    setIndustry(filterOptions.industry[0]);
    setCounty(filterOptions.county[0]);
    setCompanyAge(filterOptions.companyAge[0]);
    setCompanySize(filterOptions.companySize[0]);
    setSourceCategory(filterOptions.sourceCategory[0]);
    setStatus(filterOptions.status[0]);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Quick Category Chips */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {QUICK_CATEGORIES.map((cat) => {
          const isSelected = sourceCategory === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => setSourceCategory(cat.value)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
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
          Caută subvenții după denumire, domeniu, cod sau instituție
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
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Caută după denumire (ex: BISS, SCZ Vaci de Lapte, DR-30 Tineri Fermieri, Motorină, Irigații)..."
            className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-12 pr-10 text-sm text-slate-900 placeholder-slate-500 shadow-xs transition-colors focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
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
              Filtrare Avansată Programe &amp; Subvenții
            </span>
            <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-950">
              {filteredPrograms.length} din {programs.length} disponibile
            </span>
          </div>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-bold text-emerald-800 hover:underline focus-visible:outline-emerald-700"
              aria-label={`Resetează toate filtrele (${activeFilterCount} active)`}
            >
              Resetează filtrele ({activeFilterCount})
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Tip Firmă */}
          <div>
            <label htmlFor="filter-business" className="mb-1 block text-[11px] font-semibold text-slate-700">
              Formă Juridică
            </label>
            <select
              id="filter-business"
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-700 focus:outline-none"
            >
              {filterOptions.business.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Domeniu */}
          <div>
            <label htmlFor="filter-industry" className="mb-1 block text-[11px] font-semibold text-slate-700">
              Sector / Domeniu Agricol
            </label>
            <select
              id="filter-industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
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
              onChange={(e) => setCounty(e.target.value)}
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
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-700 focus:outline-none"
            >
              {filterOptions.status.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Vârstă Firmă */}
          <div>
            <label htmlFor="filter-company-age" className="mb-1 block text-[11px] font-semibold text-slate-700">
              Vechime Exploatație
            </label>
            <select
              id="filter-company-age"
              value={companyAge}
              onChange={(e) => setCompanyAge(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-700 focus:outline-none"
            >
              {filterOptions.companyAge.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Dimensiune */}
          <div>
            <label htmlFor="filter-company-size" className="mb-1 block text-[11px] font-semibold text-slate-700">
              Dimensiune Exploatație
            </label>
            <select
              id="filter-company-size"
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-700 focus:outline-none"
            >
              {filterOptions.companySize.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Sursă */}
          <div>
            <label htmlFor="filter-source-category" className="mb-1 block text-[11px] font-semibold text-slate-700">
              Instituție Emitentă
            </label>
            <select
              id="filter-source-category"
              value={sourceCategory}
              onChange={(e) => setSourceCategory(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-700 focus:outline-none"
            >
              {filterOptions.sourceCategory.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Header Summary */}
      <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-3">
        <p className="text-sm font-medium text-slate-700">
          Rezultate: <strong className="text-slate-900">{filteredPrograms.length}</strong>{" "}
          {filteredPrograms.length === 1 ? "intervenție / program găsit" : "intervenții / programe găsite"}
        </p>
        <span className="text-xs text-slate-600">Sincronizate din surse publice oficiale (APIA, AFIR, MADR, AFM)</span>
      </div>

      {/* Cards Grid */}
      {filteredPrograms.length > 0 ? (
        <div className="card-grid">
          {filteredPrograms.map((program) => (
            <FundingCard key={program.slug} program={program} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center">
          <p className="mb-2 text-base font-semibold text-slate-800">
            Nu a fost găsit niciun program conform criteriilor selectate.
          </p>
          <p className="mb-4 text-xs text-slate-600">
            Încearcă să elimini din filtre sau să cauți un termen agricol (ex: &quot;vaci&quot;, &quot;teren arabil&quot;, &quot;tineri fermieri&quot;, &quot;irigații&quot;).
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="rounded-lg bg-emerald-800 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-900 transition-colors focus-visible:outline-emerald-700"
            aria-label="Șterge toate filtrele active"
          >
            Șterge toate filtrele
          </button>
        </div>
      )}
    </div>
  );
}

export function FundingCard({ program }: { program: FundingProgram }) {
  const daysLeft = calculateDaysRemaining(program.deadline);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Deschis":
        return "badge-status badge-status-open";
      case "În curând":
        return "badge-status badge-status-upcoming";
      case "Permanent":
        return "badge-status bg-blue-100 text-blue-900 border-blue-200";
      case "Închis":
        return "badge-status badge-status-closed";
      default:
        return "badge-status badge-status-suspended";
    }
  };

  return (
    <article className="grant-card flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={getStatusBadge(program.status)}>{program.status}</span>
            {program.authorityCode && (
              <span className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white font-mono">
                {program.authorityCode}
              </span>
            )}
          </div>
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700 border border-slate-200">
            {program.sourceCategory}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-lg font-bold leading-snug text-slate-900 hover:text-emerald-800">
          <Link href={`/finantari/${program.slug}`}>{program.title}</Link>
        </h3>

        {/* Summary */}
        <p className="mb-4 line-clamp-3 text-xs leading-relaxed text-slate-700">
          {program.summary}
        </p>
      </div>

      <div>
        {/* Key Metrics */}
        <div className="mb-4 grid grid-cols-2 gap-2 border-y border-slate-100 py-3 text-xs">
          <div>
            <span className="block text-[10px] font-semibold uppercase text-slate-600">
              Sprijin / Finanțare
            </span>
            <span className="font-bold text-slate-900">
              {formatCurrencyRon(program.maxFundingRon)}
            </span>
            {program.maxFundingEur && (
              <span className="block text-[11px] text-slate-600">
                (~{formatCurrencyEur(program.maxFundingEur)})
              </span>
            )}
          </div>

          <div>
            <span className="block text-[10px] font-semibold uppercase text-slate-600">
              Termen depunere
            </span>
            <span className="font-semibold text-slate-800">
              {program.status === "Permanent"
                ? "Permanent"
                : new Intl.DateTimeFormat("ro-RO", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(`${program.deadline}T12:00:00`))}
            </span>
            {program.status === "Deschis" && (
              <span className="block text-[11px] font-bold text-amber-800">
                {daysLeft > 0 ? `${daysLeft} zile rămase` : "Ultima zi"}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <BookmarkButton slug={program.slug} />
          <Link
            href={`/finantari/${program.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:underline"
            aria-label={`Vezi detalii complete despre programul: ${program.title}`}
          >
            <span>Fișă completă</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

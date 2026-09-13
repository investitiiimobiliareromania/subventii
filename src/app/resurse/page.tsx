"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { downloadableResourcesCatalog } from "@/lib/resources-data";

export default function ResourcesPage() {
  const [selectedCat, setSelectedCat] = useState<string>("Toate");
  const [selectedInst, setSelectedInst] = useState<string>("Toate");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["Toate", "Ghid Solicitant", "Formular APIA", "Model Plan de Afaceri", "Contract Model", "Instrument Financiar"];
  const institutions = ["Toate", "APIA", "AFIR", "MADR", "AFM", "SUBVENȚII"];

  const filteredResources = downloadableResourcesCatalog.filter((res) => {
    const matchesCat = selectedCat === "Toate" || res.category === selectedCat;
    const matchesInst = selectedInst === "Toate" || res.institution === selectedInst;
    const matchesSearch =
      searchQuery.trim() === "" ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesInst && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Resurse Oficiale &amp; Ghiduri Solicitant</span>
          </nav>

          <div className="mb-8 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Biblioteca Oficială de Documente &amp; Instrumente Practice</span>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Ghiduri Oficiale, Modele de Lucru &amp; Instrumente Financiare
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
              Accesează direct ghidurile oficiale publicate de AFIR, APIA, MADR și AFM sau descarcă instrumentele financiare și modelele orientative de lucru dezvoltate de platforma SUBVENȚII.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="mb-8 space-y-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
            <div>
              <input
                type="text"
                placeholder="Caută în ghiduri, adeverințe, contracte, machete (ex: DR-14, DR-30, cashflow, arendă)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="space-y-1.5">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">Categorie</span>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCat(c)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                        selectedCat === c
                          ? "bg-emerald-800 text-white shadow-xs"
                          : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">Instituție / Sursă</span>
                <div className="flex flex-wrap gap-1.5">
                  {institutions.map((i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedInst(i)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                        selectedInst === i
                          ? "bg-slate-900 text-white shadow-xs"
                          : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResources.length === 0 ? (
              <div className="col-span-2 rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
                Nu au fost găsite documente care să corespundă criteriilor alese.
              </div>
            ) : (
              filteredResources.map((res) => (
                <div key={res.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between hover:border-emerald-200 transition-colors">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-slate-900 px-2.5 py-0.5 text-[10px] font-bold text-white">
                          {res.category}
                        </span>
                        <span className={`rounded px-2 py-0.5 text-[10px] font-bold border ${
                          res.institution === "SUBVENȚII"
                            ? "bg-emerald-100 text-emerald-900 border-emerald-300 font-mono"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}>
                          {res.institution}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold">
                        <span className="rounded bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-emerald-800">
                          {res.fileFormat}
                          {res.fileSizeMb && res.fileSizeMb > 0 ? ` • ${res.fileSizeMb} MB` : ""}
                        </span>
                        {res.documentDate && (
                          <span className="text-slate-400 font-medium">
                            {res.documentDate}
                          </span>
                        )}
                      </div>
                    </div>

                    <h2 className="text-base font-bold text-slate-900 mb-2 leading-snug">{res.title}</h2>
                    <p className="text-xs text-slate-600 mb-3 leading-relaxed">{res.description}</p>

                    {res.disclaimer && (
                      <div className="mb-3 rounded-lg bg-amber-50 border border-amber-200 p-2.5 text-[11px] text-amber-900 leading-relaxed font-medium">
                        ⚠️ <strong>Notă:</strong> {res.disclaimer}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-100 pt-3.5 space-y-2 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                      <span className="truncate max-w-[280px]">
                        Sursă: <strong className="text-slate-700">{res.isExternalPortal ? res.officialSource : "Instrument SUBVENȚII"}</strong>
                      </span>
                      {res.verifiedAt && (
                        <span>Verificat: <strong className="text-slate-700">{res.verifiedAt}</strong></span>
                      )}
                    </div>

                    {res.isExternalPortal ? (
                      <a
                        href={res.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 font-bold text-white hover:bg-slate-800 transition-colors shadow-xs text-xs"
                      >
                        <span>Vezi documentele oficiale ({res.institution})</span>
                        <span>↗</span>
                      </a>
                    ) : (
                      <a
                        href={res.downloadUrl}
                        download
                        className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-800 px-4 py-2.5 font-bold text-white hover:bg-emerald-900 transition-colors shadow-xs text-xs"
                      >
                        <span>Descarcă {res.fileFormat}</span>
                        <span>📥</span>
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <AiAssistantDrawer />
      <Footer />
    </div>
  );
}

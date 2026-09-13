"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { calendarEventsDataset } from "@/lib/calendar-data";

export default function CalendarPage() {
  const [filterType, setFilterType] = useState<string>("Toate");
  const [filterInst, setFilterInst] = useState<string>("Toate");

  const institutions = ["Toate", "APIA", "AFIR", "MADR", "AFM", "MEAT", "ADR"];
  const eventTypes = ["Toate", "Termen Limită", "Lansare", "Plată Avans", "Evaluare", "Consultare"];

  const filteredEvents = calendarEventsDataset.filter((ev) => {
    const matchesType = filterType === "Toate" || ev.eventType === filterType;
    const matchesInst = filterInst === "Toate" || ev.institution === filterInst;
    return matchesType && matchesInst;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Calendar Subvenții &amp; Finanțări</span>
          </nav>

          <div className="mb-8 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Termene Limită &amp; Lansări Oficiale 2026</span>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Calendarul Național al Apelurilor &amp; Campaniilor de Plată
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
              Date oficiale sincronizate cu calendarele APIA, AFIR, MADR și AFM. Urmărește termenele limită de depunere a cererilor unice de plată, deschiderea sesiunilor de proiecte europene și etapele de debursare a avansurilor.
            </p>
          </div>

          {/* Filters Matrix */}
          <div className="mb-8 space-y-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Filtrează după Instituție</span>
              <div className="flex flex-wrap gap-2">
                {institutions.map((inst) => (
                  <button
                    key={inst}
                    onClick={() => setFilterInst(inst)}
                    className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                      filterInst === inst
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {inst}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Tip Eveniment / Etapă</span>
              <div className="flex flex-wrap gap-2">
                {eventTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                      filterType === type
                        ? "bg-emerald-800 text-white shadow-xs"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-4">
            {filteredEvents.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
                Nu există evenimente pentru filtrele selectate.
              </div>
            ) : (
              filteredEvents.map((ev) => (
                <div key={ev.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-emerald-200 transition-colors">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="rounded-xl bg-slate-900 p-3.5 text-center text-white min-w-[90px] shrink-0">
                      <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Dată</span>
                      <span className="block text-sm font-black text-emerald-400 mt-0.5">{ev.date}</span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-900">
                          {ev.eventType}
                        </span>
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-800 border border-slate-200">
                          {ev.institution}
                        </span>
                        <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                          ev.status === "Deschis" ? "bg-emerald-500/10 text-emerald-700 border border-emerald-300" :
                          ev.status === "În curând" ? "bg-amber-500/10 text-amber-800 border border-amber-300" :
                          "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}>
                          {ev.status.toUpperCase()}
                        </span>
                        <span className="text-[11px] text-slate-400">• Acoperire: {ev.county}</span>
                      </div>

                      <h2 className="text-base font-bold text-slate-900">{ev.title}</h2>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">{ev.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <Link
                      href={`/finantari/${ev.programmeSlug}`}
                      className="rounded-lg bg-emerald-800 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-900 text-center flex-1 md:flex-initial"
                    >
                      Ghid &amp; Eligibilitate →
                    </Link>
                    {ev.officialSourceUrl && (
                      <a
                        href={ev.officialSourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 text-center flex-1 md:flex-initial"
                      >
                        Sursă Oficială ↗
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

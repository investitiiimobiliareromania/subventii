"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { calendarEventsDataset } from "@/lib/calendar-data";

export default function CalendarPage() {
  const [filterType, setFilterType] = useState<string>("Toate");

  const filteredEvents = calendarEventsDataset.filter(
    (ev) => filterType === "Toate" || ev.eventType === filterType
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Calendar Finanțări</span>
          </nav>

          <div className="mb-8 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Termene Limită & Lansări Oficiale</span>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Calendarul Apelurilor de Proiecte 2026
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
              Urmărește datele exacte de deschidere a sesiunilor de depunere, perioadele de consultare publică și termenele limită oficiale.
            </p>
          </div>

          {/* Filter Matrix */}
          <div className="mb-6 flex flex-wrap gap-2">
            {["Toate", "Lansare", "Termen Limită", "Consultare"].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-colors ${
                  filterType === t
                    ? "bg-emerald-800 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredEvents.map((ev) => (
              <div key={ev.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-slate-900 p-3 text-center text-white min-w-[75px]">
                    <span className="block text-[10px] font-semibold text-slate-400 uppercase">Dată</span>
                    <span className="block text-sm font-black text-emerald-400">{ev.date}</span>
                  </div>
                  <div>
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-900 mb-1 inline-block">
                      {ev.eventType} • {ev.institution}
                    </span>
                    <h2 className="text-base font-bold text-slate-900">{ev.title}</h2>
                    <span className="text-xs text-slate-500">Acoperire: {ev.county}</span>
                  </div>
                </div>

                <Link href={`/programe-guvernamentale/${ev.programmeSlug}`} className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 shrink-0">
                  Vezi Detalii Apel →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      <AiAssistantDrawer />
      <Footer />
    </div>
  );
}

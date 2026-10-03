"use client";

import { useState } from "react";
import Link from "next/link";
import { MathCalculationResult } from "@/lib/ai-educational-engine";

interface AssistantMessage {
  sender: "user" | "ai";
  text: string;
  calculation?: MathCalculationResult;
  citations?: string[];
  contactCta?: {
    label: string;
    programInterest: string;
    message: string;
  };
}

export function AiAssistantDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      sender: "ai",
      text: "Salut! Sunt Modulul AI Educațional. Calculez determinist finanțări, cofinanțări, procente, TVA, cost/mp și explic parametri oficiali din platformă. Introdu sume sau întreabă despre un program.",
    },
  ]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const userMsg = query.trim();
    setQuery("");
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMsg }),
      });
      const data = await res.json();

      if (data.answer) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: data.answer,
            calculation: data.calculation,
            citations: data.citations,
            contactCta: data.contactCta,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "Pentru un răspuns corect și o analiză exactă, sunt necesare câteva detalii despre situația specifică a proiectului tău.",
            contactCta: {
              label: "Solicită Consultanță & Analiză Proiect →",
              programInterest: "Consultanță Finanțare",
              message: `Întrebare: ${userMsg}`,
            },
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "A apărut o problemă temporară de conexiune. Poți solicita asistență directă prin formularul de contact.",
          contactCta: {
            label: "Deschide Formularul de Contact →",
            programInterest: "Suport Asistență",
            message: `Context utilizator: ${userMsg}`,
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenContactForm(cta?: { programInterest: string; message: string }) {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-contact-modal", {
          detail: {
            programInterest: cta?.programInterest || "Consultanță Finanțare & Proiecte",
            message: cta?.message || "Solicit o evaluare detaliată a opțiunilor de finanțare.",
          },
        })
      );
    }
    setIsOpen(false);
  }

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full bg-emerald-800 px-5 py-3.5 text-xs font-bold text-white shadow-xl hover:bg-emerald-900 transition-all hover:scale-105 active:scale-95 focus-visible:outline-emerald-700 cursor-pointer"
        aria-label="Deschide Asistentul AI Educațional"
        aria-expanded={isOpen}
      >
        <span className="flex h-2.5 w-2.5 relative" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
        </span>
        <span>AI Educațional</span>
      </button>

      {/* Floating Drawer Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-drawer-title"
          className="fixed inset-y-0 right-0 z-[110] flex w-full max-w-lg flex-col bg-white shadow-2xl border-l border-slate-200 animate-in slide-in-from-right duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-900 px-5 py-4 text-white">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-800 text-xs font-bold text-white shadow-xs" aria-hidden="true">
                ∑
              </div>
              <div>
                <h2 id="ai-drawer-title" className="text-sm font-bold text-white">AI Educațional &amp; Calcule</h2>
                <span className="text-[10px] text-slate-300">Calcule matematice deterministe și date oficiale</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-slate-300 hover:bg-slate-800 hover:text-white focus-visible:outline-emerald-700 cursor-pointer"
              aria-label="Închide fereastra asistentului AI"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`w-full max-w-[92%] rounded-2xl p-4 leading-relaxed ${
                    m.sender === "user"
                      ? "bg-slate-900 text-white rounded-br-none ml-auto"
                      : "bg-slate-50 text-slate-900 rounded-bl-none border border-slate-200"
                  }`}
                >
                  <p className="font-medium">{m.text}</p>

                  {/* Structured Calculation Display */}
                  {m.calculation && (
                    <div className="mt-3.5 space-y-3 pt-3 border-t border-slate-200/80">
                      <div className="font-bold text-slate-900 text-[11px] uppercase tracking-wide flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                        {m.calculation.resultTitle}
                      </div>

                      {/* Key Metric Figures Grid */}
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {m.calculation.keyFigures.map((kf, kfi) => (
                          <div
                            key={kfi}
                            className={`rounded-xl p-2.5 border ${
                              kf.isPrimary
                                ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold"
                                : "bg-white border-slate-200 text-slate-800"
                            }`}
                          >
                            <div className="text-[10px] text-slate-600 uppercase">{kf.label}</div>
                            <div className="text-xs font-bold mt-0.5">{kf.value}</div>
                          </div>
                        ))}
                      </div>

                      {/* Step-by-Step Breakdown */}
                      {m.calculation.stepByStep && m.calculation.stepByStep.length > 0 && (
                        <div className="rounded-xl bg-white border border-slate-200 p-2.5 font-mono text-[10px] text-slate-700 space-y-1">
                          <div className="font-bold text-slate-900 font-sans text-[10px] mb-1">Formulă &amp; Calcul:</div>
                          {m.calculation.stepByStep.map((step, si) => (
                            <div key={si}>{step}</div>
                          ))}
                        </div>
                      )}

                      {/* Explanation */}
                      {m.calculation.explanation && (
                        <p className="text-[11px] text-slate-600 leading-snug">
                          {m.calculation.explanation}
                        </p>
                      )}

                      {/* Educational Disclaimer */}
                      {m.calculation.educationalNote && (
                        <div className="text-[10px] text-slate-500 italic bg-slate-100/80 p-2 rounded-lg border border-slate-200">
                          ℹ️ {m.calculation.educationalNote}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Fallback Contact CTA */}
                  {m.contactCta && (
                    <div className="mt-3.5 pt-2.5 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => handleOpenContactForm(m.contactCta)}
                        className="w-full rounded-xl bg-emerald-800 px-3.5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-900 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>{m.contactCta.label}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Citations Badge */}
                {m.citations && m.citations.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {m.citations.map((c, ci) => (
                      <span key={ci} className="rounded bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] text-emerald-900 font-semibold">
                        📌 {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-slate-600 text-xs py-2">
                <span className="h-2 w-2 rounded-full bg-emerald-700 animate-bounce" aria-hidden="true"></span>
                <span className="h-2 w-2 rounded-full bg-emerald-700 animate-bounce delay-100" aria-hidden="true"></span>
                <span className="h-2 w-2 rounded-full bg-emerald-700 animate-bounce delay-200" aria-hidden="true"></span>
                <span>Se calculează determinist...</span>
              </div>
            )}
          </div>

          {/* Quick Example Prompts */}
          <div className="border-t border-slate-100 px-3 py-2 bg-slate-50 flex gap-1.5 overflow-x-auto text-[10px]">
            <button
              type="button"
              onClick={() => setQuery("Investiție 500.000 lei, finanțare 70%")}
              className="rounded-lg bg-white border border-slate-200 px-2.5 py-1 text-slate-700 hover:border-emerald-500 hover:text-emerald-900 shrink-0 cursor-pointer"
            >
              Exemplu 1: Investiție 500k, 70% grant
            </button>
            <button
              type="button"
              onClick={() => setQuery("Cât este 15% din 240.000 lei?")}
              className="rounded-lg bg-white border border-slate-200 px-2.5 py-1 text-slate-700 hover:border-emerald-500 hover:text-emerald-900 shrink-0 cursor-pointer"
            >
              Exemplu 2: 15% din 240.000
            </button>
            <button
              type="button"
              onClick={() => setQuery("Proprietate 1.200.000 lei și 120 mp preț/mp")}
              className="rounded-lg bg-white border border-slate-200 px-2.5 py-1 text-slate-700 hover:border-emerald-500 hover:text-emerald-900 shrink-0 cursor-pointer"
            >
              Exemplu 3: 1.2M lei la 120 mp
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="border-t border-slate-200 p-3 bg-white">
            <div className="relative flex items-center">
              <label htmlFor="ai-drawer-input" className="sr-only">
                Întreabă sau calculează cu AI Educațional
              </label>
              <input
                id="ai-drawer-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex: Investiție 500.000 lei, finanțare 70%..."
                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-3.5 pr-14 text-xs text-slate-900 outline-none focus:border-emerald-700 focus:bg-white"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-50 focus-visible:outline-emerald-700 cursor-pointer"
                aria-label="Calculează sau trimite"
              >
                Calculează
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
              <span>Calcule exacte fără aproximări LLM</span>
              <Link href="/asistent-ai" onClick={() => setIsOpen(false)} className="text-emerald-800 font-semibold hover:underline">
                Ecran complet →
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

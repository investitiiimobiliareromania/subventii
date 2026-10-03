"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
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

export default function AiAssistantPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      sender: "ai",
      text: "Salut! Sunt Modulul AI Educațional SUBVENȚII. Calculez determinist finanțări, cofinanțări, procente, TVA, cost pe mp și prezint parametri oficiali verificați din platformă.",
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
          text: "A apărut o problemă temporară de conectare. Poți solicita asistență directă prin formularul de contact.",
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
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">AI Educațional &amp; Calcule</span>
          </nav>

          <div className="mb-8 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Motor Educațional Determinist</span>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              AI Educațional: Calcule Financiare &amp; Date Oficiale
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
              Calculează, compară și explică logic pe baza formulelor financiare deterministe și a datelor oficiale verificate. Zero halucinații, rezultate exacte reproductibile.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-900 px-5 py-4 text-white">
              <div className="flex items-center gap-2">
                <span className="flex h-3 w-3 rounded-full bg-emerald-400"></span>
                <span className="text-xs font-bold">AI Educațional &amp; Motor de Calcul</span>
              </div>
              <span className="text-[11px] text-slate-400">Calcul Determinist + Citate Oficiale</span>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
              {messages.map((m, i) => (
                <div key={i} className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}>
                  <div className={`w-full max-w-[85%] rounded-2xl p-4 leading-relaxed ${m.sender === "user" ? "bg-slate-900 text-white rounded-br-none ml-auto" : "bg-white text-slate-900 rounded-bl-none border border-slate-200 shadow-xs"}`}>
                    <p className="font-medium text-xs sm:text-sm">{m.text}</p>

                    {/* Structured Calculation Display */}
                    {m.calculation && (
                      <div className="mt-4 space-y-3 pt-3 border-t border-slate-200">
                        <div className="font-bold text-slate-900 text-xs uppercase tracking-wide flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
                          {m.calculation.resultTitle}
                        </div>

                        {/* Key Metric Figures Grid */}
                        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                          {m.calculation.keyFigures.map((kf, kfi) => (
                            <div
                              key={kfi}
                              className={`rounded-xl p-3 border ${
                                kf.isPrimary
                                  ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold"
                                  : "bg-slate-50 border-slate-200 text-slate-800"
                              }`}
                            >
                              <div className="text-[10px] text-slate-500 uppercase">{kf.label}</div>
                              <div className="text-sm font-bold mt-0.5">{kf.value}</div>
                            </div>
                          ))}
                        </div>

                        {/* Step-by-Step Breakdown */}
                        {m.calculation.stepByStep && m.calculation.stepByStep.length > 0 && (
                          <div className="rounded-xl bg-slate-900 text-emerald-400 p-3 font-mono text-[11px] space-y-1">
                            <div className="font-bold text-white font-sans text-xs mb-1">Formulă &amp; Calcul Matematic:</div>
                            {m.calculation.stepByStep.map((step, si) => (
                              <div key={si}>{step}</div>
                            ))}
                          </div>
                        )}

                        {/* Explanation */}
                        {m.calculation.explanation && (
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {m.calculation.explanation}
                          </p>
                        )}

                        {/* Educational Disclaimer */}
                        {m.calculation.educationalNote && (
                          <div className="text-[11px] text-slate-500 italic bg-slate-100 p-2.5 rounded-lg border border-slate-200">
                            ℹ️ {m.calculation.educationalNote}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Fallback Contact CTA */}
                    {m.contactCta && (
                      <div className="mt-4 pt-3 border-t border-slate-200">
                        <button
                          type="button"
                          onClick={() => handleOpenContactForm(m.contactCta)}
                          className="rounded-xl bg-emerald-800 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-900 transition-colors inline-flex items-center gap-2 cursor-pointer"
                        >
                          <span>{m.contactCta.label}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {m.citations && m.citations.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {m.citations.map((c, ci) => (
                        <span key={ci} className="rounded bg-emerald-100 border border-emerald-300 px-2 py-0.5 text-[10px] text-emerald-900 font-bold">
                          📌 {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="text-xs text-slate-400 font-medium flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-600 animate-ping"></span>
                  Se efectuează calculul determinist...
                </div>
              )}
            </div>

            {/* Quick Example Prompts */}
            <div className="border-t border-slate-200 px-4 py-2.5 bg-slate-100 flex gap-2 overflow-x-auto text-xs">
              <button
                type="button"
                onClick={() => setQuery("O investiție este 500.000 lei, finanțarea este 70%")}
                className="rounded-lg bg-white border border-slate-300 px-3 py-1.5 text-slate-700 hover:border-emerald-500 hover:text-emerald-900 shrink-0 cursor-pointer font-medium"
              >
                Exemplu 1: Investiție 500.000 lei, finanțare 70%
              </button>
              <button
                type="button"
                onClick={() => setQuery("Cât este 15% din 240.000 lei?")}
                className="rounded-lg bg-white border border-slate-300 px-3 py-1.5 text-slate-700 hover:border-emerald-500 hover:text-emerald-900 shrink-0 cursor-pointer font-medium"
              >
                Exemplu 2: 15% din 240.000 lei
              </button>
              <button
                type="button"
                onClick={() => setQuery("Care este diferența între 500.000 și 375.000?")}
                className="rounded-lg bg-white border border-slate-300 px-3 py-1.5 text-slate-700 hover:border-emerald-500 hover:text-emerald-900 shrink-0 cursor-pointer font-medium"
              >
                Exemplu 3: Diferența între 500k și 375k
              </button>
              <button
                type="button"
                onClick={() => setQuery("O proprietate costă 1.200.000 lei și are 120 mp. Care este prețul/mp?")}
                className="rounded-lg bg-white border border-slate-300 px-3 py-1.5 text-slate-700 hover:border-emerald-500 hover:text-emerald-900 shrink-0 cursor-pointer font-medium"
              >
                Exemplu 4: 1.200.000 lei la 120 mp preț/mp
              </button>
            </div>

            <form onSubmit={handleSend} className="border-t border-slate-200 p-4 bg-white">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Scrie o întrebare sau calcul (ex: Investiție 500.000 lei, finanțare 70%)..."
                  className="flex-1 rounded-xl border border-slate-300 bg-slate-50 p-3 text-xs text-slate-900 outline-none focus:border-emerald-700 focus:bg-white"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-slate-900 px-6 py-3 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
                >
                  Calculează
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

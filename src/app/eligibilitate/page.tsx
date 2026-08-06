"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";

export default function EligibilityPage() {
  const [step, setStep] = useState(1);
  const [companyType, setCompanyType] = useState("SRL");
  const [employees, setEmployees] = useState("1-9");
  const [turnover, setTurnover] = useState("Sub 500k EUR");
  const [hasInnovation, setHasInnovation] = useState(true);
  const [hasGreenEnergy, setHasGreenEnergy] = useState(true);
  const [calculated, setCalculated] = useState(false);

  function handleCalculate() {
    setCalculated(true);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Calculator Eligibilitate</span>
          </nav>

          <div className="mb-8 border-b border-slate-200 pb-6 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Test Rapid Eligibilitate</span>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Motorul de Verificare a Eligibilității pentru Granturi
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Completează formularul interactiv de evaluare pentru a calcula scorul tău estimat și programele recomandate.
            </p>
          </div>

          {!calculated ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8 shadow-xs">
              <div className="mb-6 flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Pasul {step} din 3</span>
                <span>Progres: {step === 1 ? "33%" : step === 2 ? "66%" : "100%"}</span>
              </div>

              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">1. Formă Juridică Entitate</label>
                    <select
                      value={companyType}
                      onChange={(e) => setCompanyType(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white p-3 text-xs text-slate-900 outline-none"
                    >
                      <option value="SRL">SRL (Societate cu Răspundere Limitată)</option>
                      <option value="PFA">PFA / Întreprindere Individuală</option>
                      <option value="NGO">ONG / Asociație / Fundație</option>
                      <option value="PF">Persoană Fizică (Neangajat / Absolvent)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">2. Număr de Angajați Existenti</label>
                    <select
                      value={employees}
                      onChange={(e) => setEmployees(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white p-3 text-xs text-slate-900 outline-none"
                    >
                      <option value="0">0 angajați (Firmă nouă / Neînființată)</option>
                      <option value="1-9">1 - 9 angajați (Microîntreprindere)</option>
                      <option value="10-49">10 - 49 angajați (Întreprindere mică)</option>
                      <option value="50+">50+ angajați (Mijlocie / Mare)</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="w-full rounded-lg bg-emerald-800 py-3 text-xs font-bold text-white hover:bg-emerald-900"
                  >
                    Pasul Următor →
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">3. Cifra de Afaceri Anuală</label>
                    <select
                      value={turnover}
                      onChange={(e) => setTurnover(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white p-3 text-xs text-slate-900 outline-none"
                    >
                      <option value="Sub 100k EUR">Sub 100.000 EUR</option>
                      <option value="Sub 500k EUR">100.000 EUR - 500.000 EUR</option>
                      <option value="Sub 2M EUR">500.000 EUR - 2.000.000 EUR</option>
                      <option value="Peste 2M EUR">Peste 2.000.000 EUR</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 text-xs font-bold text-slate-900">
                      <input
                        type="checkbox"
                        checked={hasInnovation}
                        onChange={(e) => setHasInnovation(e.target.checked)}
                        className="h-4 w-4 rounded text-emerald-600"
                      />
                      <span>Proiectul include componente de digitalizare, IT sau inovare tehnică (+20 puncte)</span>
                    </label>
                    <label className="flex items-center gap-3 text-xs font-bold text-slate-900">
                      <input
                        type="checkbox"
                        checked={hasGreenEnergy}
                        onChange={(e) => setHasGreenEnergy(e.target.checked)}
                        className="h-4 w-4 rounded text-emerald-600"
                      />
                      <span>Investiția include panouri fotovoltaice sau eficiență energetică (+15 puncte)</span>
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="w-1/3 rounded-lg border border-slate-300 bg-white py-3 text-xs font-bold text-slate-700"
                    >
                      ← Înapoi
                    </button>
                    <button
                      onClick={handleCalculate}
                      className="w-2/3 rounded-lg bg-emerald-800 py-3 text-xs font-bold text-white hover:bg-emerald-900"
                    >
                      Calculează Scorul de Eligibilitate →
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg space-y-6">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-2xl font-black">
                88%
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">Eligibilitate Ridicată Detectată!</h2>
              <p className="text-xs text-slate-600 max-w-lg mx-auto">
                Profilul entității tău se potrivește excelent pentru granturile necomutabile din programele Start-Up Nation 2026 și PNRR Digitalizare.
              </p>

              <div className="text-left rounded-xl bg-slate-50 p-5 border border-slate-200 space-y-2 text-xs">
                <span className="font-bold text-slate-900 block mb-2">Programe Recomandate Direct:</span>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span>Start-Up Nation 2026 (Grant 250.000 RON)</span>
                  <strong className="text-emerald-700">Eligibil 95%</strong>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span>PNRR Digitalizare IMM (Grant până la 100.000 EUR)</span>
                  <strong className="text-emerald-700">Eligibil 85%</strong>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button onClick={() => setCalculated(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700">
                  Refă Testul
                </button>
                <Link href="/contact" className="rounded-lg bg-emerald-800 px-6 py-2 text-xs font-bold text-white hover:bg-emerald-900">
                  Solicită Consultanță Dosar →
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <AiAssistantDrawer />
      <Footer />
    </div>
  );
}

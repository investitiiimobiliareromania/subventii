"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { creditProducts, referenceIndicesHistory } from "@/lib/credite-data";

export default function CreditePage() {
  const [loanAmount, setLoanAmount] = useState(350000);
  const [interestRate, setInterestRate] = useState(7.5);
  const [years, setYears] = useState(25);

  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = years * 12;
  const monthlyPayment =
    monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      : loanAmount / numberOfPayments;

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - loanAmount;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Credite & Inteligență Bancară</span>
          </nav>

          <div className="mb-8 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Ghid Bancar & Calcul Rata Lunar</span>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Ghidul Creditelor Ipotecare și pentru IMM-uri 2026
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
              Analizează produsele bancare de refinanțare, creditare ipotecară, Noua Casă și creditare de investiții IMM cu garanții europene.
            </p>
          </div>

          {/* Reference Indices Bar */}
          <div className="mb-10 grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-4 text-center">
            <div>
              <span className="block text-[11px] font-semibold text-slate-500">IRCC Trimestrial</span>
              <span className="text-xl font-black text-emerald-800">{referenceIndicesHistory.currentIrcc}%</span>
            </div>
            <div>
              <span className="block text-[11px] font-semibold text-slate-500">ROBOR 3M</span>
              <span className="text-xl font-black text-slate-900">{referenceIndicesHistory.currentRobor3m}%</span>
            </div>
            <div>
              <span className="block text-[11px] font-semibold text-slate-500">ROBOR 6M</span>
              <span className="text-xl font-black text-slate-900">{referenceIndicesHistory.currentRobor6m}%</span>
            </div>
            <div>
              <span className="block text-[11px] font-semibold text-slate-500">Actualizare</span>
              <span className="text-xs font-bold text-slate-700">{referenceIndicesHistory.lastUpdated}</span>
            </div>
          </div>

          {/* Interactive Calculator Section */}
          <div className="mb-12 rounded-2xl border border-slate-200 bg-slate-900 p-6 md:p-8 text-white shadow-xl">
            <h2 className="text-xl font-bold mb-2">Calculator Interactiv Rată Credit</h2>
            <p className="text-xs text-slate-300 mb-6">Simulează rata lunară și dobânda totală pentru împrumutul tău ipotecar sau de investiții.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Suma Împrumutată: {loanAmount.toLocaleString("ro-RO")} RON</label>
                <input
                  type="range"
                  min={50000}
                  max={2000000}
                  step={10000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Dobândă Anuală (%): {interestRate}%</label>
                <input
                  type="range"
                  min={3}
                  max={15}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Perioadă (Ani): {years} ani</label>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-800 pt-6 text-center">
              <div className="rounded-xl bg-slate-800 p-4">
                <span className="block text-[11px] font-semibold text-slate-400">Rată Lunară Estimată</span>
                <span className="text-2xl font-black text-emerald-400">{Math.round(monthlyPayment).toLocaleString("ro-RO")} RON/lună</span>
              </div>
              <div className="rounded-xl bg-slate-800 p-4">
                <span className="block text-[11px] font-semibold text-slate-400">Total Dobândă de Plătit</span>
                <span className="text-xl font-bold text-white">{Math.round(totalInterest).toLocaleString("ro-RO")} RON</span>
              </div>
              <div className="rounded-xl bg-slate-800 p-4">
                <span className="block text-[11px] font-semibold text-slate-400">Sursă Referință</span>
                <span className="text-xs font-bold text-slate-300 mt-1 block">Norme BNR / IRCC</span>
              </div>
            </div>
          </div>

          {/* Product Catalog */}
          <h2 className="text-xl font-bold text-slate-900 mb-6">Categorii de Credite & Finanțări</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creditProducts.map((prod) => (
              <div key={prod.id} className="grant-card">
                <div>
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700 mb-3 inline-block">
                    {prod.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{prod.title}</h3>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">{prod.summary}</p>
                </div>

                <div className="border-t border-slate-100 pt-3 text-xs space-y-2">
                  <div className="flex justify-between"><span className="text-slate-500">Dobândă:</span> <strong className="text-emerald-800">{prod.approximateRate}</strong></div>
                  <div className="flex justify-between"><span className="text-slate-500">Avans Minim:</span> <strong>{prod.minDownPayment}</strong></div>
                  <div className="flex justify-between"><span className="text-slate-500">Perioadă Max:</span> <strong>{prod.maxTermYears} Ani</strong></div>
                  <Link href="/contact" className="mt-4 block text-center rounded-lg bg-emerald-800 py-2 font-bold text-white hover:bg-emerald-900">
                    Cere Ofertă Bancară →
                  </Link>
                </div>
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

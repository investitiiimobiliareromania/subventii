"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { filterOptions } from "@/lib/funding-data";

export default function SmartAlertsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Alerte Smart Programe Noi</span>
          </nav>

          <div className="mb-8 border-b border-slate-200 pb-6 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Notificări în Timp Real Fără Cont</span>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Abonează-te la Alerte Inteligente pentru Fonduri
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              Primește notificări instant când se lansează un program nou pe domeniul tău, se suplimentează bugetul sau se modifică un termen limită.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8 shadow-xs">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-2xl">
                  ✓
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Abonare Confirmată cu Succes!</h2>
                <p className="text-xs text-slate-600">
                  Vei primi notificări oficiale imediat ce apar actualizări ministeriale conform criteriilor tale.
                </p>
                <button onClick={() => setSubmitted(false)} className="rounded-lg bg-emerald-800 px-6 py-2 text-xs font-bold text-white hover:bg-emerald-900">
                  Modifică Preferințele
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">Adresă de Email *</label>
                    <input required name="email" type="email" placeholder="nume@companie.ro" className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-xs text-slate-900 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">Număr de Telefon (Opțional SMS/WhatsApp)</label>
                    <input name="phone" type="tel" placeholder="07xx xxx xxx" className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-xs text-slate-900 outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">Județ de Interes</label>
                    <select name="county" className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-xs text-slate-900 outline-none">
                      {filterOptions.county.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">Domeniu de Activitate</label>
                    <select name="industry" className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-xs text-slate-900 outline-none">
                      {filterOptions.industry.map((ind) => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-emerald-800 py-3 text-xs font-bold text-white hover:bg-emerald-900 disabled:opacity-50"
                >
                  {loading ? "Se abonează..." : "Activează Alerte Inteligente →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <AiAssistantDrawer />
      <Footer />
    </div>
  );
}

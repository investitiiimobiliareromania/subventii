"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { filterOptions } from "@/lib/funding-data";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Add UTM / Referrer if available
    data.referrer = document.referrer || "Direct";
    data.utm = window.location.search || "None";
    data.browser = navigator.userAgent;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("A apărut o eroare la trimiterea mesajului.");
      }

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("O eroare necunoscută a apărut.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Contact & Consultanță
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Suntem aici pentru a te ajuta să găsești cea mai bună sursă de finanțare pentru afacerea ta.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm">
            {success ? (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Mesajul a fost trimis cu succes!</h3>
                <p className="text-slate-600">
                  Un consultant te va contacta în cel mai scurt timp posibil.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-8 px-6 py-2 bg-emerald-800 text-white rounded-lg font-semibold hover:bg-emerald-900"
                >
                  Trimite un alt mesaj
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Nume și Prenume *</label>
                    <input required name="name" type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Companie *</label>
                    <input required name="company" type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Email *</label>
                    <input required name="email" type="email" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Telefon *</label>
                    <input required name="phone" type="tel" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Județ *</label>
                    <select required name="county" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white">
                      <option value="">Alege județul...</option>
                      {filterOptions.county.filter(c => c !== "Toate județele" && c !== "Național").map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Cod CAEN (dacă există)</label>
                    <input name="caen" type="text" placeholder="ex: 6201" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Program de interes</label>
                  <input name="programInterest" type="text" placeholder="ex: Start-Up Nation sau PNRR" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Mesaj / Detalii *</label>
                  <textarea required name="message" rows={5} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <input required name="gdpr" type="checkbox" className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded" />
                  <label className="text-sm text-slate-600">
                    Sunt de acord cu prelucrarea datelor mele cu caracter personal conform <a href="/politica-de-confidentialitate" className="text-emerald-700 underline">Politicii de Confidențialitate</a>. *
                  </label>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm font-medium">
                    {error}
                  </div>
                )}

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 disabled:opacity-50 transition-colors"
                >
                  {loading ? "Se trimite..." : "Trimite Solicitarea"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

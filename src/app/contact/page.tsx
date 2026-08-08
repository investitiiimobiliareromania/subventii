"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { filterOptions } from "@/lib/funding-data";
import { CONTACT_CONFIG } from "@/lib/contact/config";

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

    data.referrer = typeof document !== "undefined" ? document.referrer || "Direct" : "Direct";
    data.utm = typeof window !== "undefined" ? window.location.search || "None" : "None";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "A apărut o eroare la trimiterea mesajului.");
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
      <main className="flex-1 py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Consultanță & Suport Direct
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mt-1">
              Contact & Consultanță Proiecte Subvenții.ro
            </h1>
            <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Discută direct cu echipa noastră și Cristian Văduva pentru analizarea eligibilității și pregătirea dosarelor de finanțare.
            </p>
          </div>

          {/* Direct Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <a
              href={CONTACT_CONFIG.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 transition-colors text-center group"
            >
              <span className="text-2xl mb-2 block">💬</span>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                Contact WhatsApp Direct
              </h3>
              <p className="text-xs text-slate-600 mt-1">{CONTACT_CONFIG.phoneWaDisplay}</p>
              <span className="mt-3 inline-block text-[11px] font-bold text-emerald-800">
                Deschide chat instant →
              </span>
            </a>

            <a
              href={CONTACT_CONFIG.links.telRo}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-100 transition-colors text-center group"
            >
              <span className="text-2xl mb-2 block">📞</span>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                Telefon Direct România
              </h3>
              <p className="text-xs text-slate-600 mt-1">{CONTACT_CONFIG.phoneRoDisplay}</p>
              <span className="mt-3 inline-block text-[11px] font-bold text-slate-700">
                Apelează acum →
              </span>
            </a>

            <a
              href={CONTACT_CONFIG.links.email}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-100 transition-colors text-center group"
            >
              <span className="text-2xl mb-2 block">✉️</span>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                Email Oficial
              </h3>
              <p className="text-xs text-slate-600 mt-1">{CONTACT_CONFIG.email}</p>
              <span className="mt-3 inline-block text-[11px] font-bold text-slate-700">
                Trimite un mesaj →
              </span>
            </a>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-10 shadow-xs">
            {success ? (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Solicitarea a fost trimisă cu succes!</h3>
                <p className="text-slate-600 max-w-md mx-auto text-sm">
                  Un consultant te va contacta în cel mai scurt timp posibil. Solicitarea a fost transmisă securizat.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 px-6 py-2 bg-emerald-800 text-white rounded-lg font-bold text-xs hover:bg-emerald-900"
                >
                  Trimite altă solicitare
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nume și Prenume *</label>
                    <input required name="name" type="text" className="w-full px-4 py-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Companie *</label>
                    <input required name="company" type="text" className="w-full px-4 py-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email *</label>
                    <input required name="email" type="email" className="w-full px-4 py-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Telefon *</label>
                    <input required name="phone" type="tel" className="w-full px-4 py-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Județ *</label>
                    <select required name="county" className="w-full px-4 py-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
                      <option value="">Alege județul...</option>
                      {filterOptions.county.filter(c => c !== "Toate județele" && c !== "Național").map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Cod CAEN (dacă există)</label>
                    <input name="caen" type="text" placeholder="ex: 6201" className="w-full px-4 py-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Program de interes</label>
                  <input name="programInterest" type="text" placeholder="ex: Start-Up Nation sau PNRR Digitalizare" className="w-full px-4 py-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mesaj / Detalii Proiect *</label>
                  <textarea required name="message" rows={4} className="w-full px-4 py-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none bg-white"></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <input required name="gdpr" type="checkbox" className="mt-0.5 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded" />
                  <label className="text-xs text-slate-600">
                    Sunt de acord cu prelucrarea datelor mele cu caracter personal conform <a href="/politica-de-confidentialitate" className="text-emerald-700 underline font-semibold">Politicii de Confidențialitate</a>. *
                  </label>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs font-medium border border-red-200">
                    {error}
                  </div>
                )}

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-emerald-800 text-white rounded-lg text-xs font-bold hover:bg-emerald-900 disabled:opacity-50 transition-colors shadow-xs"
                >
                  {loading ? "Se trimite solicitarea..." : "Trimite Solicitarea de Consultanță →"}
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

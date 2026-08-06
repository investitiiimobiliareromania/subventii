"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function AiAssistantPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ sender: "user" | "ai"; text: string; citations?: string[] }[]>([
    {
      sender: "ai",
      text: "Bunogă! Sunt Asistentul AI Oficial Subvenții.ro. Răspund exclusiv pe baza ghidurilor solicitantului, legislației și fondurilor verificate. Cu ce te pot ajuta?",
    },
  ]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const userMsg = query;
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
          { sender: "ai", text: data.answer, citations: data.citations },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: "Nu am găsit informații în ghidurile oficiale pentru această întrebare." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Eroare la conectarea la serviciul AI. Te rugăm să încerci din nou." },
      ]);
    } finally {
      setLoading(false);
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
            <span className="font-semibold text-slate-800">Asistent AI Oficial</span>
          </nav>

          <div className="mb-8 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Motor RAG Fără Halucinații</span>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Asistentul Inteligent pentru Fonduri Nerambursabile
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
              Adresează orice întrebare privind ghidul Start-Up Nation, Noua Casă, Casa Verde sau apelurile PNRR. Răspunsurile includ citate din documentele oficiale.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 shadow-sm overflow-hidden flex flex-col h-[550px]">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-900 px-5 py-4 text-white">
              <div className="flex items-center gap-2">
                <span className="flex h-3 w-3 rounded-full bg-emerald-400"></span>
                <span className="text-xs font-bold">Consultanță AI în Timp Real</span>
              </div>
              <span className="text-[11px] text-slate-400">Baza de Date Conectată</span>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
              {messages.map((m, i) => (
                <div key={i} className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl p-4 leading-relaxed ${m.sender === "user" ? "bg-slate-900 text-white rounded-br-none" : "bg-white text-slate-900 rounded-bl-none border border-slate-200 shadow-xs"}`}>
                    {m.text}
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
                <div className="text-xs text-slate-400 font-medium">
                  Se interoghează baza de date oficială...
                </div>
              )}
            </div>

            <form onSubmit={handleSend} className="border-t border-slate-200 p-4 bg-white">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Scrie o întrebare (ex: Care este suma maximă la Start-Up Nation 2026?)..."
                  className="flex-1 rounded-xl border border-slate-300 bg-slate-50 p-3 text-xs text-slate-900 outline-none focus:border-emerald-700 focus:bg-white"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-slate-900 px-6 py-3 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  Adresează Întrebarea
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

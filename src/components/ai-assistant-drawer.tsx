"use client";

import { useState } from "react";
import Link from "next/link";

export function AiAssistantDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ sender: "user" | "ai"; text: string; citations?: string[] }[]>([
    {
      sender: "ai",
      text: "Salut! Sunt Asistentul AI Educațional AiX. Îți ofer sinteze și informații sintetizate din surse publice deschise privind finanțările și legislația. Cu ce te pot ajuta?",
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
          { sender: "ai", text: "Nu am găsit informații în publicațiile deschise pentru această întrebare." },
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
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full bg-emerald-800 px-5 py-3.5 text-xs font-bold text-white shadow-xl hover:bg-emerald-900 transition-all hover:scale-105 active:scale-95"
        aria-label="Deschide Asistentul AI"
      >
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
        </span>
        <span>Asistent AI Educațional</span>
      </button>

      {/* Floating Drawer Modal */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl border-l border-slate-200 animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-900 px-5 py-4 text-white">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-800 text-xs font-bold">
                AI
              </div>
              <div>
                <h3 className="text-sm font-bold">Asistent AI Educațional</h3>
                <span className="text-[10px] text-slate-400">Informații publice sintetizate în scop educațional</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                    m.sender === "user"
                      ? "bg-slate-900 text-white rounded-br-none"
                      : "bg-slate-100 text-slate-900 rounded-bl-none border border-slate-200"
                  }`}
                >
                  {m.text}
                </div>
                {m.citations && m.citations.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {m.citations.map((c, ci) => (
                      <span key={ci} className="rounded bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[10px] text-emerald-800 font-medium">
                        📌 {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs py-2">
                <span className="h-2 w-2 rounded-full bg-emerald-700 animate-bounce"></span>
                <span className="h-2 w-2 rounded-full bg-emerald-700 animate-bounce delay-100"></span>
                <span className="h-2 w-2 rounded-full bg-emerald-700 animate-bounce delay-200"></span>
                <span>Se analizează sursele publice...</span>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="border-t border-slate-200 p-3 bg-slate-50">
            <div className="relative flex items-center">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Întreabă despre Start-Up, Noua Casă sau PNRR..."
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-3.5 pr-12 text-xs text-slate-900 outline-none focus:border-emerald-700"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-50"
              >
                Trimit
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
              <span>Raspunde cu citate din ghiduri</span>
              <Link href="/asistent-ai" onClick={() => setIsOpen(false)} className="text-emerald-700 font-semibold hover:underline">
                Deschide ecran complet →
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

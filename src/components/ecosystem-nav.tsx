"use client";

import { useState, useRef, useEffect } from "react";
import { getEcosystemByCategory } from "@/lib/ecosystem/config";

export function EcosystemNav() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const categorized = getEcosystemByCategory();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleTrackClick = (serviceName: string, destinationUrl: string) => {
    setIsOpen(false);
    try {
      fetch("/api/telemetry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pathname: destinationUrl,
          referrer: typeof window !== "undefined" ? window.location.pathname : "/",
          sessionId: typeof sessionStorage !== "undefined" ? sessionStorage.getItem("subventii_sid") || "visitor_anon" : "visitor_anon",
          category: "ECOSYSTEM_CLICK",
          interest: `Ecosystem Service Selected: ${serviceName}`,
        }),
      }).catch(() => {});
    } catch {}
  };

  return (
    <div className="relative inline-block text-left self-start" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-emerald-400 hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700/60 shadow-xs min-h-[32px]"
        aria-expanded={isOpen}
        aria-label="Deschide rețeaua AiX Ecosystem"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
        <span>AiX Ecosystem</span>
        <svg
          className={`h-3 w-3 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 lg:right-0 mt-2 w-80 sm:w-96 max-w-[calc(100vw-2rem)] rounded-2xl bg-slate-900 border border-slate-800 p-4 shadow-2xl z-50 animate-in fade-in-50 zoom-in-95 box-border">
          <div className="border-b border-slate-800 pb-3 mb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                Cristian Văduva / AiX Intelligence Network
              </span>
              <h4 className="text-xs font-bold text-white">Rețeaua de Inteligență Financiară &amp; Imobiliară</h4>
            </div>
            <span className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-800/40 shrink-0">
              10 Platforms
            </span>
          </div>

          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            {Object.entries(categorized).map(([catKey, catGroup]) => (
              <div key={catKey}>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-1">
                  {catGroup.label}
                </span>
                <div className="grid grid-cols-1 gap-1">
                  {catGroup.items.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleTrackClick(item.name, item.href)}
                      className="group flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/80 transition-colors gap-2 min-w-0"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                            {item.name}
                          </span>
                          {item.badge && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700 shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{item.description}</p>
                      </div>
                      <span className="text-xs text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0">
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-2.5 mt-3 text-center">
            <a
              href="https://cristianvaduva.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
            >
              Powered by Cristian Văduva Ecosystem ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

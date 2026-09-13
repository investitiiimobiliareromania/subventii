"use client";

import Link from "next/link";
import { useState } from "react";
import { EcosystemNav } from "@/components/ecosystem-nav";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile Header */}
        <div className="lg:hidden flex flex-col gap-2">
          {/* Row 1 */}
          <div className="flex items-center justify-between h-16">
            <Link
              href="https://subventii.cristianvaduva.com/"
              className="brand-logo flex-shrink-0 text-sm font-extrabold tracking-tight text-slate-900 focus-visible:outline-emerald-700"
              aria-label="Subvenții - Platformă Națională de Informare - Pagina principală"
              title="Subvenții"
            >
              Subvenții
            </Link>
            <div className="flex items-center gap-2">
              <Link
                href="/bookmark-uri"
                className="text-xl text-emerald-800 p-1 hover:text-emerald-900 transition-colors focus-visible:outline-emerald-700 rounded"
                aria-label="Vezi programele salvate ca favorite"
              >
                ★
              </Link>
              <button
                type="button"
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus-visible:outline-emerald-700"
                aria-label={mobileMenuOpen ? "Închide meniul de navigare" : "Deschide meniul de navigare"}
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          {/* Row 2 */}
          <div className="lg:hidden w-full flex justify-start" data-mobile-ecosystem="true">
            <EcosystemNav />
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link
              href="https://subventii.cristianvaduva.com/"
              className="brand-logo flex-shrink-0 text-sm font-extrabold tracking-tight text-slate-900 focus-visible:outline-emerald-700"
              aria-label="Subvenții - Platformă Națională de Informare - Pagina principală"
              title="Subvenții"
            >
              Subvenții
            </Link>
            <nav aria-label="Meniu principal desktop" className="flex items-center gap-5 text-xs font-semibold text-slate-800">
              <Link href="/programes" className="hover:text-emerald-800 transition-colors focus-visible:outline-emerald-700 rounded px-1">Subvenții &amp; Finanțări</Link>
              <Link href="/calendar" className="hover:text-emerald-800 transition-colors focus-visible:outline-emerald-700 rounded px-1">Calendar &amp; Termene</Link>
              <Link href="/intelligence/regions" className="hover:text-emerald-800 transition-colors focus-visible:outline-emerald-700 rounded px-1">Județe</Link>
              <Link href="/stiri" className="hover:text-emerald-800 transition-colors focus-visible:outline-emerald-700 rounded px-1">Știri APIA &amp; AFIR</Link>
              <Link href="/legislatie" className="hover:text-emerald-800 transition-colors focus-visible:outline-emerald-700 rounded px-1">Legislație</Link>
              <Link href="/resurse" className="hover:text-emerald-800 transition-colors focus-visible:outline-emerald-700 rounded px-1">Ghiduri &amp; Cereri</Link>
              <Link href="/programe-guvernamentale" className="hover:text-emerald-800 transition-colors focus-visible:outline-emerald-700 rounded px-1">Programe Guvern</Link>
              <Link href="/institutii" className="hover:text-emerald-800 transition-colors focus-visible:outline-emerald-700 rounded px-1">Instituții</Link>
              <Link href="/glosar" className="hover:text-emerald-800 transition-colors focus-visible:outline-emerald-700 rounded px-1">Glosar</Link>
              <Link href="/contact" className="hover:text-emerald-800 transition-colors focus-visible:outline-emerald-700 rounded px-1">Contact</Link>
            </nav>
            <EcosystemNav />
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <nav aria-label="Meniu navigare mobil" className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 text-sm font-medium text-slate-900 animate-in slide-in-from-top-2">
            <Link onClick={() => setMobileMenuOpen(false)} href="/programes" className="block py-1.5 hover:text-emerald-800">Subvenții &amp; Finanțări Nerambursabile</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/calendar" className="block py-1.5 hover:text-emerald-800">Calendar Campanii &amp; Termene</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/intelligence/regions" className="block py-1.5 hover:text-emerald-800">Ghid Județe</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/stiri" className="block py-1.5 hover:text-emerald-800">Știri &amp; Noutăți Oficiale</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/legislatie" className="block py-1.5 hover:text-emerald-800">Legislație &amp; Ordine MADR</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/resurse" className="block py-1.5 hover:text-emerald-800">Ghiduri PDF &amp; Documente Tipizate</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/programe-guvernamentale" className="block py-1.5 hover:text-emerald-800">Programe Guvernamentale</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/institutii" className="block py-1.5 hover:text-emerald-800">Instituții Publice (APIA, AFIR, MADR)</Link>
            <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
              <Link onClick={() => setMobileMenuOpen(false)} href="/eligibilitate" className="px-3 py-1.5 rounded-md bg-slate-100 font-semibold text-slate-900 hover:bg-slate-200">Eligibilitate</Link>
              <Link onClick={() => setMobileMenuOpen(false)} href="/compara" className="px-3 py-1.5 rounded-md bg-slate-100 font-semibold text-slate-900 hover:bg-slate-200">Comparare</Link>
              <Link onClick={() => setMobileMenuOpen(false)} href="/glosar" className="px-3 py-1.5 rounded-md bg-slate-100 font-semibold text-slate-900 hover:bg-slate-200">Glosar PAC</Link>
              <Link onClick={() => setMobileMenuOpen(false)} href="/asistent-ai" className="px-3 py-1.5 rounded-md bg-emerald-100 text-emerald-950 font-bold hover:bg-emerald-200">Asistent AI</Link>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <Link onClick={() => setMobileMenuOpen(false)} href="/despre" className="hover:text-emerald-800">Despre Platformă</Link>
              <Link onClick={() => setMobileMenuOpen(false)} href="/contact" className="hover:text-emerald-800">Contact Direct</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

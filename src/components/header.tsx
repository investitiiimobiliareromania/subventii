"use client";

import Link from "next/link";
import { useState } from "react";
// import { useBookmarks } from "@/lib/bookmarks"; // removed unused import

import { EcosystemNav } from "@/components/ecosystem-nav";

export function Header() {
// const bookmarks = useBookmarks(); // removed unused variable

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile Header */}
        <div className="lg:hidden flex flex-col gap-2">
          {/* Row 1 */}
          <div className="flex items-center justify-between h-16">
            <Link href="https://subventii.cristianvaduva.com/" className="brand-logo flex-shrink-0 text-sm font-extrabold tracking-tight text-slate-900" aria-label="Subvenții - AiX Educational Intelligence - Pagina principală" title="Subvenții">
              Subvenții
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-xl text-emerald-400">★</span>
              <button className="p-2 rounded-lg text-slate-600 hover:bg-slate-100" aria-label="Deschide meniul" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <Link href="https://subventii.cristianvaduva.com/" className="brand-logo flex-shrink-0 text-sm font-extrabold tracking-tight text-slate-900" aria-label="Subvenții - AiX Educational Intelligence - Pagina principală" title="Subvenții">
              Subvenții
            </Link>
            <nav className="flex items-center gap-6 text-xs font-semibold text-slate-700">
              <Link href="/programes" className="hover:text-emerald-800 transition-colors">Finanțări</Link>
              <Link href="/programe-guvernamentale" className="hover:text-emerald-800 transition-colors">Programe Guvernamentale</Link>
              <Link href="/stiri" className="hover:text-emerald-800 transition-colors">Știri</Link>
              <Link href="/legislatie" className="hover:text-emerald-800 transition-colors">Legislație</Link>
              <Link href="/credite" className="hover:text-emerald-800 transition-colors">Credite</Link>
              <Link href="/piata-imobiliara" className="hover:text-emerald-800 transition-colors">Piața Imobiliară</Link>
              <Link href="/asigurari" className="hover:text-emerald-800 transition-colors">Asigurări</Link>
              <Link href="/rapoarte-ancpi" className="hover:text-emerald-800 transition-colors">Rapoarte ANCPI</Link>
              <Link href="/institutii" className="hover:text-emerald-800 transition-colors">Instituții</Link>
              <Link href="/despre" className="hover:text-emerald-800 transition-colors">Despre</Link>
              <Link href="/contact" className="hover:text-emerald-800 transition-colors">Contact</Link>
            </nav>
            <EcosystemNav />
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 text-sm font-medium text-slate-800 animate-in slide-in-from-top-2">
            <Link onClick={() => setMobileMenuOpen(false)} href="/programes" className="block py-1.5 hover:text-emerald-800">Finanțări Nerambursabile</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/programe-guvernamentale" className="block py-1.5 hover:text-emerald-800">Programe Guvernamentale</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/stiri" className="block py-1.5 hover:text-emerald-800">Știri &amp; Noutăți Editorial</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/legislatie" className="block py-1.5 hover:text-emerald-800">Legislație</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/credite" className="block py-1.5 hover:text-emerald-800">Credite &amp; Dobânzi</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/piata-imobiliara" className="block py-1.5 hover:text-emerald-800">Piața Imobiliară</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/asigurari" className="block py-1.5 hover:text-emerald-800">Asigurări</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/rapoarte-ancpi" className="block py-1.5 hover:text-emerald-800">Rapoarte ANCPI</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/institutii" className="block py-1.5 hover:text-emerald-800">Instituții Publice</Link>
            <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
              <Link onClick={() => setMobileMenuOpen(false)} href="/calendar" className="px-3 py-1.5 rounded-md bg-slate-100 font-semibold">Calendar</Link>
              <Link onClick={() => setMobileMenuOpen(false)} href="/eligibilitate" className="px-3 py-1.5 rounded-md bg-slate-100 font-semibold">Eligibilitate</Link>
              <Link onClick={() => setMobileMenuOpen(false)} href="/compara" className="px-3 py-1.5 rounded-md bg-slate-100 font-semibold">Comparare</Link>
              <Link onClick={() => setMobileMenuOpen(false)} href="/alerte" className="px-3 py-1.5 rounded-md bg-slate-100 font-semibold">Alerte</Link>
              <Link onClick={() => setMobileMenuOpen(false)} href="/resurse" className="px-3 py-1.5 rounded-md bg-slate-100 font-semibold">Resurse</Link>
              <Link onClick={() => setMobileMenuOpen(false)} href="/glosar" className="px-3 py-1.5 rounded-md bg-slate-100 font-semibold">Glosar</Link>
              <Link onClick={() => setMobileMenuOpen(false)} href="/asistent-ai" className="px-3 py-1.5 rounded-md bg-emerald-100 text-emerald-900 font-bold">Asistent AI</Link>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <Link onClick={() => setMobileMenuOpen(false)} href="/despre">Despre Platformă</Link>
              <Link onClick={() => setMobileMenuOpen(false)} href="/contact">Contact &amp; Consultanță</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

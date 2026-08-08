"use client";

import Link from "next/link";
import { useState } from "react";
import { useBookmarks } from "@/lib/bookmarks";

import { EcosystemNav } from "@/components/ecosystem-nav";

export function Header() {
  const bookmarks = useBookmarks();
  const count = bookmarks.length;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="brand-logo flex-shrink-0" aria-label="Subvenții.ro - Pagina principală">
            subvenții<span>.ro</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-700">
            <Link href="/programes" className="hover:text-emerald-800 transition-colors">
              Finanțări
            </Link>
            <Link href="/programe-guvernamentale" className="hover:text-emerald-800 transition-colors">
              Programe Guvernamentale
            </Link>
            <Link href="/stiri" className="hover:text-emerald-800 transition-colors">
              Știri
            </Link>
            <Link href="/legislatie" className="hover:text-emerald-800 transition-colors">
              Legislație
            </Link>
            <Link href="/credite" className="hover:text-emerald-800 transition-colors">
              Credite
            </Link>
            <Link href="/piata-imobiliara" className="hover:text-emerald-800 transition-colors">
              Piața Imobiliară
            </Link>
            <Link href="/asigurari" className="hover:text-emerald-800 transition-colors">
              Asigurări
            </Link>
            <Link href="/rapoarte-ancpi" className="hover:text-emerald-800 transition-colors">
              Rapoarte ANCPI
            </Link>
            <Link href="/institutii" className="hover:text-emerald-800 transition-colors">
              Instituții
            </Link>
            <Link href="/despre" className="hover:text-emerald-800 transition-colors">
              Despre
            </Link>
            <Link href="/contact" className="hover:text-emerald-800 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Action Pill & Ecosystem */}
          <div className="flex items-center gap-2 sm:gap-3">
            <EcosystemNav />
            <Link href="/bookmark-uri" className="bookmark-pill text-xs">
              <svg className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="hidden sm:inline">Salvate</span>
              {count > 0 && (
                <span className="ml-1 rounded-full bg-emerald-800 px-1.5 py-0.5 text-[11px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Deschide meniul"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 text-sm font-medium text-slate-800 animate-in slide-in-from-top-2">
          <Link onClick={() => setMobileMenuOpen(false)} href="/programes" className="block py-1.5 hover:text-emerald-800">
            Finanțări Nerambursabile
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} href="/programe-guvernamentale" className="block py-1.5 hover:text-emerald-800">
            Programe Guvernamentale
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} href="/stiri" className="block py-1.5 hover:text-emerald-800">
            Știri & Noutăți Editorial
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} href="/legislatie" className="block py-1.5 hover:text-emerald-800">
            Legislație
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} href="/credite" className="block py-1.5 hover:text-emerald-800">
            Credite & Dobânzi
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} href="/piata-imobiliara" className="block py-1.5 hover:text-emerald-800">
            Piața Imobiliară
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} href="/asigurari" className="block py-1.5 hover:text-emerald-800">
            Asigurări
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} href="/rapoarte-ancpi" className="block py-1.5 hover:text-emerald-800">
            Rapoarte ANCPI
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} href="/institutii" className="block py-1.5 hover:text-emerald-800">
            Instituții Publice
          </Link>

          <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
            <Link onClick={() => setMobileMenuOpen(false)} href="/calendar" className="px-3 py-1.5 rounded-md bg-slate-100 font-semibold">
              Calendar
            </Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/eligibilitate" className="px-3 py-1.5 rounded-md bg-slate-100 font-semibold">
              Eligibilitate
            </Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/compara" className="px-3 py-1.5 rounded-md bg-slate-100 font-semibold">
              Comparare
            </Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/alerte" className="px-3 py-1.5 rounded-md bg-slate-100 font-semibold">
              Alerte
            </Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/resurse" className="px-3 py-1.5 rounded-md bg-slate-100 font-semibold">
              Resurse
            </Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/glosar" className="px-3 py-1.5 rounded-md bg-slate-100 font-semibold">
              Glosar
            </Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/asistent-ai" className="px-3 py-1.5 rounded-md bg-emerald-100 text-emerald-900 font-bold">
              Asistent AI
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <Link onClick={() => setMobileMenuOpen(false)} href="/despre">Despre Platformă</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/contact">Contact & Consultanță</Link>
          </div>
        </div>
      )}
    </header>
  );
}

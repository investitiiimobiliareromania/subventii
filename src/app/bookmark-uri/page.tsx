"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FundingCard } from "@/components/funding-explorer";
import { useBookmarks } from "@/lib/bookmarks";
import { useEffect, useState } from "react";
import { type FundingProgram } from "@/lib/funding-data";

export default function BookmarksPage() {
  const bookmarks = useBookmarks();
  const [programs, setPrograms] = useState<FundingProgram[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPrograms() {
      try {
        const res = await fetch('/api/v1/programs');
        const json = await res.json();
        if (json.success) {
          setPrograms(json.data);
        }
      } catch (err) {
        console.error("Failed to load programs for bookmarks", err);
      } finally {
        setLoading(false);
      }
    }
    loadPrograms();
  }, []);

  const savedPrograms = programs.filter((program) => bookmarks.includes(program.slug));

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 border-b border-slate-200 pb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              Stocate doar local în browserul tău
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Programe Salvate ({loading ? '...' : savedPrograms.length})
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Aceste finanțări sunt salvate pe dispozitivul tău fără cont și fără autentificare.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20 text-slate-500">Se încarcă programele...</div>
          ) : savedPrograms.length > 0 ? (
            <div className="card-grid">
              {savedPrograms.map((program) => (
                <FundingCard key={program.slug} program={program} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center">
              <p className="mb-2 text-base font-semibold text-slate-800">
                Nu ai salvat încă nicio finanțare.
              </p>
              <p className="mb-6 text-xs text-slate-500 max-w-md mx-auto">
                Explorează catalogul de fonduri și apasă pe butonul <strong>Salvează</strong> pentru a păstra programele relevante.
              </p>
              <Link
                href="/programes"
                className="inline-flex items-center rounded-lg bg-emerald-800 px-5 py-2.5 text-xs font-semibold text-white hover:bg-emerald-900"
              >
                Caută Finanțări Acum →
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

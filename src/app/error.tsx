"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 flex items-center justify-center py-20 px-4 text-center">
        <div>
          <span className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2 block">Eroare Internă</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">A apărut o problemă</h1>
          <p className="text-slate-600 mb-10 max-w-lg mx-auto">
            Ne cerem scuze, dar a apărut o eroare la procesarea cererii tale. Te rugăm să reîncerci, iar dacă problema persistă, contactează-ne.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              Încearcă din nou
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-slate-100 px-6 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
            >
              Întoarce-te Acasă
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

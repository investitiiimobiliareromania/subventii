import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 flex items-center justify-center py-20 px-4 text-center">
        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-2 block">Eroare 404</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Pagina nu a fost găsită</h1>
          <p className="text-sm text-slate-600 mb-10 max-w-lg mx-auto leading-relaxed">
            Ne pare rău, dar pagina pe care o cauți nu există sau a fost mutată. Încearcă să te întorci la pagina principală sau să folosești funcția de căutare.
          </p>
          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-emerald-800 px-6 py-3 text-xs font-bold text-white transition-colors hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            ← Întoarce-te Acasă
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

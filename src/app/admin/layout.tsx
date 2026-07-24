import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="font-extrabold text-lg tracking-tight text-white">
            Subvenții.ro <span className="text-emerald-400 font-mono text-xs">CMS Admin</span>
          </Link>
        </div>
        <nav className="flex items-center gap-6 text-xs font-semibold text-slate-300">
          <Link href="/admin" className="hover:text-white">Dashboard</Link>
          <Link href="/admin/programe" className="hover:text-white">Gestionare Programe</Link>
          <Link href="/admin/validare" className="hover:text-white">Coadă Validare</Link>
          <Link href="/admin/audit" className="hover:text-white">Jurnal Audit</Link>
          <Link href="/" className="rounded bg-emerald-700 px-3 py-1.5 text-white hover:bg-emerald-600">
            Site Public ↗
          </Link>
        </nav>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6">{children}</main>

      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        Subvenții.ro Internal Administration System v1.0 • Toate modificările sunt jurnalizate.
      </footer>
    </div>
  );
}

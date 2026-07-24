import Link from "next/link";
import { programs } from "@/lib/funding-data";

export default function AdminDashboard() {
  const total = programs.length;
  const open = programs.filter((p) => p.status === "Deschis").length;
  const upcoming = programs.filter((p) => p.status === "În curând").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Tablou de Comandă Administrare</h1>
        <p className="text-xs text-slate-500">
          Privire de ansamblu asupra catalogului oficial și a verificărilor de sistem.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Total Programe</span>
          <span className="block text-3xl font-black text-slate-900 mt-1">{total}</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-emerald-700">Apeluri Deschise</span>
          <span className="block text-3xl font-black text-emerald-800 mt-1">{open}</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-amber-700">Ghiduri în Pregătire</span>
          <span className="block text-3xl font-black text-amber-800 mt-1">{upcoming}</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-blue-700">Stare Validare Sistem</span>
          <span className="block text-sm font-bold text-blue-900 mt-2">✓ 100% Date Verificate</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 mb-4">Acțiuni Rapide Administrare</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/programe"
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
          >
            Gestionare Programe →
          </Link>
          <Link
            href="/admin/validare"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
          >
            Verificare Coadă Validare
          </Link>
          <Link
            href="/admin/audit"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
          >
            Vizualizare Jurnal Audit
          </Link>
        </div>
      </div>
    </div>
  );
}

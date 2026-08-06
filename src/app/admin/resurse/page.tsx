import Link from "next/link";
import { downloadableResourcesCatalog } from "@/lib/resources-data";

export default function AdminResursePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Biblioteca de Resurse & Ghiduri PDF</h1>
          <p className="text-xs text-slate-500">Încărcare, versiuni și verificare URL-uri de descărcare.</p>
        </div>
        <Link href="/admin" className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800">
          ← Înapoi la Tablou
        </Link>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 mb-4">Resurse Înregistrate ({downloadableResourcesCatalog.length} Fișiere)</h2>
        <div className="space-y-3 text-xs">
          {downloadableResourcesCatalog.map((res) => (
            <div key={res.id} className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <strong className="text-slate-900">{res.title}</strong>
                <span className="block text-[11px] text-slate-400">{res.category} • {res.fileFormat} • {res.fileSizeMb} MB</span>
              </div>
              <span className="rounded bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-800 border border-emerald-200">
                Activ
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

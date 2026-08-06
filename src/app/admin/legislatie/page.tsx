import Link from "next/link";
import { legislationCatalog } from "@/lib/legislatie-data";

export default function AdminLegislatiePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manager Legislație</h1>
          <p className="text-xs text-slate-500">Introducere și actualizare acte normative, OUG, HG și legi.</p>
        </div>
        <Link href="/admin" className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800">
          ← Înapoi la Tablou
        </Link>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 mb-4">Acte Normative Înregistrate</h2>
        <div className="space-y-3 text-xs">
          {legislationCatalog.map((leg) => (
            <div key={leg.slug} className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white mr-2">
                  {leg.actType} {leg.actNumber}
                </span>
                <strong className="text-slate-900">{leg.title}</strong>
                <span className="block text-[11px] text-slate-400">Intrare în vigoare: {leg.effectiveDate}</span>
              </div>
              <span className="rounded bg-blue-50 px-2 py-1 text-[11px] font-bold text-blue-800 border border-blue-200">
                În Vigoare
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

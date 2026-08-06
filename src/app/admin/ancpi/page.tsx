import Link from "next/link";
import { ancpiMonthlyDataset } from "@/lib/rapoarte-ancpi-data";

export default function AdminAncpiPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Uploader & Manager Date ANCPI</h1>
          <p className="text-xs text-slate-500">Actualizare rapoarte de cadastru și tranzacții lunare pe județe.</p>
        </div>
        <Link href="/admin" className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800">
          ← Înapoi la Tablou
        </Link>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 mb-4">Dataset Curent Anexat ({ancpiMonthlyDataset.length} Județe)</h2>
        <div className="space-y-2 text-xs">
          {ancpiMonthlyDataset.slice(0, 5).map((s) => (
            <div key={s.countyCode} className="flex justify-between border-b border-slate-100 pb-2">
              <span><strong>{s.countyName} ({s.countyCode})</strong> — {s.region}</span>
              <span className="font-bold text-slate-900">{s.totalTransactions.toLocaleString("ro-RO")} tranzacții</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

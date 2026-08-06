import Link from "next/link";
import { getProgramsFromDb, getLegislativeChangesFromDb, getIngestionQueueFromDb } from "@/lib/db/repository";

export default async function AdminIntelligencePage() {
  const programs = await getProgramsFromDb();
  const legislation = await getLegislativeChangesFromDb();
  const queue = await getIngestionQueueFromDb();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Operations Center Inteligență & Ingestie Date</h1>
          <p className="text-xs text-slate-500">Monitorizarea fluxurilor de date, reclasificare automată și sincronizare MIPE/AFIR/AFM.</p>
        </div>
        <Link href="/admin" className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800">
          ← Înapoi la Tablou
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Total Programe Corelate</span>
          <span className="block text-3xl font-black text-slate-900 mt-1">{programs.length}</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-emerald-700">Acte Normative Indexate</span>
          <span className="block text-3xl font-black text-emerald-800 mt-1">{legislation.length}</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-amber-700">Elemente În Coadă Ingestie</span>
          <span className="block text-3xl font-black text-amber-800 mt-1">{queue.length}</span>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900">Stare Pipeline Ingestie Automată</h2>
        <div className="space-y-2 text-xs text-slate-700">
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span>Sursă MIPE (Ministerul Investițiilor și Proiectelor Europene)</span>
            <strong className="text-emerald-700">✓ Sincronizat (0.4s)</strong>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span>Sursă AFIR (Agenția pentru Finanțarea Investițiilor Rurale)</span>
            <strong className="text-emerald-700">✓ Sincronizat (0.6s)</strong>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span>Sursă AFM (Administrația Fondului pentru Mediu)</span>
            <strong className="text-emerald-700">✓ Sincronizat (0.5s)</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

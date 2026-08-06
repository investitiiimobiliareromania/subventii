import Link from "next/link";
import { glossaryCatalog } from "@/lib/glossary-data";

export default function AdminGlosarPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manager Glosar & Termeni Tehnici</h1>
          <p className="text-xs text-slate-500">Editare definiții, exemple de aplicare și legături legislative.</p>
        </div>
        <Link href="/admin" className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800">
          ← Înapoi la Tablou
        </Link>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 mb-4">Termeni Definiți În Glosar ({glossaryCatalog.length})</h2>
        <div className="space-y-3 text-xs">
          {glossaryCatalog.map((g) => (
            <div key={g.slug} className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <strong className="text-slate-900">{g.term}</strong>
                <span className="block text-[11px] text-slate-400">Categorie: {g.category}</span>
              </div>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700">
                Verificat
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

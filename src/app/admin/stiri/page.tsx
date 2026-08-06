import Link from "next/link";
import { newsroomArticles } from "@/lib/newsroom-data";

export default function AdminStiriPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Editor Articole Știri</h1>
          <p className="text-xs text-slate-500">Publicare, redactare și gestionare workflow editorial.</p>
        </div>
        <Link href="/admin" className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800">
          ← Înapoi la Tablou
        </Link>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 mb-4">Articole Publicate În Newsroom</h2>
        <div className="space-y-3 text-xs">
          {newsroomArticles.map((art) => (
            <div key={art.slug} className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-900 mr-2">
                  {art.category}
                </span>
                <strong className="text-slate-900">{art.headline}</strong>
                <span className="block text-[11px] text-slate-400">Autor: {art.author} • Publicat: {art.publishedAt}</span>
              </div>
              <span className="rounded bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-800 border border-emerald-200">
                Publicat
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

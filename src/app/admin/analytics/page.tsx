import Link from "next/link";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics & Telemetrie Platformă</h1>
          <p className="text-xs text-slate-500">Monitorizare vizitatori, conversii leads, performanță și erori.</p>
        </div>
        <Link href="/admin" className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800">
          ← Înapoi la Tablou
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Vizitatori Unici (Luna Curentă)</span>
          <span className="block text-3xl font-black text-slate-900 mt-1">128.450</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-xs">
          <span className="text-xs font-semibold text-emerald-700">Rată de Conversie Solicitări</span>
          <span className="block text-3xl font-black text-emerald-800 mt-1">4.2%</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-xs">
          <span className="text-xs font-semibold text-blue-700">Răspuns Mediu Server (LCP)</span>
          <span className="block text-3xl font-black text-blue-800 mt-1">0.8s</span>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-3 text-xs">
        <h2 className="text-sm font-bold text-slate-900">Configurație Servicii Observabilitate</h2>
        <div className="flex justify-between border-b border-slate-100 pb-2">
          <span>Google Analytics 4 (GA4)</span>
          <strong className="text-emerald-700">✓ Conectat</strong>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-2">
          <span>Microsoft Clarity Telemetry</span>
          <strong className="text-emerald-700">✓ Conectat</strong>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-2">
          <span>Sentry Error Monitoring</span>
          <strong className="text-emerald-700">✓ Conectat</strong>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import {
  getLiveActiveVisitors,
  getRecentSessions,
  getTopSearches,
  getTopDownloads,
  getSecurityEvents,
  computeDailySummary,
} from "@/lib/analytics/repository";

export const dynamic = "force-dynamic";

export default function AdminAnalyticsPage() {
  const liveVisitors = getLiveActiveVisitors(15);
  const recentSessions = getRecentSessions(15);
  const topSearches = getTopSearches(8);
  const topDownloads = getTopDownloads(8);
  const securityEvents = getSecurityEvents(8);
  const dailySummary = computeDailySummary();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Visitor & Marketing Intelligence</h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Date pseudonimizate first-party, scor de intent, telemetrie sesiuni și monitorizare securitate.
          </p>
        </div>
        <Link
          href="/admin"
          className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
        >
          ← Înapoi la Tablou
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Vizitatori Activi Acum (15m)</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-slate-900">{liveVisitors.length}</span>
            <span className="text-xs font-semibold text-emerald-600">în timp real</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Sesiuni Înregistrate Astăzi</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-slate-900">{dailySummary.totalSessions}</span>
            <span className="text-xs text-slate-500">({dailySummary.totalVisitors} unici)</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-amber-700">Sesiuni High Intent (≥50)</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-amber-800">{dailySummary.highIntentCount}</span>
            <span className="text-xs font-semibold text-amber-600">lead signals</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-blue-700">Conversii CTA & Contact</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-blue-800">
              {dailySummary.conversions.contactSubmits +
                dailySummary.conversions.phoneClicks +
                dailySummary.conversions.whatsappClicks +
                dailySummary.conversions.emailClicks}
            </span>
            <span className="text-xs text-slate-500">interacțiuni</span>
          </div>
        </div>
      </div>

      {/* Live Visitors Real-Time Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">🟢 Vizitatori Activi (Ultimele 15 minute)</h2>
            <p className="text-xs text-slate-500">Sesiuni curente cu pseudonimizare first-party</p>
          </div>
          <span className="text-xs font-semibold text-slate-400">{liveVisitors.length} activi</span>
        </div>

        {liveVisitors.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            Niciun vizitator activ în ultimele 15 minute. Evenimentele vor apărea în timp real la prima navigare.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Visitor ID</th>
                  <th className="px-4 py-3">Sursă / Canal</th>
                  <th className="px-4 py-3">Locație Aprox.</th>
                  <th className="px-4 py-3">Device & OS</th>
                  <th className="px-4 py-3">Pagină Curentă</th>
                  <th className="px-4 py-3">Durată</th>
                  <th className="px-4 py-3">Pagini</th>
                  <th className="px-4 py-3">Intent Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {liveVisitors.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-mono font-bold text-slate-900">{v.visitorId}</td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-slate-800">{v.source}</span>
                      {v.medium !== "none" && <span className="text-slate-400 text-[11px] block">{v.medium}</span>}
                    </td>
                    <td className="px-4 py-3">{v.city ? `${v.city}, ${v.country}` : v.country || "România"}</td>
                    <td className="px-4 py-3 text-slate-500">{`${v.deviceType} • ${v.os} • ${v.browser}`}</td>
                    <td className="px-4 py-3 font-mono text-slate-700 max-w-[200px] truncate">{v.exitPath || v.landingPath}</td>
                    <td className="px-4 py-3 text-slate-500">{Math.floor(v.durationSeconds / 60)}m {v.durationSeconds % 60}s</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{v.pageViews}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold ${
                          v.intentLevel === "VERY HIGH"
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : v.intentLevel === "HIGH"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : v.intentLevel === "MEDIUM"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {v.intentScore}/100 • {v.intentLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Grid for Searches, Downloads, Security */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Searches */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">🔎 Căutări Interne Recente</h2>
            <span className="text-xs text-slate-400">{topSearches.length} termeni</span>
          </div>
          {topSearches.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center">Nicio căutare internă înregistrată.</p>
          ) : (
            <div className="space-y-2 text-xs">
              {topSearches.map((s, idx) => (
                <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-50">
                  <span className="font-medium text-slate-800 truncate max-w-[180px]">„{s.query}”</span>
                  <span className="rounded bg-slate-100 px-2 py-0.5 font-bold text-slate-700">{s.count} căutări</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Downloads */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">📥 Resurse & Ghiduri Descărcate</h2>
            <span className="text-xs text-slate-400">{topDownloads.length} fișiere</span>
          </div>
          {topDownloads.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center">Nicio descărcare de resursă înregistrată.</p>
          ) : (
            <div className="space-y-2 text-xs">
              {topDownloads.map((d, idx) => (
                <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-50">
                  <div className="truncate max-w-[180px]">
                    <span className="font-medium text-slate-800 block truncate">{d.title}</span>
                    <span className="text-[10px] text-slate-400 uppercase">{d.type}</span>
                  </div>
                  <span className="rounded bg-emerald-50 px-2 py-0.5 font-bold text-emerald-700 border border-emerald-100">
                    {d.count} downloads
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Security Events */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">🛡️ Evenimente Securitate & Rate Limit</h2>
            <span className="text-xs text-slate-400">{securityEvents.length} loguri</span>
          </div>
          {securityEvents.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center">Niciun eveniment suspect blocat recent.</p>
          ) : (
            <div className="space-y-2 text-xs">
              {securityEvents.map((e, idx) => (
                <div key={idx} className="p-2 rounded bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-red-700">{e.type}</span>
                    <span className="text-[10px] text-slate-400">{e.timestamp.slice(11, 19)}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] truncate">{e.endpoint} — {e.reason}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Sessions History */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Sesiuni Recente (Istoric)</h2>
            <p className="text-xs text-slate-500">Ultimele sesiuni înregistrate în platformă</p>
          </div>
          <span className="text-xs font-semibold text-slate-400">{recentSessions.length} sesiuni</span>
        </div>

        {recentSessions.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            Nu există sesiuni înregistrate în memorie.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Session ID</th>
                  <th className="px-4 py-3">Visitor ID</th>
                  <th className="px-4 py-3">Canal</th>
                  <th className="px-4 py-3">Landing Page</th>
                  <th className="px-4 py-3">Exit Page</th>
                  <th className="px-4 py-3">Durată</th>
                  <th className="px-4 py-3">Pagini</th>
                  <th className="px-4 py-3">Scor Intent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentSessions.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-mono font-bold text-slate-900">{s.id}</td>
                    <td className="px-4 py-3 font-mono text-slate-600">{s.visitorId}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{s.source}</td>
                    <td className="px-4 py-3 font-mono text-slate-600 max-w-[150px] truncate">{s.landingPath}</td>
                    <td className="px-4 py-3 font-mono text-slate-600 max-w-[150px] truncate">{s.exitPath}</td>
                    <td className="px-4 py-3 text-slate-500">{Math.floor(s.durationSeconds / 60)}m {s.durationSeconds % 60}s</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{s.pageViews}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{s.intentScore}/100</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

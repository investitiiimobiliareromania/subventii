import { getAuditLogsFromDb } from "@/lib/db/repository";

export default async function AuditLogPage() {
  const auditLogs = await getAuditLogsFromDb();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Jurnal Audit Sistem</h1>
        <p className="text-xs text-slate-500">
          Istoric imutabil al tuturor modificărilor efectuate de administratori.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px]">
              <th className="p-3">Data / Ora</th>
              <th className="p-3">Administrator</th>
              <th className="p-3">Acțiune</th>
              <th className="p-3">Program ID</th>
              <th className="p-3">Justificare</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {auditLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/80">
                <td className="p-3 text-slate-500 font-mono">{log.createdAt}</td>
                <td className="p-3 font-semibold text-slate-800">{log.adminUserId}</td>
                <td className="p-3">
                  <span className="bg-slate-100 text-slate-800 font-mono px-2 py-0.5 rounded text-[10px] font-bold">
                    {log.action}
                  </span>
                </td>
                <td className="p-3 font-bold text-slate-900">{log.programId || "System"}</td>
                <td className="p-3 text-slate-600 italic">{log.justification || "Modificare operată în CMS"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

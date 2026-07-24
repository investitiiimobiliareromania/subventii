import { validateProgram } from "@/lib/utils/validation";
import { programs } from "@/lib/funding-data";
import type { LifecycleStatus } from "@/lib/db/types";

export default function ValidationQueuePage() {
  const checkResults = programs.map((p) => {
    const statusMap: Record<string, LifecycleStatus> = {
      Deschis: "Applications Open",
      "În curând": "Opening Soon",
      Închis: "Call Closed",
      Suspendat: "Call Suspended",
    };

    return {
      program: p,
      validation: validateProgram(
        {
          slug: p.slug,
          title: p.title,
          shortSummary: p.summary,
          status: statusMap[p.status] || "Opening Soon",
        },
        {
          maxFundingRon: p.maxFundingRon,
          cofinancingPercentage: 10,
          deadlineDate: p.deadline,
          launchDate: "2026-06-01",
        },
        p.officialUrl,
        p.businessTypes.length,
        p.counties.length
      ),
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Coadă Verificare și Validare Date</h1>
        <p className="text-xs text-slate-500">
          Verificarea automată a integrității datelor din sursele oficiale.
        </p>
      </div>

      <div className="space-y-4">
        {checkResults.map(({ program, validation }) => (
          <div
            key={program.slug}
            className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-between shadow-xs"
          >
            <div>
              <span className="text-xs font-semibold text-slate-400">
                {program.sourceCategory}
              </span>
              <h2 className="text-sm font-bold text-slate-900">{program.title}</h2>
              <p className="text-xs text-slate-500">{program.officialUrl}</p>
            </div>
            <div>
              {validation.isValid ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  ✓ Validat 100%
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  ⚠ Necesită revizuire
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

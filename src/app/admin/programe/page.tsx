"use client";

import Link from "next/link";
import { useState } from "react";
import { programs, formatCurrencyRon } from "@/lib/funding-data";

export default function AdminProgramsPage() {
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = programs.filter(
    (p) => filterStatus === "All" || p.status === filterStatus
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Gestionare Programe Finanțare</h1>
          <p className="text-xs text-slate-500">Editare, validare și modificare statusuri.</p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200">
        <span className="text-xs font-semibold text-slate-600">Filtrează după Status:</span>
        {["All", "Deschis", "În curând", "Închis"].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1 text-xs font-semibold rounded-md ${
              filterStatus === st
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Programs Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px]">
              <th className="p-3">Program</th>
              <th className="p-3">Sursă</th>
              <th className="p-3">Status</th>
              <th className="p-3">Finanțare Max.</th>
              <th className="p-3">Termen</th>
              <th className="p-3 text-right">Acțiuni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((p) => (
              <tr key={p.slug} className="hover:bg-slate-50/80">
                <td className="p-3 font-bold text-slate-900 max-w-xs truncate">{p.title}</td>
                <td className="p-3 text-slate-600">{p.sourceCategory}</td>
                <td className="p-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.status === "Deschis"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-3 font-semibold text-slate-800">
                  {formatCurrencyRon(p.maxFundingRon)}
                </td>
                <td className="p-3 text-slate-600">{p.deadline}</td>
                <td className="p-3 text-right space-x-2">
                  <Link
                    href={`/finantari/${p.slug}`}
                    target="_blank"
                    className="text-emerald-700 font-semibold hover:underline"
                  >
                    Vezi Live ↗
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

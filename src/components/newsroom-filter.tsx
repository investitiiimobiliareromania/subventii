"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { NewsArticle } from "@/lib/newsroom-data";

interface NewsroomFilterProps {
  articles: NewsArticle[];
}

const CATEGORIES = [
  "Toate",
  "Fonduri Europene",
  "Economie",
  "APIA",
  "AFIR",
  "Piața Imobiliară",
  "Energie",
  "Antreprenoriat",
  "Infrastructură",
  "Piața Muncii",
  "MADR",
];

export function NewsroomFilter({ articles }: NewsroomFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState("Toate");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesCategory =
        selectedCategory === "Toate" || art.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        art.headline.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q) ||
        art.institution.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Category Pills & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filtrare categorii știri">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Keyword Search */}
        <div className="w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Caută în știri oficiale..."
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-1.5 text-xs text-slate-900 placeholder:text-slate-600 outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
          />
        </div>
      </div>

      {/* Results Count Bar */}
      <div className="text-xs text-slate-500 flex items-center justify-between border-b border-slate-100 pb-2">
        <span>
          Afișare: <strong>{filteredArticles.length}</strong> {filteredArticles.length === 1 ? "articol oficial" : "articole oficiale"}
          {selectedCategory !== "Toate" && ` în categoria „${selectedCategory}”`}
        </span>
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="text-xs text-emerald-800 hover:underline font-semibold cursor-pointer"
          >
            Șterge căutarea
          </button>
        )}
      </div>

      {/* Article Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((art) => (
            <article key={art.slug} className="grant-card flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-emerald-500/80 transition-all hover:shadow-md">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-900">
                      {art.category}
                    </span>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-600 border border-slate-200 font-mono">
                      ✓ Verificat
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-500">{art.readingTimeMin} min lectură</span>
                </div>

                <h2 className="mb-2 text-base sm:text-lg font-bold text-slate-900 hover:text-emerald-800 leading-snug">
                  <Link href={`/stiri/${art.slug}`}>{art.headline}</Link>
                </h2>

                <p className="mb-4 text-xs leading-relaxed text-slate-600 line-clamp-3">
                  {art.summary}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500 truncate max-w-[180px]">
                  {art.publishedAt} • {art.institution.split("(")[0].trim()}
                </span>
                <Link
                  href={`/stiri/${art.slug}`}
                  className="font-bold text-emerald-800 hover:underline shrink-0"
                  aria-label={`Citește articolul: ${art.headline}`}
                >
                  Citește articol →
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center text-xs text-slate-600">
          Nu au fost găsite articole pentru criteriile selectate.
        </div>
      )}
    </div>
  );
}

"use client";

import { toggleBookmark, useBookmarks } from "@/lib/bookmarks";

export function BookmarkButton({ slug, className = "" }: { slug: string; className?: string }) {
  const bookmarks = useBookmarks();
  const active = bookmarks.includes(slug);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(slug);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={active ? "Șterge din lista salvată" : "Salvează finanțarea"}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-emerald-700 ${
        active
          ? "border-emerald-600 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
          : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900"
      } ${className}`}
    >
      <svg
        className={`h-4 w-4 transition-transform ${active ? "fill-emerald-600 stroke-emerald-600" : "fill-none stroke-current"}`}
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      <span>{active ? "Salvat" : "Salvează"}</span>
    </button>
  );
}

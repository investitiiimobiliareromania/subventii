"use client";

import Link from "next/link";
import { useBookmarks } from "@/lib/bookmarks";

export function Header() {
  const bookmarks = useBookmarks();
  const count = bookmarks.length;

  return (
    <header className="site-header">
      <Link href="/" className="brand-logo" aria-label="Subvenții.ro - Pagina principală">
        subvenții<span>.ro</span>
      </Link>
      <nav className="nav-links">
        <Link href="/programes">Căutare Finanțări</Link>
        <Link href="/despre">Despre Platformă</Link>
        <Link href="/bookmark-uri" className="bookmark-pill">
          <svg className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span>Salvate</span>
          {count > 0 && (
            <span className="ml-1 rounded-full bg-emerald-800 px-1.5 py-0.5 text-[11px] font-bold text-white">
              {count}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}

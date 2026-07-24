import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/50 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
        <div>
          <Link href="/" className="brand-logo mb-1 inline-block text-base">
            subvenții<span>.ro</span>
          </Link>
          <p className="max-w-md text-slate-500">
            Platformă independentă de indexare a fondurilor nerambursabile din surse publice oficiale (MIPE, ADR, AFIR, AFM, PNRR).
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <div className="flex gap-4 font-medium text-slate-600">
            <Link href="/programes" className="hover:text-emerald-800">Finanțări</Link>
            <Link href="/despre" className="hover:text-emerald-800">Despre & Surse</Link>
            <Link href="/bookmark-uri" className="hover:text-emerald-800">Programe Salvate</Link>
          </div>
          <p>© {new Date().getFullYear()} Subvenții.ro. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
}

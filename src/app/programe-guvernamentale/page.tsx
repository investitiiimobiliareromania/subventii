import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { governmentProgramsCatalog } from "@/lib/programe-guvernamentale-data";

export const metadata: Metadata = {
  title: "Ghidul Complet al Programelor Guvernamentale din România 2026",
  description: "Toate programele naționale și locale pentru locuințe, eficiență energetică, investiții și facilități fiscale, actualizate permanent.",
  alternates: { canonical: "https://subventii.cristianvaduva.com/programe-guvernamentale" },
};

export default function ProgrameGuvernamentalePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Programe Guvernamentale România 2026",
    "url": "https://subventii.cristianvaduva.com/programe-guvernamentale",
    "description": "Toate programele naționale și locale pentru locuințe, eficiență energetică și investiții.",
  };

  const catalogList = Object.values(governmentProgramsCatalog);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Programe Guvernamentale</span>
          </nav>

          <div className="mb-10 rounded-2xl border border-slate-200 bg-slate-50/70 p-8">
            <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-900 mb-3">
              Ghidul Programelor Guvernamentale 2026
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Ghidul complet al programelor guvernamentale din România
            </h1>
            <p className="mt-3 text-sm text-slate-600 max-w-3xl leading-relaxed">
              Toate programele naționale și locale pentru locuințe, eficiență energetică, investiții și facilități fiscale, actualizate permanent.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {catalogList.map((prog) => (
              <article key={prog.slug} className="grant-card">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="badge-status badge-status-open">{prog.heroBadge}</span>
                  </div>

                  <h2 className="mb-2 text-lg font-bold text-slate-900 hover:text-emerald-800 leading-snug">
                    <Link href={`/programe-guvernamentale/${prog.slug}`}>{prog.title}</Link>
                  </h2>

                  <p className="mb-4 text-xs leading-relaxed text-slate-600 line-clamp-3">
                    {prog.subtitle}
                  </p>
                </div>

                <div>
                  <div className="grid grid-cols-2 gap-2 border-y border-slate-100 py-3 text-xs mb-4">
                    {prog.stats.slice(0, 2).map((st, i) => (
                      <div key={i}>
                        <span className="block text-[10px] font-semibold text-slate-400 uppercase">{st.label}</span>
                        <span className="font-bold text-slate-900">{st.value}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/programe-guvernamentale/${prog.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:underline"
                  >
                    <span>Ghid complet & eligibilitate</span>
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <AiAssistantDrawer />
      <Footer />
    </div>
  );
}

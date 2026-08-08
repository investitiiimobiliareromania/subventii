import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { downloadableResourcesCatalog } from "@/lib/resources-data";

export const metadata: Metadata = {
  title: "Centrul de Resurse: Ghiduri PDF, Șabloane și Cereri Tip",
  description: "Descarcă gratuit ghidurile solicitantului în format PDF, modele editabile de plan de afaceri, machete de calcul financiar și declarații tipizate.",
  alternates: { canonical: "https://subventii.cristianvaduva.com/resurse" },
};

export default function ResourcesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Centrul de Resurse AiX Educational Intelligence",
    "url": "https://subventii.cristianvaduva.com/resurse",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">Resurse & Descărcări</span>
          </nav>

          <div className="mb-8 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Biblioteca de Documente Oficiale</span>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Ghiduri PDF, Modele de Plan de Afaceri și Documente Tipizate
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
              Resurse descărcabile destinate consultanților, antreprenorilor și persoanelor fizice care pregătesc un dosar de finanțare nerambursabilă.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {downloadableResourcesCatalog.map((res) => (
              <div key={res.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded bg-slate-900 px-2 py-0.5 text-[11px] font-bold text-white">
                      {res.category}
                    </span>
                    <span className="rounded bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                      {res.fileFormat} • {res.fileSizeMb} MB
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 mb-2 leading-snug">{res.title}</h2>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">{res.description}</p>
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">Format Verificat</span>
                  <a
                    href={res.downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-800 px-4 py-2 font-bold text-white hover:bg-emerald-900"
                  >
                    <span>Descarcă Fișierul</span>
                    <span>📥</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <AiAssistantDrawer />
      <Footer />
    </div>
  );
}

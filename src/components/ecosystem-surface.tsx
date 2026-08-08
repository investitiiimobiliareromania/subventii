import { AIX_ECOSYSTEM } from "@/lib/ecosystem/config";

export function EcosystemSurface() {
  return (
    <section className="border-t border-slate-200/80 bg-slate-900 text-white py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <span className="mb-2 inline-block font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Rețeaua Oficială de Inteligență &amp; Servicii
          </span>
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl tracking-tight">
            THE AiX ECOSYSTEM
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-xs leading-relaxed text-slate-400">
            Subvenții.ro este nodul de inteligență pentru fonduri nerambursabile din cadrul rețelei de soluții financiare, imobiliare, tehnologice și educaționale Cristian Văduva.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AIX_ECOSYSTEM.map((node) => (
            <div
              key={node.id}
              className="group relative rounded-xl border border-slate-800 bg-slate-950/90 p-5 transition-all hover:border-emerald-800/80 hover:bg-slate-950 shadow-sm flex flex-col justify-between min-w-0"
            >
              <div>
                <div className="flex items-center justify-between mb-2 gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 tracking-wider truncate">
                    {node.categoryLabel}
                  </span>
                  {node.badge && (
                    <span className="rounded bg-slate-800 border border-slate-700 px-2 py-0.5 text-[9px] font-bold text-slate-300 shrink-0">
                      {node.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {node.name}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  {node.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-900 flex items-center justify-between text-xs">
                <a
                  href={node.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Accesează ${node.name}`}
                  className="inline-flex items-center gap-1.5 font-bold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <span>{node.cta}</span>
                  <span>↗</span>
                </a>
                <span className="text-[10px] font-mono text-slate-500">
                  {new URL(node.href).hostname}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

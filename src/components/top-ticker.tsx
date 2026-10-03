import Link from "next/link";

interface TickerItem {
  id: string;
  badge: string;
  text: string;
  href: string;
}

const TICKER_ITEMS: TickerItem[] = [
  {
    id: "dr-14",
    badge: "AFIR DR-14",
    text: "Instalarea tinerilor fermieri — Sprijin nerambursabil până la 200.000 €",
    href: "/finantari/dr-14-investitii-in-exploatatii-agricole-si-cresterea-animalelor",
  },
  {
    id: "apia-biss",
    badge: "APIA BISS",
    text: "Sprijinul de bază pe suprafață (PD-01) — Ghid complet campanie cereri de plată",
    href: "/finantari/apia-biss-pd-01",
  },
  {
    id: "dr-25",
    badge: "AFIR DR-25",
    text: "Modernizarea sistemelor de irigații — Apel deschis de proiecte",
    href: "/finantari/dr-25-modernizarea-infrastructurii-de-irigatii",
  },
  {
    id: "calendar",
    badge: "CALENDAR",
    text: "Termene limită și calendarul estimativ al sesiunilor de depunere 2026",
    href: "/calendar",
  },
  {
    id: "casa-verde",
    badge: "CASA VERDE",
    text: "Programul fotovoltaice 2026 — Ghid finanțare și criterii tehnice",
    href: "/programe-guvernamentale/casa-verde",
  },
  {
    id: "noua-casa",
    badge: "NOUA CASĂ",
    text: "Ghid creditare, avans minim și plafoane de garantare",
    href: "/programe-guvernamentale/noua-casa",
  },
  {
    id: "judete",
    badge: "JUDEȚE",
    text: "Director finanțări și oportunități locale pentru toate cele 41 de județe",
    href: "/intelligence/regions",
  },
];

export function TopTicker() {
  return (
    <div
      className="bg-slate-950 border-b border-slate-800/90 text-slate-300 text-[11px] h-8 flex items-center overflow-hidden select-none relative z-40"
      aria-label="Actualizări Programe și Finanțări"
    >
      {/* Static Prefix Label */}
      <div className="hidden sm:flex items-center gap-1.5 px-3 bg-slate-950 border-r border-slate-800 z-10 shrink-0 h-full font-bold text-emerald-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true"></span>
        <span className="text-[10px] tracking-wider uppercase font-mono">ACTUALIZĂRI</span>
      </div>

      {/* Marquee Track (Seamless Right -> Left Loop) */}
      <div className="overflow-hidden flex-1 relative h-full flex items-center">
        <div className="animate-ticker flex items-center gap-8 py-1">
          {/* Primary Set */}
          {TICKER_ITEMS.map((item) => (
            <Link
              key={`p-${item.id}`}
              href={item.href}
              className="inline-flex items-center gap-2 hover:text-white transition-colors group shrink-0"
            >
              <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[9px] font-mono font-bold text-emerald-300 border border-slate-700/80 group-hover:border-emerald-500/50">
                {item.badge}
              </span>
              <span className="text-slate-300 group-hover:text-emerald-300 transition-colors">
                {item.text}
              </span>
              <span className="text-slate-600 group-hover:text-slate-400 text-[10px]" aria-hidden="true">
                •
              </span>
            </Link>
          ))}

          {/* Duplicate Set for Seamless Continuous Loop */}
          {TICKER_ITEMS.map((item) => (
            <Link
              key={`d-${item.id}`}
              href={item.href}
              className="inline-flex items-center gap-2 hover:text-white transition-colors group shrink-0"
              aria-hidden="true"
              tabIndex={-1}
            >
              <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[9px] font-mono font-bold text-emerald-300 border border-slate-700/80 group-hover:border-emerald-500/50">
                {item.badge}
              </span>
              <span className="text-slate-300 group-hover:text-emerald-300 transition-colors">
                {item.text}
              </span>
              <span className="text-slate-600 group-hover:text-slate-400 text-[10px]" aria-hidden="true">
                •
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

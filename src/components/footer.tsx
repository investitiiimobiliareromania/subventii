import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-400 text-xs py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 mb-10">
          <div>
            <span className="block font-bold text-white uppercase tracking-wider mb-3 text-[11px]">
              Platformă Finanțări
            </span>
            <ul className="space-y-2">
              <li><Link href="/programes" className="hover:text-white transition-colors">Căutare Finanțări</Link></li>
              <li><Link href="/programe-guvernamentale" className="hover:text-white transition-colors">Programe Guvernamentale</Link></li>
              <li><Link href="/programe-guvernamentale/noua-casa" className="hover:text-white transition-colors">Noua Casă 2026</Link></li>
              <li><Link href="/programe-guvernamentale/casa-verde" className="hover:text-white transition-colors">Casa Verde Fotovoltaice</Link></li>
              <li><Link href="/calendar" className="hover:text-white transition-colors">Calendar Finanțări</Link></li>
              <li><Link href="/eligibilitate" className="hover:text-white transition-colors">Calculator Eligibilitate</Link></li>
            </ul>
          </div>

          <div>
            <span className="block font-bold text-white uppercase tracking-wider mb-3 text-[11px]">
              Inteligență Financiară
            </span>
            <ul className="space-y-2">
              <li><Link href="/legislatie" className="hover:text-white transition-colors">Legislație Fiscală & IMM</Link></li>
              <li><Link href="/credite" className="hover:text-white transition-colors">Credite & Calculator IRCC</Link></li>
              <li><Link href="/piata-imobiliara" className="hover:text-white transition-colors">Piața Imobiliară</Link></li>
              <li><Link href="/asigurari" className="hover:text-white transition-colors">Asigurări PAD & IMM</Link></li>
              <li><Link href="/rapoarte-ancpi" className="hover:text-white transition-colors">Rapoarte Tranzacții ANCPI</Link></li>
              <li><Link href="/compara" className="hover:text-white transition-colors">Comparator Programe</Link></li>
            </ul>
          </div>

          <div>
            <span className="block font-bold text-white uppercase tracking-wider mb-3 text-[11px]">
              Director & Resurse
            </span>
            <ul className="space-y-2">
              <li><Link href="/stiri" className="hover:text-white transition-colors">Știri & Newsroom</Link></li>
              <li><Link href="/institutii" className="hover:text-white transition-colors">Instituții Publice</Link></li>
              <li><Link href="/resurse" className="hover:text-white transition-colors">Ghiduri PDF & Formulare</Link></li>
              <li><Link href="/glosar" className="hover:text-white transition-colors">Glosar Finanțări</Link></li>
              <li><Link href="/asistent-ai" className="hover:text-white transition-colors">Asistent AI Oficial</Link></li>
              <li><Link href="/alerte" className="hover:text-white transition-colors">Alerte Programe Noi</Link></li>
            </ul>
          </div>

          <div>
            <span className="block font-bold text-white uppercase tracking-wider mb-3 text-[11px]">
              Județe & Sectorial
            </span>
            <ul className="space-y-2">
              <li><Link href="/judete/cluj" className="hover:text-white transition-colors">Finanțări Cluj</Link></li>
              <li><Link href="/judete/bucuresti" className="hover:text-white transition-colors">Finanțări București</Link></li>
              <li><Link href="/judete/timis" className="hover:text-white transition-colors">Finanțări Timiș</Link></li>
              <li><Link href="/cod-caen/6201" className="hover:text-white transition-colors">Cod CAEN 6201 - IT</Link></li>
              <li><Link href="/cod-caen/0111" className="hover:text-white transition-colors">Cod CAEN 0111 - Agricultură</Link></li>
            </ul>
          </div>

          <div>
            <span className="block font-bold text-white uppercase tracking-wider mb-3 text-[11px]">
              Informații Legale
            </span>
            <ul className="space-y-2">
              <li><Link href="/despre" className="hover:text-white transition-colors">Despre Subvenții.ro</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact & Consultanță</Link></li>
              <li><Link href="/politica-de-confidentialitate" className="hover:text-white transition-colors">Confidențialitate & GDPR</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Portal Administrare CMS</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} Subvenții.ro — Platforma Națională de Inteligență Financiară și Fonduri Publice.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Sistem Conectat MIPE & BNR
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

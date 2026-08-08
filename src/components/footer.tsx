import Link from "next/link";
import { CONTACT_CONFIG } from "@/lib/contact/config";
import { getEcosystemByCategory } from "@/lib/ecosystem/config";

export function Footer() {
  const categorized = getEcosystemByCategory();

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-400 text-xs py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* AiX Ecosystem Directory Section */}
        <div className="mb-10 rounded-2xl border border-slate-800 bg-slate-950/80 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-5">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                Rețeaua Oficială de Servicii &amp; Inteligență
              </span>
              <h3 className="text-sm font-bold text-white mt-0.5">AiX ECOSYSTEM • Cristian Văduva Network</h3>
            </div>
            <a
              href="https://cristianvaduva.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-emerald-400 hover:underline"
            >
              cristianvaduva.com ↗
            </a>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
            {Object.entries(categorized).map(([catKey, catGroup]) => (
              <div key={catKey}>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {catGroup.label}
                </span>
                <ul className="space-y-1.5 text-[11px]">
                  {catGroup.items.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Accesează ${item.name}`}
                        className="hover:text-emerald-400 transition-colors font-medium inline-flex items-center gap-1"
                      >
                        <span>{item.name}</span>
                        <span className="text-[9px] text-slate-500">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-5 mb-10">
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
              <li><Link href="/legislatie" className="hover:text-white transition-colors">Legislație Fiscală &amp; IMM</Link></li>
              <li><Link href="/credite" className="hover:text-white transition-colors">Credite &amp; Calculator IRCC</Link></li>
              <li><Link href="/piata-imobiliara" className="hover:text-white transition-colors">Piața Imobiliară</Link></li>
              <li><Link href="/asigurari" className="hover:text-white transition-colors">Asigurări PAD &amp; IMM</Link></li>
              <li><Link href="/rapoarte-ancpi" className="hover:text-white transition-colors">Rapoarte Tranzacții ANCPI</Link></li>
              <li><Link href="/compara" className="hover:text-white transition-colors">Comparator Programe</Link></li>
            </ul>
          </div>

          <div>
            <span className="block font-bold text-white uppercase tracking-wider mb-3 text-[11px]">
              Director &amp; Resurse
            </span>
            <ul className="space-y-2">
              <li><Link href="/stiri" className="hover:text-white transition-colors">Știri &amp; Newsroom</Link></li>
              <li><Link href="/institutii" className="hover:text-white transition-colors">Instituții Publice</Link></li>
              <li><Link href="/resurse" className="hover:text-white transition-colors">Ghiduri PDF &amp; Formulare</Link></li>
              <li><Link href="/glosar" className="hover:text-white transition-colors">Glosar Finanțări</Link></li>
              <li><Link href="/asistent-ai" className="hover:text-white transition-colors">Asistent AI Oficial</Link></li>
              <li><Link href="/alerte" className="hover:text-white transition-colors">Alerte Programe Noi</Link></li>
            </ul>
          </div>

          <div>
            <span className="block font-bold text-white uppercase tracking-wider mb-3 text-[11px]">
              Contact Direct
            </span>
            <ul className="space-y-2">
              <li className="text-white font-semibold">{CONTACT_CONFIG.name}</li>
              <li>
                <a href={CONTACT_CONFIG.links.email} className="hover:text-white transition-colors">
                  {CONTACT_CONFIG.email}
                </a>
              </li>
              <li>
                <a href={CONTACT_CONFIG.links.telRo} className="hover:text-white transition-colors">
                  📞 RO: {CONTACT_CONFIG.phoneRoDisplay}
                </a>
              </li>
              <li>
                <a href={CONTACT_CONFIG.links.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  💬 WA: {CONTACT_CONFIG.phoneWaDisplay}
                </a>
              </li>
              <li className="text-slate-500">📍 {CONTACT_CONFIG.office}</li>
            </ul>
          </div>

          <div>
            <span className="block font-bold text-white uppercase tracking-wider mb-3 text-[11px]">
              Canale Sociale &amp; Media
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              <a
                href={CONTACT_CONFIG.socialUrls.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Cristian Văduva"
                className="px-2.5 py-1.5 rounded bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 font-medium hover:bg-emerald-900 transition-colors"
              >
                WhatsApp
              </a>
              <a
                href={CONTACT_CONFIG.socialUrls.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram Cristian Văduva"
                className="px-2.5 py-1.5 rounded bg-sky-950/80 border border-sky-800/60 text-sky-400 font-medium hover:bg-sky-900 transition-colors"
              >
                Telegram
              </a>
              <a
                href={CONTACT_CONFIG.socialUrls.telegramChannel}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Canal Telegram Capital Invest"
                className="px-2.5 py-1.5 rounded bg-sky-950/80 border border-sky-800/60 text-sky-400 font-medium hover:bg-sky-900 transition-colors"
              >
                Canal Telegram
              </a>
              <a
                href={CONTACT_CONFIG.socialUrls.linktree}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Linktree Cristian Văduva"
                className="px-2.5 py-1.5 rounded bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 font-medium hover:bg-emerald-900 transition-colors"
              >
                Linktree
              </a>
              <a
                href={CONTACT_CONFIG.socialUrls.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Cristian Văduva"
                className="px-2.5 py-1.5 rounded bg-pink-950/80 border border-pink-800/60 text-pink-400 font-medium hover:bg-pink-900 transition-colors"
              >
                Instagram
              </a>
              <a
                href={CONTACT_CONFIG.socialUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Cristian Văduva"
                className="px-2.5 py-1.5 rounded bg-blue-950/80 border border-blue-800/60 text-blue-400 font-medium hover:bg-blue-900 transition-colors"
              >
                Facebook
              </a>
              <a
                href={CONTACT_CONFIG.socialUrls.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Cristian Văduva"
                className="px-2.5 py-1.5 rounded bg-blue-950/80 border border-blue-800/60 text-blue-300 font-medium hover:bg-blue-900 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={CONTACT_CONFIG.socialUrls.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Cristian Văduva"
                className="px-2.5 py-1.5 rounded bg-red-950/80 border border-red-800/60 text-red-400 font-medium hover:bg-red-900 transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} Subvenții.ro — Platforma Națională de Inteligență Financiară și Fonduri Publice. Cristian Văduva Ecosystem.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Sistem Conectat AiX Ecosystem &amp; MIPE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

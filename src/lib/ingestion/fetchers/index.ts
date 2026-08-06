import type { IngestionItem, IngestionSource } from "../types";
import { normalizeRawPayload } from "../normalizers";

export async function fetchIngestionFromSource(source: IngestionSource): Promise<IngestionItem[]> {
  const mockPayloads: Record<IngestionSource, { title: string; url: string; content: string }[]> = {
    MIPE: [
      {
        title: "Corrigendum nr. 2 Ghid Solicitant PNRR Digitalizare IMM",
        url: "https://mfe.gov.ro/pnrr-digitalizare-imm-corrigendum-2",
        content: "Suplimentare fonduri PNRR Componenta C9 pentru microîntreprinderi și IMM-uri.",
      },
    ],
    AFIR: [
      {
        title: "Prelungire termen depunere DR-27 Achiziție Utilaje Agricole",
        url: "https://afir.ro/depunere-dr27-prelungire-termen",
        content: "Termenul limită de depunere a fost extins până la 31 iulie 2026 ora 16:00.",
      },
    ],
    AFM: [
      {
        title: "Actualizare Ghid Casa Verde Fotovoltaice 2026",
        url: "https://afm.ro/casa_verde_fotovoltaice_ghid_2026.php",
        content: "Noul plafon de finanțare este 30.000 RON cu obligație de instalare acumulator stocare min 5 kWh.",
      },
    ],
    MEAT: [
      {
        title: "Ordin MEAT lansare sesiuni Start-Up Nation ediția 2026",
        url: "https://economie.gov.ro/startup-nation-2026-lansare-oficiala",
        content: "Deschiderea modulului de înregistrare antreprenori pe platforma de granturi.",
      },
    ],
    "Monitorul Oficial": [
      {
        title: "OUG nr. 115/2026 privind facilitățile fiscale pentru cercetare",
        url: "https://monitoruloficial.ro/oug-115-2026",
        content: "Scutiri de impozit pe profit reinvestit în tehnologii verzi și digitalizare.",
      },
    ],
    ANCPI: [
      {
        title: "Raport statistic lunar tranzacții imobiliare pe județe",
        url: "https://ancpi.ro/statistici-tranzactii-luna-curenta",
        content: "Statistici tranzacții cadastrale și volum contracte vânzare-cumpărare.",
      },
    ],
  };

  const rawList = mockPayloads[source] || [];
  return rawList.map((item) => normalizeRawPayload(source, item.title, item.url, item.content));
}

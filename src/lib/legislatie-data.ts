export type LegislationItem = {
  slug: string;
  title: string;
  actType: "OUG" | "HG" | "Lege" | "Ordin";
  actNumber: string;
  publicationDate: string;
  effectiveDate: string;
  summary: string;
  fullTextMd: string;
  affectedSectors: string[];
  officialSourceUrl: string;
  faqs: { question: string; answer: string }[];
};

export const legislationCatalog: LegislationItem[] = [
  {
    slug: "oug-115-2026-facilitati-fiscale-imm",
    title: "OUG nr. 115/2026 privind modificarea Codului Fiscal și facilități pentru IMM-uri",
    actType: "OUG",
    actNumber: "115/2026",
    publicationDate: "2026-06-15",
    effectiveDate: "2026-07-01",
    summary: "Ordonanța de Urgență introduce scutiri de impozit pe profitul reinvestit în echipamente verzi și digitalizare.",
    fullTextMd: `
# OUG nr. 115/2026 — Pachetul de Eficientizare Fiscală

Guvernul României a aprobat Ordonanța de Urgență nr. 115/2026 publicată în Monitorul Oficial al României.

## Prevederi Cheie
1. **Profit Reinvestit**: Se extinde scutirea de impozit pe profitul reinvestit pentru activele din clasa echipamentelor folosite în autoconsumul de energie regenerabilă.
2. **Plafon Microîntreprinderi**: Se menține plafonul de 500.000 EUR pentru încadrarea la impozitul de 1% / 3% pe venitul microîntreprinderilor.
3. **Facturare Electronică (e-Factura)**: Simplificarea termenului de transmitere a facturilor B2C la 5 zile lucrătoare.
    `,
    affectedSectors: ["IMM", "Construcții", "Producție", "IT & digital", "Fiscalitate"],
    officialSourceUrl: "https://monitoruloficial.ro",
    faqs: [
      { question: "De când se aplică scutirea?", answer: "Prevederile intră în vigoare la data de 1 iulie 2026." },
    ],
  },
  {
    slug: "hg-450-2026-norme-fonduri-structurale",
    title: "HG nr. 450/2026 pentru aprobarea normelor metodologice privind fondurile europene",
    actType: "HG",
    actNumber: "450/2026",
    publicationDate: "2026-05-10",
    effectiveDate: "2026-05-20",
    summary: "Hotărârea de Guvern simplifică procedura de contractare pentru granturile PNRR și programele regionale.",
    fullTextMd: `
# Hotărârea de Guvern nr. 450/2026

Documentul aduce modificări majore în evaluarea proiectelor de finanțare depuse de întreprinderi private.

## Principalele Măsuri
- Reducerea termenului de soluționare a contestațiilor la 15 zile lucrătoare.
- Eliminarea obligativității cazierului judiciar în format fizic (interconectare bază de date).
    `,
    affectedSectors: ["Fonduri Europene", "MIPE", "ADR", "Proiecte PNRR"],
    officialSourceUrl: "https://mfe.gov.ro",
    faqs: [
      { question: "Se aplică proiectelor deja depuse?", answer: "Da, noile norme de simplificare se aplică tuturor apelurilor nefinalizate cu contract de finanțare." },
    ],
  },
];

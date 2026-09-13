export type LegislationItem = {
  slug: string;
  title: string;
  actType: "Ordin MADR" | "OUG" | "HG" | "Lege" | "Regulament UE";
  actNumber: string;
  publicationDate: string;
  effectiveDate: string;
  summary: string;
  fullTextMd: string;
  affectedSectors: string[];
  affectedProgrammes?: string[];
  officialSourceUrl: string;
  faqs: { question: string; answer: string }[];
};

export const legislationCatalog: LegislationItem[] = [
  {
    slug: "ordin-madr-80-2023-criterii-eligibilitate-pac",
    title: "Ordinul MADR nr. 80/2023 privind criteriile de eligibilitate și intervențiile de plăți directe",
    actType: "Ordin MADR",
    actNumber: "80/2023",
    publicationDate: "2023-03-01",
    effectiveDate: "2023-03-05",
    summary: "Actul normativ fundamental care stabilește condițiile specifice, documentele justificative și criteriile de eligibilitate pentru toate intervențiile de plăți directe (BISS, CRISS, CIS-YF, Eco-scheme, Sprijin Cuplat) gestionate de APIA în cadrul Planului Strategic PAC 2023–2027.",
    fullTextMd: `
# Ordinul MADR nr. 80/2023 — Cadrul General de Aplicare al Plăților Directe APIA

Ordinul ministrului agriculturii și dezvoltării rurale nr. 80/2023 reglementează implementarea intervențiilor prevăzute la art. 16 din Regulamentul (UE) 2021/2115.

## Principalele Prevederi:
1. **Definiția Fermierului Activ**: Criteriile de venit agricol și excluderea entităților cu activități non-agricole nesemnificative.
2. **Dimensiunea Minimă a Parcelelor**: Stabilirea pragului de minimum 0,3 ha pentru teren arabil și pășuni (0,1 ha pentru culturi permanente și sere).
3. **Sprijinul Cuplat Zootehnic (SCZ)**: Normele de retenție (4 luni pentru bovine, 100 zile pentru ovine/caprine) și condițiile de înscriere în Registrul Genealogic.
4. **Documente Justificative**: Dovada utilizării legale a terenului agricol înregistrat în Registrul Agricol al primăriei.
    `,
    affectedSectors: ["Cultura Plantelor & Arabil", "Zootehnie Bovine", "Zootehnie Ovine & Caprine", "Pomicultură & Livezi", "Viticultură & Vinificație", "Legumicultură & Sere"],
    affectedProgrammes: ["apia-biss-pd-01", "apia-criss-pd-02", "apia-tineri-fermieri-cis-yf-pd-03", "apia-sprijin-cuplat-vaci-lapte-pd-21", "apia-sprijin-cuplat-taurine-carne-pd-22", "apia-sprijin-cuplat-ovine-caprine-pd-24"],
    officialSourceUrl: "https://legislatie.just.ro/Public/DetaliiDocument/265890",
    faqs: [
      { question: "Ce stabilește Ordinul MADR 80/2023?", answer: "Toate regulile de eligibilitate, termenele și documentele necesare pentru depunerea cererii unice de plată la APIA." },
    ],
  },
  {
    slug: "ordin-madr-106-2024-derogari-gaec",
    title: "Ordinul MADR nr. 106/2024 privind derogările de la standardele GAEC 7 și GAEC 8",
    actType: "Ordin MADR",
    actNumber: "106/2024",
    publicationDate: "2024-03-12",
    effectiveDate: "2024-03-15",
    summary: "Ordinul transpune flexibilitățile europene aprobate de Comisia Europeană privind rotația culturilor pe teren arabil (GAEC 7) și alocarea procentului minim de teren neproductiv (GAEC 8) pentru protejarea fermierilor afectați de schimbările climatice.",
    fullTextMd: `
# Ordinul MADR nr. 106/2024 — Flexibilități BGAO (GAEC)

Actul normativ oferă fermierilor posibilitatea de a îndeplini cerințele de condiționalitate fără pierderea subvențiilor APIA.

## Puncte Cheie:
- **GAEC 7 (Rotația culturilor)**: Posibilitatea utilizării culturilor secundare (culturi de acoperire) pentru a bifa cerința de diversificare a asolamentului.
- **GAEC 8 (Zone neproductive)**: Fermierii pot aloca procentul minim cultivând plante fixatoare de azot (leguminoase) fără utilizarea pesticidelor de sinteză.
    `,
    affectedSectors: ["Cultura Plantelor & Arabil", "Agricultură Ecologică"],
    affectedProgrammes: ["apia-biss-pd-01", "apia-eco-schema-teren-arabil-pd-04"],
    officialSourceUrl: "https://legislatie.just.ro/Public/DetaliiDocument/280120",
    faqs: [
      { question: "Se mai aplică sancțiuni pentru nerespectarea pârloagei de 4%?", answer: "Nu, conform normelor actualizate, procentul de 4% poate fi îndeplinit prin culturi fixatoare de azot sau culturi secundare fără pesticide." },
    ],
  },
  {
    slug: "hg-1571-2022-stabilire-cadrul-general-plati-directe",
    title: "Hotărârea Guvernului nr. 1571/2022 privind cadrul general al plăților directe și intervențiilor sectoriale",
    actType: "HG",
    actNumber: "1571/2022",
    publicationDate: "2022-12-28",
    effectiveDate: "2023-01-01",
    summary: "Hotărârea de Guvern instituie cadrul instituțional și financiar național pentru derularea sprijinului acordat României din Fondul European de Garantare Agricolă (FEGA) și Fondul European Agricol pentru Dezvoltare Rurală (FEADR).",
    fullTextMd: `
# HG nr. 1571/2022 — Organizarea Plăților PAC în România

Stabilește atribuțiile APIA ca agenție de plăți pentru FEGA și atribuțiile AFIR pentru intervențiile FEADR.

## Prevederi:
- Sistemul integrat de administrare și control (IACS/SIGPAC).
- Mecanismul de sancțiuni și penalități administrative.
- Procedura de plată a avansului de 70% din FEGA și 85% din FEADR începând cu 16 octombrie a fiecărui an.
    `,
    affectedSectors: ["Cultura Plantelor & Arabil", "Zootehnie Bovine", "Zootehnie Ovine & Caprine", "Apicultură", "Pomicultură & Livezi"],
    affectedProgrammes: ["apia-biss-pd-01", "apia-criss-pd-02", "madr-ajutor-stat-motorina-agricultura"],
    officialSourceUrl: "https://legislatie.just.ro/Public/DetaliiDocument/263415",
    faqs: [
      { question: "Când începe oficial plata avansului la subvenții?", answer: "Conform HG 1571/2022, APIA poate efectua plăți în avans începând cu data de 16 octombrie a anului de cerere." },
    ],
  },
  {
    slug: "oug-34-2023-organizare-pajisti-permanente",
    title: "OUG nr. 34/2023 privind organizarea, administrarea și exploatarea pajiștilor permanente",
    actType: "OUG",
    actNumber: "34/2023",
    publicationDate: "2023-05-17",
    effectiveDate: "2023-05-20",
    summary: "Ordonanța de urgență reglementează condițiile de închiriere și concesionare a pășunilor comunale de către crescătorii de animale, obligativitatea amenajamentelor pastorale și încărcătura optimă de UVM/ha pentru încasarea subvențiilor APIA.",
    fullTextMd: `
# OUG nr. 34/2023 — Regimul Pajiștilor Permanente

Act normativ crucial pentru crescătorii de bovine, ovine și caprine care utilizează pășuni publice sau private.

## Principalele Obligații:
1. **Încărcătura de animale**: Respectarea încărcăturii minime de 0,3 UVM/ha (Unitate Vită Mare) pe toată perioada de pășunat.
2. **Amenajamentele Pastorale**: Obligativitatea elaborării amenajamentului pastoral de către consiliile locale pentru alocarea pășunilor.
3. **Prioritate Crescători Locali**: Dreptul de atribuire directă sau prioritară a contractelor de închiriere crescătorilor cu animale înregistrate în RNE pe raza localității.
    `,
    affectedSectors: ["Zootehnie Bovine", "Zootehnie Ovine & Caprine"],
    affectedProgrammes: ["apia-biss-pd-01", "apia-sprijin-cuplat-vaci-lapte-pd-21", "apia-sprijin-cuplat-ovine-caprine-pd-24"],
    officialSourceUrl: "https://legislatie.just.ro/Public/DetaliiDocument/268950",
    faqs: [
      { question: "Care este încărcătura minimă de animale pe pășune?", answer: "Încărcătura minimă este de 0,3 UVM/ha (echivalentul a circa o vacă adultă la 3,3 ha sau 2 oi la 1 ha)." },
    ],
  },
  {
    slug: "regulamentul-ue-2021-2115-pac",
    title: "Regulamentul (UE) 2021/2115 al Parlamentului European și al Consiliului privind Planurile Strategice PAC",
    actType: "Regulament UE",
    actNumber: "2021/2115",
    publicationDate: "2021-12-06",
    effectiveDate: "2023-01-01",
    summary: "Regulamentul european de bază care guvernează întreaga Politică Agricolă Comună (PAC) pentru perioada 2023–2027, stabilind obiectivele de climă, digitalizare, sprijinul pe venit și intervențiile de dezvoltare rurală ale României.",
    fullTextMd: `
# Regulamentul (UE) 2021/2115 — Temelia Politicii Agricole Comune

Stabilește regulile privind sprijinul pentru planurile strategice care urmează să fie elaborate de statele membre în cadrul politicii agricole comune și finanțate din FEGA și FEADR.

## Pilonii Cheie:
- **Arhitectura Verde**: Condiționalitatea consolidată (BGAO/SMR) și alocarea a minimum 25% din plățile directe pentru eco-scheme.
- **Reînnoirea Generațională**: Obligativitatea alocării a minimum 3% din bugetul plăților directe pentru tinerii fermieri (CIS-YF și DR-30).
- **Flexibilitate Națională**: Trecerea de la conformitate administrativă la evaluarea performanței pe baza rezultatelor anuale.
    `,
    affectedSectors: ["Cultura Plantelor & Arabil", "Zootehnie Bovine", "Zootehnie Ovine & Caprine", "Tineri Fermieri", "Agricultură Ecologică", "Irigații & Hidroameliorații", "Procesare Alimentară"],
    affectedProgrammes: ["apia-biss-pd-01", "apia-criss-pd-02", "apia-tineri-fermieri-cis-yf-pd-03", "afir-dr-30-instalare-tineri-fermieri", "afir-dr-14-investitii-ferme-de-familie", "afir-dr-25-modernizare-irigatii-ouai"],
    officialSourceUrl: "https://eur-lex.europa.eu/legal-content/RO/TXT/?uri=CELEX:32021R2115",
    faqs: [
      { question: "Până când se aplică Regulamentul UE 2021/2115?", answer: "Se aplică pentru întreaga perioadă de programare financiară 2023–2027, cu posibilitate de decontare până în anul 2029 (regula N+2)." },
    ],
  },
  {
    slug: "oug-115-2026-facilitati-fiscale-imm",
    title: "OUG nr. 115/2026 privind modificarea Codului Fiscal și facilități pentru IMM-uri și agricultură",
    actType: "OUG",
    actNumber: "115/2026",
    publicationDate: "2026-06-15",
    effectiveDate: "2026-07-01",
    summary: "Ordonanța de Urgență introduce scutiri de impozit pe profitul reinvestit în echipamente agricole verzi, panouri fotovoltaice de autoconsum și digitalizarea fermelor.",
    fullTextMd: `
# OUG nr. 115/2026 — Facilități Fiscale și Eficientizare

Pachet de măsuri fiscale menit să sprijine investițiile productive în economia românească.

## Prevederi Cheie:
1. **Scutire Impozit pe Profit Reinvestit**: Se extinde la utilajele agricole moderne No-Till și instalațiile de stocare a energiei solare la fermă.
2. **Plafon Microîntreprinderi**: Menținerea condițiilor de aplicare pentru societățile comerciale cu venituri sub 500.000 EUR.
3. **Simplificare e-Factura**: Reguli clare de raportare pentru producătorii agricoli și contractele de arendare.
    `,
    affectedSectors: ["Cultura Plantelor & Arabil", "Utilaje & Mecanizare", "Energie Verde & Mediu"],
    affectedProgrammes: ["start-up-nation-2025", "pnrr-c9-digitalizare-imm"],
    officialSourceUrl: "https://monitoruloficial.ro",
    faqs: [
      { question: "De când se aplică scutirea pe profitul reinvestit în utilaje?", answer: "Prevederile intră în vigoare la data de 1 iulie 2026." },
    ],
  },
  {
    slug: "legea-37-2023-gestionare-riscuri-agricultura",
    title: "Legea nr. 37/2023 privind mecanismul de gestionare a riscurilor și despăgubiri pentru secetă",
    actType: "Lege",
    actNumber: "37/2023",
    publicationDate: "2023-02-20",
    effectiveDate: "2023-02-25",
    summary: "Legea creează instrumentul național de sprijinire a fermierilor în caz de fenomene meteo nefavorabile (secetă pedologică severă, grindină, îngheț) și subvenționarea primelor de asigurare a culturilor agricole (fosta Măsură 17.1).",
    fullTextMd: `
# Legea nr. 37/2023 — Protecția Fermierilor împotriva Riscurilor Climatice

Reglementează fondul mutual de risc și subvenționarea polițelor de asigurare a recoltelor agricole.

## Măsuri Principale:
- Subvenționarea a până la **70% din valoarea primei de asigurare** plătite de fermier pentru riscuri de secetă, îngheț și furtuni.
- Procedura unitară de constatare a pagubelor de către comisiile județene conduse de Prefectură și DAJ.
- Alocarea ajutoarelor de stat excepționale pentru despăgubirea culturilor calamitate în proporție de peste 30%.
    `,
    affectedSectors: ["Cultura Plantelor & Arabil", "Pomicultură & Livezi", "Viticultură & Vinificație"],
    affectedProgrammes: ["madr-ajutor-stat-motorina-agricultura"],
    officialSourceUrl: "https://legislatie.just.ro/Public/DetaliiDocument/264870",
    faqs: [
      { question: "Cât din costul asigurării culturilor este subvenționat?", answer: "Fermierii activi beneficiază de o subvenție de până la 70% din prima de asigurare eligibilă prin intervențiile de sprijin ale MADR/AFIR." },
    ],
  },
];

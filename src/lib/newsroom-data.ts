export type ArticleCategory =
  | "APIA"
  | "AFIR"
  | "MADR"
  | "Legislație"
  | "Fonduri Europene"
  | "Zootehnie"
  | "Vegetal"
  | "Tineri Fermieri"
  | "Energie"
  | "Piața Imobiliară"
  | "Economie"
  | "Investiții"
  | "Antreprenoriat"
  | "Infrastructură"
  | "Piața Muncii";

export type NewsArticle = {
  slug: string;
  headline: string;
  summary: string;
  content: string;
  category: ArticleCategory;
  impactAnalysis: string;
  whoIsAffected: string;
  relatedProgrammes: string[];
  officialDocuments: { title: string; url: string }[];
  institution: string;
  sourceUrl: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  readingTimeMin: number;
  verified: boolean;
  faqs: { question: string; answer: string }[];
};

export const newsroomArticles: NewsArticle[] = [
  {
    slug: "campanie-depunere-cereri-plata-apia-2026",
    headline: "APIA: Deschiderea Campaniei de Depunere a Cererilor Unice de Plată pentru Anul 2026",
    summary: "Agenția de Plăți și Intervenție pentru Agricultură (APIA) anunță demararea campaniei anuale de primire a cererilor de plată prin intermediul aplicației IPA Online pentru toate intervențiile din Planul Strategic PAC.",
    content: `
# APIA — Ghidul Complet pentru Depunerea Cererilor Unice de Plată

Fermierii români pot depune Cererea de Plată pentru anul de cerere fără penalități de întârziere până la data de **15 Mai 2026**, respectiv cu penalități de 1% pe fiecare zi lucrătoare de întârziere până la data de **15 Iunie 2026**.

## Noutăți și Proceduri IPA Online
1. **Completare 100% Online**: Fermierii identifică și digitizează parcelele agricole direct în aplicația web IPA Online utilizând ortofotoplanurile actualizate.
2. **Declarația pe Propria Răspundere și Adeverința de la Primărie**: Documentele care atestă dreptul de folosință asupra terenului și înscrierea în Registrul Agricol se transmit electronic sau se preiau direct prin interconectare administrativă.
3. **Condiționalitate Consolidată**: Solicitanții trebuie să respecte pe întreaga exploatație normele BGAO (Bunele Condiții Agricole și de Mediu) și SMR (Cerințele Legale în Materie de Gestionare).

## Calendar și Termene Cheie
- **1 Martie – 15 Mai 2026**: Depunerea cererilor fără penalități.
- **16 Mai – 15 Iunie 2026**: Depunerea cererilor cu penalizări de 1% pe zi.
- **Iulie – Octombrie 2026**: Efectuarea controalelor administrative, în teren și prin monitorizare satelitară.
- **16 Octombrie 2026**: Demararea autorizării la plată a avansurilor din FEGA și FEADR.
    `,
    category: "APIA",
    impactAnalysis: "Asigură finanțarea directă a peste 700.000 de exploatații agricole din România, cu un buget total alocat de peste 2,1 miliarde de euro anual.",
    whoIsAffected: "Toți fermierii persoane fizice și juridice care exploatează terenuri agricole sau dețin animale înregistrate în Baza Națională de Date ANSVSA.",
    relatedProgrammes: ["apia-biss-pd-01", "apia-criss-pd-02", "apia-tineri-fermieri-cis-yf-pd-03", "apia-eco-schema-teren-arabil-pd-04"],
    officialDocuments: [
      { title: "Ghidul Solicitantului APIA — Cererea de Plată", url: "https://apia.org.ro/directia-plati-directe/" },
      { title: "Manual de Utilizare IPA Online pentru Fermieri", url: "https://apia.org.ro" },
    ],
    institution: "Agenția de Plăți și Intervenție pentru Agricultură (APIA)",
    sourceUrl: "https://apia.org.ro",
    publishedAt: "2026-03-01",
    updatedAt: "2026-09-12",
    author: "Redacția Subvenții România",
    readingTimeMin: 6,
    verified: true,
    faqs: [
      { question: "Până la ce dată se poate depune cererea fără penalități?", answer: "Până la data de 15 mai 2026, ora 24:00." },
      { question: "Unde se pot obține clarificări?", answer: "La Centrul Județean sau Local APIA de care aparține exploatația agricolă." },
    ],
  },
  {
    slug: "calendar-plati-avans-apia-fega-feadr",
    headline: "APIA: Începerea Plăților în Avans din 16 Octombrie; Peste 70% din Schemele Directe Debursate",
    summary: "Conform deciziei Ministerului Agriculturii și regulamentelor europene, APIA demarează pe 16 octombrie autorizarea la plată a avansului pentru fermierii care au trecut controalele administrative și teledetecție.",
    content: `
# Bilanțul Plăților în Avans APIA — Campania 2026

În conformitate cu Regulamentul (UE) 2021/2115, statele membre pot acorda plăți în avans de până la **70% pentru intervențiile din FEGA** (plăți directe BISS, CRISS, CIS-YF) și de până la **85% pentru măsurile compensatorii din FEADR** (agricultură ecologică, zone defavorizate ANC).

## Nivelurile de Avans Autorizate
- **BISS (PD-01)**: 70% din cuantumul unitar pe hectar (estimat la ~96 EUR/ha).
- **CRISS (PD-02)**: 70% din cuantumul redistributiv pentru primele 50 ha (estimat la ~50 EUR/ha).
- **CIS-YF (PD-03)**: 70% pentru tinerii fermieri eligibili.
- **Plăți compensatorii (DR-01, DR-04, DR-05)**: 85% din sumele alocate pe hectar.
    `,
    category: "APIA",
    impactAnalysis: "Asigură lichiditățile financiare vitale pentru înființarea culturilor de toamnă (grâu, orz, rapiță) și achiziția de îngrășăminte.",
    whoIsAffected: "Fermierii activi fără neconformități la controalele în teren și eșantioanele de control prin monitorizare satelitară.",
    relatedProgrammes: ["apia-biss-pd-01", "apia-criss-pd-02", "apia-tineri-fermieri-cis-yf-pd-03"],
    officialDocuments: [
      { title: "Comunicat Oficial APIA privind Graficul Plăților în Avans", url: "https://apia.org.ro" },
    ],
    institution: "Agenția de Plăți și Intervenție pentru Agricultură (APIA)",
    sourceUrl: "https://apia.org.ro",
    publishedAt: "2026-09-01",
    updatedAt: "2026-09-12",
    author: "Redacția Subvenții România",
    readingTimeMin: 5,
    verified: true,
    faqs: [
      { question: "Cine primește plata în avans?", answer: "Toți fermierii a căror cerere a fost verificată administrativ și nu figurează cu suprapuneri de blocuri fizice sau sancțiuni nerezolvate." },
    ],
  },
  {
    slug: "afir-lansare-apel-dr25-irigatii",
    headline: "AFIR: Sesiune de Depunere a Proiectelor pentru Modernizarea Sistemelor de Irigații (DR-25) — Buget de 400 Milioane EUR",
    summary: "Agenția pentru Finanțarea Investițiilor Rurale a deschis sesiunea de depunere a cererilor de finanțare nerambursabilă 100% pentru Organizațiile Utilizatorilor de Apă pentru Irigații (OUAI).",
    content: `
# Intervenția DR-25: Reabilitarea Sistemelor Secundare de Irigații

AFIR pune la dispoziția asociațiilor de fermieri constituiți în OUAI un plafon financiar substanțial pentru combaterea secetei în marile bazine agricole din Câmpia Română, Dobrogea și Moldova.

## Condiții de Finanțare
- **Valoare Maximă Grant**: 1.500.000 EUR per proiect.
- **Intensitate Sprijin**: **100% nerambursabil** din fonduri FEADR.
- **Cheltuieli Eligibile**: Reabilitare stații de pompare (SPA, SPP), conducte îngropate, hidranți inteligenți, senzori de presiune și contoare electronice.
- **Criteriu Obligatoriu**: Economie potențială de apă de minimum 15% demonstrată prin proiectul tehnic.
    `,
    category: "AFIR",
    impactAnalysis: "Extinderea suprafețelor agricole irigate cu peste 250.000 de hectare și creșterea randamentului culturilor de câmp la secetă.",
    whoIsAffected: "Organizațiile Utilizatorilor de Apă pentru Irigații (OUAI) și Federațiile de OUAI (FOUAI) legal constituite.",
    relatedProgrammes: ["afir-dr-25-modernizare-irigatii-ouai"],
    officialDocuments: [
      { title: "Ghidul Solicitantului DR-25 Modernizarea Infrastructurii de Irigații", url: "https://www.afir.ro" },
    ],
    institution: "Agenția pentru Finanțarea Investițiilor Rurale (AFIR)",
    sourceUrl: "https://www.afir.ro",
    publishedAt: "2026-06-15",
    updatedAt: "2026-09-12",
    author: "Redacția Subvenții România",
    readingTimeMin: 5,
    verified: true,
    faqs: [
      { question: "Până când se pot depune proiecte pe DR-25?", answer: "Depunerea este deschisă până la 30 septembrie 2026 sau până la atingerea plafonului de 150% din alocare." },
    ],
  },
  {
    slug: "ghid-afir-instalare-tineri-fermieri-dr30",
    headline: "AFIR: Publicarea Ghidului Solicitantului pentru Instalarea Tinerilor Fermieri (DR-30) — 70.000 EUR Grant Forfetar",
    summary: "Ghidul oficial pentru intervenția DR-30 a fost aprobat de MADR. Tinerii până în 40 de ani pot obține un grant nerambursabil de 70.000 EUR pentru prima instalare ca șef de exploatație agricolă.",
    content: `
# Ghidul DR-30 — Instalarea Tinerilor Fermieri

Sprijinul forfetar acordat prin AFIR urmărește atragerea și menținerea tinerilor calificați în mediul rural prin crearea de exploatații agricole viabile economic.

## Detalii Cheie ale Intervenției
- **Valoare Grant**: 70.000 EUR (100% nerambursabil).
- **Plată în 2 Tranșe**: 75% (52.500 EUR) la semnarea contractului și 25% (17.500 EUR) după îndeplinirea obiectivelor din planul de afaceri.
- **Dimensiune Economică**: Ferma preluată trebuie să aibă între 8.000 și 100.000 SO (Standard Output) — minimum 4.000 SO în zona montană.
- **Obligație**: Creșterea SO cu cel puțin 20% până la solicitarea tranșei finale.
    `,
    category: "AFIR",
    impactAnalysis: "Încurajează schimbul de generații în agricultura românească și dezvoltarea afacerilor agricole sustenabile.",
    whoIsAffected: "Tineri cu vârsta de până la 40 de ani care s-au înregistrat la ONRC cu cel mult 24 de luni înainte de depunerea proiectului.",
    relatedProgrammes: ["afir-dr-30-instalare-tineri-fermieri", "apia-tineri-fermieri-cis-yf-pd-03"],
    officialDocuments: [
      { title: "Ghidul Solicitantului DR-30 Instalarea Tinerilor Fermieri", url: "https://www.afir.ro" },
      { title: "Model Plan de Afaceri DR-30", url: "https://www.afir.ro" },
    ],
    institution: "Agenția pentru Finanțarea Investițiilor Rurale (AFIR)",
    sourceUrl: "https://www.afir.ro",
    publishedAt: "2026-08-10",
    updatedAt: "2026-09-12",
    author: "Redacția Subvenții România",
    readingTimeMin: 6,
    verified: true,
    faqs: [
      { question: "Se poate achiziționa tractor din grantul de 70.000 EUR?", answer: "Da, achiziția de utilaje agricole este cheltuială eligibilă în cadrul planului de afaceri asumat." },
    ],
  },
  {
    slug: "plata-ajutor-stat-motorina-trimestrial",
    headline: "MADR: Virarea Fondurilor pentru Reducerea Accizei la Motorină Utilizată în Agricultură",
    summary: "Ministerul Agriculturii și Dezvoltării Rurale a alocat fondurile necesare către APIA pentru plata cererilor de decontare a motorinei aferente trimestrelor I și II din anul în curs.",
    content: `
# Subvenția la Motorină — Cota Redusă de Acciză

Fermierii care au depus cererile trimestriale de plată la Centrele Județene APIA primesc sumele aprobate reprezentând diferența dintre cota standard și cota redusă a accizei.

## Date Financiare și Cuantum
- **Cuantum Subvenție**: 1,746 lei / litru de motorină consumată în agricultură.
- **Beneficiari**: Peste 18.000 de societăți agricole, PFA, II și cooperative.
- **Sectoare Acoperite**: Sectorul vegetal (lucrări mecanizate pe arabil, livezi, vii) și sectorul zootehnic (furajare, muls, transport dejecții).
    `,
    category: "MADR",
    impactAnalysis: "Reduce costurile directe de operare ale fermierilor și menține competitivitatea produselor agroalimentare românești.",
    whoIsAffected: "Deținătorii de tractoare și mașini agricole autopropulsate cu acord prealabil APIA activ.",
    relatedProgrammes: ["madr-ajutor-stat-motorina-agricultura"],
    officialDocuments: [
      { title: "Ordinul Comun MADR/MFP privind Acciza la Motorină", url: "https://apia.org.ro" },
    ],
    institution: "Ministerul Agriculturii și Dezvoltării Rurale (MADR)",
    sourceUrl: "https://madr.ro",
    publishedAt: "2026-07-25",
    updatedAt: "2026-09-12",
    author: "Redacția Subvenții România",
    readingTimeMin: 4,
    verified: true,
    faqs: [
      { question: "Când se depune cererea pentru trimestrul III?", answer: "Cererea de decontare pentru motorina utilizată în trimestrul III se depune în intervalul 1 – 31 octombrie." },
    ],
  },
  {
    slug: "lansare-program-rabla-tractoare-afm",
    headline: "AFM: Lansarea Programului Rabla pentru Tractoare și Mașini Agricole — Ghid Oficial",
    summary: "Administrația Fondului pentru Mediu (AFM) deschide înscrierea producătorilor agricoli pentru achiziția de tractoare noi cu sprijin nerambursabil de până la 20.000 EUR.",
    content: `
# Programul Național Rabla pentru Tractoare 2026

Pentru prima dată în România, fermierii persoane fizice și microîntreprinderile pot casa un autovehicul sau tractor vechi pentru a achiziționa un utilaj agricol nou, mai puțin poluant.

## Criterii de Eligibilitate
- **Valoare Maximă Tractor**: 55.000 EUR (TVA inclus).
- **Sprijin Nerambursabil**: 65% din valoarea de achiziție (până la **80% pentru tinerii fermieri** sub 40 de ani).
- **Condiție Casare**: Predarea unui tractor vechi sau autoturism uzat la un colector REMAT autorizat.
    `,
    category: "Energie",
    impactAnalysis: "Modernizarea parcului tehnic agricol cu utilaje eficiente energetic și reducerea emisiilor de carbon.",
    whoIsAffected: "Producători agricoli individuali (atestat de producător) și fermieri tineri din toată țara.",
    relatedProgrammes: ["afm-rabla-tractoare-agricultura"],
    officialDocuments: [
      { title: "Ghidul de Finanțare Rabla Tractoare AFM", url: "https://www.afm.ro" },
    ],
    institution: "Administrația Fondului pentru Mediu (AFM)",
    sourceUrl: "https://www.afm.ro",
    publishedAt: "2026-08-01",
    updatedAt: "2026-09-12",
    author: "Redacția Subvenții România",
    readingTimeMin: 5,
    verified: true,
    faqs: [
      { question: "Unde se depun dosarele pentru Rabla Tractoare?", answer: "Dosarele se depun prin intermediul dealerilor și distribuitorilor de utilaje validați de AFM." },
    ],
  },
  {
    slug: "start-up-nation-2025-2026-pilonul-1-2",
    headline: "Start-Up Nation România: Cadrul General de Formare Antreprenorială și Pregătirea Planurilor de Afaceri",
    summary: "Ministerul Economiei, Antreprenoriatului și Turismului (MEAT) gestionează etapele programului Start-Up Nation, structurat pe piloni de instruire și acordare de granturi nerambursabile de până la 250.000 RON.",
    content: `
# Start-Up Nation România — Calendar și Condiții de Finanțare

Programul național **Start-Up Nation** alocă sprijin financiar nerambursabil prin fonduri europene și cofinanțare de la bugetul de stat. Structura programului cuprinde două etape distincte:

## 1. Pilonul I — Formare Antreprenorială
- Cursuri de formare profesională în competențe antreprenoriale și digitale pentru persoanele din grupul țintă (tineri sub 30 de ani, persoane aflate în căutarea unui loc de muncă, șomeri de lungă durată).
- Absolvirea cursului este o condiție de eligibilitate pentru depunerea ulterioară a dosarului de finanțare.

## 2. Pilonul II — Depunerea Planurilor de Afaceri
- Finanțare nerambursabilă de maximum **250.000 RON** per proiect aprobat.
- Cofinanțare proprie minimă obligatorie de 10% din cheltuielile eligibile.
- Obligația creării și menținerii a minimum 2 locuri de muncă cu normă întreagă pe o durată de cel puțin 24 de luni.
    `,
    category: "Fonduri Europene",
    impactAnalysis: "Sprijină înființarea de întreprinderi noi și integrarea tinerilor și a grupurilor vulnerabile pe piața muncii active.",
    whoIsAffected: "Persoane fizice eligibile pentru formare antreprenorială și viitori fondatori de societăți cu răspundere limitată (SRL).",
    relatedProgrammes: ["start-up-nation-2025", "pnrr-c9-digitalizare-imm"],
    officialDocuments: [
      { title: "Ordonanța de Urgență a Guvernului privind Start-Up Nation", url: "https://economie.gov.ro/programe-imm" },
      { title: "Ghidul Solicitantului — Modulul de Formare și Criterii", url: "https://economie.gov.ro/programe-imm" },
    ],
    institution: "Ministerul Economiei, Antreprenoriatului și Turismului (MEAT)",
    sourceUrl: "https://economie.gov.ro/programe-imm",
    publishedAt: "2026-08-15",
    updatedAt: "2026-09-12",
    author: "Redacția Subvenții România",
    readingTimeMin: 5,
    verified: true,
    faqs: [
      {
        question: "Cine poate participa la cursurile de formare din Pilonul I?",
        answer: "Persoanele fizice care îndeplinesc criteriile de vârstă și statut ocupațional stabilite prin ghidul specific.",
      },
      {
        question: "Când se poate înființa firma beneficiară?",
        answer: "Firma trebuie înființată de către absolventul cursului după finalizarea modulului de instruire antreprenorială.",
      },
    ],
  },
  {
    slug: "pnrr-c9-digitalizare-imm-evaluare",
    headline: "PNRR Componenta 9: Criterii de Evaluare și Cadrul de Implementare pentru Digitalizarea IMM-urilor",
    summary: "Ministerul Investițiilor și Proiectelor Europene (MIPE) derulează procedurile de evaluare tehnică și contractare a proiectelor de granturi nerambursabile pentru digitalizarea IMM-urilor non-IT.",
    content: `
# PNRR C9: Digitalizarea IMM-urilor Non-IT

Apelul PNRR C9 acordă granturi nerambursabile cuprinse între **20.000 EUR și 100.000 EUR** pentru companiile care implementează soluții de transformare digitală, automatizare industrială, sisteme ERP/CRM și securitate cibernetică.

## Criterii de Intensitate Digitală (DESI)
La finalizarea proiectului, companiile beneficiare trebuie să demonstreze îndeplinirea a cel puțin **6 din cele 12 criterii de intensitate digitală** (conform metodologiei europene Eurostat/DESI), printre care:
- Utilizarea a cel puțin două rețele sociale pentru promovare.
- Utilizarea de software ERP pentru partajarea informațiilor între departamente.
- Tranzacții de comerț electronic reprezentând minimum 1% din cifra de afaceri.
- Utilizarea serviciilor cloud de nivel mediu sau avansat.
    `,
    category: "Fonduri Europene",
    impactAnalysis: "Crește competitivitatea IMM-urilor din sectoare tradiționale (producție, servicii, construcții, turism) prin tehnologizare.",
    whoIsAffected: "Microîntreprinderi, companii mici și mijlocii cu vechime de peste 1 an și profit operațional pozitiv.",
    relatedProgrammes: ["pnrr-c9-digitalizare-imm", "adr-nord-vest-digitalizare-si-inovare"],
    officialDocuments: [
      { title: "Ghidul Specific PNRR C9 Digitalizare IMM", url: "https://mfe.gov.ro/pnrr/" },
      { title: "Lista Criteriilor DESI de Maturitate Digitală", url: "https://mfe.gov.ro/pnrr/" },
    ],
    institution: "Ministerul Investițiilor și Proiectelor Europene (MIPE)",
    sourceUrl: "https://mfe.gov.ro/pnrr/",
    publishedAt: "2026-08-20",
    updatedAt: "2026-09-12",
    author: "Redacția Subvenții România",
    readingTimeMin: 6,
    verified: true,
    faqs: [
      {
        question: "Este obligatoriu auditul de maturitate digitală?",
        answer: "Da, este obligatoriu un raport de audit înainte de depunere și un raport final după implementare care să ateste progresul DESI.",
      },
    ],
  },
  {
    slug: "ancpi-raport-semestrial-tranzactii-cadastru-2026",
    headline: "ANCPI: Bilanțul Tranzacțiilor Imobiliare pe Semestrul I — Peste 280.000 de Imobile Tranzacționate Național",
    summary: "Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI) a publicat datele statistice oficiale privind dinamica pieței imobiliare și extinderea cadastrării gratuite prin Programul Național de Cadastru și Carte Funciară (PNCCF).",
    content: `
# Dinamica Tranzacțiilor Imobiliare în România — Raport Oficial ANCPI

Conform datelor centralizate din sistemul informatic integrat de cadastru și carte funciară **e-Terra**, în prima jumătate a anului au fost înregistrate la nivel național **284.150 de tranzacții imobiliare** (terenuri, case și apartamente).

## Clasamentul Județean al Tranzacțiilor
- **București**: 52.410 imobile tranzacționate (piață lider la nivel național).
- **Ilfov**: 21.840 tranzacții înregistrate.
- **Cluj**: 16.320 tranzacții înregistrate.
- **Timiș**: 15.190 tranzacții înregistrate.
- **Brașov**: 14.850 tranzacții înregistrate.
- **Constanța**: 13.410 tranzacții înregistrate.

## Progresul Înregistrării Sistematice (PNCCF)
- Peste 6,8 milioane de imobile au fost înregistrate gratuit în sistemul integrat de cadastru prin fonduri guvernamentale și fonduri europene nerambursabile (POR/POC).
- În peste 260 de unități administrativ-teritoriale (UAT), cadastrarea a fost finalizată integral pe tot teritoriul comunei.
    `,
    category: "Piața Imobiliară",
    impactAnalysis: "Crește securitatea circuitului civil al imobilelor, reduce litigiile funciare și facilitează accesul fermierilor și investitorilor la credite ipotecare și fonduri europene.",
    whoIsAffected: "Proprietari de imobile, dezvoltatori imobiliari, cumpărători, fermieri și autorități publice locale.",
    relatedProgrammes: ["ancpi-pnccf-cadastru-gratuit"],
    officialDocuments: [
      { title: "Buletinul Statistic Lunar al Tranzacțiilor Imobiliare ANCPI", url: "https://www.ancpi.ro/statistici" },
      { title: "Stadiul Programului Național de Cadastru și Carte Funciară", url: "https://www.ancpi.ro/pnccf" },
    ],
    institution: "Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI)",
    sourceUrl: "https://www.ancpi.ro",
    publishedAt: "2026-07-15",
    updatedAt: "2026-09-20",
    author: "Redacția Subvenții România",
    readingTimeMin: 5,
    verified: true,
    faqs: [
      { question: "Unde se poate verifica dacă un imobil are carte funciară electronică?", answer: "În portalul public ANCPI e-Terra, prin interogarea numărului cadastral sau a adresei administrative." },
    ],
  },
  {
    slug: "insse-bilant-crestere-economica-pib-2026",
    headline: "INSSE: Produsul Intern Brut al României a depășit 1.745 Miliarde RON; Sectorul IT și Serviciile Conduc Creșterea",
    summary: "Institutul Național de Statistică (INSSE) confirmă o creștere economică anuală de 2,8%, susținută de investițiile brute în capital fix, fondurile structurale și sectorul serviciilor pentru întreprinderi.",
    content: `
# Bilanțul Macroeconomic Oficial al României — Raport INSSE & BNR

Economia României a înregistrat o evoluție pozitivă în anul curent, Produsul Intern Brut (PIB) nominal atingând **1.745,2 miliarde RON** (echivalentul a aproximativ **351 miliarde EUR**), conform datelor provizorii comunicate de INSSE.

## Contribuția Principalelor Ramuri Economice la Creșterea PIB
- **Servicii și Comerț**: +1,4 puncte procentuale la formarea PIB.
- **Construcții & Infrastructură**: +0,6 puncte procentuale, impulsionate de marile șantiere finanțate prin PNRR și Fondul de Coeziune.
- **Tehnologia Informației și Comunicațiile (TIC)**: +0,5 puncte procentuale.
- **Agricultură și Silvicultură**: Ponderea în PIB s-a situat la 4,2%, influențată de condițiile agroclimatice din zonele extracarpatice.

## Indicatori Financiari Cheie
- **Rata Anuală a Inflației (IPC)**: A coborât la 5,1% la nivel anual.
- **Indicele IRCC pentru Creditele Ipotecare**: 5,56% pe an.
- **Câștigul Salarial Mediu Net**: 5.176 RON / lună la nivel național.
    `,
    category: "Economie",
    impactAnalysis: "Consolidează stabilitatea macroeconomică, încurajează investițiile străine directe (ISD) și menține accesul companiilor la piețele de capital.",
    whoIsAffected: "Mediul de afaceri, investitori instituționali, IMM-uri și piața forței de muncă.",
    relatedProgrammes: ["ajutor-stat-investitii-mari-hg807"],
    officialDocuments: [
      { title: "Comunicat de Presă INSSE — Evoluția Produsului Intern Brut", url: "https://insse.ro" },
      { title: "Raportul asupra Inflației BNR", url: "https://bnr.ro" },
    ],
    institution: "Institutul Național de Statistică (INSSE) & BNR",
    sourceUrl: "https://insse.ro",
    publishedAt: "2026-08-30",
    updatedAt: "2026-09-25",
    author: "Redacția Subvenții România",
    readingTimeMin: 5,
    verified: true,
    faqs: [
      { question: "Unde sunt publicate seriile statistice detaliate?", answer: "În baza de date oficială INSSE Tempo Online și pe portalul Băncii Naționale a României." },
    ],
  },
  {
    slug: "meat-lansare-femeia-antreprenor-2026",
    headline: "MEAT: Lansarea Programului Femeia Antreprenor — Granturi Nerambursabile de până la 200.000 RON",
    summary: "Ministerul Economiei a publicat ghidul final al programului național destinat femeilor antreprenor. Se acordă fonduri nerambursabile cu o intensitate a sprijinului de până la 90-95% din valoarea eligibilă.",
    content: `
# Programul Național Femeia Antreprenor — Ghidul Solicitantului

Programul sprijină accesul femeilor în poziții de conducere și proprietate în cadrul întreprinderilor mici și mijlocii prin finanțarea achiziției de echipamente tehnologice, digitalizare și cursuri de formare.

## Parametri Financiari Oficiali
- **Alocație Financiară Nerambursabilă (AFN)**: Maximum **200.000 RON** per beneficiar.
- **Intensitate Sprijin**: Între 90% și 95% nerambursabil (cofinanțare proprie de 5% - 10%).
- **Condiție de Acționariat**: Cel puțin 50% din părțile sociale ale societății trebuie să fie deținute de femei.
- **Creare de Locuri de Muncă**: Obligația menținerii a cel puțin 2 locuri de muncă nou create timp de minimum 24 de luni.
    `,
    category: "Antreprenoriat",
    impactAnalysis: "Crește ponderea antreprenoriatului feminin în economie și accelerează dotarea tehnologică a IMM-urilor din domenii productive și creative.",
    whoIsAffected: "Societăți comerciale (SRL) înființate conform Legii 31/1990 cu acționariat majoritar feminin.",
    relatedProgrammes: ["meat-femeia-antreprenor", "meat-microindustrializare"],
    officialDocuments: [
      { title: "Procedura de Implementare a Programului Femeia Antreprenor", url: "https://economie.gov.ro/programe-imm" },
    ],
    institution: "Ministerul Economiei, Antreprenoriatului și Turismului (MEAT)",
    sourceUrl: "https://economie.gov.ro/programe-imm",
    publishedAt: "2026-07-10",
    updatedAt: "2026-09-18",
    author: "Redacția Subvenții România",
    readingTimeMin: 5,
    verified: true,
    faqs: [
      { question: "Sunt eligibile firmele nou-înființate?", answer: "Da, sunt eligibile atât microîntreprinderile noi, cât și cele existente cu vechime sub 3 ani." },
    ],
  },
  {
    slug: "fondul-modernizare-schema-baterii-stocare-energie",
    headline: "Ministerul Energiei: Apel de 500 Milioane EUR din Fondul pentru Modernizare pentru Baterii de Stocare (BESS)",
    summary: "Ministerul Energiei a deschis apelul competitiv de proiecte pentru construirea de capacități de stocare a energiei electrice în acumulatori (BESS), esențiale pentru echilibrarea rețelei naționale.",
    content: `
# Fondul pentru Modernizare — Schema pentru Stocarea Energiei Electrice

Pentru integrarea volumului mare de parcuri fotovoltaice și eoliene din România, Ministerul Energiei acordă granturi nerambursabile companiilor care instalează capacități de stocare de mari dimensiuni conectate la Rețeaua Electrică Națională (SEN).

## Detalii Cheie ale Apelului
- **Buget Total Apel**: 500.000.000 EUR.
- **Finanțare per Proiect**: Până la 100.000 EUR per MWh de capacitate instalată.
- **Beneficiari Eligibili**: Producători de energie din surse regenerabile, operatori de stocare independenți și mari consumatori industriali.
- **Tehnologii Admise**: Baterii Li-Ion, acumulatori pe bază de flux și soluții de stocare chimică de înaltă eficiență.
    `,
    category: "Energie",
    impactAnalysis: "Reduce riscul de prețuri negative la energia electrică pe piața spot și sporește independența energetică a României.",
    whoIsAffected: "Dezvoltatori de proiecte regenerabile, întreprinderi din sectorul energetic și consumatori industriali de energie.",
    relatedProgrammes: ["fondul-pentru-modernizare-stocare-bess", "afm-eficienta-energetica-imm"],
    officialDocuments: [
      { title: "Ghidul Solicitantului — Fondul pentru Modernizare BESS", url: "https://energie.gov.ro" },
    ],
    institution: "Ministerul Energiei",
    sourceUrl: "https://energie.gov.ro",
    publishedAt: "2026-08-05",
    updatedAt: "2026-09-22",
    author: "Redacția Subvenții România",
    readingTimeMin: 5,
    verified: true,
    faqs: [
      { question: "Până la ce dată se depun cererile de finanțare?", answer: "Apelul este deschis în platforma electronică a Ministerului Energiei până la 31 octombrie 2026." },
    ],
  },
  {
    slug: "anap-ghid-achizitii-publice-verzi-sicap",
    headline: "ANAP: Publicarea Ghidului Național pentru Achiziții Publice Verzi și Utilizarea Criteriilor de Sustenabilitate pe SEAP",
    summary: "Agenția Națională pentru Achiziții Publice (ANAP) a emis instrucțiunile oficiale privind aplicarea criteriilor de mediu și a costului pe ciclu de viață (LCC) în procedurile de licitație publică derulate prin SEAP/SICAP.",
    content: `
# Ghidul Achizițiilor Verzi pe SEAP / SICAP — Instrucțiuni Oficiale ANAP

Noile norme metodologice impun autorităților contractante (ministere, primării, spitale, companii naționale) să includă specificații tehnice orientate spre reducerea amprentei de carbon și eficiență energetică.

## Aspecte Cheie pentru Companiile Ofertante
- **Criterii de Atribuire**: Trecerea de la „prețul cel mai scăzut” la „cel mai bun raport calitate-preț”, luând în calcul costurile de reciclare și consumul energetic pe întreaga durată de viață a produsului.
- **Documentul Unic de Achiziție European (DUAE)**: Se completează exclusiv online prin integrarea automată a certificatelor fiscale ANAF și a cazierelor judiciare.
- **Oportunități pentru IMM-uri**: Lotizarea obligatorie a contractelor mari peste 5 milioane de lei pentru a permite accesul întreprinderilor mici și mijlocii ca ofertanți direcți.
    `,
    category: "Infrastructură",
    impactAnalysis: "Facilitează accesul a mii de companii private românești la piața achizițiilor publice de peste 100 miliarde de lei anual.",
    whoIsAffected: "Autorități contractante publice și operatori economici privați înscriși în Registrul SEAP.",
    relatedProgrammes: ["infrastructura-autostrazi-transport-mti"],
    officialDocuments: [
      { title: "Ghidul ANAP privind Criteriile de Achiziții Verzi", url: "https://anap.gov.ro" },
      { title: "Instrucțiunea ANAP nr. 1/2026 privind Utilizarea DUAE Electronic", url: "https://anap.gov.ro" },
    ],
    institution: "Agenția Națională pentru Achiziții Publice (ANAP)",
    sourceUrl: "https://anap.gov.ro",
    publishedAt: "2026-07-28",
    updatedAt: "2026-09-15",
    author: "Redacția Subvenții România",
    readingTimeMin: 5,
    verified: true,
    faqs: [
      { question: "Este gratuită înregistrarea unei firme în SEAP?", answer: "Înregistrarea inițială și recuperarea certificatului digital se realizează gratuit pe portalul e-licitatie.ro." },
    ],
  },
  {
    slug: "anofm-subventii-angajare-tineri-neets-someri",
    headline: "ANOFM: Subvenții Lunare de 2.250 RON pentru Angajatorii care Încadrează Tineri NEETs și Șomeri de peste 45 de Ani",
    summary: "Agenția Națională pentru Ocuparea Forței de Muncă (ANOFM) derulează convențiile financiare prin Legea 76/2002, oferind angajatorilor o subvenție directă de 2.250 lei/lună timp de 12 luni pentru fiecare persoană angajată.",
    content: `
# Subvenții pentru Angajatori — Facilitățile Financiare ANOFM

Prin intermediul Agențiilor Județene pentru Ocuparea Forței de Muncă (AJOFM), companiile din toate sectoarele de activitate pot beneficia de subvenții financiare directe pentru crearea și menținerea de locuri de muncă stabile.

## Condiții și Cuantumul Sprijinului Financiar
- **Cuantum Subvenție**: **2.250 RON / lună** pentru fiecare persoană încadrată cu contract individual de muncă pe perioadă nedeterminată.
- **Durata Acordării**: 12 luni (sau **18 luni** în cazul persoanelor cu dizabilități).
- **Categorii Eligibile**: Tineri NEETs (sub 30 de ani care nu au loc de muncă și nu urmează o formă de învățământ), șomeri de peste 45 de ani, părinți unici susținători de familie și absolvenți de învățământ.
- **Obligația Angajatorului**: Menținerea raporturilor de muncă pentru o perioadă de cel puțin 18 luni de la data încadrării.
    `,
    category: "Piața Muncii",
    impactAnalysis: "Sprijină companiile în reducerea costurilor salariale și facilitează integrarea persoanelor vulnerabile pe piața muncii.",
    whoIsAffected: "Toți angajatorii persoane juridice și persoane fizice autorizate care nu au datorii restante la bugetul asigurărilor pentru șomaj.",
    relatedProgrammes: ["peo-competente-piata-muncii-anofm"],
    officialDocuments: [
      { title: "Ghidul Măsurilor Active de Ocupare ANOFM (Legea 76/2002)", url: "https://www.anofm.ro" },
    ],
    institution: "Agenția Națională pentru Ocuparea Forței de Muncă (ANOFM)",
    sourceUrl: "https://www.anofm.ro",
    publishedAt: "2026-08-12",
    updatedAt: "2026-09-28",
    author: "Redacția Subvenții România",
    readingTimeMin: 5,
    verified: true,
    faqs: [
      { question: "Când se depune cererea de convenție?", answer: "În termen de 60 de zile de la data încheierii contractului individual de muncă cu persoana repartizată de AJOFM." },
    ],
  },
];

export type GovernmentProgramDetail = {
  slug: string;
  title: string;
  subtitle: string;
  heroBadge: string;
  overview: string;
  eligibility: string[];
  benefits: string[];
  documents: string[];
  applicationProcess: { stepNumber: number; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  officialSources: { title: string; url: string }[];
  relatedProgrammes: { title: string; slug: string; grantAmount: string }[];
  stats: { label: string; value: string }[];
};

export const governmentProgramsCatalog: Record<string, GovernmentProgramDetail> = {
  "noua-casa": {
    slug: "noua-casa",
    title: "Programul Guvernamental Noua Casă 2026",
    subtitle: "Garanții de stat de până la 60% și avans redus de 5% pentru achiziția primei locuințe de familie.",
    heroBadge: "Program Național Activ",
    overview: "Programul Noua Casă 2026 susține persoanele fizice în achiziția unei locuințe prin intermediul creditelor garantate de statul român prin FNGCIMM. Programul permite achiziția de apartamente sau case noi și consolidate, oferind dobânzi plafonate și condiții avantajoase de avans.",
    eligibility: [
      "Persoane fizice care nu dețin în proprietate exclusivă nicio locuință sau dețin o locuință cu o suprafață utilă mai mică de 50 mp.",
      "Vârsta minimă de 18 ani și venituri nete eligibile dovedite conform cerințelor băncilor partenere.",
      "Capacitatea de plată a avansului de minimum 5% pentru locuințe sub 70.000 EUR sau 15% pentru locuințe între 70.001 EUR și 140.000 EUR.",
      "Cetățenie română sau rezidență fiscală în România.",
    ],
    benefits: [
      "Garanție de stat de 50% sau 60% din valoarea creditului ipotecar.",
      "Avans redus de la 15% la 5% pentru locuințe până în 70.000 EUR.",
      "Marjă de dobândă plafonată legal la maximum IRCC + 2,00%.",
      "Scutire de la comisionul de gestiune FNGCIMM pentru tinerii sub 35 ani.",
    ],
    documents: [
      "Act de identitate solicitant și soț/soție (unde este cazul).",
      "Certificat de căsătorie sau declarație pe propria răspundere de stare civilă.",
      "Declarație notarială pe propria răspundere că nu deține o altă locuință.",
      "Promisiune bilaterală de vânzare-cumpărare încheiată la notat public.",
      "Extras de carte funciară pentru informare recent.",
      "Certificat de performanță energetică a locuinței (Clasa A sau B).",
    ],
    applicationProcess: [
      { stepNumber: 1, title: "Pre-aprobare Financiară", description: "Mergem la banca parteneră aleasă pentru verificarea gradului de îndatorare și emiterea acordului de principiu." },
      { stepNumber: 2, title: "Identificarea Locuinței", description: "Alegerea imobilului dorit și semnare promisiune de vânzare-cumpărare." },
      { stepNumber: 3, title: "Evaluare & Aprobare FNGCIMM", description: "Banca trimite dosarul către FNGCIMM pentru emiterea garanției de stat (aprox. 5-10 zile lucrătoare)." },
      { stepNumber: 4, title: "Semnarea Contractului de Credit", description: "Semnarea contractului de credit ipotecar, autentificare act de vânzare la notar și virare fonduri." },
    ],
    faqs: [
      { question: "Pot închiria locuința cumpărată prin Noua Casă?", answer: "În primii 5 ani de la achiziție, locuința poate fi închiriată doar cu acordul prealabil al băncii și al Ministerului Finanțelor." },
      { question: "Care este valoarea maximă a creditului?", answer: "Suma maximă a creditului este de 66.500 EUR (pentru locuințe de max 70.000 EUR) sau 119.000 EUR (pentru locuințe de max 140.000 EUR)." },
    ],
    officialSources: [
      { title: "Portalul Oficial FNGCIMM - Noua Casă", url: "https://fngcimm.ro/noua-casa" },
      { title: "Ministerul Finanțelor Publice - Ghid Oficial", url: "https://mfinante.gov.ro" },
    ],
    relatedProgrammes: [
      { title: "Casa Verde Fotovoltaice 2026", slug: "casa-verde", grantAmount: "30.000 RON" },
      { title: "Reabilitare Termică Blocuri & Case", slug: "reabilitare-termica", grantAmount: "90% Subvenție" },
    ],
    stats: [
      { label: "Plafon Alocat 2026", value: "1,5 Miliarde RON" },
      { label: "Locuințe Finanțate", value: "Peste 12.000" },
      { label: "Avans Minim", value: "5%" },
      { label: "Marjă Maximă IRCC", value: "+2.00%" },
    ],
  },
  "casa-verde": {
    slug: "casa-verde",
    title: "Programul Casa Verde Fotovoltaice 2026",
    subtitle: "Finanțare nerambursabilă de 30.000 RON pentru panouri fotovoltaice și baterii de stocare a energiei.",
    heroBadge: "Sesiune Deschisă",
    overview: "Programul Casa Verde Fotovoltaice derulat de Administrația Fondului pentru Mediu oferă sprijin financiar gospodăriilor din România pentru instalarea sistemelor de producere a energiei solare și acumulatoarelor inteligente.",
    eligibility: [
      "Persoană fizică cu domiciliul în România la adresa unde se instalează sistemul.",
      "Proprietar al imobilului construcție pe care se amplasează panourile.",
      "Fără datorii la bugetul de stat (ANAF) și bugetul local.",
      "Imobilul înscris în cartea funciară fără sarcini grevante incompatibile.",
    ],
    benefits: [
      "Grant de până la 30.000 RON necomutabil.",
      "Acoperă sistem fotovoltaic hibrid + baterii de stocare de minimum 5 kWh.",
      "Contribuție proprie fixă de doar 3.000 RON.",
    ],
    documents: [
      "Act de identitate solicitant.",
      "Extras de Carte Funciară recent (max 30 zile).",
      "Certificat atestare fiscală locală (fără datorii la primărie).",
      "Certificat atestare fiscală ANAF (fără datorii la stat).",
    ],
    applicationProcess: [
      { stepNumber: 1, title: "Înscriere în Aplicația AFM", description: "Completare date și încărcare documente în aplicația informatică dedicată AFM." },
      { stepNumber: 2, title: "Selectare Instalator Autorizat", description: "Alegerea firmei instalatoare din lista oficială acreditată AFM." },
      { stepNumber: 3, title: "Montaj & Punct de Consum", description: "Instalarea sistemului fotovoltaic și obținerea certificatului de prosumator." },
    ],
    faqs: [
      { question: "Cât durează instalarea?", answer: "Instalatorii autorizați au obligația finalizării montajului în maximum 12 luni de la aprobare." },
    ],
    officialSources: [
      { title: "Administrația Fondului pentru Mediu (AFM)", url: "https://afm.ro" },
    ],
    relatedProgrammes: [
      { title: "Reabilitare Termică", slug: "reabilitare-termica", grantAmount: "90% Subvenție" },
    ],
    stats: [
      { label: "Buget Total 2026", value: "2.0 Miliarde RON" },
      { label: "Valoare Grant", value: "30.000 RON" },
      { label: "Gospodării Finanțate", value: "66.000+" },
      { label: "Contribuție Proprie", value: "3.000 RON" },
    ],
  },
  "reabilitare-termica": {
    slug: "reabilitare-termica",
    title: "Programul Național de Reabilitare Termică",
    subtitle: "Subvenționare de până la 90% din costul anvelopării blocului sau casei și eficientizare energetică.",
    heroBadge: "Program Național & Local",
    overview: "Sprijin nerambursabil alocat de Ministerul Dezvoltării și Primăriile de Sector/Municipale pentru termoizolarea fațadelor, schimbarea tâmplăriei și montarea sistemelor de încălzire de înaltă eficiență.",
    eligibility: [
      "Asociații de proprietari din blocuri construite între 1950 și 2005.",
      "Proprietari de case individuale prin programele locale de eficiență energetică.",
    ],
    benefits: [
      "Reducerea facturilor la încălzire/răcire cu până la 50%.",
      "Finanțare nerambursabilă între 80% și 90% din costul lucrărilor.",
    ],
    documents: [
      "Hotărârea adunării generale a asociației de proprietari.",
      "Expertiză tehnică și audit energetic inițial.",
    ],
    applicationProcess: [
      { stepNumber: 1, title: "Înscriere la Primărie", description: "Asociația depune solicitarea la Primăria de sector sau primăria de municipiu." },
      { stepNumber: 2, title: "Execuție Lucrări", description: "Licitarea lucrărilor și anveloparea termică a imobilului." },
    ],
    faqs: [
      { question: "Cât plătesc proprietarii?", answer: "Cota de participare a proprietarilor este de obicei între 10% și 20%, eșalonată în tranșe lunare." },
    ],
    officialSources: [
      { title: "Ministerul Dezvoltării, Lucrărilor Publice și Administrației", url: "https://mdlpa.ro" },
    ],
    relatedProgrammes: [
      { title: "Casa Verde Fotovoltaice", slug: "casa-verde", grantAmount: "30.000 RON" },
    ],
    stats: [
      { label: "Economie Factură", value: "Până la 50%" },
      { label: "Subvenție de Stat", value: "80% - 90%" },
      { label: "Blocuri Reabilitate", value: "3.500+" },
      { label: "Audit Energetic", value: "Gratuit" },
    ],
  },
  "programe-pentru-tineri": {
    slug: "programe-pentru-tineri",
    title: "Programe Guvernamentale de Sprijin pentru Tineri 2026",
    subtitle: "Granturi antreprenoriale, scutiri de impozit pe salarii și credite cu dobândă subvenționată 100%.",
    heroBadge: "Facilități Tineri 18-35 Ani",
    overview: "Pachetul integrat al Guvernului României dedicat tinerilor cu vârste între 18 și 35 de ani pentru sprijinirea integrării pe piața muncii, inițierea de afaceri Start-Up și achiziția primului automobil sau locuință.",
    eligibility: [
      "Tineri cu vârsta cuprinsă între 18 și 35 de ani.",
      "Studenți, absolvenți de învățământ terțiar sau școli profesionale.",
    ],
    benefits: [
      "Granturi nerambursabile până la 50.000 EUR prin Start-Up Nation Tineri.",
      "Subvenționarea integrală a dobânzii la creditele studențești și de formare (StudentInvest).",
    ],
    documents: [
      "Act de identitate.",
      "Diplomă de studii sau adeverință de student.",
    ],
    applicationProcess: [
      { stepNumber: 1, title: "Înscriere Portal Oficial", description: "Crearea contului pe platforma unică de granturi guvernamentale." },
    ],
    faqs: [
      { question: "Care este limita de vârstă?", answer: "Pentru StudentInvest vârsta este de max 35 ani, iar pentru FamilyStart este de max 45 ani." },
    ],
    officialSources: [
      { title: "Ministerul Familiei, Tineretului și Egalității de Șanse", url: "https://mfte.gov.ro" },
    ],
    relatedProgrammes: [
      { title: "Noua Casă 2026", slug: "noua-casa", grantAmount: "Avans 5%" },
    ],
    stats: [
      { label: "Grant Maxim IMM", value: "250.000 RON" },
      { label: "Dobândă Subvenționată", value: "100%" },
      { label: "Beneficiari Anual", value: "25.000+" },
      { label: "Vârstă Eligibilă", value: "18-35 Ani" },
    ],
  },
  "programe-locale": {
    slug: "programe-locale",
    title: "Programe de Investiții și Subvenții Locale",
    subtitle: "Granturi acordate de Primării și Consilii Județene pentru dezvoltare urbană, fațade și IMM-uri locale.",
    heroBadge: "Dezvoltare Regională",
    overview: "Consiliile Județene și Primăriile marilor municipii (București, Cluj-Napoca, Timișoara, Iași, Brașov) derulează linii proprii de finanțare nerambursabilă pentru refacerea fațadelor istorice, tehnologizare IMM și eficiență termică.",
    eligibility: [
      "Persoane fizice și juridice cu domiciliul sau sediul social în raza administrativă a primăriei aplicante.",
    ],
    benefits: [
      "Finanțări nerambursabile între 10.000 RON și 200.000 RON.",
      "Scutiri de impozit pe clădiri pe o perioadă de până la 5 ani.",
    ],
    documents: [
      "Certificat fiscal emis de Direcția Impozite și Taxe Locale.",
      "Proiect tehnic sau memoriu justificativ.",
    ],
    applicationProcess: [
      { stepNumber: 1, title: "Depunere Registratură / Online", description: "Depunerea dosarului conform ghidului specific publicat de primăria locală." },
    ],
    faqs: [
      { question: "Unde se depun proiectele?", answer: "Direct pe portalul online de e-guvernare al primăriei respective." },
    ],
    officialSources: [
      { title: "Portalul Național de Administrație Locală", url: "https://administratie.ro" },
    ],
    relatedProgrammes: [
      { title: "Granturi și Facilități", slug: "granturi-si-facilitati", grantAmount: "Scutiri Fiscal" },
    ],
    stats: [
      { label: "Municipii Involvate", value: "41 Județe" },
      { label: "Scutire Impozit", value: "Până la 5 Ani" },
      { label: "Fonduri Alocate", value: "500 Mil. RON" },
      { label: "Rată Aprobare", value: "85%" },
    ],
  },
  "granturi-si-facilitati": {
    slug: "granturi-si-facilitati",
    title: "Granturi de Capital și Facilități Fiscale pentru Firme",
    subtitle: "Scutiri de impozit pe profitul reinvestit, ajutoare de minimis și facilități pentru angajarea tinerilor.",
    heroBadge: "Incentive Fiscale & IMM",
    overview: "Pachetul complet de facilități fiscale direct aplicabile societăților comerciale din România, incluzând scutiri de impozit pe venit/profit, deduceri fiscale pentru R&D și subvenționarea salariilor prin AJOFM.",
    eligibility: [
      "Societăți comerciale (SRL, SA), PFA-uri și întreprinderi individuale active în România.",
    ],
    benefits: [
      "Scutire 100% de la impozitul pe profitul reinvestit în tehnologie nouă.",
      "Subvenții de 2.250 RON/lună de la AJOFM pentru fiecare absolvent angajat.",
      "Deducere suplimentară de 50% din cheltuielile de cercetare-dezvoltare.",
    ],
    documents: [
      "Balanță de verificare și bilanț contabil anual.",
      "Fișă tehnică a mijloacelor fixe achiziționate.",
    ],
    applicationProcess: [
      { stepNumber: 1, title: "Aplicare prin Declarația D101 / AJOFM", description: "Solicitarea deducerilor fiscale direct în declarațiile fiscale anuale sau convenții cu AJOFM." },
    ],
    faqs: [
      { question: "Ce înseamnă profit reinvestit?", answer: "Profitul contabil brut utilizat pentru achiziția de echipamente tehnologice, calculatoare și licențe." },
    ],
    officialSources: [
      { title: "Agenția Națională de Administrare Fiscală (ANAF)", url: "https://anaf.ro" },
      { title: "ANOFM - Subvenții Angajatori", url: "https://anofm.ro" },
    ],
    relatedProgrammes: [
      { title: "Start-Up Nation 2026", slug: "noua-casa", grantAmount: "250.000 RON" },
    ],
    stats: [
      { label: "Scutire Profit", value: "100% Reinvestit" },
      { label: "Subvenție Salariu", value: "2.250 RON/lună" },
      { label: "Deducere R&D", value: "+50%" },
      { label: "Firme Beneficiare", value: "45.000+" },
    ],
  },
};

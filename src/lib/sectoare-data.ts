export type SectorInfo = {
  slug: string;
  name: string;
  category: "Vegetal" | "Zootehnie" | "Investiții & Infrastructură" | "Procesare & Servicii";
  shortDesc: string;
  fullDesc: string;
  estimatedSupport: string;
  keyInterventions: string[];
  eligibilityHighlights: string[];
  complianceConditions: string[];
  faqs: { question: string; answer: string }[];
  officialInstitutions: string[];
};

export const SECTORS_CATALOG: Record<string, SectorInfo> = {
  "vegetal": {
    slug: "vegetal",
    name: "Cultura Plantelor de Câmp & Teren Arabil",
    category: "Vegetal",
    shortDesc: "Subvenții APIA pe hectar: BISS, CRISS, eco-scheme arabile, sprijin cuplat soia, lucernă, leguminoase și cereale.",
    fullDesc: "Sectorul vegetal beneficiază de un pachet integrat de intervenții financiare prin Planul Strategic PAC 2023–2027. Fermierii activi care exploatează terenuri arabile de minimum 1 ha (cu parcele minime de 0,3 ha) pot accesa sprijinul de bază pe venit pentru sustenabilitate (BISS), plata redistributivă (CRISS), eco-scheme specifice (PD-04, PD-05) și ajutoarele naționale tranzitorii (ANT 1).",
    estimatedSupport: "96,47 EUR/ha (BISS) + ~50–56 EUR/ha (CRISS) + 56–73 EUR/ha (Eco-scheme) + ANT",
    keyInterventions: [
      "PD-01 — Sprijinul de bază pentru venit în vederea sustenabilității (BISS)",
      "PD-02 — Sprijinul redistributiv complementar pentru venit (CRISS)",
      "PD-04 — Practici benefice pentru mediu aplicabile în teren arabil",
      "PD-05 — Practica de diversificare a culturilor pe teren arabil",
      "ANT 1 — Culturi amplasate pe teren arabil",
      "Ajutor de stat pentru reducerea accizei la motorina utilizată în agricultură",
    ],
    eligibilityHighlights: [
      "Exploatație de minimum 1 hectar teren arabil, formată din parcele agricole de cel puțin 0,3 ha.",
      "Calitatea de fermier activ dovedită conform legislației naționale.",
      "Documente justificative privind dreptul de utilizare legală a terenului (proprietate, contract de arendare încheiat conform Codului Civil și înregistrat la primărie).",
      "Respectarea normelor de condiționalitate BGAO (Bunele Condiții Agricole și de Mediu) și SMR pe întreaga suprafață a exploatației.",
    ],
    complianceConditions: [
      "BGAO 6: Acoperirea minimă a solului pe timpul iernii (80% din suprafața arabilă).",
      "BGAO 7: Rotația culturilor pe terenul arabil (diversificarea asolamentului).",
      "BGAO 8: Alocarea procentului minim de elemente neproductive (zone de biodiversitate).",
    ],
    faqs: [
      {
        question: "Cine este considerat fermier activ în sectorul vegetal?",
        answer: "Persoanele fizice sau juridice care exploatează efectiv suprafețe agricole și obțin producție agricolă destinată consumului sau comercializării, înregistrate la APIA cu cod unic de identificare.",
      },
      {
        question: "Se pot cumula BISS, CRISS și Eco-schemele?",
        answer: "Da, sprijinul BISS de bază se cumulează direct cu sprijinul redistributiv CRISS (pentru primele 50 ha) și cu eco-schemele la care fermierul aderă voluntar.",
      },
    ],
    officialInstitutions: ["APIA", "MADR", "DAJ"],
  },
  "zootehnie-bovine": {
    slug: "zootehnie-bovine",
    name: "Zootehnie — Bovine de Lapte și Carne",
    category: "Zootehnie",
    shortDesc: "Sprijin cuplat zootehnic (SCZ), Ajutoare Naționale Tranzitorii (ANTZ) și eco-schema pentru bunăstarea vacilor de lapte.",
    fullDesc: "Creșterea bovinelor reprezintă unul dintre cele mai susținute sectoare zootehnice din România. Fermierii beneficiază de sprijin cuplat pentru venit (PD-21 vaci de lapte, PD-22 taurine de carne), ajutoare naționale tranzitorii (ANTZ 7 lapte, ANTZ 8 carne), precum și de eco-scheme dedicate creșterii bunăstării animalelor și reducerii emisiilor de gaze cu efect de seră.",
    estimatedSupport: "338 EUR/cap vacă lapte (PD-21) | 279 EUR/cap taurină carne (PD-22) | 100 EUR/UVM Bunăstare",
    keyInterventions: [
      "PD-21 — Sprijin cuplat pentru venit — Vaci de lapte",
      "PD-22 — Sprijin cuplat pentru venit — Taurine de carne",
      "PD-07 — Creșterea animalelor în regim extensiv pe pajiști permanente",
      "PD-08 — Măsura de bunăstare a vacilor de lapte",
      "ANTZ 7 — Lapte de vacă (schemă decuplată de producție)",
      "ANTZ 8 — Carne de vită (schemă decuplată de producție)",
      "DR-20 — Investiții în sectorul zootehnic (modernizare grajduri și muls)",
    ],
    eligibilityHighlights: [
      "Animale identificate și înregistrate în Baza Națională de Date a ANSVSA (BND).",
      "Respectarea perioadei de retenție în exploatație (minimum 4 luni de la data depunerii cererii).",
      "Efectiv minim de 10 capete și maximum 250 capete vaci de lapte (sau 5–250 capete în zone montane).",
      "Vârsta animalului la data depunerii: între 18 luni și maximum 10 ani pentru vaci de lapte; între 8 și 32 luni pentru tineret taurin la sacrificare.",
    ],
    complianceConditions: [
      "Obligația respectării normelor sanitar-veterinare ANSVSA.",
      "Menținerea registrului individual al exploatației actualizat la zi.",
      "Gestionarea corectă a dejecțiilor animaliere conform Codului de bune practici agricole.",
    ],
    faqs: [
      {
        question: "Câte capete de bovine sunt necesare pentru a primi Sprijin Cuplat (SCZ)?",
        answer: "Pentru vaci de lapte: minimum 10 capete (5 capete în zona montană defavorizată). Pentru taurine de carne: minimum 10 capete (5 capete în zona montană).",
      },
      {
        question: "Care este perioada de retenție obligatorie pentru bovine?",
        answer: "Animalele solicitate pentru sprijin cuplat trebuie menținute în exploatație pe o perioadă de minimum 4 luni (120 de zile) calculate de la termenul limită de depunere a cererii unice.",
      },
    ],
    officialInstitutions: ["APIA", "ANSVSA", "MADR", "AFIR"],
  },
  "ovine-caprine": {
    slug: "ovine-caprine",
    name: "Zootehnie — Ovine și Caprine",
    category: "Zootehnie",
    shortDesc: "Sprijin cuplat pentru femele ovine/caprine (PD-24), ANTZ 9 și eco-scheme pentru pășunat tradițional extensiv.",
    fullDesc: "Sectorul ovin și caprin constituie o ramură tradițională cu un puternic impact social și economic în zonele de deal și munte. Sprijinul financiar vizează creșterea calității genetice a turmelor, menținerea pășunatului extensiv ecologic și valorificarea cărnii și laptelui pe piețele locale și internaționale.",
    estimatedSupport: "12,50 – 15,00 EUR/cap femelă ovină/caprină (PD-24) + ~4,50 EUR/cap ANTZ 9",
    keyInterventions: [
      "PD-24 — Sprijin cuplat pentru venit — Ovine și caprine",
      "ANTZ 9 — Schema decuplată de producție în sectorul ovine/caprine",
      "PD-07 — Pășunat extensiv pe pajiști permanente cu încărcătură optimă",
      "DR-20 — Investiții în ferme zootehnice de ovine și centre de colectare lapte",
    ],
    eligibilityHighlights: [
      "Efectiv de minimum 150 capete și maximum 500 capete femele ovine/caprine (minimum 60 capete în zona montană).",
      "Femele ovine/caprine cu vârsta de minimum 1 an la data de 31 decembrie a anului de depunere.",
      "Animale înscrise în Registrul Genealogic al rasei (secțiunea principală sau secundară) și berbeci/țapi cu certificat de origine.",
      "Perioadă de retenție în exploatație de minimum 100 de zile de la data limită de depunere.",
    ],
    complianceConditions: [
      "Înregistrarea tuturor mișcărilor animalelor în Sistemul Național de Identificare și Înregistrare a Animalelor (SNIIA).",
      "Încărcătură optimă pe pajiștile utilizate: între 0,3 și 1,0 UVM/ha conform Codului de Bune Condiții Agricole.",
    ],
    faqs: [
      {
        question: "Câți berbeci cu certificat de origine sunt necesari în turmă?",
        answer: "Fermierul trebuie să dețină cel puțin 1 berbec cu certificat de origine la fiecare 35 de femele ovine înscrise la sprijin cuplat.",
      },
      {
        question: "Se acordă sprijin și pentru tineretul ovin sub 1 an?",
        answer: "Nu, Sprijinul Cuplat PD-24 se acordă exclusiv pentru femelele ovine și caprine care au împlinit vârsta de minimum 1 an la data de 31 decembrie.",
      },
    ],
    officialInstitutions: ["APIA", "ANSVSA", "MADR"],
  },
  "apicultura": {
    slug: "apicultura",
    name: "Apicultură & Producție Miere",
    category: "Zootehnie",
    shortDesc: "Programul Național Apicol (PNA), sprijin pentru achiziția de mătci, stupi noi, medicamente și decontare pastoral.",
    fullDesc: "Apicultura românească beneficiază de finanțare directă prin intervențiile specifice apicole din cadrul Planului Strategic PAC. Fondurile nerambursabile acoperă achiziția de medicamente pentru tratarea varroozei, achiziția de stupi noi pentru înlocuirea celor uzați, mătci selecționate, analize fizico-chimice ale mierii și echipamente de încărcare/descărcare pentru stupăritul pastoral.",
    estimatedSupport: "Până la 100% decontare pentru medicamente | 50%–75% pentru stupi și mătci | Ajutor de minimis apicol",
    keyInterventions: [
      "Intervenții sectoriale apicole PAC 2023–2027 (fostul PNA)",
      "Decontarea tratamentelor sanitar-veterinare anti-varroa",
      "Sprijin pentru repopularea stupinelor (mătci și roiuri selecționate)",
      "Sprijin pentru achiziția de mijloace de transport apicol și echipamente pastoral",
      "Ajutoare de minimis pentru compensarea pierderilor cauzate de condiții meteo nefavorabile",
    ],
    eligibilityHighlights: [
      "Apicultori înregistrați la Direcția Sanitar-Veterinară și pentru Siguranța Alimentelor (DSVSA).",
      "Stupi identificați și înregistrați în Registrul Apicol și Baza de Date Națională.",
      "Membru într-o formă asociativă apicolă legal recunoscută sau apicultor individual autorizat.",
      "Deținerea a minimum 10 familii de albine pentru accesarea majorității submăsurilor.",
    ],
    complianceConditions: [
      "Achiziționarea mătcilor și roiurilor doar de la stupine de elită sau multiplicare autorizate de ANZ.",
      "Prezentarea facturilor fiscale și dovezilor de plată prin virament bancar.",
    ],
    faqs: [
      {
        question: "Unde se depun cererile de decontare pentru apicultură?",
        answer: "Cererile de plată pentru intervențiile apicole se depun la Centrele Județene APIA unde este înregistrată exploatația apicolă.",
      },
      {
        question: "Care este termenul anual de depunere pentru sprijinul apicol?",
        answer: "De regulă, dosarele de decontare pentru intervențiile apicole se depun până la data de 25 iulie a fiecărui an de cerere.",
      },
    ],
    officialInstitutions: ["APIA", "ANZ", "MADR", "DSVSA"],
  },
  "pomicultura-livezi": {
    slug: "pomicultura-livezi",
    name: "Pomicultură & Livezi Pomicole",
    category: "Vegetal",
    shortDesc: "Intervenția DR-16 Investiții în sectorul pomicol, sprijin cuplat fructe (mere, prune, cireșe) și eco-scheme înierbare livezi.",
    fullDesc: "Sectorul pomicol beneficiază de sprijin dedicat pentru înființarea de plantații pomicole superintensive, reconversie pomicolă, instalarea de plase antigrindină, sisteme de fertirigare automatizată și depozite cu atmosferă controlată pentru păstrarea fructelor proaspete.",
    estimatedSupport: "Până la 1.500.000 EUR grant AFIR (DR-16) | 300–800 EUR/ha Sprijin Cuplat APIA (PD-15 la PD-18)",
    keyInterventions: [
      "DR-16 — Investiții în sectorul pomicol (AFIR)",
      "PD-15 — Sprijin cuplat pentru mere destinate consumului proaspăt/industrializare",
      "PD-16 — Sprijin cuplat pentru prune",
      "PD-17 — Sprijin cuplat pentru cireșe și vișine",
      "PD-18 — Sprijin cuplat pentru caise și piersici",
      "PD-06 — Înierbarea intervalului dintre rânduri în plantațiile pomicole și viticole",
    ],
    eligibilityHighlights: [
      "Plantația pomicolă trebuie să fie înregistrată în Registrul Plantelor Pomicole (RPP) gestionat de MADR.",
      "Suprafață minimă cultivată: 0,1 ha pentru parcele pomicole eligibile la plata directă.",
      "Pentru investiții DR-16: material săditor certificat din categorii biologice recunoscute și proiect tehnic de înființare livezi.",
    ],
    complianceConditions: [
      "Respectarea densităților minime de pomi la hectar conform ghidurilor tehnice pe specii.",
      "Dovada comercializării producției minime stabilite prin ordin MADR.",
    ],
    faqs: [
      {
        question: "Care este intensitatea sprijinului nerambursabil pentru livezi noi (DR-16)?",
        answer: "Intensitatea sprijinului este de 65% din totalul cheltuielilor eligibile, putând ajunge la 80% pentru tinerii fermieri sau investiții colective.",
      },
    ],
    officialInstitutions: ["AFIR", "APIA", "MADR"],
  },
  "viticultura": {
    slug: "viticultura",
    name: "Viticultură & Vinificație",
    category: "Vegetal",
    shortDesc: "Programul Național de Restructurare și Reconversie a Plantațiilor Viticole, sprijin DOC/IG și investiții în crame.",
    fullDesc: "România este unul dintre marii producători vitivinicoli europeni. Fondurile europene sprijină replantarea viilor cu soiuri nobile din categoriile DOC și IG, modernizarea utilajelor pentru cules mecanic, instalarea de sisteme de protecție împotriva secetei și grindinei și construcția de crame moderne.",
    estimatedSupport: "Până la 12.000 EUR/ha la reconversie | Până la 1.000.000 EUR grant pentru crame și dotări vinificație",
    keyInterventions: [
      "Intervenția de Restructurare și Reconversie a Plantațiilor Viticole (PAC 2023–2027)",
      "Intervenția de Investiții în unități de vinificație și comercializare vinuri",
      "PD-06 — Înierbarea intervalului dintre rândurile de viță-de-vie",
      "Sprijin pentru asigurarea recoltei de struguri de vin",
    ],
    eligibilityHighlights: [
      "Plantația trebuie să fie înscrisă în Registrul Plantațiilor Viticole (RPV).",
      "Dreptul de replantare valabil acordat de Oficiul Național al Viei și Produselor Vitivinicole (ONVPV).",
      "Suprafața minimă pentru un proiect de restructurare: 0,5 ha compacte.",
    ],
    complianceConditions: [
      "Interdicția utilizării hibrizilor direct producători (HDP) la finanțare.",
      "Utilizarea exclusivă a vițelor altoite certificate liber de viroze.",
    ],
    faqs: [
      {
        question: "Cine aprobă planurile de restructurare viticolă?",
        answer: "Planurile individuale de reconversie viticolă sunt avizate de DAJ / ONVPV și plătite prin APIA.",
      },
    ],
    officialInstitutions: ["APIA", "ONVPV", "MADR"],
  },
  "legumicultura-solarii": {
    slug: "legumicultura-solarii",
    name: "Legumicultură, Sere și Solarii",
    category: "Vegetal",
    shortDesc: "Programul Tomata & Usturoiul Românesc, sprijin cuplat legume în spații protejate și granturi AFIR pentru sere automatizate.",
    fullDesc: "Legumicultura reprezintă un sector prioritar de securitate alimentară națională. Producătorii beneficiază de ajutoare de stat de minimis (pentru tomate, usturoi, cartofi, legume în spații protejate), sprijin cuplat vegetal APIA de mare valoare pe hectar și linii de grant AFIR de până la 2.000.000 EUR pentru sere hidroponice, solarii încălzite și depozite frigorifice de legume.",
    estimatedSupport: "3.000 EUR/1.000 mp (Tomata) | 1.500–2.500 EUR/ha Sprijin Cuplat Sere | Până la 2.000.000 EUR grant sere AFIR",
    keyInterventions: [
      "Ajutor de minimis pentru susținerea producției de tomate în spații protejate (Programul Tomata)",
      "Ajutor de minimis pentru susținerea producției de usturoi și cartof",
      "PD-12 — Sprijin cuplat pentru legume cultivate în câmp pentru consum în stare proaspătă",
      "PD-13 — Sprijin cuplat pentru legume cultivate în spații protejate (sere și solarii)",
      "DR-15 — Investiții în exploatații agricole — componenta Sere și Solarii Moderne",
    ],
    eligibilityHighlights: [
      "Deținerea unei suprafețe minime cultivate în spațiu protejat de 1.000 mp (pentru Programul Tomata).",
      "Fermier înregistrat în Registrul Agricol și la Direcția Agricolă Județeană (DAJ).",
      "Obținerea și valorificarea pe bază de documente legale a producției minime stabilite prin legislație.",
    ],
    complianceConditions: [
      "Buletin de analiză a fructelor emis de laborator acreditat privind reziduurile de pesticide.",
      "Carnet de comercializare vizat la zi de primăria emitentă.",
    ],
    faqs: [
      {
        question: "Ce suprafață minimă de solar este necesară pentru Programul Tomata?",
        answer: "Suprafața minimă cumulată de solar sau seră este de 1.000 mp cultivați cu tomate în ciclurile de producție stabilite prin hotărâre de guvern.",
      },
    ],
    officialInstitutions: ["MADR", "DAJ", "APIA", "AFIR"],
  },
  "agricultura-ecologica": {
    slug: "agricultura-ecologica",
    name: "Agricultură Ecologică & Măsuri de Mediu",
    category: "Vegetal",
    shortDesc: "Pachetele de conversie și menținere agricultură ecologică (Măsura 11 / DR-04/05) cu plăți compensatorii substanțiale pe hectar.",
    fullDesc: "Agricultura ecologică beneficiază de cele mai mari plăți compensatorii pe hectar pentru acoperirea pierderilor de venit și costurilor suplimentare ocazionate de eliminarea pesticidelor și îngrășămintelor chimice de sinteză. Fondurile se împart în plăți de conversie (anii 1–3) și plăți de menținere a practicilor ecologice certificate.",
    estimatedSupport: "293–627 EUR/ha/an (Culturi arabile) | 500–620 EUR/ha/an (Livezi/Vii) | 390 EUR/ha/an (Legume)",
    keyInterventions: [
      "DR-04 — Intervenția pentru conversia la metodele de agricultură ecologică",
      "DR-05 — Intervenția pentru menținerea practicilor de agricultură ecologică",
      "DR-01 — Zone afectate de constrângeri naturale semnificative (ANC ZM, ANC SEMN)",
      "Pachete agro-mediu și climă pe pajiști cu valoare naturală ridicată (HNV)",
    ],
    eligibilityHighlights: [
      "Contract valabil semnat cu un Organism de Control și Certificare acreditat de MADR și RENAR.",
      "Înregistrarea anuală a fișei de producător ecologic la Direcția Agricolă Județeană (DAJ) până la data de 16 mai.",
      "Angajament multianual de 5 ani pentru menținerea statutului ecologic.",
    ],
    complianceConditions: [
      "Interdicția absolută a utilizării OMG-urilor, îngrășămintelor sintetice și pesticidelor chimice de sinteză.",
      "Respectarea perioadei minime de conversie: 2 ani pentru culturi anuale, 3 ani pentru plantații perene (pomi, viță-de-vie).",
    ],
    faqs: [
      {
        question: "Cât timp durează perioada de conversie la agricultura ecologică?",
        answer: "Pentru culturile de câmp (arabil) conversia durează 2 ani; pentru culturile perene (livezi și vii) perioada de conversie este de minimum 3 ani.",
      },
    ],
    officialInstitutions: ["APIA", "MADR", "DAJ"],
  },
  "irigatii": {
    slug: "irigatii",
    name: "Irigații & Infrastructură Hidroameliorativă",
    category: "Investiții & Infrastructură",
    shortDesc: "Granturi AFIR de până la 1.500.000 EUR (100% nerambursabil pentru OUAI prin DR-25) și 500.000 EUR la nivel de fermă (DR-26).",
    fullDesc: "Combaterea secetei pedologice reprezintă prioritatea numărul 1 a agriculturii românești. AFIR finanțează modernizarea infrastructurii secundare de irigații administrate de Organizațiile Utilizatorilor de Apă pentru Irigații (OUAI) cu finanțare nerambursabilă de până la 100%, precum și achiziția de pivoți, tamburi și sisteme de picurare direct la nivel de fermă.",
    estimatedSupport: "Până la 1.500.000 EUR (100% nerambursabil OUAI - DR-25) | Până la 500.000 EUR (DR-26 la nivel de fermă)",
    keyInterventions: [
      "DR-25 — Modernizarea infrastructurii secundare de irigații (OUAI/FOUAI)",
      "DR-26 — Înființarea sistemelor de irigații la nivel de exploatație agricolă",
      "Programul Național de Reabilitare a Infrastructurii Principale de Irigații (ANIF)",
    ],
    eligibilityHighlights: [
      "Pentru DR-25: Organizație a Utilizatorilor de Apă pentru Irigații (OUAI) constituită legal și înscrisă în Registrul Național.",
      "Preluarea în folosință gratuită a infrastructurii secundare de la ANIF.",
      "Pentru DR-26: Fermieri activi care dețin autorizație de gospodărire a apelor de la Administrația Națională Apele Române.",
    ],
    complianceConditions: [
      "Economie minimă potențială de apă de cel puțin 5%–15% demonstrată prin memoriul hidro-tehnic.",
      "Instalarea obligatorie a contoarelor electronice de debitmetrie a apei consumate.",
    ],
    faqs: [
      {
        question: "Cine poate primi 100% finanțare nerambursabilă pentru irigații?",
        answer: "Organizațiile de Utilizatori de Apă pentru Irigații (OUAI) constituite conform Legii îmbunătățirilor funciare beneficiază de 100% intensitate a sprijinului prin intervenția DR-25.",
      },
    ],
    officialInstitutions: ["AFIR", "ANIF", "Apele Române", "MADR"],
  },
  "utilaje-agricole": {
    slug: "utilaje-agricole",
    name: "Utilaje Agricole, Tractoare & Mecanizare",
    category: "Investiții & Infrastructură",
    shortDesc: "Programul Rabla pentru Tractoare (AFM), intervenția DR-14 și DR-15 AFIR pentru achiziții de combine, semănători no-till și tehnologii de precizie.",
    fullDesc: "Modernizarea parcului tehnic agricol este susținută atât prin fonduri europene FEADR gestionate de AFIR, cât și prin programele de stat derulate de AFM (Programul de stimulare a înnoirii parcului de tractoare și mașini agricole autopropulsate). Se pune un accent deosebit pe utilajele destinate agriculturii conservative (No-Till / Strip-Till) și agriculturii de precizie GPS.",
    estimatedSupport: "Până la 20.000 EUR grant Rabla Tractoare AFM (65%–80%) | Până la 300.000–1.000.000 EUR prin AFIR DR-14/DR-15",
    keyInterventions: [
      "Programul Rabla pentru Tractoare și Mașini Agricole (AFM)",
      "DR-14 — Investiții în fermele de familie și achiziții de utilaje agricole",
      "DR-15 — Investiții în exploatații agricole (componenta dotare tehnică)",
      "DR-27 — Achiziția de utilaje specializate pentru gestionarea și împrăștierea gunoiului de grajd",
    ],
    eligibilityHighlights: [
      "Atestat de producător valabil sau certificat de înregistrare la ONRC (PFA, II, SRL).",
      "Predarea spre casare a unui autovehicul uzat sau tractor vechi (pentru programul AFM).",
      "Dimensiune economică a exploatației între 4.000 și 100.000 SO (Standard Output).",
    ],
    complianceConditions: [
      "Achiziționarea doar de echipamente noi, cu norme de poluare Stage V și conformitate CE.",
      "Menținerea în patrimoniul fermei a echipamentului pe o perioadă de minimum 3–5 ani de la achiziție.",
    ],
    faqs: [
      {
        question: "Cât este sprijinul acordat prin programul Rabla pentru Tractoare de la AFM?",
        answer: "Sprijinul AFM acoperă maximum 65% din valoarea de achiziție a unui tractor de până la 55.000 EUR (ajungând la 80% pentru tinerii fermieri sub 40 de ani).",
      },
    ],
    officialInstitutions: ["AFM", "AFIR", "MADR"],
  },
  "tineri-fermieri": {
    slug: "tineri-fermieri",
    name: "Tineri Fermieri & Instalare în Mediul Rural",
    category: "Investiții & Infrastructură",
    shortDesc: "Granturi 100% nerambursabile de 70.000 EUR prin DR-30 și plată suplimentară pe hectar CIS-YF (PD-03) de la APIA.",
    fullDesc: "Sprijinirea reînnoirii generaționale în mediul rural este una dintre principalele priorități ale Uniunii Europene. Tinerii fermieri (până în 40 de ani împliniți) beneficiază de un grant forfetar de 70.000 EUR fără obligație de cofinanțare proprie prin măsura DR-30, precum și de o plată directă suplimentară pe hectar acordată prin APIA (CIS-YF) timp de maximum 5 ani consecutivi.",
    estimatedSupport: "70.000 EUR grant forfetar (100% nerambursabil) + ~46 EUR/ha plată suplimentară CIS-YF APIA",
    keyInterventions: [
      "DR-30 — Instalarea tinerilor fermieri (AFIR)",
      "PD-03 — Sprijinul complementar pentru venit pentru tinerii fermieri (CIS-YF — APIA)",
      "Punctaj suplimentar la toate intervențiile de investiții AFIR (DR-14, DR-15, DR-20, DR-22)",
      "Garanții de credit de stat prin FGCR cu comisioane reduse",
    ],
    eligibilityHighlights: [
      "Vârsta de până la 40 de ani la momentul depunerii cererii de finanțare (maximum 40 de ani și 364 de zile).",
      "Să se fi instalat pentru prima dată ca șef unic de exploatație agricolă cu cel mult 24 de luni înainte de data depunerii.",
      "Studii medii sau superioare în domeniul agricol/veterinar sau curs de calificare profesională de minimum 360 ore.",
      "Dimensiunea economică a exploatației preluată: între 8.000 SO și 100.000 SO (minimum 4.000 SO în zona montană).",
    ],
    complianceConditions: [
      "Creșterea dimensiunii economice a fermei cu minimum 20% până la a doua tranșă de plată.",
      "Domiciliul și sediul social stabilit în UAT-ul unde se află exploatația agricolă.",
    ],
    faqs: [
      {
        question: "Cum se plătește grantul de 70.000 EUR pentru tineri fermieri?",
        answer: "Grantul se achită în două tranșe: 75% din sumă la semnarea contractului de finanțare și 25% după implementarea corectă a planului de afaceri (în maximum 3 ani).",
      },
    ],
    officialInstitutions: ["AFIR", "APIA", "MADR"],
  },
  "procesare-agroalimentara": {
    slug: "procesare-agroalimentara",
    name: "Procesare Agroalimentară & Valoare Adăugată",
    category: "Procesare & Servicii",
    shortDesc: "Granturi AFIR de până la 3.000.000–10.000.000 EUR prin DR-22 și Programul Național INVESTALIM pentru fabrici de procesare.",
    fullDesc: "Creșterea valorii adăugate prin transformarea materiilor prime agricole românești în produse finite de calitate este finanțată masiv prin intervenția DR-22 (AFIR) și schema de ajutor de stat INVESTALIM (MADR). Se finanțează abatoare moderne, carmangerii, fabrici de lactate, morărit și panificație, procesare fructe și legume, uleiuri presate la rece și sucuri naturale.",
    estimatedSupport: "Până la 3.000.000 EUR (DR-22 AFIR) | Până la 10.000.000–50.000.000 EUR prin INVESTALIM",
    keyInterventions: [
      "DR-22 — Investiții în condiționarea, depozitarea și procesarea produselor agricole și pomicole",
      "Programul Național INVESTALIM — Schema de ajutor de stat pentru procesare alimentară (MADR)",
      "DR-23 — Investiții pentru procesarea produselor agricole în vederea obținerii de produse neagricole",
    ],
    eligibilityHighlights: [
      "Întreprinderi mici, mijlocii sau mari înregistrate la ONRC.",
      "Materia primă prelucrată să provină în proporție semnificativă din producție autohtonă.",
      "Proiectul să demonstreze viabilitate economică și flux tehnologic conform standardelor europene HACCP/IFS.",
    ],
    complianceConditions: [
      "Autorizație sanitar-veterinară DSVSA obținută înainte de efectuarea plății finale.",
      "Cofinanțare privată de 35%–50% susținută prin surse proprii sau credit bancar.",
    ],
    faqs: [
      {
        question: "Cine este eligibil pentru programul INVESTALIM?",
        answer: "Operatorii economici din industria alimentară (Coduri CAEN Diviziunea 10 și 11) care realizează investiții inițiale de minimum 2,5 milioane lei.",
      },
    ],
    officialInstitutions: ["AFIR", "MADR", "DSVSA"],
  },
  "depozitare-silozuri": {
    slug: "depozitare-silozuri",
    name: "Depozitare, Silozuri & Logistică Agricolă",
    category: "Investiții & Infrastructură",
    shortDesc: "Finanțare pentru construcția de baze de recepție, silozuri metalice de cereale, hale de depozitare cereale și celule frigorifice.",
    fullDesc: "Deficitul de spații moderne de depozitare a cerealelor și fructelor/legumelor generează presiuni de preț în campaniile de recoltare. Liniile de sprijin FEADR permit fermierilor și cooperativelor agricole să construiască silozuri verticale automatizate, uscătoare de cereale, selectoare și depozite frigorifice cu atmosferă controlată.",
    estimatedSupport: "Până la 2.000.000 EUR grant nerambursabil (50%–65% intensitate)",
    keyInterventions: [
      "DR-15 — Investiții în exploatații agricole (componenta Silozuri la fermă)",
      "DR-22 — Condiționare și depozitare cereale și semințe oleaginoase",
      "Ajutor de stat pentru credite de depozitare a cerealelor (MADR/FGCR)",
    ],
    eligibilityHighlights: [
      "Capacitatea silozului corelată cu suprafața cultivată de solicitant sau membrii cooperativei.",
      "Teren deținut în proprietate sau concesiune pe termen lung (minimum 10–15 ani).",
      "Studiu geotehnic și proiect tehnic de rezistență avizat.",
    ],
    complianceConditions: [
      "Sisteme integrate de monitorizare a temperaturii și umidității în celulele de siloz.",
      "Sisteme de filtrare și desprafuire conform normelor de protecție a mediului.",
    ],
    faqs: [
      {
        question: "Poate o cooperativă agricolă să primească punctaj superior pentru construirea unui siloz?",
        answer: "Da, formele asociative și cooperativele agricole beneficiază de criterii de selecție favorabile și o intensitate majorată a sprijinului nerambursabil cu până la 20%.",
      },
    ],
    officialInstitutions: ["AFIR", "MADR"],
  },
  "avicultura-porcine": {
    slug: "avicultura-porcine",
    name: "Zootehnie — Porcine & Avicultură",
    category: "Zootehnie",
    shortDesc: "Programe de reproducție suine și avicole, ajutoare de stat pentru bunăstarea porcilor și păsărilor, măsuri stricte de biosecuritate.",
    fullDesc: "Sectoarele intensiv-industriale de creștere a porcilor și păsărilor beneficiază de pachete de sprijin axate pe măsuri de bunăstare a animalelor (densitate redusă, așternut curat, microclimat controlat), protecție împotriva Pestei Porcine Africane (PPA) și a Gripei Aviare, precum și sprijin guvernamental pentru reconstrucția capacităților de reproducție autohtonă.",
    estimatedSupport: "Până la 115 EUR/UVM Bunăstare Porcine | Până la 25 EUR/UVM Bunăstare Păsări | Programe naționale de reproducție",
    keyInterventions: [
      "Măsura de bunăstare a porcinelor (DR-06 / fost M14)",
      "Măsura de bunăstare a păsărilor (DR-07 / fost M14)",
      "Programul Național de Susținere a Crescătorilor de Porci de reproducție (Legea 195/2018)",
      "Programul de reproducție și incubație avicolă (Legea 227/2018)",
    ],
    eligibilityHighlights: [
      "Exploatații comerciale autorizate sanitar-veterinar de către DSVSA județeană.",
      "Respectarea strictă a normelor de biosecuritate de nivel mediu sau înalt.",
      "Contracte de livrare către abatoare autorizate sanitar-veterinar.",
    ],
    complianceConditions: [
      "Asigurarea unei suprafețe disponibile per animal cu minimum 10%–15% mai mare decât norma minimă legală obligatorie.",
      "Monitorizarea calității aerului și a nivelului de amoniac și noxe din adăposturi.",
    ],
    faqs: [
      {
        question: "Cum se calculează plata pentru bunăstarea porcilor?",
        answer: "Plata se calculează în funcție de numărul de animale livrate la abator și numărul de zile de furajare în condiții superioare de bunăstare, exprimat în Unități Vită Mare (UVM).",
      },
    ],
    officialInstitutions: ["APIA", "ANSVSA", "MADR"],
  },
};

export function getSectorInfo(slug: string): SectorInfo | null {
  const norm = slug.toLowerCase().trim();
  return SECTORS_CATALOG[norm] || null;
}

export function getAllSectors(): SectorInfo[] {
  return Object.values(SECTORS_CATALOG);
}

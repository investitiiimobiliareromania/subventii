export type PublicInstitution = {
  slug: string;
  name: string;
  acronym: string;
  officialDomain: string;
  supportEmail: string;
  address: string;
  summary: string;
  responsibilities: string[];
  activeProgramsCount: number;
  faqs: { question: string; answer: string }[];
};

export const institutionsCatalog: PublicInstitution[] = [
  {
    slug: "apia",
    name: "Agenția de Plăți și Intervenție pentru Agricultură",
    acronym: "APIA",
    officialDomain: "apia.org.ro",
    supportEmail: "relatii.cu.publicul@apia.org.ro",
    address: "Bulevardul Carol I nr. 17, Sector 2, București",
    summary: "Agenția națională de plăți responsabilă cu gestionarea și acordarea plăților directe pe suprafață și cap de animal din Fondul European de Garantare Agricolă (FEGA) și a măsurilor compensatorii din Planul Strategic PAC 2023–2027.",
    responsibilities: [
      "Gestionarea campaniei anuale de Cereri Unice de Plată prin aplicația informatică IPA Online.",
      "Plata sprijinului de bază BISS, sprijinului redistributiv CRISS și a eco-schemelor pe hectar.",
      "Acordarea Sprijinului Cuplat Zootehnic (SCZ) pentru bovine, ovine și caprine.",
      "Derularea ajutoarelor de stat naționale (motorină în agricultură, despăgubiri secetă, sprijin apicol).",
      "Efectuarea controalelor administrative, prin teledetecție și a controalelor la fața locului.",
    ],
    activeProgramsCount: 16,
    faqs: [
      { question: "Cum se depune cererea de plată la APIA?", answer: "Exclusiv online prin aplicația IPA Online (lpis.apia.org.ro), urmată de semnarea electronică sau fizică a dosarului la Centrul Județean/Local APIA." },
      { question: "Când se efectuează plățile în avans?", answer: "În fiecare an, plățile în avans din FEGA (70%) și FEADR (85%) se derulează în intervalul 16 octombrie – 30 noiembrie." },
    ],
  },
  {
    slug: "afir",
    name: "Agenția pentru Finanțarea Investițiilor Rurale",
    acronym: "AFIR",
    officialDomain: "afir.ro",
    supportEmail: "relatii.publice@afir.info",
    address: "Str. Știrbei Vodă nr. 43, Sector 1, București",
    summary: "Agenția națională responsabilă cu derularea fondurilor europene de investiții în agricultură și dezvoltare rurală prin Fondul European Agricol pentru Dezvoltare Rurală (FEADR) și Planul Strategic PAC 2023–2027.",
    responsibilities: [
      "Finanțarea fermierilor, tinerilor fermieri (DR-30) și a fermelor de familie (DR-14).",
      "Subvenționarea investițiilor în exploatații vegetale (DR-15), pomicole (DR-16) și zootehnice (DR-20).",
      "Finanțarea infrastructurii secundare de irigații (DR-25) și a unităților de procesare (DR-22).",
      "Evaluarea, contractarea, monitorizarea și autorizarea plăților pentru proiectele de investiții FEADR.",
    ],
    activeProgramsCount: 12,
    faqs: [
      { question: "Unde se depun proiectele AFIR?", answer: "Proiectele se depun exclusiv online prin portalul electronic www.afir.ro în cadrul sesiunilor deschise oficial." },
      { question: "Care este intensitatea sprijinului nerambursabil AFIR?", answer: "Variază între 50% și 100% în funcție de intervenție (100% pentru tineri fermieri DR-30 și irigații OUAI DR-25; 65%-85% pentru ferme de familie DR-14)." },
    ],
  },
  {
    slug: "madr",
    name: "Ministerul Agriculturii și Dezvoltării Rurale",
    acronym: "MADR",
    officialDomain: "madr.ro",
    supportEmail: "relatii.publice@madr.ro",
    address: "Bulevardul Carol I nr. 2-4, Sector 3, București",
    summary: "Autoritatea publică centrală responsabilă de elaborarea și coordonarea politicilor agricole naționale, a Planului Strategic PAC 2023–2027 și a schemelor de ajutor de stat în domeniul agriculturii și industriei alimentare.",
    responsibilities: [
      "Elaborarea legislației secundare (ordine de ministru, hotărâri de guvern) pentru agricultură.",
      "Coordonarea activității agențiilor din subordine: APIA, AFIR, ANIF, ANSVSA, ANAR.",
      "Derularea programelor naționale majore: INVESTALIM, Programul Tomata, Ajutorul la Motorină, Împăduriri.",
      "Negocierea cu Comisia Europeană a modificărilor Planului Strategic PAC.",
    ],
    activeProgramsCount: 10,
    faqs: [
      { question: "Cum pot contacta Direcția Agricolă Județeană (DAJ)?", answer: "Fiecare județ dispune de o Direcție pentru Agricultură Județeană aflată în subordinea directă a MADR, unde se eliberează atestatele de producător și se înregistrează programele de minimis." },
    ],
  },
  {
    slug: "anif",
    name: "Agenția Națională de Îmbunătățiri Funciare",
    acronym: "ANIF",
    officialDomain: "anif.ro",
    supportEmail: "contact@anif.ro",
    address: "Șoseaua Olteniței nr. 35-37, Sector 4, București",
    summary: "Instituția publică responsabilă de administrarea, operarea și întreținerea infrastructurii principale de îmbunătățiri funciare din România (stații de pompare de bază, canale magistrale de aducțiune apă și diguri de apărare).",
    responsibilities: [
      "Derularea Programului Național de Reabilitare a Infrastructurii Principale de Irigații.",
      "Asigurarea apei pentru irigații până la punctele de livrare ale asociațiilor de udători (OUAI).",
      "Întreținerea amenajărilor de desecare, drenaj și combatere a eroziunii solului.",
    ],
    activeProgramsCount: 3,
    faqs: [
      { question: "Cine asigură gratuitatea apei pentru irigații?", answer: "Statul român subvenționează prin ANIF costul energiei electrice și al apei pompate în infrastructura principală până la stațiile de punere sub presiune ale fermierilor." },
    ],
  },
  {
    slug: "ansvsa",
    name: "Autoritatea Națională Sanitară Veterinară și pentru Siguranța Alimentelor",
    acronym: "ANSVSA",
    officialDomain: "ansvsa.ro",
    supportEmail: "ansvsa@ansvsa.ro",
    address: "Piața Presei Libere nr. 1, Corp D1, Sector 1, București",
    summary: "Autoritatea de reglementare și control sanitar-veterinar ce gestionează Baza Națională de Date a Animalelor (BND), Sistemul Național de Identificare și Înregistrare a Animalelor (SNIIA) și acordă autorizațiile de funcționare a fermelor zootehnice.",
    responsibilities: [
      "Administrarea bazei de date electronice pentru identificarea și mișcarea bovinelor, ovinelor, caprinelor și porcinelor.",
      "Monitorizarea și controlul bolilor majore ale animalelor (Pesta Porcină Africană, Gripa Aviară, Boala Limbii Albastre).",
      "Emiterea autorizațiilor și certificatelor sanitar-veterinare necesare la încasarea subvențiilor APIA.",
    ],
    activeProgramsCount: 4,
    faqs: [
      { question: "De ce este obligatorie înregistrarea în SNIIA la APIA?", answer: "Subvențiile zootehnice (Sprijin Cuplat și ANTZ) se acordă exclusiv pentru animalele înregistrate oficial în SNIIA/BND, cu respectarea perioadelor minime de retenție." },
    ],
  },
  {
    slug: "mipe",
    name: "Ministerul Investițiilor și Proiectelor Europene",
    acronym: "MIPE",
    officialDomain: "mfe.gov.ro",
    supportEmail: "contact.minister@mfe.gov.ro",
    address: "Șoseaua București-Ploiești 1-1B, București",
    summary: "Autoritatea centrală de coordonare a fondurilor structurale și de coeziune ale Uniunii Europene și a Planului Național de Redresare și Reziliență (PNRR) în România.",
    responsibilities: [
      "Gestionarea programelor operaționale din Politica de Coeziune 2021–2027.",
      "Coordonarea apelurilor PNRR pentru IMM-uri, digitalizare și eficiență energetică.",
      "Administrarea portalului electronic unic MySMIS2021/PNRR.",
    ],
    activeProgramsCount: 14,
    faqs: [
      { question: "Cum se depun proiectele MIPE?", answer: "Proiectele se depun exclusiv online în portalul MySMIS2021/PNRR." },
    ],
  },
  {
    slug: "afm",
    name: "Administrația Fondului pentru Mediu",
    acronym: "AFM",
    officialDomain: "afm.ro",
    supportEmail: "comunicare@afm.ro",
    address: "Calea Splaiul Independenței nr. 294, București",
    summary: "Instituția publică ce derulează programele naționale de protecție a mediului, inclusiv Casa Verde Fotovoltaice, Rabla pentru Tractoare și Eficiență Energetică.",
    responsibilities: [
      "Derularea programului Casa Verde Fotovoltaice cu sisteme de stocare.",
      "Programul Rabla pentru Tractoare și Mașini Agricole.",
      "Finanțarea infrastructurii verzi și a energiei regenerabile.",
    ],
    activeProgramsCount: 6,
    faqs: [
      { question: "Cum se înscriu fermierii în programele AFM?", answer: "Prin intermediul aplicației informatice dedicate AFM sau prin instalatorii și distribuitorii autorizați." },
    ],
  },
  {
    slug: "meat",
    name: "Ministerul Economiei, Antreprenoriatului și Turismului",
    acronym: "MEAT",
    officialDomain: "economie.gov.ro",
    supportEmail: "presa@economie.gov.ro",
    address: "Calea Victoriei nr. 152, București",
    summary: "Ministerul de resort ce administrează ajutoarele de stat naționale destinate IMM-urilor, Start-Up Nation și dezvoltării turismului.",
    responsibilities: [
      "Gestionarea programului Start-Up Nation România.",
      "Programul de Microindustrializare și Comerț/Servicii.",
      "Promovarea antreprenoriatului și a investițiilor productive.",
    ],
    activeProgramsCount: 5,
    faqs: [
      { question: "Cum pot contacta agenția teritorială MEAT?", answer: "Prin intermediul agențiilor regionale pentru întreprinderi mici și mijlocii (ATIMM)." },
    ],
  },
  {
    slug: "ancpi",
    name: "Agenția Națională de Cadastru și Publicitate Imobiliară",
    acronym: "ANCPI",
    officialDomain: "ancpi.ro",
    supportEmail: "ancpi@ancpi.ro",
    address: "Splaiul Independenței 202A, București",
    summary: "Instituția publică însărcinată cu înregistrarea sistematică a imobilelor în sistemul integrat de cadastru și carte funciară din România.",
    responsibilities: [
      "Derularea Programului Național de Cadastru și Carte Funciară (PNCF) pentru cadastrarea gratuită a terenurilor agricole.",
      "Publicarea datelor statistice lunare privind tranzacțiile imobiliare pe județe.",
      "Administrarea platformei e-Terra și a geoportalului național.",
    ],
    activeProgramsCount: 2,
    faqs: [
      { question: "Cum obțin un extras de carte funciară online?", answer: "Prin contul creat pe platforma oficială epay.ancpi.ro." },
    ],
  },
];

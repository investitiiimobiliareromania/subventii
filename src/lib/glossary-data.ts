export type GlossaryTerm = {
  slug: string;
  term: string;
  definition: string;
  example?: string;
  category: "Plăți Directe" | "Dezvoltare Rurală" | "Condiționalitate" | "Zootehnie" | "General";
  relatedLegislation?: string[];
};

export const glossaryCatalog: GlossaryTerm[] = [
  {
    slug: "biss-sprijin-baza-venit",
    term: "BISS (Sprijinul de bază pentru venit în vederea sustenabilității)",
    definition: "Principala plată directă decuplată pe hectar acordată prin APIA din Fondul European de Garantare Agricolă (FEGA) tuturor fermierilor activi care dețin cel puțin 1 ha de teren agricol eligibil.",
    example: "Un fermier care exploatează 30 ha de teren arabil încasează BISS (~96,47 EUR/ha) pentru întreaga suprafață eligibilă determinată la controale.",
    category: "Plăți Directe",
    relatedLegislation: ["ordin-madr-80-2023-criterii-eligibilitate-pac", "hg-1571-2022-stabilire-cadrul-general-plati-directe"],
  },
  {
    slug: "criss-sprijin-redistributiv",
    term: "CRISS (Sprijinul redistributiv complementar pentru venit)",
    definition: "Plată directă anuală suplimentară pe hectar acordată fermelor mici și mijlocii exclusiv pentru primele 50 de hectare ale exploatației.",
    example: "Pentru o fermă de 40 ha, fermierul primește plata CRISS (~50 EUR/ha) pentru toate cele 40 ha, cumulată cu plata BISS de bază.",
    category: "Plăți Directe",
    relatedLegislation: ["ordin-madr-80-2023-criterii-eligibilitate-pac"],
  },
  {
    slug: "cis-yf-tineri-fermieri",
    term: "CIS-YF (Sprijinul complementar pentru tinerii fermieri)",
    definition: "Plată directă anuală suplimentară pe hectar (pentru maximum 50 ha) acordată tinerilor fermieri sub 40 de ani timp de maximum 5 ani consecutivi de la instalare.",
    example: "Un tânăr fermier de 28 de ani care a înființat un PFA agricol primește CIS-YF (~46 EUR/ha) pe lângă BISS și CRISS.",
    category: "Plăți Directe",
    relatedLegislation: ["ordin-madr-80-2023-criterii-eligibilitate-pac"],
  },
  {
    slug: "eco-schema",
    term: "Eco-schemă (Măsură ecologică voluntară)",
    definition: "Schemă de plată anuală pe hectar sau cap de animal prin care fermierii care adoptă voluntar practici agricole benefice pentru climă, mediu și biodiversitate primesc un sprijin financiar suplimentar.",
    example: "Cultivarea a 10% din terenul arabil cu plante leguminoase fixatoare de azot pentru încasarea eco-schemei PD-04 (~73 EUR/ha).",
    category: "Plăți Directe",
    relatedLegislation: ["ordin-madr-106-2024-derogari-gaec"],
  },
  {
    slug: "sprijin-cuplat-pentru-venit",
    term: "Sprijin Cuplat pentru Venit (SCZ / SCV)",
    definition: "Subvenție directă acordată fermierilor condiționat de producția obținută sau menținerea animalelor în fermă în sectoare considerate strategice sau vulnerabile (bovine, ovine, soia, lucernă, legume, fructe).",
    example: "Încasarea a 338 EUR pe cap de vacă de lapte (PD-21) dacă animalul este înscris în Registrul Genealogic și livrează lapte conform.",
    category: "Zootehnie",
    relatedLegislation: ["ordin-madr-80-2023-criterii-eligibilitate-pac"],
  },
  {
    slug: "uvm-unitate-vita-mare",
    term: "UVM (Unitate Vită Mare)",
    definition: "Unitate standard de măsură utilizată pentru a echivala diferite specii și categorii de animale în funcție de necesarul de furajare (ex: 1 taur/vacă adultă = 1 UVM; 1 ovină/caprină = 0,15 UVM).",
    example: "O turmă de 100 de oi reprezintă 15 UVM (100 x 0,15), necesitând minimum 50 ha de pășune pentru a asigura încărcătura de 0,3 UVM/ha.",
    category: "Zootehnie",
    relatedLegislation: ["oug-34-2023-organizare-pajisti-permanente"],
  },
  {
    slug: "so-standard-output",
    term: "SO (Standard Output — Valoarea Producției Standard)",
    definition: "Valoarea monetară standard a producției brute a unei culturi sau specii de animale, calculată la prețuri de fermă pe hectar sau cap de animal, utilizată pentru a clasifica dimensiunea economică a exploatațiilor la AFIR.",
    example: "Pentru a aplica la tineri fermieri DR-30, exploatația trebuie să aibă o dimensiune economică de minimum 8.000 SO.",
    category: "Dezvoltare Rurală",
    relatedLegislation: ["regulamentul-ue-2021-2115-pac"],
  },
  {
    slug: "bgao-gaec-conditionalitate",
    term: "BGAO / GAEC (Bunele Condiții Agricole și de Mediu)",
    definition: "Setul obligatoriu de 9 standarde europene pe care orice fermier beneficiar de subvenții trebuie să le respecte pe întreaga fermă (acoperirea solului, rotația culturilor, păstrarea elementelor de peisaj, evitarea eroziunii).",
    example: "Respectarea BGAO 6 prin lăsarea miriștii netocate sau însămânțarea de culturi de toamnă pe minimum 80% din suprafața arabilă.",
    category: "Condiționalitate",
    relatedLegislation: ["ordin-madr-106-2024-derogari-gaec"],
  },
  {
    slug: "ipa-online-sigpac",
    term: "IPA Online / LPIS (Sistemul de Identificare a Parcelelor Agricole)",
    definition: "Aplicația web oficială a APIA pe care fermierii își desenează și digitizează limitele parcelelor agricole pe baza ortofotoplanurilor satelitare actualizate.",
    example: "Fermierul accesează lpis.apia.org.ro cu codul unic de utilizator și trasează parcelele în blocurile fizice alocate.",
    category: "General",
    relatedLegislation: ["ordin-madr-80-2023-criterii-eligibilitate-pac"],
  },
  {
    slug: "registrul-agricol",
    term: "Registrul Agricol",
    definition: "Documentul oficial administrat de primăria localității pe raza căreia se află terenul sau animalele, în care sunt înscrise anual declarațiile fermierilor privind suprafețele deținute și efectivele de animale.",
    example: "Adeverința eliberată de primărie pe baza Registrului Agricol este document obligatoriu anexat cererii de plată APIA.",
    category: "General",
    relatedLegislation: ["ordin-madr-80-2023-criterii-eligibilitate-pac"],
  },
];

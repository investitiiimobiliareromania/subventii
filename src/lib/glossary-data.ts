export type GlossaryEntry = {
  slug: string;
  term: string;
  definition: string;
  example: string;
  category: string;
  relatedLegislation: string[];
  relatedProgrammes: { title: string; slug: string }[];
};

export const glossaryCatalog: GlossaryEntry[] = [
  {
    slug: "de-minimis",
    term: "Ajutor de Minimis",
    definition: "Sprijin financiar acordat de stat unei întreprinderi unice, având o valoare redusă ce nu depășește plafonul legal de 300.000 EUR pe o perioadă de 3 ani fiscali consecutivi, nefiind supus notificării Comisiei Europene.",
    example: "O firmă care obține un grant de 50.000 EUR prin Start-Up Nation consumă 50.000 EUR din plafonul de minimis disponibil de 300.000 EUR.",
    category: "Termeni Finanțare",
    relatedLegislation: ["Regulamentul (UE) 2023/2831 al Comisiei"],
    relatedProgrammes: [{ title: "Start-Up Nation 2026", slug: "noua-casa" }],
  },
  {
    slug: "cofinantare",
    term: "Cofinanțare Privată",
    definition: "Cota din cheltuielile eligibile ale proiectului pe care beneficiarul trebuie să o asigure din resurse proprii sau din credit bancar comercial.",
    example: "La un proiect cu valoarea eligibilă de 100.000 EUR și o intensitate a grantului de 90%, cofinanțarea privată este de 10% (10.000 EUR).",
    category: "Termeni Finanțare",
    relatedLegislation: ["Ordonanța de Urgență nr. 64/2022"],
    relatedProgrammes: [{ title: "Casa Verde Fotovoltaice", slug: "casa-verde" }],
  },
  {
    slug: "ircc",
    term: "IRCC (Indicele de Referință pentru Creditele Consumatorilor)",
    definition: "Indicele de referință calculat trimestrial de BNR pe baza tranzacțiilor interbancare efective, utilizat obligatoriu pentru calculul dobânzilor la creditele ipotecare acordate persoanelor fizice.",
    example: "Rata dobânzii la creditul Noua Casă este compusă din valoarea IRCC în vigoare plus marja fixă a băncii de 2,00%.",
    category: "Banking & Credite",
    relatedLegislation: ["OUG nr. 19/2019 privind indicii de referință"],
    relatedProgrammes: [{ title: "Noua Casă 2026", slug: "noua-casa" }],
  },
  {
    slug: "robor",
    term: "ROBOR (Romanian Interbank Offered Rate)",
    definition: "Rata medie a dobânzii la care băncile din România sunt dispuse să ofere depozite celorlalte bănci, utilizată în general la creditele acordate persoanelor juridice (IMM).",
    example: "Un credit de investiții pentru o firmă are o dobândă calculată ca ROBOR 3M + 1,75%.",
    category: "Banking & Credite",
    relatedLegislation: ["Regulamentul BNR nr. 14/2007"],
    relatedProgrammes: [{ title: "Credite Investiții IMM", slug: "credite" }],
  },
  {
    slug: "pad",
    term: "PAD (Polița de Asigurare împotriva Dezastrelor)",
    definition: "Asigurarea obligatorie a locuinței instituită prin lege, care acoperă daunele produse de cutremure, alunecări de teren și inundații din cauze naturale.",
    example: "Fiecare proprietar de apartament trebuie să reînnoiască anual polița PAD.",
    category: "Asigurări",
    relatedLegislation: ["Legea nr. 260/2008"],
    relatedProgrammes: [{ title: "Reabilitare Termică", slug: "reabilitare-termica" }],
  },
];

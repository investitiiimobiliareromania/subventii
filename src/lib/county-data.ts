export type CountyIntelligenceProfile = {
  code: string;
  name: string;
  region: string;
  capital: string;
  population: string;
  activeImmCount: string;
  adrName: string;
  topIndustries: string[];
  keyIncentives: string[];
  ancpiMonthlyAvg: string;
};

export const countyProfilesCatalog: Record<string, CountyIntelligenceProfile> = {
  cluj: {
    code: "CJ",
    name: "Cluj",
    region: "Nord-Vest",
    capital: "Cluj-Napoca",
    population: "700.000",
    activeImmCount: "48.500",
    adrName: "ADR Nord-Vest",
    topIndustries: ["IT & Digital", "Servicii financiare", "Producție componente auto", "Cercetare & Mediu"],
    keyIncentives: [
      "Granturi ADR Nord-Vest de până la 200.000 EUR pentru digitalizare.",
      "Parcuri industriale TETAROM cu facilități fiscale și racord gratuit.",
      "Sprijin municipal Cluj-Napoca pentru fondatorii de Start-Up.",
    ],
    ancpiMonthlyAvg: "3.220 tranzacții",
  },
  bucuresti: {
    code: "B",
    name: "București",
    region: "București-Ilfov",
    capital: "Municipiul București",
    population: "2.100.000",
    activeImmCount: "145.000",
    adrName: "ADR București-Ilfov",
    topIndustries: ["IT & Software", "Construcții imobiliare", "Servicii profesionale", "Comerț"],
    keyIncentives: [
      "Axa PNRR pentru eficientizarea termică a clădirilor de birouri și rezidențiale.",
      "Punctaj maxim la granturile de inovare și tehnologii emergente.",
    ],
    ancpiMonthlyAvg: "6.100 tranzacții",
  },
  timis: {
    code: "TM",
    name: "Timiș",
    region: "Vest",
    capital: "Timișoara",
    population: "650.000",
    activeImmCount: "38.200",
    adrName: "ADR Vest",
    topIndustries: ["Automotive", "Electronice & IT", "Agricultură de mare intensitate", "Logistică"],
    keyIncentives: [
      "Granturi ADR Vest pentru tranziția verde a companiilor de producție.",
      "Incentive pentru sprijinirea fermelor agro-industriale.",
    ],
    ancpiMonthlyAvg: "2.870 tranzacții",
  },
  brasov: {
    code: "BV",
    name: "Brașov",
    region: "Centru",
    capital: "Brașov",
    population: "550.000",
    activeImmCount: "31.000",
    adrName: "ADR Centru",
    topIndustries: ["Aeronautică & Producție", "Turism & Horeca", "Energie regenerabilă", "Logistică"],
    keyIncentives: [
      "Finanțări speciale ADR Centru pentru hoteluri și facilități turistice ecologice.",
      "Subvenții industriale în parcurile industriale Cristian și Ghimbav.",
    ],
    ancpiMonthlyAvg: "2.930 tranzacții",
  },
  iasi: {
    code: "IS",
    name: "Iași",
    region: "Nord-Est",
    capital: "Iași",
    population: "790.000",
    activeImmCount: "34.500",
    adrName: "ADR Nord-Est",
    topIndustries: ["IT & BPO", "Medicină & Sănătate", "Textile & Confecții", "Agricultură"],
    keyIncentives: [
      "Subvenție majorată cu 15% pentru cofinanțare privată în regiunea Nord-Est.",
      "Fonduri PNRR pentru polul de dezvoltare tehnologică Iași.",
    ],
    ancpiMonthlyAvg: "2.560 tranzacții",
  },
};

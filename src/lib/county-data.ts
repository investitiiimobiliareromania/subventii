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
    ancpiMonthlyAvg: "2.610 tranzacții",
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
    ancpiMonthlyAvg: "8.912 tranzacții",
  },
  ilfov: {
    code: "IF",
    name: "Ilfov",
    region: "București-Ilfov",
    capital: "Buftea",
    population: "540.000",
    activeImmCount: "39.000",
    adrName: "ADR București-Ilfov",
    topIndustries: ["Logistică & Depozitare", "Comerț", "Construcții", "Servicii"],
    keyIncentives: [
      "Nod logistic național cu facilități pentru parcuri industriale și centre de distribuție.",
      "Granturi pentru microîntreprinderi și IMM-uri periurbane.",
    ],
    ancpiMonthlyAvg: "3.745 tranzacții",
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
    ancpiMonthlyAvg: "2.340 tranzacții",
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
    ancpiMonthlyAvg: "2.480 tranzacții",
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
    ancpiMonthlyAvg: "1.980 tranzacții",
  },
  constanta: {
    code: "CT",
    name: "Constanța",
    region: "Sud-Est",
    capital: "Constanța",
    population: "680.000",
    activeImmCount: "36.000",
    adrName: "ADR Sud-Est",
    topIndustries: ["Transport Maritim & Portuar", "Turism Litoral", "Energie Eoliană", "Agricultură"],
    keyIncentives: [
      "Granturi de dezvoltare pentru operatorii din Portul Constanța și industria navală.",
      "Programe dedicate turismului sustenabil și energiei regenerabile.",
    ],
    ancpiMonthlyAvg: "2.190 tranzacții",
  },
  suceava: {
    code: "SV",
    name: "Suceava",
    region: "Nord-Est",
    capital: "Suceava",
    population: "640.000",
    activeImmCount: "25.000",
    adrName: "ADR Nord-Est",
    topIndustries: ["Prelucrarea Lemnului", "Turism Bucovina", "Industrie Alimentară", "Comerț"],
    keyIncentives: [
      "Sprijin financiar pentru pensiuni și agroturism în zona Bucovinei.",
      "Granturi pentru microîntreprinderi de prelucrare și producție meșteșugărească.",
    ],
    ancpiMonthlyAvg: "1.850 tranzacții",
  },
  bihor: {
    code: "BH",
    name: "Bihor",
    region: "Nord-Vest",
    capital: "Oradea",
    population: "570.000",
    activeImmCount: "29.000",
    adrName: "ADR Nord-Vest",
    topIndustries: ["Producție Industrială", "Termalism & Turism", "Logistică Transfrontalieră"],
    keyIncentives: [
      "Parcuri industriale Eurobusiness Oradea cu facilități fiscale locale.",
      "Granturi de digitalizare și inovare ADR Nord-Vest.",
    ],
    ancpiMonthlyAvg: "1.920 tranzacții",
  },
  dolj: {
    code: "DJ",
    name: "Dolj",
    region: "Sud-Vest Oltenia",
    capital: "Craiova",
    population: "630.000",
    activeImmCount: "27.000",
    adrName: "ADR Sud-Vest Oltenia",
    topIndustries: ["Automotive (Ford Otosan)", "Inginerie & IT", "Agricultură", "Construcții"],
    keyIncentives: [
      "Fonduri de Tranziție Justă pentru restructurare economică și crearea de noi locuri de muncă.",
      "Granturi ADR Sud-Vest Oltenia pentru tehnologizare IMM.",
    ],
    ancpiMonthlyAvg: "1.760 tranzacții",
  },
  prahova: {
    code: "PH",
    name: "Prahova",
    region: "Sud-Muntenia",
    capital: "Ploiești",
    population: "720.000",
    activeImmCount: "35.000",
    adrName: "ADR Sud-Muntenia",
    topIndustries: ["Rafinare & Petrochimie", "Turism Valea Prahovei", "Logistică", "Construcții"],
    keyIncentives: [
      "Incentive pentru proiecte de energie verde și eficiență termică.",
      "Granturi pentru modernizarea capacităților de cazare turistică.",
    ],
    ancpiMonthlyAvg: "2.150 tranzacții",
  },
  sibiu: {
    code: "SB",
    name: "Sibiu",
    region: "Centru",
    capital: "Sibiu",
    population: "420.000",
    activeImmCount: "24.000",
    adrName: "ADR Centru",
    topIndustries: ["Componente Auto", "IT & Inovare", "Turism Cultural", "Mecanică Fină"],
    keyIncentives: [
      "Zone industriale occidentale cu infrastructură de ultimă generație.",
      "Linii de finanțare ADR Centru pentru servicii și turism.",
    ],
    ancpiMonthlyAvg: "1.650 tranzacții",
  },
};

export function getCountyProfile(slugOrName: string): CountyIntelligenceProfile {
  const decoded = decodeURIComponent(slugOrName).toLowerCase().trim()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  if (countyProfilesCatalog[decoded]) {
    return countyProfilesCatalog[decoded];
  }

  // Check matching by name without diacritics
  const found = Object.values(countyProfilesCatalog).find((c) =>
    c.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === decoded
  );
  if (found) return found;

  const rawDecoded = decodeURIComponent(slugOrName);
  const formattedName = rawDecoded.charAt(0).toUpperCase() + rawDecoded.slice(1);

  return {
    code: rawDecoded.substring(0, 2).toUpperCase(),
    name: formattedName,
    region: "Național",
    capital: `Municipiul ${formattedName}`,
    population: "Sute de mii de locuitori",
    activeImmCount: "Zeci de mii de firme",
    adrName: "Agenția pentru Dezvoltare Regională",
    topIndustries: ["Servicii", "Comerț", "Producție", "Construcții"],
    keyIncentives: ["Granturi regionale ADR", "Programul Start-Up Nation", "Eficiență energetică"],
    ancpiMonthlyAvg: "Peste 1.000 tranzacții",
  };
}


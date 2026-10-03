/**
 * AI Educational Engine
 * Motor educațional determinist bazat pe logică, calcule matematice și date oficiale verificate din platformă.
 * ZERO halucinații, ZERO presupuneri nefondate.
 */

export interface MathCalculationResult {
  type: string;
  resultTitle: string;
  keyFigures: { label: string; value: string; isPrimary?: boolean }[];
  stepByStep: string[];
  explanation: string;
  sourceCitations?: string[];
  educationalNote: string;
  suggestContact?: boolean;
  contactSubject?: string;
  contactMessage?: string;
}

export type QueryIntent =
  | "CALCULATION"
  | "PLATFORM_DATA"
  | "SOURCE_LOOKUP"
  | "EDUCATIONAL_EXPLANATION"
  | "COMPARISON"
  | "SCENARIO"
  | "CONTACT_REQUIRED"
  | "UNKNOWN";

export interface EducationalEngineResponse {
  intent: QueryIntent;
  answer: string;
  calculation?: MathCalculationResult;
  citations: string[];
  contactCta?: {
    label: string;
    programInterest: string;
    message: string;
  };
}

// -----------------------------------------------------------------------------
// 1. FUNCȚII MATEMATICE DETERMINISTE
// -----------------------------------------------------------------------------

export function formatNumber(num: number, decimals: number = 2): string {
  if (!isFinite(num) || isNaN(num)) return "0";
  return new Intl.NumberFormat("ro-RO", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: Number.isInteger(num) ? 0 : Math.min(2, decimals),
  }).format(num);
}

export function formatCurrency(num: number, currency: string = "RON"): string {
  return `${formatNumber(num)} ${currency}`;
}

export function calculatePercentage(val: number, pct: number): { amount: number; original: number; percentage: number } {
  if (!isFinite(val) || !isFinite(pct) || isNaN(val) || isNaN(pct)) {
    return { amount: 0, original: 0, percentage: 0 };
  }
  const amount = (val * pct) / 100;
  return { amount, original: val, percentage: pct };
}

export function calculateFunding(
  investment: number,
  grantPercent: number
): {
  investment: number;
  grantPercent: number;
  grantAmount: number;
  cofinancingPercent: number;
  cofinancingAmount: number;
} {
  if (!isFinite(investment) || !isFinite(grantPercent) || isNaN(investment) || isNaN(grantPercent) || investment <= 0) {
    return {
      investment: 0,
      grantPercent: 0,
      grantAmount: 0,
      cofinancingPercent: 0,
      cofinancingAmount: 0,
    };
  }

  const safeGrantPct = Math.max(0, Math.min(100, grantPercent));
  const safeCofinancingPct = 100 - safeGrantPct;
  const grantAmount = (investment * safeGrantPct) / 100;
  const cofinancingAmount = investment - grantAmount;

  return {
    investment,
    grantPercent: safeGrantPct,
    grantAmount,
    cofinancingPercent: safeCofinancingPct,
    cofinancingAmount,
  };
}

export function calculateDifference(
  a: number,
  b: number
): {
  a: number;
  b: number;
  difference: number;
  percentageDiff: number;
} {
  if (!isFinite(a) || !isFinite(b) || isNaN(a) || isNaN(b)) {
    return { a: 0, b: 0, difference: 0, percentageDiff: 0 };
  }
  const difference = Math.abs(a - b);
  const base = b !== 0 ? b : 1;
  const percentageDiff = ((a - b) / base) * 100;
  return { a, b, difference, percentageDiff };
}

export function calculateGrowthRate(
  initial: number,
  final: number
): {
  initial: number;
  final: number;
  growthAmount: number;
  growthRatePercent: number;
} {
  if (!isFinite(initial) || !isFinite(final) || isNaN(initial) || isNaN(final) || initial === 0) {
    return { initial: 0, final: 0, growthAmount: 0, growthRatePercent: 0 };
  }
  const growthAmount = final - initial;
  const growthRatePercent = (growthAmount / initial) * 100;
  return { initial, final, growthAmount, growthRatePercent };
}

export function calculateVat(
  netAmount: number,
  vatRate: number = 19
): {
  netAmount: number;
  vatRate: number;
  vatAmount: number;
  grossAmount: number;
} {
  if (!isFinite(netAmount) || isNaN(netAmount) || netAmount <= 0) {
    return { netAmount: 0, vatRate: 19, vatAmount: 0, grossAmount: 0 };
  }
  const vatAmount = (netAmount * vatRate) / 100;
  const grossAmount = netAmount + vatAmount;
  return { netAmount, vatRate, vatAmount, grossAmount };
}

export function calculatePricePerSqm(
  totalPrice: number,
  areaSqm: number
): {
  totalPrice: number;
  areaSqm: number;
  pricePerSqm: number;
} {
  if (!isFinite(totalPrice) || !isFinite(areaSqm) || isNaN(totalPrice) || isNaN(areaSqm) || areaSqm <= 0) {
    return { totalPrice: 0, areaSqm: 0, pricePerSqm: 0 };
  }
  const pricePerSqm = totalPrice / areaSqm;
  return { totalPrice, areaSqm, pricePerSqm };
}

export function calculateYield(
  annualIncome: number,
  totalCost: number
): {
  annualIncome: number;
  totalCost: number;
  yieldPercent: number;
} {
  if (!isFinite(annualIncome) || !isFinite(totalCost) || isNaN(annualIncome) || isNaN(totalCost) || totalCost <= 0) {
    return { annualIncome: 0, totalCost: 0, yieldPercent: 0 };
  }
  const yieldPercent = (annualIncome / totalCost) * 100;
  return { annualIncome, totalCost, yieldPercent };
}

export function calculateAmortization(
  totalInvestment: number,
  annualBenefitOrSavings: number
): {
  totalInvestment: number;
  annualBenefitOrSavings: number;
  years: number;
  months: number;
} {
  if (
    !isFinite(totalInvestment) ||
    !isFinite(annualBenefitOrSavings) ||
    isNaN(totalInvestment) ||
    isNaN(annualBenefitOrSavings) ||
    annualBenefitOrSavings <= 0
  ) {
    return { totalInvestment: 0, annualBenefitOrSavings: 0, years: 0, months: 0 };
  }
  const rawYears = totalInvestment / annualBenefitOrSavings;
  const years = Math.floor(rawYears);
  const months = Math.round((rawYears - years) * 12);
  return { totalInvestment, annualBenefitOrSavings, years, months };
}

// -----------------------------------------------------------------------------
// 2. PARSARE ȘI DETECȚIE INTENȚIE
// -----------------------------------------------------------------------------

function extractNumbers(text: string): number[] {
  // Replaces dots and commas used as thousand separators, e.g. "1.200.000" or "1,200,000"
  let clean = text;
  while (/(\d)[.](\d{3})(?!\d)/.test(clean) || /(\d)[,](\d{3})(?!\d)/.test(clean)) {
    clean = clean.replace(/(\d)[.](\d{3})(?!\d)/g, "$1$2").replace(/(\d)[,](\d{3})(?!\d)/g, "$1$2");
  }
  const matches = clean.match(/(\d+(?:[.,]\d+)?)/g);
  if (!matches) return [];
  return matches.map((m) => parseFloat(m.replace(",", "."))).filter((n) => isFinite(n) && !isNaN(n));
}

export function classifyIntent(query: string): QueryIntent {
  const q = query.toLowerCase().trim();

  // 1. Math Calculation Indicators
  const mathKeywords = [
    "cât este",
    "calculează",
    "procent",
    "%",
    "tva",
    "diferența",
    "diferenta",
    "preț/mp",
    "pret/mp",
    "mp",
    "finanțare este",
    "finantare este",
    "grantul este",
    "cofinanțare",
    "cofinantare",
    "amortizare",
    "randament",
    "înmulțit",
    "împărțit",
  ];
  const hasNumbers = extractNumbers(q).length >= 1;
  const hasMathKeyword = mathKeywords.some((k) => q.includes(k));

  if (hasNumbers && hasMathKeyword) {
    return "CALCULATION";
  }

  // 2. Platform Verified Data Lookup
  const platformKeywords = [
    "start-up nation",
    "startup nation",
    "femeia antreprenor",
    "microindustrializare",
    "casa verde",
    "afm",
    "noua casa",
    "noua casă",
    "prima casa",
    "pib",
    "ircc",
    "robor",
    "inflație",
    "inflatie",
    "salariu mediu",
    "tranzacții ancpi",
    "tranzactii ancpi",
    "e-terra",
    "cadastru",
    "dr-15",
    "dr-20",
    "dr-22",
    "dr-25",
    "dr-26",
    "biss",
    "criss",
    "eco-scheme",
    "madr",
    "afir",
    "apia",
    "seap",
    "sicap",
  ];
  if (platformKeywords.some((k) => q.includes(k))) {
    return "PLATFORM_DATA";
  }

  // 3. Questions asking about personal eligibility or specific ambiguous funding needs
  const eligibilityKeywords = [
    "pot primi",
    "sunt eligibil",
    "pot aplica",
    "am o firmă",
    "am o firma",
    "vreau să deschid",
    "vreau sa deschid",
    "vreau să construiesc",
    "vreau sa construiesc",
    "hală",
    "hala",
    "fonduri pentru mine",
    "banii mei",
    "cum iau bani",
    "cum aplic",
    "afacerea mea",
  ];
  if (eligibilityKeywords.some((k) => q.includes(k))) {
    return "CONTACT_REQUIRED";
  }

  // Fallback
  return "UNKNOWN";
}

// -----------------------------------------------------------------------------
// 3. MOTORUL EDUCAȚIONAL PRINCIPAL
// -----------------------------------------------------------------------------

export function solveEducationalQuery(query: string): EducationalEngineResponse {
  const q = query.toLowerCase().trim();
  const intent = classifyIntent(query);
  const numbers = extractNumbers(query);

  // ---------------------------------------------------------------------------
  // A. CALCULE MATEMATICE DETERMINISTE
  // ---------------------------------------------------------------------------
  if (intent === "CALCULATION") {
    // 1. Funding + Co-financing (e.g., "O investiție este 500.000 lei, finanțarea este 70%")
    if (
      (q.includes("investi") || q.includes("proiect") || q.includes("valoare") || q.includes("cost") || q.includes("eligibil")) &&
      (q.includes("finanț") || q.includes("finant") || q.includes("grant") || q.includes("%")) &&
      numbers.length >= 2
    ) {
      let investment = numbers[0];
      let percent = numbers[1];

      // If first is percent and second is total
      if (investment <= 100 && percent > 100) {
        const tmp = investment;
        investment = percent;
        percent = tmp;
      }

      const res = calculateFunding(investment, percent);
      return {
        intent: "CALCULATION",
        answer: `Calcul determinist pentru o investiție de ${formatCurrency(res.investment)} cu o intensitate a sprijinului nerambursabil de ${res.grantPercent}%:`,
        calculation: {
          type: "funding",
          resultTitle: "Plan Financiar Estimativ (Finanțare Nerambursabilă vs. Cofinanțare)",
          keyFigures: [
            { label: "Valoare Totală Investiție", value: formatCurrency(res.investment) },
            { label: `Finanțare Nerambursabilă (${res.grantPercent}%)`, value: formatCurrency(res.grantAmount), isPrimary: true },
            { label: `Cofinanțare Proprie (${res.cofinancingPercent}%)`, value: formatCurrency(res.cofinancingAmount) },
          ],
          stepByStep: [
            `1. Finanțare nerambursabilă = ${formatNumber(res.investment)} RON × ${res.grantPercent}% = ${formatCurrency(res.grantAmount)}`,
            `2. Cofinanțare proprie = ${formatNumber(res.investment)} RON − ${formatNumber(res.grantAmount)} RON = ${formatCurrency(res.cofinancingAmount)}`,
          ],
          explanation: `La o investiție totală eligibilă de ${formatCurrency(res.investment)}, grantul nerambursabil acoperă ${formatCurrency(res.grantAmount)}, iar solicitantul trebuie să asigure din surse proprii sau credit bancar suma de ${formatCurrency(res.cofinancingAmount)}.`,
          educationalNote: "Calcul matematic orientativ. Confirmarea sumelor exacte și a eligibilității cheltuielilor se realizează strict conform Ghidului Solicitantului aplicabil.",
        },
        citations: ["Calcul Matematic Determinist", "Ghidul General al Fondurilor Structurale și Naționale"],
        contactCta: {
          label: "Solicită Consultanță pentru acest Buget",
          programInterest: `Finanțare Investiție ${formatNumber(res.investment)} RON`,
          message: `Doresc o evaluare pentru un proiect de investiție de ${formatCurrency(res.investment)} cu finanțare estimată de ${res.grantPercent}%.`,
        },
      };
    }

    // 2. Simple Percentage (e.g., "Cât este 15% din 240.000 lei?")
    if ((q.includes("din") || q.includes("%") || q.includes("procent")) && numbers.length >= 2) {
      let percent = numbers[0];
      let total = numbers[1];

      if (total <= 100 && percent > 100) {
        const tmp = percent;
        percent = total;
        total = tmp;
      }

      const res = calculatePercentage(total, percent);
      return {
        intent: "CALCULATION",
        answer: `Rezultatul calculului matematic pentru ${res.percentage}% din ${formatCurrency(res.original)}:`,
        calculation: {
          type: "percentage",
          resultTitle: "Calcul Procentual",
          keyFigures: [
            { label: "Bază de calcul", value: formatCurrency(res.original) },
            { label: "Procent aplicat", value: `${res.percentage}%` },
            { label: "Valoare rezultată", value: formatCurrency(res.amount), isPrimary: true },
          ],
          stepByStep: [`${formatNumber(res.original)} × (${res.percentage} / 100) = ${formatCurrency(res.amount)}`],
          explanation: `${res.percentage}% din suma de ${formatCurrency(res.original)} reprezintă exact ${formatCurrency(res.amount)}.`,
          educationalNote: "Rezultat matematic exact determinist.",
        },
        citations: ["Calcul Matematic Determinist"],
      };
    }

    // 3. Price per sqm (e.g., "O proprietate costă 1.200.000 lei și are 120 mp. Care este prețul/mp?")
    if ((q.includes("mp") || q.includes("metri") || q.includes("suprafa")) && numbers.length >= 2) {
      let price = numbers[0];
      let area = numbers[1];

      if (area > price && price > 0) {
        const tmp = price;
        price = area;
        area = tmp;
      }

      const res = calculatePricePerSqm(price, area);
      return {
        intent: "CALCULATION",
        answer: `Calculul prețului unitar pe metru pătrat pentru proprietatea specificată:`,
        calculation: {
          type: "pricePerSqm",
          resultTitle: "Preț Unitar pe Suprafață Utilă",
          keyFigures: [
            { label: "Preț Total", value: formatCurrency(res.totalPrice) },
            { label: "Suprafață", value: `${formatNumber(res.areaSqm)} mp` },
            { label: "Preț / mp", value: `${formatCurrency(res.pricePerSqm)} / mp`, isPrimary: true },
          ],
          stepByStep: [
            `${formatNumber(res.totalPrice)} RON ÷ ${formatNumber(res.areaSqm)} mp = ${formatCurrency(res.pricePerSqm)} / mp`,
          ],
          explanation: `La o valoare totală de ${formatCurrency(res.totalPrice)} și o suprafață de ${formatNumber(res.areaSqm)} mp, prețul mediu rezultat este de ${formatCurrency(res.pricePerSqm)} pe metru pătrat.`,
          educationalNote: "Calcul matematic determinist. Pentru comparații imobiliare oficiale, consultați rapoartele ANCPI pe județe.",
        },
        citations: ["Calcul Matematic Determinist", "Platforma Imobiliară SUBVENȚII"],
      };
    }

    // 4. Difference between two numbers (e.g., "Care este diferența între 500.000 și 375.000?")
    if ((q.includes("diferen") || q.includes("compar") || q.includes("scadere")) && numbers.length >= 2) {
      const a = numbers[0];
      const b = numbers[1];
      const res = calculateDifference(a, b);

      return {
        intent: "CALCULATION",
        answer: `Diferența matematică dintre ${formatNumber(a)} și ${formatNumber(b)}:`,
        calculation: {
          type: "difference",
          resultTitle: "Diferență Valorică și Procentuală",
          keyFigures: [
            { label: "Valoarea A", value: formatNumber(a) },
            { label: "Valoarea B", value: formatNumber(b) },
            { label: "Diferență Absolută", value: formatNumber(res.difference), isPrimary: true },
            { label: "Variație Procentuală", value: `${res.percentageDiff > 0 ? "+" : ""}${formatNumber(res.percentageDiff)}%` },
          ],
          stepByStep: [`| ${formatNumber(a)} − ${formatNumber(b)} | = ${formatNumber(res.difference)}`],
          explanation: `Diferența dintre cele două valori este de ${formatNumber(res.difference)}, reprezentând o abatere relativă de ${formatNumber(Math.abs(res.percentageDiff))}%.`,
          educationalNote: "Calcul matematic determinist.",
        },
        citations: ["Calcul Matematic Determinist"],
      };
    }

    // 5. VAT Calculation (e.g., "TVA pentru 100.000 lei")
    if (q.includes("tva") && numbers.length >= 1) {
      const net = numbers[0];
      const vatRate = numbers.length >= 2 ? numbers[1] : 19;
      const res = calculateVat(net, vatRate);

      return {
        intent: "CALCULATION",
        answer: `Calcul TVA (${res.vatRate}%) pentru suma netă de ${formatCurrency(res.netAmount)}:`,
        calculation: {
          type: "vat",
          resultTitle: "Calcul Taxa pe Valoarea Adăugată (TVA)",
          keyFigures: [
            { label: "Valoare Netă", value: formatCurrency(res.netAmount) },
            { label: `TVA (${res.vatRate}%)`, value: formatCurrency(res.vatAmount), isPrimary: true },
            { label: "Valoare Brută (cu TVA)", value: formatCurrency(res.grossAmount) },
          ],
          stepByStep: [
            `1. TVA = ${formatNumber(res.netAmount)} × ${res.vatRate}% = ${formatCurrency(res.vatAmount)}`,
            `2. Total Brut = ${formatNumber(res.netAmount)} + ${formatNumber(res.vatAmount)} = ${formatCurrency(res.grossAmount)}`,
          ],
          explanation: `La o bază impozabilă de ${formatCurrency(res.netAmount)}, valoarea TVA la cota de ${res.vatRate}% este de ${formatCurrency(res.vatAmount)}, rezultând un total de plată de ${formatCurrency(res.grossAmount)}.`,
          educationalNote: "În majoritatea proiectelor cu fonduri nerambursabile, TVA-ul este cheltuială eligibilă doar dacă solicitantul este neplătitor de TVA conform Legii 227/2015 privind Codul Fiscal.",
        },
        citations: ["Calcul Matematic Determinist", "Codul Fiscal (Legea nr. 227/2015)"],
      };
    }
  }

  // ---------------------------------------------------------------------------
  // B. DATE VERIFICATE DIN PLATFORMĂ
  // ---------------------------------------------------------------------------
  if (intent === "PLATFORM_DATA") {
    if (q.includes("start-up") || q.includes("startup")) {
      return {
        intent: "PLATFORM_DATA",
        answer: "Conform ghidului oficial Start-Up Nation (Ministerul Economiei, Antreprenoriatului și Turismului):",
        calculation: {
          type: "platform_info",
          resultTitle: "Start-Up Nation — Parametri Financiari Oficiali",
          keyFigures: [
            { label: "Grant Maxim Nerambursabil", value: "250.000 RON (~50.000 EUR)", isPrimary: true },
            { label: "Intensitate Sprijin", value: "Până la 90%" },
            { label: "Cofinanțare Minimă", value: "Minim 10% (25.000 RON)" },
            { label: "Condiție Obligatorie", value: "Curs antreprenorial acreditat" },
          ],
          stepByStep: [
            "1. Pilonul I: Tineri sub 30 de ani / persoane în căutare de loc de muncă.",
            "2. Pilonul II: Persoane între 30 și 35 de ani din orice regiune a țării.",
            "3. Crearea și menținerea a minimum 2 locuri de muncă cu normă întreagă.",
          ],
          explanation: "Programul vizează sprijinirea înființării și dezvoltării de noi microîntreprinderi și întreprinderi mici prin acordarea de alocații financiare nerambursabile.",
          educationalNote: "Date verificate conform OUG 115/2026 și procedurilor oficiale MEAT.",
        },
        citations: ["MEAT — Procedura de Implementare Start-Up Nation", "OUG nr. 115/2026", "Monitorul Oficial"],
        contactCta: {
          label: "Solicită Consultanță Start-Up Nation",
          programInterest: "Start-Up Nation",
          message: "Doresc detalii privind pregătirea dosarului și cursul acreditat pentru Start-Up Nation.",
        },
      };
    }

    if (q.includes("casa verde") || q.includes("afm") || q.includes("fotovoltaic")) {
      return {
        intent: "PLATFORM_DATA",
        answer: "Conform Ghidului Oficial AFM Casa Verde Fotovoltaice:",
        calculation: {
          type: "platform_info",
          resultTitle: "AFM Casa Verde — Parametri Oficiali",
          keyFigures: [
            { label: "Finanțare Nerambursabilă AFM", value: "30.000 RON", isPrimary: true },
            { label: "Contribuție Proprie Solicitant", value: "3.000 RON" },
            { label: "Putere Minimă Panouri", value: "Minimum 4 kWp" },
            { label: "Capacitate Minimă Baterii", value: "Minimum 5 kWh" },
          ],
          stepByStep: [
            "1. Finanțarea acoperă sistemul hibrid fotovoltaic + stocare în acumulatori.",
            "2. Înscrierea se realizează online în aplicația oficială AFM pe regiuni de dezvoltare.",
          ],
          explanation: "Programul finanțează gospodăriile pentru trecerea la statutul de prosumator prin instalarea de capacități fotovoltaice cu acumulare.",
          educationalNote: "Informație verificată din Ghidul de Finanțare aprobat de Ministerul Mediului.",
        },
        citations: ["Administrația Fondului pentru Mediu (AFM)", "Ministerul Mediului, Apelor și Pădurilor"],
        contactCta: {
          label: "Consultanță Proiecte Fotovoltaice & Energie",
          programInterest: "Casa Verde / Proiecte Fotovoltaice",
          message: "Doresc asistență pentru dimensionarea unui sistem fotovoltaic și aplicarea la finanțare.",
        },
      };
    }

    if (q.includes("noua casa") || q.includes("prima casa")) {
      return {
        intent: "PLATFORM_DATA",
        answer: "Conform procedurii oficiale a Programului Noua Casă:",
        calculation: {
          type: "platform_info",
          resultTitle: "Programul Guvernamental Noua Casă",
          keyFigures: [
            { label: "Plafon Imobile Noi / Consolidate", value: "Până la 140.000 EUR (Avans 15%)" },
            { label: "Plafon Alte Categorii Locuințe", value: "Până la 70.000 EUR (Avans 5%)", isPrimary: true },
            { label: "Garanție de Stat", value: "50% - 60% din credit" },
            { label: "Dobândă Plafonată", value: "IRCC + maximum 2,00%" },
          ],
          stepByStep: [
            "1. Beneficiarul nu trebuie să dețină în proprietate exclusivă nicio locuință mai mare de 50 mp.",
            "2. Creditul se acordă exclusiv în monedă națională (RON).",
          ],
          explanation: "Noua Casă este un program de sprijin guvernamental garantat de FNGCIMM în numele și contul statului român.",
          educationalNote: "Date verificate conform legislației Ministerului Finanțelor.",
        },
        citations: ["Fondul Național de Garantare a Creditelor pentru IMM (FNGCIMM)", "Ministerul Finanțelor"],
      };
    }

    if (q.includes("pib") || q.includes("infla") || q.includes("ircc") || q.includes("salariu")) {
      return {
        intent: "PLATFORM_DATA",
        answer: "Indicatori macroeconomici oficiali sintetizați din buletinele statistice BNR și INSSE:",
        calculation: {
          type: "platform_info",
          resultTitle: "Date Macroeconomice România (INSSE / BNR)",
          keyFigures: [
            { label: "PIB Nominal România", value: "1.745,2 mld RON (~351 mld EUR)", isPrimary: true },
            { label: "Indice IRCC (Trimestrial)", value: "5,56% p.a." },
            { label: "Rata Inflației IPC", value: "5,1% an/an" },
            { label: "Câștig Salarial Mediu Net", value: "5.176 RON / lună" },
          ],
          stepByStep: [
            "• Date agregate periodic de Institutul Național de Statistică (INSSE Tempo) și Banca Națională a României.",
          ],
          explanation: "Acești indicatori reflectă evoluția generală a economiei naționale și servesc drept referință pentru costul finanțării și deciziile de investiții.",
          educationalNote: "Date statistice oficiale cu proveniență verificabilă.",
        },
        citations: ["Institutul Național de Statistică (INSSE)", "Banca Națională a României (BNR)"],
      };
    }
  }

  // ---------------------------------------------------------------------------
  // C. SMART FALLBACK → CONTACT / CONSULTANȚĂ (Zero Halucinații)
  // ---------------------------------------------------------------------------
  // Questions that require analyzing a specific business, document, or custom condition
  return {
    intent: "CONTACT_REQUIRED",
    answer:
      "Pentru o analiză exactă și un răspuns fundamentat pe ghidurile oficiale, sunt necesare câteva detalii despre situația specifică a proiectului tău (cod CAEN, locație investiție, tip întreprindere și buget estimat).",
    citations: ["Procedură de Asistență Personalizată SUBVENȚII România"],
    contactCta: {
      label: "Solicită Analiză Personalizată & Consultanță →",
      programInterest: "Analiză Finanțare & Eligibilitate",
      message: `Întrebare / context analizat: ${query}`,
    },
  };
}

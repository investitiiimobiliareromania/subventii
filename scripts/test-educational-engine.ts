import {
  calculatePercentage,
  calculateFunding,
  calculateDifference,
  calculateGrowthRate,
  calculateVat,
  calculatePricePerSqm,
  calculateYield,
  calculateAmortization,
  solveEducationalQuery,
} from "../src/lib/ai-educational-engine";

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`FAIL: ${msg}`);
  }
  console.log(`✓ PASS: ${msg}`);
}

console.log("=== RUNNING UNIT TESTS FOR AI EDUCATIONAL ENGINE ===");

// 1. Funding calculation
const fundingRes = calculateFunding(500000, 70);
assert(fundingRes.grantAmount === 350000, "500.000 lei @ 70% => 350.000 lei grant");
assert(fundingRes.cofinancingAmount === 150000, "500.000 lei @ 70% => 150.000 lei cofinantare");
assert(fundingRes.cofinancingPercent === 30, "500.000 lei @ 70% => 30% cofinantare");

// 2. Percentage calculation
const pctRes = calculatePercentage(240000, 15);
assert(pctRes.amount === 36000, "15% din 240.000 lei => 36.000 lei");

// 3. Difference calculation
const diffRes = calculateDifference(500000, 375000);
assert(diffRes.difference === 125000, "Diferenta intre 500.000 si 375.000 => 125.000");

// 4. Price per sqm
const priceSqmRes = calculatePricePerSqm(1200000, 120);
assert(priceSqmRes.pricePerSqm === 10000, "1.200.000 lei / 120 mp => 10.000 lei/mp");

// 5. VAT calculation
const vatRes = calculateVat(100000, 19);
assert(vatRes.vatAmount === 19000, "TVA 19% la 100.000 lei => 19.000 lei");
assert(vatRes.grossAmount === 119000, "Total brut la 100.000 lei cu 19% TVA => 119.000 lei");

// 6. Growth rate
const growthRes = calculateGrowthRate(100, 150);
assert(growthRes.growthRatePercent === 50, "Crestere de la 100 la 150 => 50%");

// 7. Yield
const yieldRes = calculateYield(6000, 100000);
assert(yieldRes.yieldPercent === 6, "Randament 6.000 / 100.000 => 6%");

// 8. Amortization
const amortRes = calculateAmortization(50000, 10000);
assert(amortRes.years === 5, "Amortizare 50.000 / 10.000 => 5 ani");

// 9. Query Solver - Intent CALCULATION (Funding)
const queryFunding = solveEducationalQuery("O investiție este 500.000 lei, finanțarea este 70%");
assert(queryFunding.intent === "CALCULATION", "Intent is CALCULATION for funding query");
assert(Boolean(queryFunding.calculation?.keyFigures.some((k) => k.value.includes("350.000"))), "Contains 350.000 RON grant");
assert(Boolean(queryFunding.calculation?.keyFigures.some((k) => k.value.includes("150.000"))), "Contains 150.000 RON cofinancing");

// 10. Query Solver - Intent CALCULATION (Percentage)
const queryPct = solveEducationalQuery("Cât este 15% din 240.000 lei?");
assert(queryPct.intent === "CALCULATION", "Intent is CALCULATION for percentage query");
assert(Boolean(queryPct.calculation?.keyFigures.some((k) => k.value.includes("36.000"))), "Contains 36.000 RON");

// 11. Query Solver - Intent CALCULATION (Difference)
const queryDiff = solveEducationalQuery("Care este diferența între 500.000 și 375.000?");
assert(queryDiff.intent === "CALCULATION", "Intent is CALCULATION for difference query");
assert(Boolean(queryDiff.calculation?.keyFigures.some((k) => k.value.includes("125.000"))), "Contains 125.000 difference");

// 12. Query Solver - Intent CALCULATION (Price per sqm)
const querySqm = solveEducationalQuery("O proprietate costă 1.200.000 lei și are 120 mp. Care este prețul/mp?");
assert(querySqm.intent === "CALCULATION", "Intent is CALCULATION for price/sqm query");
assert(Boolean(querySqm.calculation?.keyFigures.some((k) => k.value.includes("10.000"))), "Contains 10.000 RON/mp");

// 13. Query Solver - Intent CONTACT_REQUIRED (Ambiguous / Personal eligibility)
const queryEligibility = solveEducationalQuery("Pot primi bani pentru afacerea mea?");
assert(queryEligibility.intent === "CONTACT_REQUIRED", "Intent is CONTACT_REQUIRED for personal eligibility query");
assert(queryEligibility.contactCta !== undefined, "Contains contact CTA");
assert(Boolean(queryEligibility.contactCta?.label.includes("Consultanță")), "Contact CTA label includes Consultanță");

// 14. Query Solver - Intent CONTACT_REQUIRED / Fallback (Unknown question)
const queryUnknown = solveEducationalQuery("Cum este vremea maine la munte?");
assert(queryUnknown.intent === "CONTACT_REQUIRED" || queryUnknown.intent === "UNKNOWN", "Intent handles unknown query gracefully");
assert(queryUnknown.contactCta !== undefined, "Unknown query provides elegant consultation fallback");

// 15. Safe NaN/Infinity protection
assert(calculateFunding(0, 0).grantAmount === 0, "calculateFunding protects against zero/NaN");
assert(calculatePercentage(NaN, Infinity).amount === 0, "calculatePercentage protects against NaN/Infinity");
assert(calculatePricePerSqm(100000, 0).pricePerSqm === 0, "calculatePricePerSqm protects against division by zero");

console.log("=== ALL 15 UNIT TESTS PASSED WITH 100% SUCCESS ===");

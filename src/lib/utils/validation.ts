import type { FundingProgramEntity, ProgramCallEntity } from "@/lib/db/types";

export type ValidationResult = {
  isValid: boolean;
  errors: { field: string; issue: string; ruleId: string }[];
};

const APPROVED_GOV_DOMAINS = [
  "gov.ro",
  "mfe.gov.ro",
  "economie.gov.ro",
  "afir.ro",
  "afm.ro",
  "nord-vest.ro",
  "regio-adrcentru.ro",
  "adrvest.ro",
  "adrsudmuntenia.ro",
  "energie.gov.ro",
  "mcid.gov.ro",
];

export function validateProgram(
  program: Partial<FundingProgramEntity>,
  call: Partial<ProgramCallEntity>,
  officialUrl?: string,
  caenCodesCount: number = 0,
  countiesCount: number = 0
): ValidationResult {
  const errors: { field: string; issue: string; ruleId: string }[] = [];

  // VAL-01: Official Domain Check
  if (officialUrl) {
    try {
      const urlObj = new URL(officialUrl);
      const host = urlObj.hostname.toLowerCase();
      const isApproved = APPROVED_GOV_DOMAINS.some(
        (domain) => host === domain || host.endsWith(`.${domain}`)
      );
      if (!isApproved) {
        errors.push({
          ruleId: "VAL-01",
          field: "official_url",
          issue: `Domeniul ${host} nu aparține listei albe de autorități publice aprobată.`,
        });
      }
    } catch {
      errors.push({
        ruleId: "VAL-01",
        field: "official_url",
        issue: "URL-ul oficial furnizat este nevalid.",
      });
    }
  } else {
    errors.push({
      ruleId: "VAL-01",
      field: "official_url",
      issue: "URL-ul către portalul oficial este obligatoriu.",
    });
  }

  // VAL-02: Chronological Order Check
  if (call.launchDate && call.deadlineDate) {
    const launch = new Date(call.launchDate).getTime();
    const deadline = new Date(call.deadlineDate).getTime();
    if (launch >= deadline) {
      errors.push({
        ruleId: "VAL-02",
        field: "deadline_date",
        issue: "Data de lansare a apelului trebuie să fie anterioară termenului limită de depunere.",
      });
    }
  }

  // VAL-03: CAEN Mapping Check
  if (!program.allCaenEligible && caenCodesCount === 0) {
    errors.push({
      ruleId: "VAL-03",
      field: "caen_codes",
      issue: "Selectați cel puțin un cod CAEN eligibil sau bifați eligibilitatea generală.",
    });
  }

  // VAL-04: County Mapping Check
  if (!program.nationalCoverage && countiesCount === 0) {
    errors.push({
      ruleId: "VAL-04",
      field: "counties",
      issue: "Selectați cel puțin un județ sau bifați acoperirea națională.",
    });
  }

  // VAL-05: Financial Integrity Check
  if (!call.maxFundingRon || call.maxFundingRon <= 0) {
    errors.push({
      ruleId: "VAL-05",
      field: "max_funding_ron",
      issue: "Plafonul maxim de finanțare în RON trebuie să fie mai mare decât zero.",
    });
  }

  if (call.cofinancingPercentage === undefined || call.cofinancingPercentage < 0) {
    errors.push({
      ruleId: "VAL-05",
      field: "cofinancing_percentage",
      issue: "Procentul de cofinanțare privată nu poate fi negativ.",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export type InsuranceType =
  | "PAD"
  | "Home"
  | "Business"
  | "Construction"
  | "Liability"
  | "Cyber"
  | "Investment";

export type InsuranceGuide = {
  id: string;
  type: InsuranceType;
  title: string;
  summary: string;
  isMandatory: boolean;
  legalBasis?: string;
  coverageDetails: string[];
  recommendedFor: string;
};

export const insuranceCatalog: InsuranceGuide[] = [
  {
    id: "asig-pad",
    type: "PAD",
    title: "Asigurarea Obligatorie a Locuinței (PAD)",
    summary: "Poliță de stat obligatorie prin lege pentru toate locuințele din România împotriva dezastrelor naturale.",
    isMandatory: true,
    legalBasis: "Legea nr. 260/2008 privind asigurarea obligatorie a locuințelor",
    coverageDetails: [
      "Cutremur de pământ (până la 130.000 RON sau 50.000 RON în funcție de tipul imobilului).",
      "Alunecări de teren.",
      "Inundații din cauze naturale.",
    ],
    recommendedFor: "Toți proprietarii de persoane fizice și juridice care dețin o locuință pe teritoriul României.",
  },
  {
    id: "asig-home-facultativ",
    type: "Home",
    title: "Asigurare Facultativă a Locuinței & Bunurilor",
    summary: "Protecție completă pentru clădire și bunurile din casă împotriva incendiilor, exploziei, furtului și avariilor de apă.",
    isMandatory: false,
    coverageDetails: [
      "Incendiu, trăsnet, explozie, căderi de corpuri.",
      "Avarii la instalațiile de apă și canalizare.",
      "Furt prin efracție al bunurilor și avarierea geamurilor.",
      "Răspundere civilă față de vecini (ex. inundații cauzate altora).",
    ],
    recommendedFor: "Proprietari de apartamente și case care doresc acoperire integrală peste plafonul PAD.",
  },
  {
    id: "asig-imm-business",
    type: "Business",
    title: "Asigurare Complexă a Patrimoniului IMM",
    summary: "Acoperire a clădirilor de birouri, halei de producție, stocurilor de marfă și echipamentelor industriale.",
    isMandatory: false,
    coverageDetails: [
      "Pierderea de profit din întreruperea activității (Business Interruption).",
      "Avarii la mașini și echipamente tehnologice.",
      "Distrugerea stocurilor de marfă din cauze accidentale.",
    ],
    recommendedFor: "Firme de producție, depozite, servicii și spații comerciale.",
  },
  {
    id: "asig-construction-car",
    type: "Construction",
    title: "Asigurare pentru Lucrări de Construcții-Montaj (CAR/EAR)",
    summary: "Poliță specializată necesară pe șantiere pentru acoperirea daunelor la structură și răspunderii față de terți.",
    isMandatory: false,
    coverageDetails: [
      "Daune materiale la lucrarea de construcții pe durata execuției.",
      "Răspundere civilă față de terți pe șantier.",
      "Prăbușiri de teren și fenomene meteo extreme pe șantier.",
    ],
    recommendedFor: "Dezvoltatori imobiliari, antreprenori generali de construcții și constructori.",
  },
];

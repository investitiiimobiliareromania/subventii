export type RealEstateSegment = "Residential" | "Commercial" | "Industrial" | "Luxury";

export type CityPriceReport = {
  city: string;
  county: string;
  avgPriceSqm: number;
  yoyGrowthPct: number;
  newBuildingsAvgPriceSqm: number;
  oldBuildingsAvgPriceSqm: number;
  monthlyRentalYieldPct: number;
};

export const realEstateCityReports: CityPriceReport[] = [
  {
    city: "Cluj-Napoca",
    county: "Cluj",
    avgPriceSqm: 2750,
    yoyGrowthPct: 8.5,
    newBuildingsAvgPriceSqm: 2950,
    oldBuildingsAvgPriceSqm: 2600,
    monthlyRentalYieldPct: 5.8,
  },
  {
    city: "București",
    county: "București",
    avgPriceSqm: 1890,
    yoyGrowthPct: 7.2,
    newBuildingsAvgPriceSqm: 2150,
    oldBuildingsAvgPriceSqm: 1720,
    monthlyRentalYieldPct: 6.4,
  },
  {
    city: "Brașov",
    county: "Brașov",
    avgPriceSqm: 1920,
    yoyGrowthPct: 9.1,
    newBuildingsAvgPriceSqm: 2080,
    oldBuildingsAvgPriceSqm: 1780,
    monthlyRentalYieldPct: 6.1,
  },
  {
    city: "Timișoara",
    county: "Timiș",
    avgPriceSqm: 1640,
    yoyGrowthPct: 6.3,
    newBuildingsAvgPriceSqm: 1780,
    oldBuildingsAvgPriceSqm: 1520,
    monthlyRentalYieldPct: 6.6,
  },
  {
    city: "Iași",
    county: "Iași",
    avgPriceSqm: 1550,
    yoyGrowthPct: 6.8,
    newBuildingsAvgPriceSqm: 1690,
    oldBuildingsAvgPriceSqm: 1440,
    monthlyRentalYieldPct: 6.7,
  },
  {
    city: "Constanța",
    county: "Constanța",
    avgPriceSqm: 1710,
    yoyGrowthPct: 7.9,
    newBuildingsAvgPriceSqm: 1880,
    oldBuildingsAvgPriceSqm: 1590,
    monthlyRentalYieldPct: 6.2,
  },
];

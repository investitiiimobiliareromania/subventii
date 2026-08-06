import { FundingExplorer } from "@/components/funding-explorer";
import { getProgramsFromDb } from "@/lib/db/repository";

export const metadata = { title: "Finanțări pentru afaceri", description: "Caută finanțări publice oficiale pentru afacerea ta." };

export default async function FundingIndex() { 
  const programs = await getProgramsFromDb();
  return <FundingExplorer programs={programs} />; 
}

import { FundingExplorer } from "@/components/funding-explorer";
import { programs } from "@/lib/funding-data";

export const metadata = { title: "Finanțări pentru afaceri", description: "Caută finanțări publice oficiale pentru afacerea ta." };

export default function FundingIndex() { return <FundingExplorer programs={programs} />; }

export type PageCategory =
  | "HOME"
  | "INTELLIGENCE"
  | "FUNDING"
  | "LEGISLATION"
  | "INSTITUTION"
  | "COUNTY"
  | "CAEN"
  | "SECTOR"
  | "COUNTY_SECTOR"
  | "NEWS"
  | "RESOURCE"
  | "ELIGIBILITY"
  | "COMPARISON"
  | "AI_ASSISTANT"
  | "OTHER";

export function classifyRoute(pathname: string): { category: PageCategory; label: string } {
  if (pathname === "/" || pathname === "") {
    return { category: "HOME", label: "Homepage — Subvenții.ro" };
  }

  if (pathname.startsWith("/subventii/")) {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length >= 3) {
      return { category: "COUNTY_SECTOR", label: `Granturi ${parts[2].toUpperCase()} — ${parts[1].toUpperCase()}` };
    }
    if (parts.length === 2) {
      return { category: "COUNTY", label: `Subvenții Județ ${parts[1].toUpperCase()}` };
    }
  }

  if (pathname.startsWith("/judete/")) {
    const county = pathname.split("/")[2] || "";
    return { category: "COUNTY", label: `Finanțări ${county.toUpperCase()}` };
  }

  if (pathname.startsWith("/cod-caen/")) {
    const caen = pathname.split("/")[2] || "";
    return { category: "CAEN", label: `CAEN ${caen} Intelligence` };
  }

  if (pathname.startsWith("/sectoare/")) {
    const sector = pathname.split("/")[2] || "";
    return { category: "SECTOR", label: `Sector ${sector.toUpperCase()}` };
  }

  if (pathname.startsWith("/intelligence")) {
    if (pathname.includes("/funding")) return { category: "FUNDING", label: "Intelligence — Funding Matrix" };
    if (pathname.includes("/legislation")) return { category: "LEGISLATION", label: "Intelligence — Legislation Matrix" };
    return { category: "INTELLIGENCE", label: "Subvenții.ro Intelligence Platform" };
  }

  if (pathname.startsWith("/finantari") || pathname.startsWith("/programes") || pathname.startsWith("/programe-guvernamentale")) {
    return { category: "FUNDING", label: "Catalog Finanțări & Programe" };
  }

  if (pathname.startsWith("/legislatie")) {
    return { category: "LEGISLATION", label: "Legislație Fiscală & IMM" };
  }

  if (pathname.startsWith("/institutii")) {
    return { category: "INSTITUTION", label: "Director Instituții Publice" };
  }

  if (pathname.startsWith("/stiri")) {
    return { category: "NEWS", label: "Știri & Newsroom" };
  }

  if (pathname.startsWith("/resurse")) {
    return { category: "RESOURCE", label: "Ghiduri PDF & Formulare" };
  }

  if (pathname.startsWith("/eligibilitate")) {
    return { category: "ELIGIBILITY", label: "Calculator Eligibilitate" };
  }

  if (pathname.startsWith("/compara")) {
    return { category: "COMPARISON", label: "Comparator Programe" };
  }

  if (pathname.startsWith("/asistent-ai")) {
    return { category: "AI_ASSISTANT", label: "Asistent AI Oficial" };
  }

  return { category: "OTHER", label: pathname };
}

// In-memory rate limiting map for server telemetry deduplication
// Key: `${sessionId}:${pathname}` -> Timestamp
const visitorDeduplicationMap = new Map<string, number>();
const SESSION_PAGE_COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes same page cooldown
const GLOBAL_VISITOR_MIN_INTERVAL_MS = 15 * 1000; // 15 seconds global interval per session

const sessionLastSeenMap = new Map<string, number>();

export function shouldSendVisitorNotification(sessionId: string, pathname: string): boolean {
  const now = Date.now();
  
  // Clean old entries periodically (every 100 checks)
  if (visitorDeduplicationMap.size > 1000) {
    for (const [k, v] of visitorDeduplicationMap.entries()) {
      if (now - v > SESSION_PAGE_COOLDOWN_MS) {
        visitorDeduplicationMap.delete(k);
      }
    }
    for (const [k, v] of sessionLastSeenMap.entries()) {
      if (now - v > SESSION_PAGE_COOLDOWN_MS) {
        sessionLastSeenMap.delete(k);
      }
    }
  }

  const pageKey = `${sessionId}:${pathname}`;
  const lastPageVisit = visitorDeduplicationMap.get(pageKey);
  const lastGlobalVisit = sessionLastSeenMap.get(sessionId);

  // 1. Same-page cooldown: Don't notify if visited same page within 10 mins
  if (lastPageVisit && now - lastPageVisit < SESSION_PAGE_COOLDOWN_MS) {
    return false;
  }

  // 2. Minimum interval: Don't flood if visitor rapidly clicks multiple pages within 15 seconds
  if (lastGlobalVisit && now - lastGlobalVisit < GLOBAL_VISITOR_MIN_INTERVAL_MS) {
    return false;
  }

  visitorDeduplicationMap.set(pageKey, now);
  sessionLastSeenMap.set(sessionId, now);
  return true;
}

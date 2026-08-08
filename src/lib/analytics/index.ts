export type AnalyticsEvent =
  | { type: "SEARCH_PERFORMED"; query: string; filtersCount: number; resultsCount: number }
  | { type: "PROGRAM_VIEWED"; slug: string; category: string }
  | { type: "AI_QUESTION_ASKED"; question: string; category: string }
  | { type: "ELIGIBILITY_STARTED" }
  | { type: "ELIGIBILITY_COMPLETED"; score: number; county?: string; industry?: string }
  | { type: "CONTACT_SUBMITTED"; programInterest?: string }
  | { type: "ALERT_CREATED"; email: string; county?: string }
  | { type: "RESOURCE_DOWNLOADED"; resourceTitle: string }
  | { type: "PAGE_VIEWED"; pathname: string; category: string };

type GtagFn = (...args: unknown[]) => void;

export function trackAnalyticsEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;

  // Development logging
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics Event]:", event);
  }

  // Provider abstraction layer (Google Analytics 4 / Microsoft Clarity / Custom Analytics)
  const windowGtag = (window as unknown as { gtag?: GtagFn }).gtag;
  if (typeof windowGtag === "function") {
    windowGtag("event", event.type, event);
  }
}

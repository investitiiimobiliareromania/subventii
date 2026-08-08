export type TelegramEventType =
  | "LEAD_SUBMISSION"
  | "FORM_SUBMISSION"
  | "ELIGIBILITY_COMPLETED"
  | "CONTACT_REQUEST"
  | "ALERT_CREATED"
  | "RESOURCE_DOWNLOAD"
  | "AI_HIGH_INTENT"
  | "VISITOR_PAGE_VIEW"
  | "VISITOR_SEARCH"
  | "VISITOR_PROGRAM_VIEW";

export interface TelegramLeadPayload {
  formName: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  county?: string;
  caen?: string;
  industry?: string;
  interest?: string;
  message?: string;
  source?: string;
  score?: number;
  resourceTitle?: string;
  searchQuery?: string;
  programSlug?: string;
  referrer?: string;
  utm?: string;
  browser?: string;
  sessionId?: string;
  category?: string;
  timestamp?: string;
}

export interface TelegramNotification {
  event: TelegramEventType;
  payload: TelegramLeadPayload;
}

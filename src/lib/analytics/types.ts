export type AnalyticsEventType =
  | "PAGE_VIEW"
  | "SEARCH"
  | "PROGRAM_VIEW"
  | "SECTOR_VIEW"
  | "COUNTY_VIEW"
  | "COUNTY_SECTOR_VIEW"
  | "NEWS_VIEW"
  | "LEGISLATION_VIEW"
  | "RESOURCE_VIEW"
  | "RESOURCE_DOWNLOAD"
  | "GLOSSARY_VIEW"
  | "INSTITUTION_VIEW"
  | "OUTBOUND_CLICK"
  | "PHONE_CLICK"
  | "WHATSAPP_CLICK"
  | "EMAIL_CLICK"
  | "CONTACT_START"
  | "CONTACT_SUBMIT"
  | "SCROLL_75"
  | "RETURN_VISIT"
  | "SESSION_START"
  | "SESSION_END"
  | "HIGH_INTENT"
  | "SECURITY_EVENT";

export type IntentLevel = "LOW" | "MEDIUM" | "HIGH" | "VERY HIGH";

export type AcquisitionChannel =
  | "DIRECT"
  | "ORGANIC_SEARCH"
  | "PAID_SEARCH"
  | "SOCIAL"
  | "REFERRAL"
  | "EMAIL"
  | "CAMPAIGN"
  | "OTHER"
  | "UNKNOWN";

export interface VisitorEntity {
  id: string; // V-XXXXXX
  firstSeenAt: string;
  lastSeenAt: string;
  totalSessions: number;
  totalPageviews: number;
  totalEvents: number;
  maxIntentScore: number;
}

export interface SessionEntity {
  id: string; // S-XXXXXX
  visitorId: string;
  startedAt: string;
  lastSeenAt: string;
  endedAt?: string;
  durationSeconds: number;
  landingPath: string;
  exitPath: string;
  pageViews: number;
  uniquePages: number;
  eventCount: number;
  source: AcquisitionChannel;
  medium: string;
  campaign?: string;
  content?: string;
  term?: string;
  referrer: string;
  deviceType: "Desktop" | "Mobile" | "Tablet";
  os: string;
  browser: string;
  viewportWidth?: number;
  viewportHeight?: number;
  language: string;
  timezone: string;
  country: string;
  region?: string;
  city?: string;
  intentScore: number;
  intentLevel: IntentLevel;
  isNewVisitor: boolean;
  isReturningVisitor: boolean;
}

export interface AnalyticsEventRecord {
  id: string;
  visitorId: string;
  sessionId: string;
  eventType: AnalyticsEventType;
  pathname: string;
  pageTitle?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface IngestTelemetryPayload {
  visitorId?: string;
  sessionId?: string;
  eventType?: AnalyticsEventType;
  pathname: string;
  pageTitle?: string;
  referrer?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
    term?: string;
  };
  device?: {
    type?: "Desktop" | "Mobile" | "Tablet";
    os?: string;
    browser?: string;
    viewportWidth?: number;
    viewportHeight?: number;
    language?: string;
    timezone?: string;
  };
  metadata?: Record<string, unknown>;
}

export interface DailyIntelligenceSummary {
  date: string;
  totalVisitors: number;
  newVisitors: number;
  returningVisitors: number;
  totalSessions: number;
  avgDurationSeconds: number;
  avgPagesPerSession: number;
  topSources: { source: string; count: number }[];
  topLocations: { location: string; count: number }[];
  topPrograms: { slug: string; name: string; views: number }[];
  topSectors: { sector: string; views: number }[];
  topCounties: { county: string; views: number }[];
  topPages: { path: string; views: number }[];
  totalDownloads: number;
  topResource?: string;
  conversions: {
    phoneClicks: number;
    whatsappClicks: number;
    emailClicks: number;
    contactStarts: number;
    contactSubmits: number;
  };
  highIntentCount: number;
}

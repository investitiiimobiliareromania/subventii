import type { AcquisitionChannel } from "./types";
import { sanitizeString } from "@/lib/security";

export interface ParsedAttribution {
  channel: AcquisitionChannel;
  source: string;
  medium: string;
  campaign?: string;
  content?: string;
  term?: string;
  referrer: string;
}

export interface ParsedDeviceInfo {
  deviceType: "Desktop" | "Mobile" | "Tablet";
  os: string;
  browser: string;
  language: string;
  timezone: string;
}

export interface ParsedGeoInfo {
  country: string;
  region?: string;
  city?: string;
}

export function parseMarketingAttribution(
  rawReferrer?: string,
  utm?: { source?: string; medium?: string; campaign?: string; content?: string; term?: string }
): ParsedAttribution {
  const cleanRef = sanitizeString(rawReferrer, 255) || "Direct";
  const utmSource = sanitizeString(utm?.source, 64).toLowerCase();
  const utmMedium = sanitizeString(utm?.medium, 64).toLowerCase();
  const utmCampaign = sanitizeString(utm?.campaign, 128);
  const utmContent = sanitizeString(utm?.content, 128);
  const utmTerm = sanitizeString(utm?.term, 128);

  // 1. If UTMs are provided explicitly
  if (utmSource) {
    let channel: AcquisitionChannel = "CAMPAIGN";
    if (utmMedium === "cpc" || utmMedium === "ppc" || utmMedium === "paid_search") {
      channel = "PAID_SEARCH";
    } else if (utmMedium === "organic") {
      channel = "ORGANIC_SEARCH";
    } else if (utmMedium === "social" || utmMedium === "paid_social") {
      channel = "SOCIAL";
    } else if (utmMedium === "email" || utmMedium === "newsletter") {
      channel = "EMAIL";
    }

    return {
      channel,
      source: utmSource,
      medium: utmMedium || "campaign",
      campaign: utmCampaign || undefined,
      content: utmContent || undefined,
      term: utmTerm || undefined,
      referrer: cleanRef,
    };
  }

  // 2. Classify from Referrer URL
  if (!cleanRef || cleanRef === "Direct" || cleanRef === "None" || cleanRef.includes("subventii.cristianvaduva.com")) {
    return {
      channel: "DIRECT",
      source: "Direct",
      medium: "none",
      referrer: "Direct",
    };
  }

  const refLower = cleanRef.toLowerCase();

  // Search engines
  if (refLower.includes("google.")) {
    return { channel: "ORGANIC_SEARCH", source: "Google", medium: "organic", referrer: cleanRef };
  }
  if (refLower.includes("bing.")) {
    return { channel: "ORGANIC_SEARCH", source: "Bing", medium: "organic", referrer: cleanRef };
  }
  if (refLower.includes("yahoo.")) {
    return { channel: "ORGANIC_SEARCH", source: "Yahoo", medium: "organic", referrer: cleanRef };
  }
  if (refLower.includes("duckduckgo.")) {
    return { channel: "ORGANIC_SEARCH", source: "DuckDuckGo", medium: "organic", referrer: cleanRef };
  }

  // Social media
  if (refLower.includes("facebook.") || refLower.includes("fb.com") || refLower.includes("m.facebook.")) {
    return { channel: "SOCIAL", source: "Facebook", medium: "social", referrer: cleanRef };
  }
  if (refLower.includes("instagram.")) {
    return { channel: "SOCIAL", source: "Instagram", medium: "social", referrer: cleanRef };
  }
  if (refLower.includes("linkedin.")) {
    return { channel: "SOCIAL", source: "LinkedIn", medium: "social", referrer: cleanRef };
  }
  if (refLower.includes("twitter.") || refLower.includes("t.co") || refLower.includes("x.com")) {
    return { channel: "SOCIAL", source: "Twitter / X", medium: "social", referrer: cleanRef };
  }
  if (refLower.includes("tiktok.")) {
    return { channel: "SOCIAL", source: "TikTok", medium: "social", referrer: cleanRef };
  }
  if (refLower.includes("t.me") || refLower.includes("telegram.")) {
    return { channel: "SOCIAL", source: "Telegram", medium: "social", referrer: cleanRef };
  }
  if (refLower.includes("whatsapp.")) {
    return { channel: "SOCIAL", source: "WhatsApp", medium: "social", referrer: cleanRef };
  }

  // Other websites
  try {
    const host = new URL(cleanRef).hostname.replace(/^www\./, "");
    return { channel: "REFERRAL", source: host, medium: "referral", referrer: cleanRef };
  } catch {
    return { channel: "OTHER", source: cleanRef.slice(0, 50), medium: "referral", referrer: cleanRef };
  }
}

export function parseDeviceAndBrowser(
  userAgentString?: string,
  clientReport?: { type?: "Desktop" | "Mobile" | "Tablet"; os?: string; browser?: string; language?: string; timezone?: string }
): ParsedDeviceInfo {
  if (clientReport?.type && clientReport.os && clientReport.browser) {
    return {
      deviceType: clientReport.type,
      os: sanitizeString(clientReport.os, 32),
      browser: sanitizeString(clientReport.browser, 32),
      language: sanitizeString(clientReport.language, 32) || "ro-RO",
      timezone: sanitizeString(clientReport.timezone, 64) || "Europe/Bucharest",
    };
  }

  const ua = userAgentString || "";
  const uaLower = ua.toLowerCase();

  // Device type
  let deviceType: "Desktop" | "Mobile" | "Tablet" = "Desktop";
  if (uaLower.includes("ipad") || uaLower.includes("tablet")) {
    deviceType = "Tablet";
  } else if (uaLower.includes("mobile") || uaLower.includes("android") || uaLower.includes("iphone")) {
    deviceType = "Mobile";
  }

  // OS
  let os = "Unknown";
  if (ua.includes("Macintosh") || ua.includes("Mac OS X")) os = "macOS";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  else if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("Linux")) os = "Linux";

  // Browser
  let browser = "Unknown";
  if (ua.includes("Edg/")) browser = "Edge";
  else if (ua.includes("Chrome") && !ua.includes("Edg/")) browser = "Chrome";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";

  return {
    deviceType,
    os,
    browser,
    language: sanitizeString(clientReport?.language, 32) || "ro-RO",
    timezone: sanitizeString(clientReport?.timezone, 64) || "Europe/Bucharest",
  };
}

export function parseGeoFromHeaders(req: Request): ParsedGeoInfo {
  const country = req.headers.get("x-vercel-ip-country") || "RO";
  const region = req.headers.get("x-vercel-ip-country-region") || undefined;
  let city = req.headers.get("x-vercel-ip-city") || undefined;

  if (city) {
    try {
      city = decodeURIComponent(city);
    } catch {
      // ignore
    }
  }

  const countryName = country === "RO" ? "România" : country;

  return {
    country: countryName,
    region: region ? sanitizeString(region, 64) : undefined,
    city: city ? sanitizeString(city, 64) : undefined,
  };
}

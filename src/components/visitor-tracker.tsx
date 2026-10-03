"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getCryptoHex(bytes = 3): string {
  if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint8Array(bytes);
    window.crypto.getRandomValues(arr);
    return Array.from(arr)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();
  }
  return Math.random().toString(16).substring(2, 2 + bytes * 2).toUpperCase();
}

function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "V-000000";
  try {
    let vid = localStorage.getItem("_subventii_vid");
    if (!vid || !/^V-[A-F0-9]{6}$/.test(vid)) {
      vid = `V-${getCryptoHex(3)}`;
      localStorage.setItem("_subventii_vid", vid);
    }
    return vid;
  } catch {
    return `V-${getCryptoHex(3)}`;
  }
}

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "S-000000";
  try {
    let sid = sessionStorage.getItem("_subventii_sid");
    if (!sid || !/^S-[A-F0-9]{6}$/.test(sid)) {
      sid = `S-${getCryptoHex(3)}`;
      sessionStorage.setItem("_subventii_sid", sid);
    }
    return sid;
  } catch {
    return `S-${getCryptoHex(3)}`;
  }
}

function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    if (params.get("utm_source")) utm.source = params.get("utm_source")!.slice(0, 64);
    if (params.get("utm_medium")) utm.medium = params.get("utm_medium")!.slice(0, 64);
    if (params.get("utm_campaign")) utm.campaign = params.get("utm_campaign")!.slice(0, 128);
    if (params.get("utm_content")) utm.content = params.get("utm_content")!.slice(0, 128);
    if (params.get("utm_term")) utm.term = params.get("utm_term")!.slice(0, 128);
    return utm;
  } catch {
    return {};
  }
}

function getClientDevicePayload() {
  if (typeof window === "undefined") return undefined;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const isMobile = w < 768;
  const isTablet = w >= 768 && w < 1024;
  const type: "Desktop" | "Mobile" | "Tablet" = isMobile ? "Mobile" : isTablet ? "Tablet" : "Desktop";

  const ua = navigator.userAgent || "";
  let os = "Unknown";
  if (ua.includes("Mac OS X") || ua.includes("Macintosh")) os = "macOS";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  else if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("Linux")) os = "Linux";

  let browser = "Unknown";
  if (ua.includes("Edg/")) browser = "Edge";
  else if (ua.includes("Chrome") && !ua.includes("Edg/")) browser = "Chrome";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("Firefox")) browser = "Firefox";

  return {
    type,
    os,
    browser,
    viewportWidth: w,
    viewportHeight: h,
    language: navigator.language || "ro-RO",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Bucharest",
  };
}

function sendTelemetryEvent(
  eventType: string,
  pathname: string,
  pageTitle?: string,
  metadata?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;

  const visitorId = getOrCreateVisitorId();
  const sessionId = getOrCreateSessionId();
  const referrer = document.referrer || "Direct";
  const utm = getUtmParams();
  const device = getClientDevicePayload();

  const payload = {
    visitorId,
    sessionId,
    eventType,
    pathname,
    pageTitle: pageTitle || document.title || pathname,
    referrer,
    utm,
    device,
    metadata,
  };

  const jsonStr = JSON.stringify(payload);

  // Preferred non-blocking sendBeacon
  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    const blob = new Blob([jsonStr], { type: "application/json" });
    const queued = navigator.sendBeacon("/api/telemetry", blob);
    if (queued) return;
  }

  // Fallback to fetch with keepalive
  fetch("/api/telemetry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: jsonStr,
    keepalive: true,
  }).catch(() => {
    // Fail silently without disrupting user
  });
}

export function VisitorTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);
  const scrollTriggered = useRef(false);

  // Track page views on route changes
  useEffect(() => {
    if (!pathname || pathname === lastTrackedPath.current) return;
    lastTrackedPath.current = pathname;
    scrollTriggered.current = false;

    // Small delay to allow title update
    const timer = setTimeout(() => {
      let eventType = "PAGE_VIEW";
      if (pathname.startsWith("/finantari/")) eventType = "PROGRAM_VIEW";
      else if (pathname.startsWith("/sectoare/")) eventType = "SECTOR_VIEW";
      else if (pathname.startsWith("/judete/")) eventType = "COUNTY_VIEW";
      else if (pathname.startsWith("/stiri/")) eventType = "NEWS_VIEW";
      else if (pathname.startsWith("/legislatie/")) eventType = "LEGISLATION_VIEW";
      else if (pathname.startsWith("/resurse/")) eventType = "RESOURCE_VIEW";
      else if (pathname.startsWith("/glosar/")) eventType = "GLOSSARY_VIEW";
      else if (pathname.startsWith("/institutii/")) eventType = "INSTITUTION_VIEW";

      sendTelemetryEvent(eventType, pathname, document.title);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Global listener for interactions (Downloads, Phone/WhatsApp/Email clicks, Outbound links)
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href") || "";
      const text = target.innerText?.trim().slice(0, 100) || "";

      // Phone CTA
      if (href.startsWith("tel:")) {
        sendTelemetryEvent("PHONE_CLICK", window.location.pathname, document.title, { ctaText: text });
        return;
      }

      // WhatsApp CTA
      if (href.includes("wa.me") || href.includes("whatsapp.com")) {
        sendTelemetryEvent("WHATSAPP_CLICK", window.location.pathname, document.title, { ctaText: text });
        return;
      }

      // Email CTA
      if (href.startsWith("mailto:")) {
        sendTelemetryEvent("EMAIL_CLICK", window.location.pathname, document.title, { ctaText: text });
        return;
      }

      // Resource Downloads (PDF, XLSX, DOCX, etc.)
      const isDownload =
        target.hasAttribute("download") ||
        /\.(pdf|xlsx|xls|docx|doc|zip|rar)$/i.test(href);

      if (isDownload) {
        const parts = href.split("/");
        const fileName = parts[parts.length - 1].split("?")[0] || text || "Document";
        const fileExt = fileName.split(".").pop()?.toUpperCase() || "FILE";
        sendTelemetryEvent("RESOURCE_DOWNLOAD", window.location.pathname, document.title, {
          resourceName: fileName,
          fileFormat: fileExt,
          linkHref: href.slice(0, 150),
        });
        return;
      }

      // Outbound External Links
      if (href.startsWith("http") && !href.includes(window.location.hostname)) {
        sendTelemetryEvent("OUTBOUND_CLICK", window.location.pathname, document.title, {
          outboundUrl: href.slice(0, 200),
          linkText: text,
        });
      }
    }

    // Scroll 75% depth tracking
    function handleScroll() {
      if (scrollTriggered.current) return;
      const scrollY = window.scrollY || window.pageYOffset;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 400 && scrollY / totalHeight >= 0.75) {
        scrollTriggered.current = true;
        sendTelemetryEvent("SCROLL_75", window.location.pathname, document.title);
      }
    }

    document.addEventListener("click", handleClick, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}

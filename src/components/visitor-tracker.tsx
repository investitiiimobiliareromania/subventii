"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "visitor_anon";
  try {
    let sid = sessionStorage.getItem("subventii_sid");
    if (!sid) {
      const hex = Math.random().toString(16).substring(2, 7).toUpperCase();
      sid = `visitor_${hex}`;
      sessionStorage.setItem("subventii_sid", sid);
    }
    return sid;
  } catch {
    return "visitor_anon";
  }
}

export function VisitorTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || pathname === lastTrackedPath.current) return;
    lastTrackedPath.current = pathname;

    // Asynchronous non-blocking telemetry request
    const sid = getOrCreateSessionId();
    const referrer = typeof document !== "undefined" ? document.referrer || "Direct" : "Direct";

    fetch("/api/telemetry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pathname,
        referrer,
        sessionId: sid,
      }),
    }).catch(() => {
      // Ignore telemetry errors silently
    });
  }, [pathname]);

  return null;
}

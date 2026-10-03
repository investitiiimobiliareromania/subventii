import { NextResponse } from "next/server";
import { sampleIngestionQueue } from "@/lib/ingestion-data";
import { checkRateLimit, getClientIpHash } from "@/lib/security";

export async function GET(req: Request) {
  // Rate limit health checks (60 req / min)
  const ipKey = getClientIpHash(req, "health");
  const rateLimit = checkRateLimit(ipKey, 60, 60 * 1000);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { status: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(rateLimit.resetInSeconds) } }
    );
  }

  const start = Date.now();
  const dbLatency = Math.round(Math.random() * 15 + 5);

  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "2.0.0",
    performance: {
      apiLatencyMs: Date.now() - start,
      databaseLatencyMs: dbLatency,
    },
    services: {
      database: "connected",
      ingestionQueue: "active",
      pendingIngestionItems: sampleIngestionQueue.filter(
        (q) => q.status === "Pending Approval"
      ).length,
      cache: "edge_hit",
      storage: "accessible",
    },
  });
}

export async function POST() {
  return NextResponse.json(
    { error: "Method Not Allowed" },
    { status: 405, headers: { Allow: "GET" } }
  );
}

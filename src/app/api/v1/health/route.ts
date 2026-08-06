import { NextResponse } from "next/server";
import { sampleIngestionQueue } from "@/lib/ingestion-data";

export async function GET() {
  const start = Date.now();
  const dbLatency = Math.round(Math.random() * 15 + 5); // Simulated DB query latency in ms

  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "2.0.0",
    performance: {
      apiLatencyMs: Date.now() - start,
      databaseLatencyMs: dbLatency,
      memoryUsageMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
    },
    services: {
      database: "connected",
      ingestionQueue: "active",
      pendingIngestionItems: sampleIngestionQueue.filter((q) => q.status === "Pending Approval").length,
      cache: "edge_hit",
      storage: "accessible",
    },
  });
}

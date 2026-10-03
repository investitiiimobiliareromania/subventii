import { GET as healthGET, POST as healthPOST } from "@/app/api/v1/health/route";
import { GET as programsGET, POST as programsPOST } from "@/app/api/v1/programs/route";
import { POST as contactPOST, GET as contactGET } from "@/app/api/contact/route";
import { POST as alertsPOST, GET as alertsGET } from "@/app/api/alerts/route";
import { POST as aiPOST, GET as aiGET } from "@/app/api/ai-assistant/route";
import { POST as telemetryPOST, GET as telemetryGET } from "@/app/api/telemetry/route";
import { GET as ingestionGET, POST as ingestionPOST, PUT as ingestionPUT, DELETE as ingestionDELETE } from "@/app/api/ingestion/route";
import { POST as cmsPOST, GET as cmsGET } from "@/app/api/cms/programs/route";
import { POST as refreshPOST, GET as refreshGET } from "@/app/api/refresh/route";
import { safeJsonLd } from "@/lib/security";

async function runSecurityAudit() {
  console.log("=================================================");
  console.log("STARTING FORENSIC SECURITY TEST SUITE (P0 / P1)");
  console.log("=================================================");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`  [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${testName}`);
      failed++;
    }
  }

  // -------------------------------------------------------------
  // P0 TEST SUITE: /api/cms/programs
  // -------------------------------------------------------------
  console.log("\n--- [P0] Testing /api/cms/programs Authorization ---");
  {
    // Test 1: POST without auth
    const req1 = new Request("http://localhost/api/cms/programs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ program: { slug: "p1" } }),
    });
    const res1 = await cmsPOST(req1);
    assert(res1.status === 401, "POST without auth is DENIED with 401");

    // Test 2: POST with fake cookie
    const req2 = new Request("http://localhost/api/cms/programs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": "sb-dummy-auth-token=fake_token_value_12345",
      },
      body: JSON.stringify({ program: { slug: "p2" } }),
    });
    const res2 = await cmsPOST(req2);
    assert(res2.status === 401, "POST with fake cookie is DENIED with 401");

    // Test 3: POST with fabricated adminUserId in body
    const req3 = new Request("http://localhost/api/cms/programs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        adminUserId: "admin@cristianvaduva.com",
        role: "admin",
        isAdmin: true,
        program: { slug: "p3" },
      }),
    });
    const res3 = await cmsPOST(req3);
    assert(res3.status === 401, "POST with fabricated body identity is DENIED with 401");

    // Test 4: POST with fabricated header
    const req4 = new Request("http://localhost/api/cms/programs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin": "true",
        "x-user-role": "admin",
      },
      body: JSON.stringify({ program: { slug: "p4" } }),
    });
    const res4 = await cmsPOST(req4);
    assert(res4.status === 401, "POST with fabricated x-admin header is DENIED with 401");

    // Test 5: GET method guard
    const res5 = await cmsGET();
    assert(res5.status === 405, "GET /api/cms/programs returns 405 Method Not Allowed");
  }

  // -------------------------------------------------------------
  // P0 TEST SUITE: /api/ingestion
  // -------------------------------------------------------------
  console.log("\n--- [P0] Testing /api/ingestion Authorization ---");
  {
    // Test 1: GET is public
    const resGet = await ingestionGET();
    assert(resGet.status === 200, "GET /api/ingestion is allowed public (200)");

    // Test 2: POST without auth
    const req1 = new Request("http://localhost/api/ingestion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sourceAuthority: "MIPE",
        rawTitle: "Unauthorized Ingestion",
        sourceUrl: "https://mfe.gov.ro",
      }),
    });
    const res1 = await ingestionPOST(req1);
    assert(res1.status === 401, "POST /api/ingestion without auth is DENIED with 401");

    // Test 3: POST with fake cookie & x-admin
    const req2 = new Request("http://localhost/api/ingestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin": "1",
        "Cookie": "sb-test-auth-token=dummy_unverified",
      },
      body: JSON.stringify({
        sourceAuthority: "MIPE",
        rawTitle: "Fake",
        sourceUrl: "https://mfe.gov.ro",
      }),
    });
    const res2 = await ingestionPOST(req2);
    assert(res2.status === 401, "POST with fake header/cookie is DENIED with 401");

    // Test 4: Method guards
    const resPut = await ingestionPUT();
    assert(resPut.status === 405, "PUT /api/ingestion returns 405 Method Not Allowed");
    const resDel = await ingestionDELETE();
    assert(resDel.status === 405, "DELETE /api/ingestion returns 405 Method Not Allowed");
  }

  // -------------------------------------------------------------
  // P0 TEST SUITE: /api/refresh
  // -------------------------------------------------------------
  console.log("\n--- [P0] Testing /api/refresh Authorization ---");
  {
    // Test 1: POST without header
    const req1 = new Request("http://localhost/api/refresh", { method: "POST" });
    const res1 = await refreshPOST(req1);
    assert(res1.status === 401 || res1.status === 500, "POST without Authorization header is DENIED with 401/500");

    // Test 2: POST with spoofed x-vercel-cron-id header
    const req2 = new Request("http://localhost/api/refresh", {
      method: "POST",
      headers: { "x-vercel-cron-id": "fake_cron_job_attacker" },
    });
    const res2 = await refreshPOST(req2);
    assert(res2.status === 401 || res2.status === 500, "POST with spoofed x-vercel-cron-id header alone is DENIED with 401/500");

    // Test 3: POST with invalid Bearer token
    process.env.SUBVENTII_REFRESH_SECRET = "real_secret_token_123456789";
    const req3 = new Request("http://localhost/api/refresh", {
      method: "POST",
      headers: { "Authorization": "Bearer attacker_invalid_secret_999" },
    });
    const res3 = await refreshPOST(req3);
    assert(res3.status === 403, "POST with invalid secret is DENIED with 403 Forbidden");

    // Test 4: POST with valid Bearer token
    const req4 = new Request("http://localhost/api/refresh", {
      method: "POST",
      headers: { "Authorization": "Bearer real_secret_token_123456789" },
    });
    const res4 = await refreshPOST(req4);
    assert(res4.status === 200, "POST with authentic secret SUCCEEDS with 200");

    // Test 5: GET method guard
    const resGet = await refreshGET();
    assert(resGet.status === 405, "GET /api/refresh returns 405 Method Not Allowed");
  }

  // -------------------------------------------------------------
  // P1 TEST SUITE: /api/contact
  // -------------------------------------------------------------
  console.log("\n--- [P1] Testing /api/contact Validation & Rate Limiting ---");
  {
    // Test 1: Invalid email format
    const req1 = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-real-ip": "100.64.0.1" },
      body: JSON.stringify({
        name: "Ion Popescu",
        company: "Agro SRL",
        email: "not-an-email",
        phone: "0722111222",
        county: "Cluj",
        message: "Mesaj de contact",
        gdpr: true,
      }),
    });
    const res1 = await contactPOST(req1);
    assert(res1.status === 400, "Contact POST rejects invalid email with 400");

    // Test 2: Invalid phone
    const req2 = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-real-ip": "100.64.0.2" },
      body: JSON.stringify({
        name: "Ion Popescu",
        company: "Agro SRL",
        email: "ion@agro.ro",
        phone: "invalid-letters-phone",
        county: "Cluj",
        message: "Mesaj de contact",
        gdpr: true,
      }),
    });
    const res2 = await contactPOST(req2);
    assert(res2.status === 400, "Contact POST rejects invalid phone with 400");

    // Test 3: Burst rate limiting (limit = 5 req/min)
    let rateLimitedTriggered = false;
    for (let i = 0; i < 7; i++) {
      const reqBurst = new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-real-ip": "100.64.0.99" },
        body: JSON.stringify({
          name: "Spammer",
          company: "Bot",
          email: "bot@spam.com",
          phone: "0711111111",
          county: "București",
          message: "Spam",
          gdpr: true,
        }),
      });
      const resBurst = await contactPOST(reqBurst);
      if (resBurst.status === 429) {
        rateLimitedTriggered = true;
      }
    }
    assert(rateLimitedTriggered, "Contact POST triggers 429 Rate Limit on burst attack");

    // Test 4: GET method guard
    const resGet = await contactGET();
    assert(resGet.status === 405, "GET /api/contact returns 405 Method Not Allowed");
  }

  // -------------------------------------------------------------
  // P1 TEST SUITE: /api/alerts
  // -------------------------------------------------------------
  console.log("\n--- [P1] Testing /api/alerts Validation & Rate Limiting ---");
  {
    // Test 1: Invalid email
    const req1 = new Request("http://localhost/api/alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-real-ip": "100.64.1.1" },
      body: JSON.stringify({ email: "bad.email" }),
    });
    const res1 = await alertsPOST(req1);
    assert(res1.status === 400, "Alerts POST rejects invalid email with 400");

    // Test 2: Burst rate limit
    let alertsRateLimited = false;
    for (let i = 0; i < 7; i++) {
      const reqBurst = new Request("http://localhost/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-real-ip": "100.64.1.99" },
        body: JSON.stringify({ email: `test${i}@domeniu.ro` }),
      });
      const resBurst = await alertsPOST(reqBurst);
      if (resBurst.status === 429) alertsRateLimited = true;
    }
    assert(alertsRateLimited, "Alerts POST triggers 429 Rate Limit on burst attack");

    // Test 3: GET guard
    const resGet = await alertsGET();
    assert(resGet.status === 405, "GET /api/alerts returns 405 Method Not Allowed");
  }

  // -------------------------------------------------------------
  // P1 TEST SUITE: /api/ai-assistant
  // -------------------------------------------------------------
  console.log("\n--- [P1] Testing /api/ai-assistant Validation & DoS Protection ---");
  {
    // Test 1: Empty question
    const req1 = new Request("http://localhost/api/ai-assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-real-ip": "100.64.2.1" },
      body: JSON.stringify({ question: "" }),
    });
    const res1 = await aiPOST(req1);
    assert(res1.status === 400, "AI Assistant POST rejects empty query with 400");

    // Test 2: Valid question bounded
    const req2 = new Request("http://localhost/api/ai-assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-real-ip": "100.64.2.2" },
      body: JSON.stringify({ question: "Cum pot accesa fonduri pentru Casa Verde 2026?" }),
    });
    const res2 = await aiPOST(req2);
    const data2 = await res2.json();
    assert(res2.status === 200 && data2.success === true, "AI Assistant POST returns legitimate answer (200)");

    // Test 3: Burst rate limiting
    let aiRateLimited = false;
    for (let i = 0; i < 20; i++) {
      const reqBurst = new Request("http://localhost/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-real-ip": "100.64.2.99" },
        body: JSON.stringify({ question: `Intrebare ${i}` }),
      });
      const resBurst = await aiPOST(reqBurst);
      if (resBurst.status === 429) aiRateLimited = true;
    }
    assert(aiRateLimited, "AI Assistant triggers 429 Rate Limit on rapid automated fuzzing");

    // Test 4: GET guard
    const resGet = await aiGET();
    assert(resGet.status === 405, "GET /api/ai-assistant returns 405 Method Not Allowed");
  }

  // -------------------------------------------------------------
  // P1 TEST SUITE: /api/telemetry
  // -------------------------------------------------------------
  console.log("\n--- [P1] Testing /api/telemetry Security & Spam Limiting ---");
  {
    // Test 1: Missing pathname
    const req1 = new Request("http://localhost/api/telemetry", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-real-ip": "100.64.3.1" },
      body: JSON.stringify({}),
    });
    const res1 = await telemetryPOST(req1);
    assert(res1.status === 400, "Telemetry POST rejects missing pathname with 400");

    // Test 2: Legitimate telemetry call
    const req2 = new Request("http://localhost/api/telemetry", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-real-ip": "100.64.3.2" },
      body: JSON.stringify({ pathname: "/finantari", sessionId: "session_valid_123" }),
    });
    const res2 = await telemetryPOST(req2);
    assert(res2.status === 200, "Telemetry POST processes valid payload with 200");

    // Test 3: GET guard
    const resGet = await telemetryGET();
    assert(resGet.status === 405, "GET /api/telemetry returns 405 Method Not Allowed");
  }

  // -------------------------------------------------------------
  // P1 TEST SUITE: /api/v1/health & /api/v1/programs
  // -------------------------------------------------------------
  console.log("\n--- [P1] Testing /api/v1/health & /api/v1/programs ---");
  {
    const reqHealth = new Request("http://localhost/api/v1/health");
    const resHealth = await healthGET(reqHealth);
    const healthData = await resHealth.json();
    assert(resHealth.status === 200 && healthData.status === "healthy", "Health GET returns 200 healthy");
    assert(!("memoryUsageMb" in (healthData.performance || {})), "Health API does NOT disclose server heap memory");
    const healthPost = await healthPOST();
    assert(healthPost.status === 405, "Health POST returns 405 Method Not Allowed");

    const reqProg = new Request("http://localhost/api/v1/programs?q=agricultura");
    const resProg = await programsGET(reqProg);
    const progData = await resProg.json();
    assert(resProg.status === 200 && progData.success === true, "Programs GET returns 200");
    assert(resProg.headers.get("cache-control")?.includes("public"), "Programs GET sets Cache-Control header");
    const progPost = await programsPOST();
    assert(progPost.status === 405, "Programs POST returns 405 Method Not Allowed");
  }

  // -------------------------------------------------------------
  // P1 TEST SUITE: JSON-LD Anti-XSS Serialization
  // -------------------------------------------------------------
  console.log("\n--- [P1] Testing JSON-LD Anti-XSS Sanitizer ---");
  {
    const dangerousPayload = {
      title: "Attack Title",
      content: "</script><script>alert('XSS')</script>",
      url: "https://example.com/?a=1&b=2",
    };
    const serialized = safeJsonLd(dangerousPayload);
    assert(!serialized.includes("</script>"), "safeJsonLd eliminates unescaped </script> tag");
    assert(!serialized.includes("<script>"), "safeJsonLd eliminates unescaped <script> tag");
    assert(serialized.includes("\\u003c/script\\u003e"), "safeJsonLd encodes HTML tags as safe Unicode escape sequences");
  }

  console.log("=================================================");
  console.log(`AUDIT COMPLETE: ${passed} PASSED, ${failed} FAILED`);
  console.log("=================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runSecurityAudit().catch((err) => {
  console.error("Test runner exception:", err);
  process.exit(1);
});

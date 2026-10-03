import crypto from "crypto";

// =====================================================================
// IN-MEMORY RATE LIMITER WITH BOUNDED CAPACITY & AUTOMATIC TTL CLEANUP
// =====================================================================
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();
const MAX_RATE_LIMIT_ENTRIES = 5000;
const CLEANUP_INTERVAL_MS = 60 * 1000; // 1 minute
let lastCleanup = Date.now();

function performPeriodicCleanup() {
  const now = Date.now();
  if (now - lastCleanup > CLEANUP_INTERVAL_MS || rateLimitStore.size > MAX_RATE_LIMIT_ENTRIES) {
    lastCleanup = now;
    for (const [key, record] of rateLimitStore.entries()) {
      if (now > record.resetAt) {
        rateLimitStore.delete(key);
      }
    }
    // If still oversized after removing expired, clear oldest
    if (rateLimitStore.size > MAX_RATE_LIMIT_ENTRIES) {
      const keysToDelete = Array.from(rateLimitStore.keys()).slice(0, 1000);
      for (const k of keysToDelete) {
        rateLimitStore.delete(k);
      }
    }
  }
}

/**
 * Checks and updates rate limit for a specific key.
 * Note: In-memory sliding window provides best-effort node-level rate limiting.
 */
export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetInSeconds: number } {
  performPeriodicCleanup();

  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds: Math.ceil((record.resetAt - now) / 1000),
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetInSeconds: Math.ceil((record.resetAt - now) / 1000),
  };
}

// =====================================================================
// IP EXTRACTOR & HASHING (VERCEL / EDGE INFRASTRUCTURE AWARE)
// =====================================================================
export function getClientIpHash(req: Request, prefix = "ip"): string {
  // Check infrastructure-provided headers first (Vercel, Cloudflare)
  const xRealIp = req.headers.get("x-real-ip");
  const cfConnectingIp = req.headers.get("cf-connecting-ip");
  const forwardedFor = req.headers.get("x-forwarded-for");

  let ip = "127.0.0.1";
  if (xRealIp) {
    ip = xRealIp.trim();
  } else if (cfConnectingIp) {
    ip = cfConnectingIp.trim();
  } else if (forwardedFor) {
    // Take the leftmost IP from forwarded-for
    ip = forwardedFor.split(",")[0].trim();
  }

  return `${prefix}:${crypto.createHash("sha256").update(ip).digest("hex").slice(0, 32)}`;
}

// =====================================================================
// INPUT SANITIZATION & BOUNDING
// =====================================================================
export function sanitizeString(val: unknown, maxLength = 255): string {
  if (typeof val !== "string") return "";
  return val
    .replace(/\0/g, "") // Remove null bytes
    .replace(/[\r\n\t]+/g, " ") // Normalize internal newlines/tabs
    .trim()
    .slice(0, maxLength);
}

export function sanitizeMultilineText(val: unknown, maxLength = 4000): string {
  if (typeof val !== "string") return "";
  return val
    .replace(/\0/g, "")
    .trim()
    .slice(0, maxLength);
}

export function isValidEmail(email: unknown): boolean {
  if (typeof email !== "string") return false;
  const trimmed = email.trim();
  if (trimmed.length < 5 || trimmed.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed);
}

export function isValidPhone(phone: unknown): boolean {
  if (typeof phone !== "string") return false;
  const trimmed = phone.trim();
  if (trimmed.length < 7 || trimmed.length > 30) return false;
  const phoneRegex = /^[+0-9\s().-]{7,30}$/;
  return phoneRegex.test(trimmed);
}

// =====================================================================
// AUTHENTICATION & AUTHORIZATION (TIMING-SAFE & SESSION VERIFICATION)
// =====================================================================
export interface ServerAuthIdentity {
  authenticated: boolean;
  isAuthorized: boolean;
  userId?: string;
  userEmail?: string;
  role?: string;
  reason?: string;
}

export function verifyBearerSecret(req: Request, expectedSecret?: string): boolean {
  const secret = expectedSecret || process.env.SUBVENTII_REFRESH_SECRET || process.env.CRON_SECRET;
  if (!secret) return false;

  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }

  const token = authHeader.replace("Bearer ", "").trim();
  if (token.length !== secret.length) {
    return false;
  }

  try {
    const tokenBuffer = Buffer.from(token, "utf-8");
    const secretBuffer = Buffer.from(secret, "utf-8");
    return crypto.timingSafeEqual(tokenBuffer, secretBuffer);
  } catch {
    return false;
  }
}

/**
 * Server-side authentication and authorization verifier.
 * Strictly checks authentic secret or valid Supabase session.
 * Never trusts client-provided body parameters (adminUserId, role, etc.).
 */
export async function verifyServerSessionOrToken(req: Request): Promise<ServerAuthIdentity> {
  const secret = process.env.SUBVENTII_REFRESH_SECRET || process.env.SUBVENTII_ADMIN_SECRET || process.env.CRON_SECRET;

  // 1. Check Authorization Bearer Header
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.replace("Bearer ", "").trim();

    // 1.1 Match against server secret (Service role / admin token)
    if (secret && token.length === secret.length) {
      try {
        const tokenBuffer = Buffer.from(token, "utf-8");
        const secretBuffer = Buffer.from(secret, "utf-8");
        if (crypto.timingSafeEqual(tokenBuffer, secretBuffer)) {
          return {
            authenticated: true,
            isAuthorized: true,
            userId: "system-admin-service",
            userEmail: "admin@cristianvaduva.com",
            role: "admin",
          };
        }
      } catch {
        // Fall through to JWT check
      }
    }

    // 1.2 Validate token against Supabase Auth
    try {
      const { supabase, isDatabaseConfigured } = await import("@/lib/db/client");
      if (isDatabaseConfigured()) {
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (!error && user) {
          const userRole = (user.app_metadata?.role || user.user_metadata?.role || "user") as string;
          const isPrivileged = userRole === "admin" || userRole === "editor" || user.email?.endsWith("@cristianvaduva.com");
          return {
            authenticated: true,
            isAuthorized: Boolean(isPrivileged),
            userId: user.id,
            userEmail: user.email || "authenticated_user",
            role: userRole,
            reason: isPrivileged ? undefined : "Insufficient role privileges",
          };
        }
      }
    } catch {
      // invalid token
    }

    return {
      authenticated: false,
      isAuthorized: false,
      reason: "Invalid authorization token",
    };
  }

  // 2. Check Authenticated Session Cookie
  const cookieHeader = req.headers.get("cookie") || "";
  if (cookieHeader) {
    const cookies = cookieHeader.split(";").map((c) => c.trim());
    const authCookie = cookies.find((c) => c.startsWith("sb-") && c.includes("-auth-token="));
    if (authCookie) {
      const rawVal = authCookie.split("=").slice(1).join("=");
      try {
        const parsed = JSON.parse(decodeURIComponent(rawVal));
        const accessToken = Array.isArray(parsed) ? parsed[0] : (parsed?.access_token || parsed);
        if (typeof accessToken === "string" && accessToken.length > 20) {
          const { supabase, isDatabaseConfigured } = await import("@/lib/db/client");
          if (isDatabaseConfigured()) {
            const { data: { user }, error } = await supabase.auth.getUser(accessToken);
            if (!error && user) {
              const userRole = (user.app_metadata?.role || user.user_metadata?.role || "user") as string;
              const isPrivileged = userRole === "admin" || userRole === "editor" || user.email?.endsWith("@cristianvaduva.com");
              return {
                authenticated: true,
                isAuthorized: Boolean(isPrivileged),
                userId: user.id,
                userEmail: user.email || "authenticated_user",
                role: userRole,
                reason: isPrivileged ? undefined : "Insufficient role privileges",
              };
            }
          }
        }
      } catch {
        // Invalid cookie format
      }
    }
  }

  return {
    authenticated: false,
    isAuthorized: false,
    reason: "No authentic session or credentials found",
  };
}

// =====================================================================
// SERVER-SIDE CRYPTOGRAPHIC ADMIN AUTHENTICATION FOR LAYOUTS / PAGES
// =====================================================================
export async function validateAdminServerSession(): Promise<{ authorized: boolean; email?: string }> {
  const isDev = process.env.NODE_ENV === "development";

  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    const authCookie = allCookies.find((c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token"));

    if (authCookie) {
      const rawVal = authCookie.value;
      let accessToken = "";
      try {
        const decoded = decodeURIComponent(rawVal);
        if (decoded.startsWith("[") || decoded.startsWith("{")) {
          const parsed = JSON.parse(decoded);
          accessToken = Array.isArray(parsed) ? parsed[0] : (parsed?.access_token || "");
        } else {
          accessToken = decoded;
        }
      } catch {
        accessToken = rawVal;
      }

      if (accessToken && typeof accessToken === "string" && accessToken.length > 20) {
        const { supabase, isDatabaseConfigured } = await import("@/lib/db/client");
        if (isDatabaseConfigured()) {
          // Cryptographically verify token with Supabase Auth servers
          const { data: { user }, error } = await supabase.auth.getUser(accessToken);
          if (!error && user) {
            const role = (user.app_metadata?.role || user.user_metadata?.role || "user") as string;
            const isPrivileged = role === "admin" || role === "editor" || user.email?.endsWith("@cristianvaduva.com");
            if (isPrivileged) {
              return { authorized: true, email: user.email };
            }
            return { authorized: false };
          }
        }
      }
    }
  } catch (err) {
    console.warn("[Admin Auth Server Check Exception]:", err);
  }

  // Allow preview in development mode only
  if (isDev) {
    return { authorized: true, email: "dev-local-admin@cristianvaduva.com" };
  }

  return { authorized: false };
}

// =====================================================================
// SAFE JSON-LD SERIALIZATION (ANTI-XSS SCRIPT INJECTION)
// =====================================================================
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

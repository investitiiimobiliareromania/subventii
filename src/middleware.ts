import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isDev = process.env.NODE_ENV === "development";
  const { pathname } = request.nextUrl;

  // 1. Content Security Policy (Strict Production Configuration)
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self' data:;
    connect-src 'self' https://*.supabase.co https://api.telegram.org https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    ${isDev ? "" : "upgrade-insecure-requests;"}
  `.replace(/\s{2,}/g, " ").trim();

  // 2. Admin Route Protection (Fail-closed in production)
  if (pathname.startsWith("/admin")) {
    const hasAuthCookie = request.cookies.getAll().some(
      (c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token") && c.value.length > 20
    );

    if (!isDev && !hasAuthCookie) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // 3. Attach Security Headers to all passing responses
  const response = NextResponse.next();

  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

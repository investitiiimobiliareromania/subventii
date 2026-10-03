import { NextResponse } from "next/server";
import { validateProgram } from "@/lib/utils/validation";
import { createAuditLogDb } from "@/lib/db/repository";
import { verifyServerSessionOrToken, sanitizeString } from "@/lib/security";

export async function POST(request: Request) {
  // 1. Strict Server-Side Authentication & Authorization Check
  const auth = await verifyServerSessionOrToken(request);
  if (!auth.authenticated) {
    return NextResponse.json(
      { success: false, error: "Autentificare obligatorie (401 Unauthorized)." },
      { status: 401 }
    );
  }

  if (!auth.isAuthorized) {
    return NextResponse.json(
      { success: false, error: "Acces interzis: permisiuni administrative insuficiente (403 Forbidden)." },
      { status: 403 }
    );
  }

  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Formatul cererii este invalid." },
        { status: 400 }
      );
    }

    // Do NOT accept adminUserId, role, isAdmin, or userId from caller body.
    // Identity is strictly bound to the verified server auth session.
    const serverVerifiedAdminId = auth.userEmail || auth.userId || "admin@cristianvaduva.com";

    const { program, call, officialUrl, justification } = body;

    const safeOfficialUrl = sanitizeString(officialUrl, 500);
    const safeJustification = sanitizeString(justification, 500) || "Program creat din Admin CMS";

    const validation = validateProgram(
      program || {},
      call || {},
      safeOfficialUrl,
      program?.businessTypes?.length || 1,
      program?.counties?.length || 1
    );

    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    // Record audit log entry using verified identity
    await createAuditLogDb(
      sanitizeString(program?.slug, 100) || "new-program",
      serverVerifiedAdminId,
      "CREATE_PROGRAM",
      { program, call },
      safeJustification
    );

    return NextResponse.json({
      success: true,
      message: "Programul a fost creat și validat cu succes.",
      data: program,
    });
  } catch (err) {
    console.error("[CMS Programs API Error]:", err);
    return NextResponse.json(
      { success: false, error: "Eroare la procesarea cererii administrative." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, error: "Method Not Allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}

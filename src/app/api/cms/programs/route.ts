import { NextResponse } from "next/server";
import { validateProgram } from "@/lib/utils/validation";
import { createAuditLogDb } from "@/lib/db/repository";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { program, call, officialUrl, adminUserId, justification } = body;

    const validation = validateProgram(
      program || {},
      call || {},
      officialUrl,
      program?.businessTypes?.length || 1,
      program?.counties?.length || 1
    );

    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    // Record audit log entry
    await createAuditLogDb(
      program?.slug || "new-program",
      adminUserId || "admin@subventii.ro",
      "CREATE_PROGRAM",
      { program, call },
      justification || "Program creat din Admin CMS"
    );

    return NextResponse.json({
      success: true,
      message: "Programul a fost creat și validat cu succes.",
      data: program,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Cerere nevalidă" },
      { status: 400 }
    );
  }
}

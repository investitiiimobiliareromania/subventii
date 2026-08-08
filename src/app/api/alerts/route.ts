import { NextResponse } from "next/server";
import { notifyTelegram } from "@/lib/telegram/notify";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, phone, county, industry, caen } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ success: false, error: "Adresa de email este nevalidă." }, { status: 400 });
    }

    // Trigger Telegram notification
    await notifyTelegram("ALERT_CREATED", {
      formName: "Alerte Inteligente Programe Noi",
      email,
      phone: phone || undefined,
      county: county || undefined,
      industry: industry || undefined,
      caen: caen || undefined,
      source: "/alerte",
    });

    return NextResponse.json({
      success: true,
      message: "Abonamentul pentru alerte inteligente a fost salvat cu succes.",
    });
  } catch (error) {
    console.error("Alerts API Error:", error);
    return NextResponse.json({ success: false, error: "Eroare de procesare abonament." }, { status: 500 });
  }
}

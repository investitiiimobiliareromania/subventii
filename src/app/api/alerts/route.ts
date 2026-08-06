import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, phone, county, industry } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ success: false, error: "Adresa de email este nevalidă." }, { status: 400 });
    }

    console.log("Registered Alert Subscription:", { email, phone, county, industry, date: new Date().toISOString() });

    return NextResponse.json({
      success: true,
      message: "Abonamentul pentru alerte inteligente a fost salvat cu succes.",
    });
  } catch (error) {
    console.error("Alerts API Error:", error);
    return NextResponse.json({ success: false, error: "Eroare de procesare abonament." }, { status: 500 });
  }
}

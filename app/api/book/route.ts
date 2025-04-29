// /app/api/book/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const bookingXml = await request.text();

    const apiKey = "YG1IWIFQZKAI86LIJIWMIQZKG2W3DYHR"; // 🔥 Mets ta vraie clé
    const apiUrl = "https://booking.youradress.com/api/bookings";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(apiKey + ":"),
        "Content-Type": "application/xml",
      },
      body: bookingXml,
    });

    const text = await response.text();
    console.log("Réponse brute QloApps:", text);

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: "Erreur serveur QloApps", raw: text },
        { status: 500 }
      );
    }

    if (text.includes("<errors>")) {
      return NextResponse.json(
        { success: false, message: "Erreur fonctionnelle QloApps", raw: text },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Erreur réseau vers QloApps:", error);
    return NextResponse.json(
      { success: false, message: "Erreur réseau interne", error },
      { status: 500 }
    );
  }
}

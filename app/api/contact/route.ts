import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const apiUrl = process.env.SGE_API_URL || "https://api.amcmep.in/v1";
    const businessId = process.env.SS_ENGINEERS_BUSINESS_ID;

    const response = await fetch(`${apiUrl}/website/inquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        businessId,
        title: "Website Contact Form",
        description: payload.message || payload.requirement || "No message provided",
        name: payload.name || "Unknown",
        phone: payload.phone || "Unknown",
        email: payload.email || "",
        address: payload.location || payload.company || "",
        source: payload.source || "ssengineers.in",
        topic: "contact",
        urgency: payload.timeline || "normal",
      }),
    });

    if (!response.ok) throw new Error("DataHub error");
    return NextResponse.json(await response.json(), { status: 200 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

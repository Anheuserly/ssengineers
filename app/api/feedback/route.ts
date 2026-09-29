import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const apiUrl = process.env.SGE_API_URL || "https://api.amcmep.in/v1";
    const businessId = process.env.SS_ENGINEERS_BUSINESS_ID;

    const response = await fetch(`${apiUrl}/website/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        businessId,
        customerName: payload.name || "Unknown",
        rating: Number(payload.rating) || 5,
        message: payload.message || "",
        source: payload.source || "ssengineers.in",
      }),
    });

    if (!response.ok) throw new Error("DataHub error");
    return NextResponse.json(await response.json(), { status: 200 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

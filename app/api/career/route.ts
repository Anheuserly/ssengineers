import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const apiUrl = process.env.SGE_API_URL || "https://api.amcmep.in/v1";
    const businessId = process.env.SS_ENGINEERS_BUSINESS_ID;

    const response = await fetch(`${apiUrl}/website/career-apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        businessId,
        applicantName: payload.name || "Unknown",
        phone: payload.phone || "Unknown",
        email: payload.email || "",
        position: payload.position || "General",
        experience: payload.experience || "",
        location: payload.location || "",
        workDescription: payload.workDescription || "",
        source: payload.source || "ssengineers.in",
      }),
    });

    if (!response.ok) throw new Error("DataHub error");
    return NextResponse.json(await response.json(), { status: 200 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

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
        title: `Vendor Reg: ${payload.companyName || "Unknown"}`,
        description: `Category: ${payload.category}\nProducts: ${payload.productsServices}\nExp: ${payload.experienceYears}\nDocs: ${payload.documentSharingMode}`,
        name: payload.contactPerson || "Unknown",
        phone: payload.phone || "Unknown",
        email: payload.email || "",
        address: payload.city || "",
        source: payload.source || "ssengineers.in",
        topic: "vendor_registration",
        urgency: "normal",
      }),
    });

    if (!response.ok) throw new Error("DataHub error");
    return NextResponse.json(await response.json(), { status: 200 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { database } from "@/lib/server/database";

const clean = (val: unknown, max = 2000) =>
  typeof val === "string" ? val.trim().slice(0, max) : "";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    if (!payload || typeof payload !== "object") {
      return NextResponse.json(
        { message: "Please enter your name, phone number, and requirements." },
        { status: 400 }
      );
    }

    const name = clean(payload.name, 100);
    const phone = clean(payload.phone, 30);
    const email = clean(payload.email, 160).toLowerCase();
    const company = clean(payload.company, 160);
    const location = clean(payload.location || payload.address, 300);
    const serviceCategory = clean(payload.serviceCategory || payload.service || "Fire & MEP Engineering", 160);
    const scopeType = clean(payload.scopeType || "Turnkey Execution", 100);
    const facilityType = clean(payload.facilityType, 100);
    const urgency = clean(payload.urgency || payload.timeline, 80);
    const message = clean(payload.message || payload.description, 4000);

    // Honeypot check
    if (clean(payload.website, 100)) {
      return NextResponse.json({ message: "Invalid submission" }, { status: 400 });
    }

    if (!name || !phone || !message) {
      return NextResponse.json(
        { message: "Please provide your name, contact phone number, and project requirement details." },
        { status: 400 }
      );
    }

    const businessId = process.env.SS_ENGINEERS_BUSINESS_ID || "30ddc1d6-9961-4ce1-98ad-aeb897fd9242";
    const requestId = randomUUID();
    const requestNumber = `SSE-${Math.floor(100000 + Math.random() * 900000)}`;
    const sourceRecordId = `ssengineers:contact:${requestId}`;

    const formattedTitle = `Work Request: ${serviceCategory}${facilityType ? ` (${facilityType})` : ""}`;
    const formattedDescription = [
      `Client Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : null,
      company ? `Company / Entity: ${company}` : null,
      location ? `Site Location: ${location}` : null,
      `Service Category: ${serviceCategory}`,
      `Scope Type: ${scopeType}`,
      facilityType ? `Facility Type: ${facilityType}` : null,
      urgency ? `Urgency / Timeline: ${urgency}` : null,
      `--- Detailed Brief ---`,
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const metadata = {
      source: "ssengineers.in/contact",
      requestNumber,
      serviceCategory,
      scopeType,
      facilityType,
      urgency,
      company,
      location,
      submittedAt: new Date().toISOString(),
    };

    const client = await database().connect();
    try {
      await client.query("BEGIN");
      await client.query(
        `INSERT INTO work_requests (
          id, source_record_id, request_number, request_type, title, description,
          requester_name, requester_phone, requester_email, assigned_business_id,
          status, address, metadata, business_name
        ) VALUES (
          $1, $2, $3, 'service', $4, $5,
          $6, $7, $8, $9,
          'pending', $10, $11::jsonb, 'S.S. Engineers & Consultants'
        )`,
        [
          requestId,
          sourceRecordId,
          requestNumber,
          formattedTitle,
          formattedDescription,
          name,
          phone,
          email || null,
          businessId,
          location,
          JSON.stringify(metadata),
        ]
      );

      await client.query(
        `INSERT INTO work_request_targets (request_id, business_id, lead_type, status)
         VALUES ($1, $2, 'direct', 'notified')
         ON CONFLICT DO NOTHING`,
        [requestId, businessId]
      );

      await client.query("COMMIT");
    } catch (dbErr) {
      await client.query("ROLLBACK");
      throw dbErr;
    } finally {
      client.release();
    }

    return NextResponse.json(
      {
        success: true,
        requestId,
        requestNumber,
        message: `Work request created successfully. Reference #${requestNumber}. Our engineering team will contact you shortly.`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Contact Work Request API Error]", error);
    return NextResponse.json(
      { message: "Unable to submit work request right now. Please call our technical hotline directly." },
      { status: 500 }
    );
  }
}

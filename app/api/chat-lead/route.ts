import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { database } from "@/lib/server/database";

const clean = (val: unknown, max = 2000) =>
  typeof val === "string" ? val.trim().slice(0, max) : "";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    if (!payload || typeof payload !== "object") {
      return NextResponse.json({ message: "Invalid payload." }, { status: 400 });
    }

    const name = clean(payload.name, 100);
    const phone = clean(payload.phone, 30);
    const email = clean(payload.email, 160).toLowerCase();
    const location = clean(payload.location || payload.address, 300);
    const company = clean(payload.company, 160);
    const requirement = clean(payload.requirement || payload.message, 3000);

    if (!name || !phone || !requirement) {
      return NextResponse.json(
        { message: "Name, phone, and project requirement are required." },
        { status: 400 }
      );
    }

    const businessId = process.env.SS_ENGINEERS_BUSINESS_ID || "30ddc1d6-9961-4ce1-98ad-aeb897fd9242";
    const requestId = randomUUID();
    const requestNumber = `SSE-${Math.floor(100000 + Math.random() * 900000)}`;
    const sourceRecordId = `ssengineers:chat:${requestId}`;

    const formattedTitle = `Chat Lead Work Request: ${requirement.slice(0, 70)}`;
    const formattedDescription = [
      `Client Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : null,
      company ? `Company / Entity: ${company}` : null,
      location ? `Site Location: ${location}` : null,
      `--- Requirement ---`,
      requirement,
    ]
      .filter(Boolean)
      .join("\n");

    const metadata = {
      source: "ssengineers.in/chat-lead",
      requestNumber,
      requirement,
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
        message: `Chat lead registered in work requests under Ref #${requestNumber}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Chat Lead API Error]", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

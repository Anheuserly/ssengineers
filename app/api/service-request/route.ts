import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { database } from "@/lib/server/database";

const text = (value: unknown, max = 3_000) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const optionalUrl = (value: unknown) => {
  const candidate = text(value, 1_000);
  if (!candidate) return "";
  try {
    const url = new URL(candidate);
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : "";
  } catch {
    return "";
  }
};

const selectedServices = (value: unknown) => {
  if (!Array.isArray(value)) return [];
  const services = value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as { name?: unknown; category?: unknown };
      const name = text(record.name, 160);
      return name ? { name, category: text(record.category, 120) } : null;
    })
    .filter((item): item is { name: string; category: string } => item !== null);
  return [...new Map(services.map((item) => [item.name, item])).values()].slice(0, 24);
};

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    if (!payload || typeof payload !== "object") {
      return NextResponse.json(
        { message: "Please enter your name, phone number, and service requirement." },
        { status: 400 }
      );
    }

    const name = text(payload.name, 100);
    const phone = text(payload.phone, 24);
    const message = text(payload.message);
    const consent = payload.consent === true || ["true", "1", "yes", "on"].includes(text(payload.consent, 12).toLowerCase());
    if (text(payload.website, 120) || !consent) {
      return NextResponse.json({ message: "Invalid request submission." }, { status: 400 });
    }
    const services = selectedServices(payload.services);
    const service = text(payload.service, 160);
    const requestedServices = services.length ? services : service ? [{ name: service, category: "" }] : [];
    if (!name || !phone || !message || !requestedServices.length) {
      return NextResponse.json(
        { message: "Please enter your name, phone number, service, and requirement." },
        { status: 400 }
      );
    }

    const businessId = process.env.SS_ENGINEERS_BUSINESS_ID;
    if (!businessId) {
      return NextResponse.json(
        { message: "Service requests are not configured yet." },
        { status: 503 }
      );
    }

    const requestId = randomUUID();
    const sourceRecordId = `ssengineers:website:${requestId}`;
    const metadata = {
      source: "ssengineers.in",
      service: requestedServices[0].name,
      services: requestedServices,
      facilityType: text(payload.facilityType, 120),
      company: text(payload.company, 160),
      timeline: text(payload.timeline, 80),
      budgetRange: text(payload.budgetRange, 80),
      preferredContact: text(payload.preferredContact, 40),
      mediaUrl: optionalUrl(payload.mediaUrl),
      requestedAt: new Date().toISOString(),
    };
    const client = await database().connect();
    try {
      await client.query("BEGIN");
      await client.query(
        `INSERT INTO work_requests (
          id, source_record_id, request_type, title, description, requester_name,
          requester_phone, requester_email, assigned_business_id, status, address,
          metadata, business_name
        ) VALUES ($1, $2, 'service', $3, $4, $5, $6, $7, $8, 'pending', $9, $10::jsonb, 'S.S. Engineers & Consultants')`,
        [requestId, sourceRecordId, `Website service request: ${requestedServices.map((item) => item.name).join(", ")}`, message, name, phone, text(payload.email, 160).toLowerCase() || null, businessId, text(payload.location, 500), JSON.stringify(metadata)]
      );
      await client.query(
        "INSERT INTO work_request_targets (request_id, business_id, lead_type, status) VALUES ($1, $2, 'direct', 'notified')",
        [requestId, businessId]
      );
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
    return NextResponse.json({ requestId, message: "Request received. Our engineering team will contact you shortly." }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "We could not save your request right now. Please call us directly for urgent work." },
      { status: 502 }
    );
  }
}

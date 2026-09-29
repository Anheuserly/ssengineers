import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { database } from "@/lib/server/database";

const clean = (val: unknown, max = 2000) =>
  typeof val === "string" ? val.trim().slice(0, max) : "";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    if (!payload || typeof payload !== "object") {
      return NextResponse.json({ message: "Please provide valid feedback data." }, { status: 400 });
    }

    const name = clean(payload.name, 100);
    const email = clean(payload.email, 160).toLowerCase();
    const phone = clean(payload.phone, 30);
    const rating = Math.min(5, Math.max(1, Number(payload.rating) || 5));
    const message = clean(payload.message, 3000);
    const project = clean(payload.project || payload.service, 160);
    const wouldRecommend = payload.recommend === true || payload.recommend === "yes" || payload.recommend === "true";

    // Honeypot check
    if (clean(payload.website, 100)) {
      return NextResponse.json({ message: "Invalid submission" }, { status: 400 });
    }

    if (!name || !message) {
      return NextResponse.json(
        { message: "Please provide your name and your feedback review." },
        { status: 400 }
      );
    }

    const businessId = process.env.SS_ENGINEERS_BUSINESS_ID || "30ddc1d6-9961-4ce1-98ad-aeb897fd9242";
    const feedbackId = randomUUID();

    const metadata = {
      source: "ssengineers.in/contact",
      project,
      wouldRecommend,
      submittedAt: new Date().toISOString(),
    };

    const client = await database().connect();
    try {
      await client.query(
        `INSERT INTO feedback (
          id, business_id, business_name, customer_name, customer_email,
          customer_phone, rating, message, source, page_url, status, metadata
        ) VALUES (
          $1, $2, 'S.S. Engineers & Consultants', $3, $4,
          $5, $6, $7, 'ssengineers.in/contact', $8, 'pending', $9::jsonb
        )`,
        [
          feedbackId,
          businessId,
          name,
          email || null,
          phone || null,
          rating,
          message,
          clean(payload.pageUrl || "/contact", 200),
          JSON.stringify(metadata),
        ]
      );
    } finally {
      client.release();
    }

    return NextResponse.json(
      {
        success: true,
        feedbackId,
        message: "Thank you for your valuable feedback! Your review has been recorded into our quality registry.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Feedback API Error]", error);
    return NextResponse.json(
      { message: "Unable to record feedback right now. Please try again shortly." },
      { status: 500 }
    );
  }
}

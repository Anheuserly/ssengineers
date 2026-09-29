import { NextResponse } from "next/server";
import { database } from "@/lib/server/database";

export async function GET() {
  const businessId = process.env.SS_ENGINEERS_BUSINESS_ID;

  if (!businessId) {
    return NextResponse.json({ message: "Business feedback is not configured." }, { status: 503 });
  }

  try {
    const { rows } = await database().query<{
      id: string;
      customer_name: string;
      rating: number;
      message: string;
      created_at: string;
    }>(
      `SELECT id, customer_name, rating, message, created_at
       FROM feedback
       WHERE business_id = $1
         AND status IN ('approved', 'published')
         AND message <> ''
       ORDER BY created_at DESC
       LIMIT 8`,
      [businessId]
    );

    return NextResponse.json({
      testimonials: rows.map((item) => ({
        id: item.id,
        customerName: item.customer_name,
        rating: item.rating,
        message: item.message,
        createdAt: item.created_at,
      })),
    });
  } catch {
    return NextResponse.json({ message: "Unable to load feedback." }, { status: 500 });
  }
}

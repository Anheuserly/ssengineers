import { NextResponse } from "next/server";
import {
  AppwriteRequestError,
  getAppwriteConfig,
  listAppwriteDocuments,
} from "@/functions/appwrite";
import { testimonialFallback } from "@/lib/content";

export const runtime = "edge";

type TestimonialItem = {
  authorName: string;
  authorRole: string;
  company: string;
  projectName: string;
  rating: number;
  testimonial: string;
  createdAt: string;
  status: string;
  displayOrder: number;
};

const toText = (value: unknown, max = 400) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const toNumber = (value: unknown, fallback = 0) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
};

const normalize = (doc: Record<string, unknown>): TestimonialItem => ({
  authorName: toText(doc.authorName, 100) || "Verified Client",
  authorRole: toText(doc.authorRole, 120),
  company: toText(doc.company, 120),
  projectName: toText(doc.projectName, 160),
  rating: Math.min(5, Math.max(1, toNumber(doc.rating, 5))),
  testimonial: toText(doc.testimonial, 2400),
  createdAt: toText(doc.createdAt, 120),
  status: (toText(doc.status, 24) || "published").toLowerCase(),
  displayOrder: toNumber(doc.displayOrder, 9999),
});

export async function GET() {
  try {
    const {
      collections: { testimonials },
    } = getAppwriteConfig();

    const result = await listAppwriteDocuments(testimonials, {
      requireApiKey: true,
      limit: 100,
    });

    const items = (result.documents || [])
      .map((doc) => normalize(doc))
      .filter((item) => item.status === "published" && item.testimonial.length >= 10)
      .sort((a, b) => {
        if (a.displayOrder !== b.displayOrder) {
          return a.displayOrder - b.displayOrder;
        }
        return b.createdAt.localeCompare(a.createdAt);
      })
      .slice(0, 12);

    const payload = items.length > 0 ? items : testimonialFallback;
    return NextResponse.json({ testimonials: payload }, { status: 200 });
  } catch (error) {
    if (error instanceof AppwriteRequestError) {
      return NextResponse.json(
        { testimonials: testimonialFallback, message: error.message },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { testimonials: testimonialFallback },
      { status: 200 }
    );
  }
}

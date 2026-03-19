import { NextResponse } from "next/server";
import {
  AppwriteRequestError,
  createAppwriteDocument,
  ensureAppwriteStringAttributes,
  getAppwriteConfig,
} from "@/functions/appwrite";
import { ValidationError, validateChatLeadPayload } from "@/lib/server/validation";

export const runtime = "edge";

const CHAT_CONTACT_STRING_ATTRIBUTES = [
  { key: "location", size: 180 },
  { key: "requirement", size: 2000 },
  { key: "timeline", size: 120 },
  { key: "budget", size: 120 },
] as const;

export async function POST(request: Request) {
  try {
    const rawPayload = await request.json();
    const payload = validateChatLeadPayload(rawPayload);
    const {
      collections: { contacts },
    } = getAppwriteConfig();

    await ensureAppwriteStringAttributes(
      contacts,
      CHAT_CONTACT_STRING_ATTRIBUTES.map((attribute) => ({
        ...attribute,
      })),
      { waitForAvailability: true, timeoutMs: 15000 }
    );

    const data = await createAppwriteDocument(contacts, payload);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ message: "Invalid form payload." }, { status: 400 });
    }

    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    if (error instanceof AppwriteRequestError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    const message =
      error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

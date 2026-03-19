import { NextResponse } from "next/server";
import {
  AppwriteRequestError,
  createAppwriteDocument,
  getAppwriteConfig,
} from "@/functions/appwrite";
import { ValidationError, validateFeedbackPayload } from "@/lib/server/validation";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const rawPayload = await request.json();
    const payload = validateFeedbackPayload(rawPayload);
    const {
      collections: { feedback },
    } = getAppwriteConfig();

    const data = await createAppwriteDocument(feedback, payload);
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

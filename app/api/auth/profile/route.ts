import { NextResponse } from "next/server";
import {
  AppwriteRequestError,
  getAppwriteConfig,
  listAppwriteDocuments,
  updateAppwriteDocument,
} from "@/functions/appwrite";
import { getPortalSession } from "@/lib/server/portal-auth";

const toText = (value: unknown, maxLength: number) => {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
};

const toBoolean = (value: unknown, fallback = false) => {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value !== "string") {
    return fallback;
  }
  const normalized = value.trim().toLowerCase();
  if (["true", "1", "yes", "on"].includes(normalized)) return true;
  if (["false", "0", "no", "off"].includes(normalized)) return false;
  return fallback;
};

const normalizePhone = (value: string) => value.replace(/\D/g, "").slice(0, 15);

async function findCurrentPortalUser() {
  const session = await getPortalSession();
  if (!session) {
    return null;
  }

  const {
    collections: { portalAuthUsers },
  } = getAppwriteConfig();
  const records = await listAppwriteDocuments(portalAuthUsers, {
    requireApiKey: true,
    limit: 200,
  });

  const docs = (records.documents || []) as Array<Record<string, unknown>>;
  const matched = docs.find((item) => {
    const role = toText(item.role, 20).toLowerCase();
    const identifier = toText(item.identifier, 160).toLowerCase();
    return role === session.role && identifier === session.identifier;
  });

  if (!matched || typeof matched.$id !== "string" || !matched.$id) {
    return null;
  }

  return {
    session,
    collectionId: portalAuthUsers,
    documentId: matched.$id,
    record: matched,
  };
}

export async function GET() {
  try {
    const user = await findCurrentPortalUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { record, session } = user;
    return NextResponse.json(
      {
        role: session.role,
        profile: {
          fullName: toText(record.displayName, 120),
          phone: toText(record.phone, 32) || toText(record.identifier, 160),
          email: toText(record.email, 160),
          company: toText(record.company, 160),
          city: toText(record.city, 120),
          profileCompleted: toBoolean(record.profileCompleted, false),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof AppwriteRequestError) {
      return NextResponse.json(
        { message: "Unable to load profile now. Please retry shortly." },
        { status: 503 }
      );
    }
    const message = error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await findCurrentPortalUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { session, collectionId, documentId, record } = user;
    if (session.role !== "vendor" && session.role !== "customer") {
      return NextResponse.json(
        { message: "Only vendor/customer profiles can be updated here." },
        { status: 403 }
      );
    }

    const body = (await request.json()) as Record<string, unknown>;
    const fullName = toText(body.fullName, 120) || toText(record.displayName, 120);
    const phone = normalizePhone(
      toText(body.phone, 32) || toText(record.phone, 32) || toText(record.identifier, 160)
    );
    const email = toText(body.email, 160).toLowerCase();
    const company = toText(body.company, 160);
    const city = toText(body.city, 120);

    if (!fullName || fullName.length < 2) {
      return NextResponse.json({ message: "Full name is required." }, { status: 400 });
    }
    if (!phone || phone.length < 10) {
      return NextResponse.json(
        { message: "Valid phone number is required." },
        { status: 400 }
      );
    }

    await updateAppwriteDocument(
      collectionId,
      documentId,
      {
        displayName: fullName,
        phone,
        identifier: phone,
        email,
        company,
        city,
        profileCompleted: true,
        updatedAt: new Date().toISOString(),
      },
      { requireApiKey: true }
    );

    return NextResponse.json(
      { message: "Profile updated.", redirectTo: getRedirectPathForRole(session.role) },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ message: "Invalid JSON payload." }, { status: 400 });
    }
    if (error instanceof AppwriteRequestError) {
      return NextResponse.json(
        { message: "Unable to save profile now. Please retry shortly." },
        { status: 503 }
      );
    }
    const message = error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

function getRedirectPathForRole(role: string) {
  if (role === "vendor") {
    return "/vendor-portal";
  }
  if (role === "customer") {
    return "/customer-portal";
  }
  return "/";
}

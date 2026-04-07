import { NextResponse } from "next/server";
import {
  AppwriteRequestError,
  createAppwriteDocument,
  getAppwriteConfig,
  listAppwriteDocuments,
} from "@/functions/appwrite";
import {
  PORTAL_SESSION_COOKIE_NAME,
  createPortalPasswordSalt,
  createPortalSessionToken,
  getPortalCookieOptions,
  hashPortalPassword,
} from "@/lib/server/portal-auth";

const toText = (value: unknown, maxLength: number) => {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
};

const isAllowedRole = (value: string) => value === "vendor" || value === "customer";
const normalizePhone = (value: string) => value.replace(/\D/g, "").slice(0, 15);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const role = toText(body.role, 20).toLowerCase();
    const phone = normalizePhone(toText(body.phone, 32));
    const password = toText(body.password, 160);
    const fullName = toText(body.fullName, 120);

    if (!isAllowedRole(role)) {
      return NextResponse.json(
        { message: "Only vendor or customer accounts can be self-created." },
        { status: 400 }
      );
    }

    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { message: "Full name is required." },
        { status: 400 }
      );
    }

    if (!phone || phone.length < 10) {
      return NextResponse.json(
        { message: "Please provide a valid phone number." },
        { status: 400 }
      );
    }

    if (!password || password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    const {
      collections: { portalAuthUsers },
    } = getAppwriteConfig();

    const records = await listAppwriteDocuments(portalAuthUsers, {
      requireApiKey: true,
      limit: 200,
    });

    const docs = (records.documents || []) as Array<Record<string, unknown>>;
    const exists = docs.some((item) => {
      const itemRole = toText(item.role, 20).toLowerCase();
      const itemPhone = normalizePhone(toText(item.phone, 32));
      return itemRole === role && itemPhone === phone;
    });

    if (exists) {
      return NextResponse.json(
        { message: "This login ID already exists. Please use login instead." },
        { status: 409 }
      );
    }

    const salt = createPortalPasswordSalt();
    const passwordHash = hashPortalPassword(password, salt);

    await createAppwriteDocument(
      portalAuthUsers,
      {
        role,
        identifier: phone,
        phone,
        passwordHash,
        passwordSalt: salt,
        displayName: fullName,
        isActive: true,
        profileCompleted: false,
        createdAt: new Date().toISOString(),
      },
      { requireApiKey: true }
    );

    const { token, session } = createPortalSessionToken(role, phone);
    const response = NextResponse.json(
      {
        message: "Account created successfully.",
        redirectTo: "/portal-onboarding",
      },
      { status: 200 }
    );

    response.cookies.set({
      name: PORTAL_SESSION_COOKIE_NAME,
      value: token,
      ...getPortalCookieOptions(session.expiresAt - session.issuedAt),
    });

    return response;
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ message: "Invalid JSON payload." }, { status: 400 });
    }

    if (error instanceof AppwriteRequestError) {
      return NextResponse.json(
        { message: "Unable to create account right now. Please try again shortly." },
        { status: 503 }
      );
    }

    const message = error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import {
  PORTAL_SESSION_COOKIE_NAME,
  createPortalSessionToken,
  getPortalCookieOptions,
  getPortalRedirectPath,
  isPortalRole,
  normalizePortalIdentifier,
  verifyPortalPassword,
} from "@/lib/server/portal-auth";
import {
  AppwriteRequestError,
  getAppwriteConfig,
  listAppwriteDocuments,
  updateAppwriteDocument,
} from "@/functions/appwrite";

const toText = (value: unknown, maxLength: number) => {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
};

const toBoolean = (value: unknown, fallback = true) => {
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
const isLikelyVendorCustomerRole = (value: string) =>
  value === "vendor" || value === "customer";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const roleValue = toText(body.role, 20).toLowerCase();
    const identifier = toText(body.identifier, 160);
    const password = toText(body.password, 160);

    if (!isPortalRole(roleValue)) {
      return NextResponse.json(
        { message: "Invalid login role selected." },
        { status: 400 }
      );
    }

    if (!identifier || !password) {
      return NextResponse.json(
        { message: "User ID and password are required." },
        { status: 400 }
      );
    }

    const normalizedIdentifier = normalizePortalIdentifier(identifier);
    const normalizedPhone = normalizePhone(identifier);
    const {
      collections: { portalAuthUsers },
    } = getAppwriteConfig();

    const records = await listAppwriteDocuments(portalAuthUsers, {
      requireApiKey: true,
      limit: 200,
    });

    const docs = (records.documents || []) as Array<Record<string, unknown>>;
    const matched = docs.find((item) => {
      const docRole = toText(item.role, 20).toLowerCase();
      const docIdentifier = normalizePortalIdentifier(toText(item.identifier, 160));
      const docPhone = normalizePhone(toText(item.phone, 32));
      const active = toBoolean(item.isActive, true);
      if (docRole !== roleValue || !active) {
        return false;
      }
      if (isLikelyVendorCustomerRole(roleValue)) {
        return docPhone === normalizedPhone || docIdentifier === normalizedIdentifier;
      }
      return docIdentifier === normalizedIdentifier;
    });

    if (!matched) {
      return NextResponse.json(
        { message: "Invalid login credentials." },
        { status: 401 }
      );
    }

    const passwordHash = toText(matched.passwordHash, 180);
    const passwordSalt = toText(matched.passwordSalt, 64);
    if (!passwordHash || !passwordSalt) {
      return NextResponse.json(
        { message: "Login profile is not configured correctly. Contact administrator." },
        { status: 503 }
      );
    }

    const validPassword = verifyPortalPassword(password, passwordSalt, passwordHash);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid login credentials." },
        { status: 401 }
      );
    }

    const sessionIdentifier =
      toText(matched.identifier, 160) ||
      toText(matched.phone, 32) ||
      identifier;
    const { token, session } = createPortalSessionToken(roleValue, sessionIdentifier);

    const profileCompleted = toBoolean(matched.profileCompleted, false);
    const redirectTo =
      isLikelyVendorCustomerRole(roleValue) && !profileCompleted
        ? "/portal-onboarding"
        : getPortalRedirectPath(session.role);

    if (typeof matched.$id === "string" && matched.$id) {
      await updateAppwriteDocument(
        portalAuthUsers,
        matched.$id,
        { lastLoginAt: new Date().toISOString() },
        { requireApiKey: true }
      );
    }

    const response = NextResponse.json(
      {
        message: "Login successful.",
        role: session.role,
        redirectTo,
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
        { message: "Unable to validate login right now. Please try again shortly." },
        { status: 503 }
      );
    }

    const message = error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

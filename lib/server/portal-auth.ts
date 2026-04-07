import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export type PortalRole = "vendor" | "customer" | "admin";

export type PortalSession = {
  role: PortalRole;
  identifier: string;
  issuedAt: number;
  expiresAt: number;
};

export const PORTAL_SESSION_COOKIE_NAME = "ss_portal_session";

const ROLE_TTL_SECONDS: Record<PortalRole, number> = {
  vendor: 60 * 60 * 8,
  customer: 60 * 60 * 8,
  admin: 60 * 60 * 4,
};

const ROLE_REDIRECT_PATHS: Record<PortalRole, string> = {
  vendor: "/vendor-portal",
  customer: "/customer-portal",
  admin: "/admin-portal",
};

const ROLE_LOGIN_PATHS: Record<PortalRole, string> = {
  vendor: "/portal-login",
  customer: "/portal-login",
  admin: "/admin-login",
};

export const normalizePortalIdentifier = (value: string) =>
  value.trim().toLowerCase();

const toBase64Url = (value: string) => Buffer.from(value, "utf8").toString("base64url");
const fromBase64Url = (value: string) =>
  Buffer.from(value, "base64url").toString("utf8");

const secureEqual = (left: string, right: string) => {
  const leftBuf = Buffer.from(left);
  const rightBuf = Buffer.from(right);
  if (leftBuf.length !== rightBuf.length) {
    return false;
  }
  return timingSafeEqual(leftBuf, rightBuf);
};

const getSessionSecret = () => {
  return (
    process.env.PORTAL_SESSION_SECRET ||
    process.env.APPWRITE_API_KEY ||
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ||
    "ssengineers-dev-secret"
  );
};

const sign = (payload: string) =>
  createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");

const isValidTimestamp = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) && value > 0;

export const isPortalRole = (value: unknown): value is PortalRole =>
  value === "vendor" || value === "customer" || value === "admin";

export const getPortalRoleLabel = (role: PortalRole) => {
  if (role === "vendor") return "Vendor";
  if (role === "customer") return "Customer";
  return "Admin";
};

export const getPortalRedirectPath = (role: PortalRole) => ROLE_REDIRECT_PATHS[role];
export const getPortalLoginPath = (role: PortalRole) => ROLE_LOGIN_PATHS[role];
export const getPortalSessionTtlSeconds = (role: PortalRole) => ROLE_TTL_SECONDS[role];

export const getPortalCookieOptions = (maxAge: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge,
});

export const createPortalPasswordSalt = () => randomBytes(16).toString("hex");

export const hashPortalPassword = (password: string, salt: string) =>
  scryptSync(password, salt, 64).toString("hex");

export const verifyPortalPassword = (
  password: string,
  salt: string,
  expectedHash: string
) => {
  const calculated = hashPortalPassword(password, salt);
  return secureEqual(calculated, expectedHash);
};

export const createPortalSessionToken = (role: PortalRole, identifier: string) => {
  const now = Math.floor(Date.now() / 1000);
  const expiresAt = now + getPortalSessionTtlSeconds(role);

  const payload: PortalSession = {
    role,
    identifier: normalizePortalIdentifier(identifier).slice(0, 160),
    issuedAt: now,
    expiresAt,
  };

  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = sign(encodedPayload);
  const token = `${encodedPayload}.${signature}`;
  return { token, session: payload };
};

export const parsePortalSessionToken = (
  token: string | null | undefined
): PortalSession | null => {
  if (!token || typeof token !== "string") {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = sign(encodedPayload);
  if (!secureEqual(signature, expectedSignature)) {
    return null;
  }

  let parsed: unknown = null;
  try {
    parsed = JSON.parse(fromBase64Url(encodedPayload));
  } catch {
    return null;
  }

  if (typeof parsed !== "object" || parsed === null) {
    return null;
  }

  const record = parsed as Record<string, unknown>;
  if (!isPortalRole(record.role)) {
    return null;
  }
  if (typeof record.identifier !== "string" || !record.identifier.trim()) {
    return null;
  }
  if (!isValidTimestamp(record.issuedAt) || !isValidTimestamp(record.expiresAt)) {
    return null;
  }

  const issuedAt = Number(record.issuedAt);
  const expiresAt = Number(record.expiresAt);

  const session: PortalSession = {
    role: record.role,
    identifier: normalizePortalIdentifier(record.identifier),
    issuedAt,
    expiresAt,
  };

  const now = Math.floor(Date.now() / 1000);
  if (session.expiresAt <= now) {
    return null;
  }

  return session;
};

export const getPortalSession = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(PORTAL_SESSION_COOKIE_NAME)?.value;
  return parsePortalSessionToken(token);
};

export const toSafeInternalPath = (value: unknown, fallback: string) => {
  if (typeof value !== "string") {
    return fallback;
  }
  const trimmed = value.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return fallback;
  }
  return trimmed;
};

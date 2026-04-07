import { NextResponse } from "next/server";
import {
  PORTAL_SESSION_COOKIE_NAME,
  getPortalCookieOptions,
  toSafeInternalPath,
} from "@/lib/server/portal-auth";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const redirectPath = toSafeInternalPath(url.searchParams.get("redirect"), "/portal-login");
  const response = NextResponse.redirect(new URL(redirectPath, url.origin), 303);

  response.cookies.set({
    name: PORTAL_SESSION_COOKIE_NAME,
    value: "",
    ...getPortalCookieOptions(0),
  });

  return response;
}

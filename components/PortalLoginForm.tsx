"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type PortalRole = "vendor" | "customer" | "admin";
type SubmitStatus = "idle" | "sending" | "error";
type FormMode = "login" | "register";

type PortalResponse = {
  message?: string;
  redirectTo?: string;
};

type PortalLoginFormProps = {
  allowedRoles: PortalRole[];
  defaultRole?: PortalRole;
  title: string;
  subtitle: string;
  allowRegistration?: boolean;
  initialMode?: FormMode;
};

const roleLabelMap: Record<PortalRole, string> = {
  vendor: "Vendor",
  customer: "Customer",
  admin: "Admin",
};

export default function PortalLoginForm({
  allowedRoles,
  defaultRole,
  title,
  subtitle,
  allowRegistration = false,
  initialMode = "login",
}: PortalLoginFormProps) {
  const router = useRouter();
  const initialRole =
    defaultRole && allowedRoles.includes(defaultRole)
      ? defaultRole
      : allowedRoles[0] || "vendor";

  const [role, setRole] = useState<PortalRole>(initialRole);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [note, setNote] = useState("");
  const [mode, setMode] = useState<FormMode>(initialMode);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const fullName = String(formData.get("fullName") || "").trim();
    const identifier = String(formData.get("identifier") || "").trim();
    const phone = String(formData.get("phone") || "").replace(/\D/g, "").slice(0, 15);
    const password = String(formData.get("password") || "");

    if (mode === "register" && !fullName) {
      setStatus("error");
      setNote("Full name is required for account creation.");
      return;
    }

    setStatus("sending");
    setNote("");

    try {
      const endpoint = mode === "register" ? "/api/auth/register" : "/api/auth/login";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          identifier,
          phone,
          password,
          fullName,
        }),
      });

      const data = (await response.json().catch(() => null)) as PortalResponse | null;
      if (!response.ok) {
        throw new Error(data?.message || "Unable to process request right now.");
      }

      setStatus("idle");
      setNote("");
      router.push(data?.redirectTo || "/");
      router.refresh();
    } catch (error) {
      setStatus("error");
      const fallback = "Unable to process request right now. Please try again.";
      const message =
        error instanceof Error && error.message.trim() ? error.message : fallback;
      setNote(message);
    }
  };

  const isRegistrationMode = mode === "register";

  return (
    <div className="auth-login-shell">
      <h3>{title}</h3>
      <p className="muted">{subtitle}</p>

      {allowRegistration ? (
        <div className="auth-mode-switch" role="tablist" aria-label="Choose action">
          <button
            type="button"
            role="tab"
            aria-selected={!isRegistrationMode}
            className={`auth-mode-chip ${!isRegistrationMode ? "active" : ""}`}
            onClick={() => {
              setMode("login");
              setStatus("idle");
              setNote("");
            }}
          >
            Login
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={isRegistrationMode}
            className={`auth-mode-chip ${isRegistrationMode ? "active" : ""}`}
            onClick={() => {
              setMode("register");
              setStatus("idle");
              setNote("");
            }}
          >
            Create Account
          </button>
        </div>
      ) : null}

      <form className="form auth-login-form" onSubmit={onSubmit}>
        {allowedRoles.length > 1 ? (
          <div className="auth-role-switch" role="tablist" aria-label="Select login type">
            {allowedRoles.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={role === item}
                className={`auth-role-chip ${role === item ? "active" : ""}`}
                onClick={() => {
                  setRole(item);
                  setStatus("idle");
                  setNote("");
                }}
              >
                {roleLabelMap[item]}
              </button>
            ))}
          </div>
        ) : (
          <p className="auth-role-badge">{roleLabelMap[role]} Login</p>
        )}

        {isRegistrationMode ? (
          <label>
            Full Name
            <input
              name="fullName"
              required
              maxLength={120}
              autoComplete="name"
              placeholder="Enter your full name"
            />
          </label>
        ) : null}

        {isRegistrationMode ? (
          <label>
            Phone Number
            <input
              name="phone"
              required
              maxLength={15}
              inputMode="tel"
              pattern="[0-9]{10,15}"
              autoComplete="tel"
              placeholder="Enter phone number"
            />
          </label>
        ) : (
          <label>
            {role === "admin" ? "Admin User ID / Email" : "Phone Number"}
            <input
              name="identifier"
              required
              maxLength={role === "admin" ? 160 : 15}
              inputMode={role === "admin" ? "email" : "tel"}
              pattern={role === "admin" ? undefined : "[0-9]{10,15}"}
              autoComplete={role === "admin" ? "username" : "tel"}
              placeholder={
                role === "admin" ? "Enter admin login ID" : "Enter registered phone number"
              }
            />
          </label>
        )}

        <label>
          Password
          <input
            name="password"
            type="password"
            required
            minLength={8}
            maxLength={160}
            autoComplete="current-password"
            placeholder={isRegistrationMode ? "Create password" : "Enter password"}
          />
        </label>

        <button className="button" type="submit" disabled={status === "sending"}>
          {status === "sending"
            ? isRegistrationMode
              ? "Creating..."
              : "Signing In..."
            : isRegistrationMode
              ? `Create ${roleLabelMap[role]} Account`
              : `Login as ${roleLabelMap[role]}`}
        </button>

        {note ? <p className={`form-note ${status === "error" ? "error" : ""}`}>{note}</p> : null}
      </form>
    </div>
  );
}

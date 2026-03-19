"use client";

import Link from "next/link";
import { useState } from "react";
import { serviceRequestOptions } from "@/lib/content";

export default function ServiceRequestForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [message, setMessage] = useState<string>("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/service-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          source: "ssengineers.in",
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as
          | { message?: string }
          | null;
        throw new Error(body?.message || "Request failed");
      }

      form.reset();
      setStatus("sent");
      setMessage("Request received. Our team will schedule a site visit.");
    } catch (error) {
      console.error("Service request error:", error);
      setStatus("error");
      const fallback = "Unable to submit right now. Please call us directly.";
      const errorMessage =
        error instanceof Error && error.message && error.message.length <= 180
          ? error.message
          : fallback;
      setMessage(errorMessage);
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="service-website">
          Website
          <input id="service-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="form-grid">
        <label>
          Full Name
          <input name="name" required placeholder="Your name" maxLength={100} />
        </label>
        <label>
          Phone
          <input
            name="phone"
            type="tel"
            required
            placeholder="Contact number"
            inputMode="tel"
            pattern="[0-9+()\\-\\s]{7,20}"
            maxLength={20}
          />
        </label>
        <label>
          Email
          <input name="email" type="email" placeholder="Email address" maxLength={160} />
        </label>
        <label>
          Location
          <input name="location" required placeholder="Site location" maxLength={180} />
        </label>
        <label>
          Company
          <input name="company" placeholder="Organization (optional)" maxLength={120} />
        </label>
        <label>
          Service Type
          <select name="service" required defaultValue="">
            <option value="" disabled>
              Select service
            </option>
            {serviceRequestOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Scope / Requirement
        <textarea
          name="message"
          rows={4}
          placeholder="Briefly describe scope or urgency"
          required
          minLength={5}
          maxLength={3000}
        />
      </label>
      <label className="consent-check">
        <input type="checkbox" name="consent" required />
        <span>
          I agree to the processing of my details as per the{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </span>
      </label>
      <button className="button" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Submitting..." : "Request Service"}
      </button>
      {message ? <p className={`form-note ${status}`}>{message}</p> : null}
    </form>
  );
}

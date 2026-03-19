"use client";

import Link from "next/link";
import { useState } from "react";
import {
  vendorCategoryOptions,
  vendorDocumentShareModes,
} from "@/lib/content";

type SubmitState = "idle" | "sending" | "sent" | "error";

export default function VendorRegistrationForm() {
  const [status, setStatus] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setMessage("");

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/vendor-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          source: "ssengineers.in/vendor-registration",
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as
          | { message?: string }
          | null;
        throw new Error(body?.message || "Vendor registration request failed");
      }

      form.reset();
      setStatus("sent");
      setMessage(
        "Vendor registration received successfully. Our procurement team will review your profile and contact you for the next qualification step."
      );
    } catch (error) {
      console.error("Vendor registration error:", error);
      setStatus("error");
      const fallback =
        "Unable to submit right now. Please email your vendor profile to anil@ssengineers.in.";
      const errorMessage =
        error instanceof Error && error.message && error.message.length <= 220
          ? error.message
          : fallback;
      setMessage(errorMessage);
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="vendor-website-trap">
          Website
          <input
            id="vendor-website-trap"
            name="websiteTrap"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="form-grid">
        <label>
          Company Name
          <input
            name="companyName"
            required
            placeholder="Registered company name"
            maxLength={160}
          />
        </label>

        <label>
          Contact Person
          <input
            name="contactPerson"
            required
            placeholder="Authorized contact name"
            maxLength={100}
          />
        </label>

        <label>
          Phone
          <input
            name="phone"
            type="tel"
            required
            placeholder="Primary phone number"
            inputMode="tel"
            pattern="[0-9+()\\-\\s]{7,20}"
            maxLength={20}
          />
        </label>

        <label>
          Business Email
          <input
            name="email"
            type="email"
            required
            placeholder="name@company.com"
            maxLength={160}
          />
        </label>

        <label>
          Website
          <input
            name="website"
            placeholder="https://example.com (optional)"
            maxLength={180}
          />
        </label>

        <label>
          City / Operating Region
          <input name="city" required placeholder="City / Region" maxLength={120} />
        </label>

        <label>
          Business Category
          <select name="category" required defaultValue="">
            <option value="" disabled>
              Select category
            </option>
            {vendorCategoryOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label>
          Years of Experience
          <input
            name="experienceYears"
            placeholder="e.g. 8 years"
            maxLength={40}
          />
        </label>

        <label>
          GSTIN
          <input
            name="gstin"
            placeholder="GSTIN (optional)"
            maxLength={32}
            style={{ textTransform: "uppercase" }}
          />
        </label>

        <label>
          PAN
          <input
            name="pan"
            placeholder="PAN (optional)"
            maxLength={20}
            style={{ textTransform: "uppercase" }}
          />
        </label>

        <label>
          Preferred Document Sharing
          <select name="documentSharingMode" required defaultValue="">
            <option value="" disabled>
              Select option
            </option>
            {vendorDocumentShareModes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Products / Services Offered
        <textarea
          name="productsServices"
          rows={4}
          required
          minLength={10}
          maxLength={3000}
          placeholder="Share your capabilities, trade specialization, and execution scope."
        />
      </label>

      <label>
        Certifications / Statutory Registrations
        <textarea
          name="certifications"
          rows={3}
          maxLength={1200}
          placeholder="ISO, ESI, PF, MSME, OEM authorizations, safety certifications, etc."
        />
      </label>

      <label>
        Major References
        <textarea
          name="references"
          rows={3}
          maxLength={2200}
          placeholder="Share key client references and project highlights."
        />
      </label>

      <label className="consent-check">
        <input type="checkbox" name="consent" required />
        <span>
          I confirm the above details are accurate and I agree to the{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </span>
      </label>

      <button className="button" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Submitting..." : "Submit Vendor Registration"}
      </button>

      {message ? <p className={`form-note ${status}`}>{message}</p> : null}
    </form>
  );
}

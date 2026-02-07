"use client";

import { useState } from "react";
import { createAppwriteDocument } from "@/functions/appwrite";
import { serviceRequestOptions } from "@/lib/content";

const collectionId =
  process.env.NEXT_PUBLIC_APPWRITE_SERVICE_REQUESTS_COLLECTION_ID ||
  "service_requests";

export default function ServiceRequestForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [message, setMessage] = useState<string>("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      await createAppwriteDocument(collectionId, {
        ...payload,
        source: "website-service-request",
        createdAt: new Date().toISOString(),
      });
      event.currentTarget.reset();
      setStatus("sent");
      setMessage("Request received. Our team will schedule a site visit.");
    } catch (error) {
      setStatus("error");
      setMessage("Unable to submit right now. Please call us directly.");
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-grid">
        <label>
          Full Name
          <input name="name" required placeholder="Your name" />
        </label>
        <label>
          Phone
          <input name="phone" required placeholder="Contact number" />
        </label>
        <label>
          Email
          <input name="email" type="email" placeholder="Email address" />
        </label>
        <label>
          Location
          <input name="location" required placeholder="Site location" />
        </label>
        <label>
          Company
          <input name="company" placeholder="Organization (optional)" />
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
        />
      </label>
      <button className="button" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Submitting..." : "Request Service"}
      </button>
      {message ? <p className={`form-note ${status}`}>{message}</p> : null}
    </form>
  );
}

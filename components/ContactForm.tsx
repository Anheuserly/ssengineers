"use client";

import { useState } from "react";
import { createAppwriteDocument, getAppwriteConfig } from "@/functions/appwrite";

export default function ContactForm() {
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
      const { collections } = getAppwriteConfig();
      await createAppwriteDocument(collections.contacts, {
        ...payload,
        source: "website-contact",
        createdAt: new Date().toISOString(),
      });
      event.currentTarget.reset();
      setStatus("sent");
      setMessage("Thanks! We will call you back shortly.");
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
          Company
          <input name="company" placeholder="Organization (optional)" />
        </label>
      </div>
      <label>
        Message
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us about your requirement"
          required
        />
      </label>
      <button className="button" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Submitting..." : "Submit"}
      </button>
      {message ? <p className={`form-note ${status}`}>{message}</p> : null}
    </form>
  );
}

"use client";

import { useState } from "react";

export default function ContactForm() {
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          source: "ssengineers.in",
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Request failed");
      }

      form.reset();
      setStatus("sent");
      setMessage("Thanks! We will call you back shortly.");
    } catch (error) {
      console.error("Contact form error:", error);
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

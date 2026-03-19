"use client";

import Link from "next/link";
import { useState } from "react";

type SubmitStatus = "idle" | "sending" | "sent" | "error";

const ratingOptions = [5, 4, 3, 2, 1];

export default function FeedbackForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setMessage("");

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          source: "ssengineers.in/feedback",
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as
          | { message?: string }
          | null;
        throw new Error(body?.message || "Feedback submission failed");
      }

      form.reset();
      setStatus("sent");
      setMessage(
        "Thank you for your feedback. Our team has recorded your response successfully."
      );
    } catch (error) {
      console.error("Feedback form error:", error);
      setStatus("error");
      const fallback =
        "Unable to submit feedback right now. Please try again shortly.";
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
        <label htmlFor="feedback-website">
          Website
          <input
            id="feedback-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="form-grid">
        <label>
          Full Name
          <input name="name" required placeholder="Your name" maxLength={100} />
        </label>
        <label>
          Rating
          <select name="rating" required defaultValue="">
            <option value="" disabled>
              Select rating
            </option>
            {ratingOptions.map((item) => (
              <option key={item} value={item}>
                {item} Star{item > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Feedback Message
        <textarea
          name="message"
          rows={4}
          required
          minLength={5}
          maxLength={3000}
          placeholder="Share your experience with our team and execution quality."
        />
      </label>

      <label className="consent-check">
        <input type="checkbox" name="consent" required />
        <span>
          I agree to the use of my feedback as per the{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </span>
      </label>

      <button className="button" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Submitting..." : "Submit Feedback"}
      </button>

      {message ? <p className={`form-note ${status}`}>{message}</p> : null}
    </form>
  );
}

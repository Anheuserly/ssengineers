"use client";

import Link from "next/link";
import { useState } from "react";

type SubmitStatus = "idle" | "sending" | "sent" | "error";

export default function CareerApplicationForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setMessage("");

    const formData = new FormData(form);
    formData.set("source", "ssengineers.in");
    formData.set("createdAt", new Date().toISOString());

    try {
      const response = await fetch("/api/career", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as
          | { message?: string }
          | null;
        throw new Error(body?.message || "Career application request failed");
      }

      form.reset();
      setStatus("sent");
      setMessage("Application submitted successfully. Our team will contact you.");
    } catch (error) {
      console.error("Career application error:", error);
      setStatus("error");
      const fallback = "Unable to submit right now. Please email your resume directly.";
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
        <label htmlFor="career-website">
          Website
          <input id="career-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="form-grid">
        <label>
          Full Name
          <input name="name" required placeholder="Candidate name" maxLength={100} />
        </label>
        <label>
          Phone
          <input
            name="phone"
            type="tel"
            required
            placeholder="Phone number"
            inputMode="tel"
            pattern="[0-9+()\\-\\s]{7,20}"
            maxLength={20}
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            required
            placeholder="Email address"
            maxLength={160}
          />
        </label>
        <label>
          Position Applied
          <input
            name="position"
            defaultValue="Electrical Engineer"
            required
            placeholder="Position"
            maxLength={120}
          />
        </label>
        <label>
          Experience
          <input name="experience" required placeholder="e.g. 3 years" maxLength={80} />
        </label>
        <label>
          Current Location
          <input name="location" placeholder="City" maxLength={120} />
        </label>
      </div>

      <label>
        Describe Your Work
        <textarea
          name="workDescription"
          rows={4}
          required
          placeholder="Briefly describe your projects, role, and responsibilities"
          minLength={5}
          maxLength={4000}
        />
      </label>

      <label>
        Resume (PDF, DOC, DOCX)
        <input
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          required
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
        {status === "sending" ? "Submitting..." : "Submit Application"}
      </button>

      {message ? <p className={`form-note ${status}`}>{message}</p> : null}
    </form>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  BucketService,
  readServiceBucket,
  SERVICE_BUCKET_UPDATED_EVENT,
  writeServiceBucket,
} from "@/lib/service-bucket";

type RequestStatus = "idle" | "sending" | "sent" | "error";

export default function BucketRequestForm() {
  const [items, setItems] = useState<BucketService[]>([]);
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const refresh = () => setItems(readServiceBucket());
    refresh();
    window.addEventListener(SERVICE_BUCKET_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(SERVICE_BUCKET_UPDATED_EVENT, refresh);
  }, []);

  const removeItem = (name: string) => {
    const next = items.filter((item) => item.name !== name);
    setItems(next);
    writeServiceBucket(next);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!items.length) return;

    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/service-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          services: items,
          source: "ssengineers.in",
          createdAt: new Date().toISOString(),
        }),
      });
      const body = (await response.json().catch(() => null)) as { message?: string } | null;
      if (!response.ok) throw new Error(body?.message || "Request failed");

      form.reset();
      writeServiceBucket([]);
      setItems([]);
      setStatus("sent");
      setMessage("Your combined service request has been received. Our engineering team will contact you shortly.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to submit your request right now.");
    }
  };

  if (!items.length) {
    return (
      <div className="bucket-empty">
        <p className="eyebrow">Service bucket</p>
        <h2>No services selected yet</h2>
        <p className="muted">Build one enquiry for all the systems your facility needs. There is no price commitment at this stage.</p>
        <Link className="button" href="/services">Browse service capabilities <ArrowRight aria-hidden="true" size={17} /></Link>
      </div>
    );
  }

  return (
    <div className="bucket-layout">
      <aside className="bucket-summary" aria-label="Selected services">
        <div className="bucket-summary-head">
          <div>
            <p className="eyebrow">Selected scope</p>
            <h2>{items.length} service{items.length === 1 ? "" : "s"}</h2>
          </div>
          <Link href="/services" className="text-link">Add more</Link>
        </div>
        <ul className="bucket-items">
          {items.map((item) => (
            <li key={item.name}>
              <div>
                <strong>{item.name}</strong>
                <span>{item.category}</span>
              </div>
              <button type="button" onClick={() => removeItem(item.name)} aria-label={`Remove ${item.name}`}>
                <Trash2 aria-hidden="true" size={16} />
              </button>
            </li>
          ))}
        </ul>
        <p className="bucket-note">A technical review determines the final scope, drawings, compliance requirements and commercial proposal.</p>
      </aside>

      <form className="form bucket-form" onSubmit={onSubmit}>
        <div className="form-heading">
          <p className="eyebrow">Request review</p>
          <h2>Tell us about the site</h2>
          <p className="muted">One submission sends the whole selected scope to S.S. Engineers & Consultants.</p>
        </div>
        <div className="honeypot" aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" /></div>
        <div className="form-grid">
          <label>Full name<input name="name" required maxLength={100} placeholder="Your name" /></label>
          <label>Phone<input name="phone" type="tel" required inputMode="tel" pattern="[0-9+()\\-\\s]{7,20}" maxLength={20} placeholder="Contact number" /></label>
          <label>Email<input name="email" type="email" maxLength={160} placeholder="Email address (optional)" /></label>
          <label>Site location<input name="location" required maxLength={180} placeholder="City, area or project location" /></label>
          <label>Organisation<input name="company" maxLength={120} placeholder="Company name (optional)" /></label>
          <label>Facility type<select name="facilityType" defaultValue=""><option value="">Select facility type</option><option>Commercial</option><option>Residential</option><option>Industrial</option><option>Healthcare</option><option>Hospitality</option><option>Institutional</option><option>Other</option></select></label>
          <label>Required timeline<select name="timeline" defaultValue=""><option value="">Select timeline</option><option>Emergency / 24 hours</option><option>Within 7 days</option><option>Within 30 days</option><option>Planning stage</option></select></label>
          <label>Preferred contact<select name="preferredContact" defaultValue="Phone call"><option>Phone call</option><option>WhatsApp</option><option>Email</option></select></label>
        </div>
        <label>Photo or document link<input name="mediaUrl" type="url" maxLength={1000} placeholder="https://... (optional)" /></label>
        <label>Project requirement<textarea name="message" rows={5} required minLength={5} maxLength={3000} placeholder="Share dimensions, existing systems, compliance requirements, site access or urgency." /></label>
        <label className="consent-check"><input type="checkbox" name="consent" required /><span>I agree to the processing of my details under the <Link href="/privacy-policy">Privacy Policy</Link>.</span></label>
        <button className="button" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending request..." : "Send selected services"} <ArrowRight aria-hidden="true" size={17} /></button>
        {message ? <p className={`form-note ${status}`}>{message}</p> : null}
      </form>
    </div>
  );
}

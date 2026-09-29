"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wrench,
  Star,
  CheckCircle2,
  AlertCircle,
  Building2,
  Clock,
  MapPin,
  Sparkles,
  ShieldCheck,
  Flame,
  Zap,
  RotateCcw,
} from "lucide-react";

type ActiveTab = "work-request" | "feedback";

const serviceCategories = [
  "Fire Hydrant & Sprinkler Systems",
  "Fire Alarm & Smoke Detection",
  "Gas Suppression (FM-200 / Novec)",
  "Electrical Substation & Panels",
  "HVAC & Smoke Extraction",
  "Plumbing & Pumping Systems",
  "Comprehensive AMC & Fire Audit",
  "IBMS & Access Control",
];

const scopeTypes = [
  "Turnkey Execution (Supply & Install)",
  "System Expansion / Retrofit",
  "Annual Maintenance Contract (AMC)",
  "Statutory Fire NOC & Safety Audit",
  "Emergency Breakdown / Repair",
];

const facilityTypes = [
  "Commercial Complex / IT Park",
  "Industrial Plant / Factory",
  "Hospital / Healthcare",
  "Institutional / College Campus",
  "Warehouse / Logistics Hub",
  "Residential High-Rise",
];

const urgencyLevels = [
  "Immediate / Urgent (< 48 hrs)",
  "Within 1-2 Weeks",
  "Planned Project (1-3 Months)",
  "Budgetary Quotation / Tender",
];

export default function ContactForm() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("work-request");

  // Work Request State
  const [wrCategory, setWrCategory] = useState(serviceCategories[0]);
  const [wrScope, setWrScope] = useState(scopeTypes[0]);
  const [wrFacility, setWrFacility] = useState(facilityTypes[0]);
  const [wrUrgency, setWrUrgency] = useState(urgencyLevels[1]);
  const [wrStatus, setWrStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [wrMessage, setWrMessage] = useState("");
  const [wrReferenceNumber, setWrReferenceNumber] = useState("");

  // Feedback State
  const [fbRating, setFbRating] = useState(5);
  const [fbHoverRating, setFbHoverRating] = useState(0);
  const [fbService, setFbService] = useState("Fire Protection System");
  const [fbRecommend, setFbRecommend] = useState(true);
  const [fbStatus, setFbStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [fbMessage, setFbMessage] = useState("");

  // Work Request Submit
  const handleWorkRequestSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWrStatus("submitting");
    setWrMessage("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          serviceCategory: wrCategory,
          scopeType: wrScope,
          facilityType: wrFacility,
          urgency: wrUrgency,
        }),
      });

      const body = await res.json();
      if (!res.ok) {
        throw new Error(body?.message || "Failed to submit work request");
      }

      setWrReferenceNumber(body.requestNumber || "SSE-LOGGED");
      setWrStatus("success");
      setWrMessage(body.message || "Work request submitted successfully.");
    } catch (err: any) {
      setWrStatus("error");
      setWrMessage(err?.message || "Could not submit your request. Please call our technical hotline.");
    }
  };

  // Feedback Submit
  const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFbStatus("submitting");
    setFbMessage("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          rating: fbRating,
          project: fbService,
          recommend: fbRecommend,
        }),
      });

      const body = await res.json();
      if (!res.ok) {
        throw new Error(body?.message || "Failed to submit feedback");
      }

      setFbStatus("success");
      setFbMessage(body.message || "Thank you for your valuable feedback.");
    } catch (err: any) {
      setFbStatus("error");
      setFbMessage(err?.message || "Could not record feedback right now. Please try again shortly.");
    }
  };

  return (
    <div className="contact-form-hub" id="request-work">
      {/* Tab Switcher Header */}
      <div className="contact-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "work-request"}
          className={`contact-tab-btn ${activeTab === "work-request" ? "active" : ""}`}
          onClick={() => setActiveTab("work-request")}
        >
          <Wrench className="tab-icon" size={18} />
          <span>Create Work Request</span>
          <span className="tab-badge">Instant Dispatch</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "feedback"}
          className={`contact-tab-btn ${activeTab === "feedback" ? "active" : ""}`}
          onClick={() => setActiveTab("feedback")}
        >
          <Star className="tab-icon" size={18} />
          <span>Client Review & Feedback</span>
        </button>
      </div>

      {/* TAB 1: WORK REQUEST */}
      {activeTab === "work-request" && (
        <div className="contact-panel-body">
          {wrStatus === "success" ? (
            <div className="submission-success-card">
              <div className="success-icon-badge">
                <CheckCircle2 size={44} className="text-success" />
              </div>
              <h4>Work Request Registered</h4>
              <p className="reference-code-lead">
                Your Official Tracking Reference Number:
              </p>
              <div className="tracking-code-pill">
                <span className="code-label">Ref Code:</span>
                <strong>{wrReferenceNumber}</strong>
              </div>
              <p className="success-explanation">
                This project requirement has been written directly to the{" "}
                <strong>S.S. Engineers Central Database</strong>. Our senior project
                coordinators will review your technical scope and contact you within 24
                hours.
              </p>
              <div className="success-meta-strip">
                <div>
                  <span>Assigned Firm</span>
                  <p>S.S. Engineers & Consultants</p>
                </div>
                <div>
                  <span>SLA Response</span>
                  <p>Guaranteed 24-48 Hrs</p>
                </div>
              </div>
              <button
                type="button"
                className="button ghost small restart-btn"
                onClick={() => {
                  setWrStatus("idle");
                  setWrMessage("");
                }}
              >
                <RotateCcw size={14} style={{ marginRight: "6px" }} />
                Submit Another Request
              </button>
            </div>
          ) : (
            <form className="form" onSubmit={handleWorkRequestSubmit}>
              <div className="honeypot" aria-hidden="true" style={{ display: "none" }}>
                <label>
                  Website
                  <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="form-intro-banner">
                <p className="intro-title">
                  <Sparkles size={16} className="text-gold" />
                  Engineering Commission & Site Survey Form
                </p>
                <p className="intro-subtitle">
                  Submissions create an active work request in our central dispatch
                  system for turnkey MEP, fire fighting, or AMC contracts.
                </p>
              </div>

              {/* Service Selection */}
              <div className="form-field-group">
                <label className="field-label">
                  <Flame size={15} /> Select Primary System Required
                </label>
                <div className="pill-select-grid">
                  {serviceCategories.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      className={`pill-option ${wrCategory === cat ? "selected" : ""}`}
                      onClick={() => setWrCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scope & Facility Grid */}
              <div className="form-grid-2">
                <label className="field-label-wrap">
                  <span className="label-text">Scope of Work</span>
                  <select
                    className="select-custom"
                    value={wrScope}
                    onChange={(e) => setWrScope(e.target.value)}
                  >
                    {scopeTypes.map((scope) => (
                      <option key={scope} value={scope}>
                        {scope}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field-label-wrap">
                  <span className="label-text">Facility Typology</span>
                  <select
                    className="select-custom"
                    value={wrFacility}
                    onChange={(e) => setWrFacility(e.target.value)}
                  >
                    {facilityTypes.map((fac) => (
                      <option key={fac} value={fac}>
                        {fac}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {/* Client & Project Details */}
              <div className="form-grid-2">
                <label className="field-label-wrap">
                  <span className="label-text">
                    Full Name <span className="req-star">*</span>
                  </span>
                  <input
                    name="name"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    maxLength={100}
                    className="input-custom"
                  />
                </label>

                <label className="field-label-wrap">
                  <span className="label-text">
                    Phone / WhatsApp <span className="req-star">*</span>
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    pattern="[0-9+()\\-\\s]{7,25}"
                    maxLength={25}
                    className="input-custom"
                  />
                </label>
              </div>

              <div className="form-grid-2">
                <label className="field-label-wrap">
                  <span className="label-text">Email Address</span>
                  <input
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    maxLength={160}
                    className="input-custom"
                  />
                </label>

                <label className="field-label-wrap">
                  <span className="label-text">Company / Organization</span>
                  <input
                    name="company"
                    placeholder="e.g. DLF Commercial, Fortis, etc."
                    maxLength={120}
                    className="input-custom"
                  />
                </label>
              </div>

              <div className="form-grid-2">
                <label className="field-label-wrap">
                  <span className="label-text">
                    <MapPin size={14} style={{ display: "inline", verticalAlign: "middle" }} /> Project Site Location <span className="req-star">*</span>
                  </span>
                  <input
                    name="location"
                    required
                    placeholder="e.g. Sector 62 Noida / Okhla Ph-III New Delhi"
                    maxLength={200}
                    className="input-custom"
                  />
                </label>

                <label className="field-label-wrap">
                  <span className="label-text">
                    <Clock size={14} style={{ display: "inline", verticalAlign: "middle" }} /> Execution Timeline
                  </span>
                  <select
                    className="select-custom"
                    value={wrUrgency}
                    onChange={(e) => setWrUrgency(e.target.value)}
                  >
                    {urgencyLevels.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="field-label-wrap">
                <span className="label-text">
                  Scope Brief & Specific Engineering Requirements <span className="req-star">*</span>
                </span>
                <textarea
                  name="message"
                  rows={4}
                  required
                  minLength={8}
                  maxLength={3000}
                  className="textarea-custom"
                  placeholder="Describe your site parameters (built-up area, hydrant line requirement, pump capacity, transformer rating, AMC scope, or fire NOC audit)."
                />
              </label>

              <label className="consent-check">
                <input type="checkbox" name="consent" required defaultChecked />
                <span>
                  I authorize S.S. Engineers to record this work request in the project registry
                  and contact me for site review.
                </span>
              </label>

              {wrStatus === "error" && (
                <div className="form-error-banner">
                  <AlertCircle size={16} />
                  <span>{wrMessage}</span>
                </div>
              )}

              <button
                className="button full-width"
                type="submit"
                disabled={wrStatus === "submitting"}
              >
                {wrStatus === "submitting" ? "Registering Work Request..." : "Submit Official Work Request"}
              </button>
            </form>
          )}
        </div>
      )}

      {/* TAB 2: CLIENT FEEDBACK & REVIEWS */}
      {activeTab === "feedback" && (
        <div className="contact-panel-body">
          {fbStatus === "success" ? (
            <div className="submission-success-card">
              <div className="success-icon-badge">
                <CheckCircle2 size={44} className="text-success" />
              </div>
              <h4>Thank You for Your Feedback!</h4>
              <p className="success-explanation">
                Your evaluation has been recorded into the{" "}
                <strong>Quality & Client Satisfaction Registry</strong> for S.S. Engineers &
                Consultants. We appreciate your partnership and valuable feedback.
              </p>
              <button
                type="button"
                className="button ghost small restart-btn"
                onClick={() => {
                  setFbStatus("idle");
                  setFbMessage("");
                }}
              >
                <RotateCcw size={14} style={{ marginRight: "6px" }} />
                Submit Another Review
              </button>
            </div>
          ) : (
            <form className="form" onSubmit={handleFeedbackSubmit}>
              <div className="honeypot" aria-hidden="true" style={{ display: "none" }}>
                <label>
                  Website
                  <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="form-intro-banner">
                <p className="intro-title">
                  <ShieldCheck size={16} className="text-gold" />
                  Client Satisfaction & Quality Feedback
                </p>
                <p className="intro-subtitle">
                  Your feedback helps us maintain ISO 9001:2008 standards across our fire
                  fighting, electrical, and MEP execution projects.
                </p>
              </div>

              {/* Star Rating Selector */}
              <div className="rating-select-box">
                <span className="field-label-title">Rate Execution & Quality Control</span>
                <div className="stars-row">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = star <= (fbHoverRating || fbRating);
                    return (
                      <button
                        type="button"
                        key={star}
                        className={`star-btn ${isFilled ? "filled" : ""}`}
                        onMouseEnter={() => setFbHoverRating(star)}
                        onMouseLeave={() => setFbHoverRating(0)}
                        onClick={() => setFbRating(star)}
                        aria-label={`${star} star`}
                      >
                        <Star size={28} />
                      </button>
                    );
                  })}
                  <span className="rating-text-label">
                    {fbRating === 5 && "5 / 5 - Outstanding Execution"}
                    {fbRating === 4 && "4 / 5 - Very Good Quality"}
                    {fbRating === 3 && "3 / 5 - Satisfactory"}
                    {fbRating === 2 && "2 / 5 - Needs Improvement"}
                    {fbRating === 1 && "1 / 5 - Unsatisfactory"}
                  </span>
                </div>
              </div>

              {/* Project Type */}
              <div className="form-field-group">
                <label className="field-label-wrap">
                  <span className="label-text">Service / Project Executed</span>
                  <select
                    className="select-custom"
                    value={fbService}
                    onChange={(e) => setFbService(e.target.value)}
                  >
                    <option value="Fire Hydrant & Sprinkler Installation">Fire Hydrant & Sprinkler Installation</option>
                    <option value="Fire Alarm & Detection Setup">Fire Alarm & Detection Setup</option>
                    <option value="Gas Suppression (FM-200 / Novec)">Gas Suppression (FM-200 / Novec)</option>
                    <option value="Electrical Substation / LT-HT Works">Electrical Substation / LT-HT Works</option>
                    <option value="Comprehensive AMC Service">Comprehensive AMC Service</option>
                    <option value="Statutory Fire Audit & NOC Clearance">Statutory Fire Audit & NOC Clearance</option>
                    <option value="Turnkey MEP Project">Turnkey MEP Project</option>
                  </select>
                </label>
              </div>

              {/* Reviewer Details */}
              <div className="form-grid-2">
                <label className="field-label-wrap">
                  <span className="label-text">
                    Your Name <span className="req-star">*</span>
                  </span>
                  <input
                    name="name"
                    required
                    placeholder="e.g. Neeraj Verma"
                    maxLength={100}
                    className="input-custom"
                  />
                </label>

                <label className="field-label-wrap">
                  <span className="label-text">Phone / WhatsApp</span>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+91 98112 00000"
                    maxLength={25}
                    className="input-custom"
                  />
                </label>
              </div>

              <div className="form-grid-2">
                <label className="field-label-wrap">
                  <span className="label-text">Email Address</span>
                  <input
                    name="email"
                    type="email"
                    placeholder="name@facility.in"
                    maxLength={160}
                    className="input-custom"
                  />
                </label>

                <label className="field-label-wrap">
                  <span className="label-text">Facility / Company</span>
                  <input
                    name="company"
                    placeholder="e.g. Max Healthcare, AIIMS, etc."
                    maxLength={120}
                    className="input-custom"
                  />
                </label>
              </div>

              <label className="field-label-wrap">
                <span className="label-text">
                  Your Review & Comments <span className="req-star">*</span>
                </span>
                <textarea
                  name="message"
                  rows={4}
                  required
                  minLength={5}
                  maxLength={3000}
                  className="textarea-custom"
                  placeholder="Share details regarding engineering quality, technician response time, safety compliance, and handover experience."
                />
              </label>

              <div className="recommendation-toggle">
                <span className="label-text">Would you recommend S.S. Engineers to other projects?</span>
                <div className="recommend-buttons">
                  <button
                    type="button"
                    className={`rec-btn ${fbRecommend ? "selected" : ""}`}
                    onClick={() => setFbRecommend(true)}
                  >
                    👍 Yes, Highly Recommend
                  </button>
                  <button
                    type="button"
                    className={`rec-btn ${!fbRecommend ? "selected" : ""}`}
                    onClick={() => setFbRecommend(false)}
                  >
                    Neutral / No
                  </button>
                </div>
              </div>

              <label className="consent-check">
                <input type="checkbox" name="consent" required defaultChecked />
                <span>
                  I consent to the publication of this review in compliance with the{" "}
                  <Link href="/privacy-policy">Privacy Policy</Link>.
                </span>
              </label>

              {fbStatus === "error" && (
                <div className="form-error-banner">
                  <AlertCircle size={16} />
                  <span>{fbMessage}</span>
                </div>
              )}

              <button
                className="button full-width"
                type="submit"
                disabled={fbStatus === "submitting"}
              >
                {fbStatus === "submitting" ? "Submitting Review..." : "Submit Quality Review"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

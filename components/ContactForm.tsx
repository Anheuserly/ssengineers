"use client";

import { useState, useEffect } from "react";
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

const findMatchingService = (queryVal: string): string | null => {
  const q = queryVal.toLowerCase().trim();
  const direct = serviceCategories.find((c) => c.toLowerCase() === q);
  if (direct) return direct;

  if (q.includes("sprinkler") || q.includes("hydrant")) return "Fire Hydrant & Sprinkler Systems";
  if (q.includes("alarm") || q.includes("smoke") || q.includes("detection") || q.includes("detector")) return "Fire Alarm & Smoke Detection";
  if (q.includes("gas") || q.includes("suppression") || q.includes("fm-200") || q.includes("fm200") || q.includes("novec") || q.includes("co2")) return "Gas Suppression (FM-200 / Novec)";
  if (q.includes("substation") || q.includes("electrical") || q.includes("panel") || q.includes("transformer") || q.includes("lt/ht") || q.includes("lt-ht")) return "Electrical Substation & Panels";
  if (q.includes("hvac") || q.includes("ventilation") || q.includes("extraction") || q.includes("cooling")) return "HVAC & Smoke Extraction";
  if (q.includes("plumbing") || q.includes("pump") || q.includes("drainage") || q.includes("sanitary")) return "Plumbing & Pumping Systems";
  if (q.includes("amc") || q.includes("audit") || q.includes("noc") || q.includes("maintenance")) return "Comprehensive AMC & Fire Audit";
  if (q.includes("ibms") || q.includes("access") || q.includes("cctv") || q.includes("bms") || q.includes("security") || q.includes("elv")) return "IBMS & Access Control";

  return null;
};

const findMatchingFacility = (queryVal: string): string | null => {
  const q = queryVal.toLowerCase().trim();
  const direct = facilityTypes.find((f) => f.toLowerCase() === q);
  if (direct) return direct;

  if (q.includes("commercial") || q.includes("office") || q.includes("it park") || q.includes("mall") || q.includes("retail")) return "Commercial Complex / IT Park";
  if (q.includes("plant") || q.includes("factory") || q.includes("industrial") || q.includes("manufacturing")) return "Industrial Plant / Factory";
  if (q.includes("hospital") || q.includes("health") || q.includes("clinic") || q.includes("medical")) return "Hospital / Healthcare";
  if (q.includes("institution") || q.includes("college") || q.includes("school") || q.includes("campus") || q.includes("university")) return "Institutional / College Campus";
  if (q.includes("warehouse") || q.includes("logistics") || q.includes("depot") || q.includes("hub") || q.includes("airport")) return "Warehouse / Logistics Hub";
  if (q.includes("residential") || q.includes("high-rise") || q.includes("apartment") || q.includes("housing") || q.includes("society")) return "Residential High-Rise";

  return null;
};

const findMatchingScope = (queryVal: string): string | null => {
  const q = queryVal.toLowerCase().trim();
  const direct = scopeTypes.find((s) => s.toLowerCase() === q);
  if (direct) return direct;

  if (q.includes("turnkey") || q.includes("supply") || q.includes("install") || q.includes("execution")) return "Turnkey Execution (Supply & Install)";
  if (q.includes("expansion") || q.includes("retrofit") || q.includes("upgrade")) return "System Expansion / Retrofit";
  if (q.includes("amc") || q.includes("annual maintenance") || q.includes("maintenance contract")) return "Annual Maintenance Contract (AMC)";
  if (q.includes("noc") || q.includes("audit") || q.includes("statutory")) return "Statutory Fire NOC & Safety Audit";
  if (q.includes("emergency") || q.includes("repair") || q.includes("breakdown")) return "Emergency Breakdown / Repair";

  return null;
};

const findMatchingUrgency = (queryVal: string): string | null => {
  const q = queryVal.toLowerCase().trim();
  const direct = urgencyLevels.find((u) => u.toLowerCase() === q);
  if (direct) return direct;

  if (q.includes("urgent") || q.includes("immediate") || q.includes("48")) return "Immediate / Urgent (< 48 hrs)";
  if (q.includes("week") || q.includes("1-2")) return "Within 1-2 Weeks";
  if (q.includes("month") || q.includes("planned") || q.includes("1-3")) return "Planned Project (1-3 Months)";
  if (q.includes("budget") || q.includes("quotation") || q.includes("tender")) return "Budgetary Quotation / Tender";

  return null;
};

export default function ContactForm() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("work-request");

  // Work Request State
  const [wrCategory, setWrCategory] = useState(serviceCategories[0]);
  const [wrScope, setWrScope] = useState(scopeTypes[0]);
  const [wrFacility, setWrFacility] = useState(facilityTypes[0]);
  const [wrUrgency, setWrUrgency] = useState(urgencyLevels[1]);
  const [wrName, setWrName] = useState("");
  const [wrPhone, setWrPhone] = useState("");
  const [wrEmail, setWrEmail] = useState("");
  const [wrCompany, setWrCompany] = useState("");
  const [wrLocation, setWrLocation] = useState("");
  const [wrBrief, setWrBrief] = useState("");
  const [isPrefilled, setIsPrefilled] = useState(false);
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

  // Sync with URL Parameters safely after client mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.location.hash === "#feedback") {
      setActiveTab("feedback");
    } else if (window.location.hash === "#request-work") {
      setActiveTab("work-request");
      setTimeout(() => {
        const el = document.getElementById("request-work");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    }

    const searchParams = new URLSearchParams(window.location.search);
    const tabParam = searchParams.get("tab");
    if (tabParam === "feedback" || tabParam === "review") {
      setActiveTab("feedback");
    }

    let prefilled = false;
    let autoDiscipline = "";
    let autoFacility = "";
    let autoLocation = "";

    // 1. Discipline / Service
    const rawDiscipline =
      searchParams.get("discipline") ||
      searchParams.get("service") ||
      searchParams.get("category");
    if (rawDiscipline) {
      const match = findMatchingService(rawDiscipline);
      if (match) {
        setWrCategory(match);
        autoDiscipline = match;
        prefilled = true;
      }
    }

    // 2. Facility Typology
    const rawFacility =
      searchParams.get("facility") ||
      searchParams.get("facilityType") ||
      searchParams.get("building");
    if (rawFacility) {
      const match = findMatchingFacility(rawFacility);
      if (match) {
        setWrFacility(match);
        autoFacility = match;
        prefilled = true;
      }
    }

    // 3. Scope of Work
    const rawScope = searchParams.get("scope") || searchParams.get("scopeType");
    if (rawScope) {
      const match = findMatchingScope(rawScope);
      if (match) {
        setWrScope(match);
        prefilled = true;
      }
    }

    // 4. Urgency
    const rawUrgency = searchParams.get("urgency") || searchParams.get("timeline");
    if (rawUrgency) {
      const match = findMatchingUrgency(rawUrgency);
      if (match) {
        setWrUrgency(match);
        prefilled = true;
      }
    }

    // 5. Site Location
    const rawLocation =
      searchParams.get("location") ||
      searchParams.get("city") ||
      searchParams.get("site");
    if (rawLocation) {
      setWrLocation(rawLocation);
      autoLocation = rawLocation;
      prefilled = true;
    }

    // 6. Client Name
    const rawName = searchParams.get("name") || searchParams.get("client");
    if (rawName) {
      setWrName(rawName);
      prefilled = true;
    }

    // 7. Phone / WhatsApp
    const rawPhone =
      searchParams.get("phone") ||
      searchParams.get("mobile") ||
      searchParams.get("whatsapp");
    if (rawPhone) {
      setWrPhone(rawPhone);
      prefilled = true;
    }

    // 8. Email
    const rawEmail = searchParams.get("email");
    if (rawEmail) {
      setWrEmail(rawEmail);
      prefilled = true;
    }

    // 9. Company
    const rawCompany = searchParams.get("company") || searchParams.get("org");
    if (rawCompany) {
      setWrCompany(rawCompany);
      prefilled = true;
    }

    // 10. Message / Scope Brief
    const rawMessage =
      searchParams.get("message") ||
      searchParams.get("brief") ||
      searchParams.get("details");
    if (rawMessage) {
      setWrBrief(rawMessage);
      prefilled = true;
    } else if (prefilled) {
      const parts: string[] = [];
      const disc = autoDiscipline || rawDiscipline;
      const fac = autoFacility || rawFacility;
      const loc = autoLocation || rawLocation;

      if (disc) parts.push(`System Scope: ${disc}`);
      if (fac) parts.push(`Facility Typology: ${fac}`);
      if (loc) parts.push(`Site Location: ${loc}`);

      if (parts.length > 0) {
        setWrBrief(
          `${parts.join(" | ")}. Requesting technical site inspection, bill of quantities (BOQ), and formal proposal.`
        );
      }
    }

    if (prefilled) {
      setIsPrefilled(true);
    }
  }, []);

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
          name: wrName || data.name,
          phone: wrPhone || data.phone,
          email: wrEmail || data.email,
          company: wrCompany || data.company,
          location: wrLocation || data.location,
          message: wrBrief || data.message,
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
                  setWrName("");
                  setWrPhone("");
                  setWrEmail("");
                  setWrCompany("");
                  setWrLocation("");
                  setWrBrief("");
                  setIsPrefilled(false);
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

              {/* Prefilled Alert Notice from Hero / AI Helpdesk */}
              {isPrefilled && (
                <div className="terminal-prefilled-alert">
                  <div className="prefill-title-row">
                    <span className="live-dot" />
                    <strong>Pre-configured from Engineering Desk</strong>
                  </div>
                  <div className="prefill-pills-wrap">
                    <span className="prefill-pill">{wrCategory}</span>
                    <span className="prefill-pill">{wrFacility}</span>
                    {wrLocation && <span className="prefill-pill">📍 {wrLocation}</span>}
                  </div>
                  <p className="prefill-note">
                    Parameters and preliminary scope draft have been automatically loaded from your
                    selection. Feel free to adjust any specification before submitting.
                  </p>
                </div>
              )}

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
                    value={wrName}
                    onChange={(e) => setWrName(e.target.value)}
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
                    value={wrPhone}
                    onChange={(e) => setWrPhone(e.target.value)}
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
                    value={wrEmail}
                    onChange={(e) => setWrEmail(e.target.value)}
                  />
                </label>

                <label className="field-label-wrap">
                  <span className="label-text">Company / Organization</span>
                  <input
                    name="company"
                    placeholder="e.g. DLF Commercial, Fortis, etc."
                    maxLength={120}
                    className="input-custom"
                    value={wrCompany}
                    onChange={(e) => setWrCompany(e.target.value)}
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
                    value={wrLocation}
                    onChange={(e) => setWrLocation(e.target.value)}
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
                  value={wrBrief}
                  onChange={(e) => setWrBrief(e.target.value)}
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

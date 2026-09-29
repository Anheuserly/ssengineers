"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SectionHeading from "@/components/SectionHeading";
import HomeChatWidget from "@/components/HomeChatWidget";
import TestimonialsSection from "@/components/TestimonialsSection";
import ServiceCatalogue from "@/components/ServiceCatalogue";
import { company, faqs } from "@/lib/content";
import {
  Wrench,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Building,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [selectedDiscipline, setSelectedDiscipline] = useState("Fire Fighting & Hydrants");
  const [facilityType, setFacilityType] = useState("Commercial Building");
  const [siteLocation, setSiteLocation] = useState("");

  const handleQuickDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      discipline: selectedDiscipline,
      facility: facilityType,
      location: siteLocation,
    }).toString();
    router.push(`/contact?${query}#request-work`);
  };

  return (
    <main>
      <HomeChatWidget />

      {/* Clean, Smart Engineering Hero */}
      <section className="hero advanced-hero">
        <div className="container hero-grid">
          <div className="hero-content-col">
            <div className="hero-compliance-pill">
              <span className="live-dot" />
              <span>{company.iso} Certified</span>
              <span className="divider">•</span>
              <span>Statutory NOC Ready</span>
              <span className="divider">•</span>
              <span>Est. {company.founded.replace("July ", "")}</span>
            </div>

            <h1 className="hero-main-title">
              Turnkey Fire Protection & Integrated MEP Engineering
            </h1>

            <p className="lead hero-lead-text">
              Turnkey design, OEM equipment supply, high-precision installation, statutory NOC
              clearances, and lifecycle AMC for commercial, healthcare, and industrial facilities
              across India.
            </p>

            <div className="hero-actions">
              <Link className="button hero-cta-btn" href="/contact#request-work">
                <Wrench size={18} style={{ marginRight: "8px" }} />
                Create Work Request
                <ArrowRight size={16} style={{ marginLeft: "8px" }} />
              </Link>

              <a className="button ghost" href={`tel:${company.phones[0]}`}>
                <PhoneCall size={16} style={{ marginRight: "8px" }} />
                Hotline: +91 {company.phones[0]}
              </a>
            </div>

            <div className="hero-quick-trust-row">
              <div className="trust-item">
                <ShieldCheck size={16} className="text-accent" />
                <span>NBC 2016 Part-IV & NFPA Compliant</span>
              </div>
              <div className="trust-item">
                <Clock size={16} className="text-accent" />
                <span>24–48 Hr Technical Site Survey</span>
              </div>
            </div>
          </div>

          {/* Smart Engineering Dispatch & Survey Terminal (Clean, No Photo Clutter) */}
          <div className="hero-card hero-dispatch-terminal">
            <div className="terminal-header">
              <div className="terminal-title-row">
                <div className="terminal-status-indicator">
                  <span className="live-dot" />
                  <span className="terminal-live-label">Engineering Desk</span>
                </div>
                <span className="terminal-id">S.S. Engineers Registry</span>
              </div>
              <p className="terminal-subtitle">
                Quick Dispatch & Technical Survey Allocation
              </p>
            </div>

            <form onSubmit={handleQuickDispatch} className="terminal-form">
              <div className="terminal-field">
                <label htmlFor="discipline-select">Required Discipline</label>
                <select
                  id="discipline-select"
                  value={selectedDiscipline}
                  onChange={(e) => setSelectedDiscipline(e.target.value)}
                  className="terminal-select"
                >
                  <option value="Fire Fighting & Hydrants">Fire Fighting & Hydrant Systems</option>
                  <option value="Addressable Fire Detection">Addressable Fire Detection</option>
                  <option value="Gas Suppression (FM-200/CO2)">Gas Suppression (FM-200 / CO2)</option>
                  <option value="Electrical Substation & Panels">Electrical Substation & LT/HT Panels</option>
                  <option value="Plumbing & Pump Room">Commercial Plumbing & Pump Room</option>
                  <option value="ELV, CCTV & IBMS">ELV, Security & IBMS Automation</option>
                  <option value="Statutory AMC & NOC">Statutory NOC & Preventive AMC</option>
                </select>
              </div>

              <div className="terminal-field">
                <label htmlFor="facility-select">Facility / Project Type</label>
                <select
                  id="facility-select"
                  value={facilityType}
                  onChange={(e) => setFacilityType(e.target.value)}
                  className="terminal-select"
                >
                  <option value="Commercial Office / Tower">Commercial Office / IT Park</option>
                  <option value="Hospital / Healthcare">Hospital & Healthcare Facility</option>
                  <option value="Industrial / Manufacturing">Industrial & Manufacturing Plant</option>
                  <option value="Educational / Campus">University / Institutional Campus</option>
                  <option value="Residential Complex">Residential High-Rise Complex</option>
                  <option value="Airport / Logistics">Airport / Logistics Warehouse</option>
                </select>
              </div>

              <div className="terminal-field">
                <label htmlFor="location-input">Site Location / City</label>
                <input
                  id="location-input"
                  type="text"
                  placeholder="e.g. Delhi NCR, Gurugram, Noida..."
                  value={siteLocation}
                  onChange={(e) => setSiteLocation(e.target.value)}
                  className="terminal-input"
                />
              </div>

              <button type="submit" className="button full-width terminal-submit-btn">
                <span>Configure Work Request</span>
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="terminal-trust-footer">
              <div className="terminal-stat">
                <strong>25+ Yrs</strong>
                <span>Industry Practice</span>
              </div>
              <div className="terminal-stat-sep" />
              <div className="terminal-stat">
                <strong>100%</strong>
                <span>Authority NOC Ready</span>
              </div>
              <div className="terminal-stat-sep" />
              <div className="terminal-stat">
                <strong>24x7</strong>
                <span>Support Operations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Catalogue */}
      <section className="section" id="service-catalogue-section">
        <div className="container">
          <SectionHeading
            eyebrow="Live Capability Directory"
            title="Specify the Right Engineering System for Your Facility"
            subtitle="Explore our core disciplines. Scope, bill of quantities, and commercial estimates are finalized after a technical site review."
          />
          <ServiceCatalogue compact />
          <div className="logo-wall-actions">
            <Link className="button ghost small" href="/services">
              Browse Full Live Catalogue →
            </Link>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <TestimonialsSection />

      {/* Frequently Asked Questions */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Technical FAQ"
            title="Common Planning & Compliance Questions"
            subtitle="Straightforward answers on statutory clearances, surveys, and multi-system execution."
          />
          <div className="faq-list">
            {faqs.map((item, idx) => (
              <details key={item.question} className="faq-item" open={idx === 0 ? true : undefined}>
                <summary>{item.question}</summary>
                <p className="faq-answer-text">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final Direct Dispatch CTA */}
      <section className="section alt">
        <div className="container request-path-wrap">
          <div className="form-panel request-path-card" id="request-service">
            <p className="eyebrow">Direct Dispatch</p>
            <h3>Ready to commission your facility or require statutory AMC?</h3>
            <p className="muted">
              Submit your project scope directly into our work request database or call our senior
              engineers for technical consultation.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1.2rem" }}>
              <Link className="button" href="/contact#request-work">
                Create Work Request
              </Link>
              <Link className="button ghost" href="/contact">
                Share Client Feedback
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

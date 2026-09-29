import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import HomeChatWidget from "@/components/HomeChatWidget";
import LogoWall from "@/components/LogoWall";
import TestimonialsSection from "@/components/TestimonialsSection";
import ServiceCatalogue from "@/components/ServiceCatalogue";
import { projectSiteImages } from "@/lib/project-site-images";
import {
  company,
  brands,
  clients,
  faqs,
} from "@/lib/content";
import {
  Flame,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Sparkles,
  Wrench,
  Clock,
} from "lucide-react";

export default function HomePage() {
  const heroPreviewImage =
    projectSiteImages.find((project) => project.images.length > 0)?.images[0] ||
    "/images/site-activity-05.jpeg";

  return (
    <main>
      <HomeChatWidget />
      <section className="hero advanced-hero">
        <div className="container hero-grid">
          <div className="hero-content-col">
            <div className="hero-compliance-pill">
              <span className="live-dot" />
              <span>{company.iso} Certified</span>
              <span className="divider">•</span>
              <span>NFPA & NBC 2016 Compliant</span>
              <span className="divider">•</span>
              <span>Est. {company.founded}</span>
            </div>

            <h1 className="hero-main-title">
              Turnkey Fire Protection, Substation & Integrated MEP Infrastructure
            </h1>

            <p className="lead hero-lead-text">
              Engineering design, OEM supply, high-precision installation, statutory NOC
              clearances, and 24x7 AMC operations. Proven execution across hospitals,
              airports, commercial towers, and industrial manufacturing plants.
            </p>

            <div className="hero-actions">
              <Link className="button hero-cta-btn" href="/contact#request-work">
                <Wrench size={18} style={{ marginRight: "8px" }} />
                Create Work Request
                <ArrowRight size={16} style={{ marginLeft: "8px" }} />
              </Link>
              <Link className="button ghost" href="/services">
                Explore Services
              </Link>
            </div>

            <div className="hero-capability-pills">
              <span className="pill-item">
                <Flame size={14} className="text-accent" /> Hydrant & Sprinkler Networks
              </span>
              <span className="pill-item">
                <ShieldCheck size={14} className="text-gold" /> Addressable Fire Detection
              </span>
              <span className="pill-item">
                <Zap size={14} className="text-accent" /> Substation & LT/HT Power
              </span>
              <span className="pill-item">
                <Sparkles size={14} className="text-gold" /> Gas Suppression (FM-200 / Novec)
              </span>
              <span className="pill-item">
                <Clock size={14} className="text-accent" /> 24x7 Statutory AMC & NOC
              </span>
            </div>

            <div className="hero-hotline-strip">
              <PhoneCall size={16} className="text-accent" />
              <span>Direct Survey Hotline:</span>
              <a href={`tel:${company.phones[0]}`}>+91 {company.phones[0]}</a>
              <span className="separator">/</span>
              <a href={`tel:${company.phones[1]}`}>+91 {company.phones[1]}</a>
            </div>
          </div>

          <div className="hero-card hero-command-card">
            <div className="hero-card-image">
              <Image
                src={heroPreviewImage}
                alt="Recent turnkey execution from S.S. Engineers project site"
                fill
                sizes="(max-width: 900px) 94vw, 34vw"
                priority
              />
              <div className="image-overlay-badge">
                <span className="live-status-dot" />
                <span>Field Deployment Active</span>
              </div>
            </div>

            <div className="command-card-header">
              <p className="card-title">Engineering Command & Dispatch</p>
              <p className="command-card-sub">S.S. Engineers & Consultants • New Delhi</p>
            </div>

            <div className="command-metrics-grid">
              <div className="metric-box">
                <span className="metric-label">Survey SLA</span>
                <strong className="metric-val">24-48 Hrs</strong>
                <span className="metric-desc">Rapid on-site review</span>
              </div>
              <div className="metric-box">
                <span className="metric-label">Statutory NOC</span>
                <strong className="metric-val">NBC Part-IV</strong>
                <span className="metric-desc">Delhi / Haryana ready</span>
              </div>
            </div>

            <ul className="command-feature-list">
              <li>
                <CheckCircle2 size={15} className="text-accent" />
                <span>Direct PostgreSQL registry logging with instant tracking ID</span>
              </li>
              <li>
                <CheckCircle2 size={15} className="text-accent" />
                <span>Authorized multi-brand integration (Honeywell, Schneider, Tyco)</span>
              </li>
              <li>
                <CheckCircle2 size={15} className="text-accent" />
                <span>Turnkey design-to-handover execution & annual maintenance</span>
              </li>
            </ul>

            <Link className="button small full-width command-card-btn" href="/contact#request-work">
              Submit Project Scope for Survey
              <ArrowRight size={14} style={{ marginLeft: "6px" }} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Catalogue */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Service catalogue"
            title="Specify the Right System for Your Facility"
            subtitle="Choose a capability, then request a survey. Engineering scope and pricing are prepared only after a site review."
          />
          <ServiceCatalogue compact />
          <div className="logo-wall-actions">
            <Link className="button ghost small" href="/services">
              View all service capabilities
            </Link>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Clients"
            title="Trusted by Leading Institutions"
            subtitle="Execution across hospitals, transport infrastructure, commercial, and industrial sites."
          />
          <LogoWall items={clients} limit={10} dense compactRow />
          <div className="logo-wall-actions">
            <Link className="button ghost small" href="/clients">
              View All Clients
            </Link>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Authorized Brands */}
      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Authorized Brands"
            title="Multi-Brand Supply & Integration"
            subtitle="We recommend the right OEM based on project scope and compliance needs."
          />
          <LogoWall items={brands} limit={12} dense compactRow />
          <div className="logo-wall-actions">
            <Link className="button ghost small" href="/services">
              Explore service capabilities
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="FAQ"
            title="Common Questions Before Starting"
            subtitle="Answers to the most frequent planning and execution questions from facilities teams."
          />
          <div className="faq-list">
            {faqs.map((item) => (
              <details key={item.question} className="faq-item">
                <summary>{item.question}</summary>
                <p className="muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
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

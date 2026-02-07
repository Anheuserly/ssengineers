import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ServiceRequestForm from "@/components/ServiceRequestForm";
import {
  company,
  highlights,
  fireSystems,
  electricalWorks,
  plumbingWorks,
  securityNetworking,
  maintenance,
  certifications,
  brands,
  clients,
  projectTypes,
} from "@/lib/content";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">{company.iso} Certified • Since 1997</p>
            <h1>{company.tagline}</h1>
            <p className="lead">{company.overview}</p>
            <div className="hero-actions">
              <Link className="button" href="/contact">
                Get a Site Survey
              </Link>
              <Link className="button ghost" href="/services">
                Explore Services
              </Link>
            </div>
            <div className="hero-strip">
              <span>Fire Hydrant</span>
              <span>Sprinkler</span>
              <span>FM-200</span>
              <span>Electrical</span>
              <span>IBMS</span>
            </div>
          </div>
          <div className="hero-card">
            <p className="card-title">Rapid Response AMC</p>
            <p className="muted">
              Preventive maintenance, audits, and emergency response within
              committed SLAs.
            </p>
            <ul>
              <li>Compliance-ready documentation</li>
              <li>24x7 support and quarterly checks</li>
              <li>Dedicated project coordinators</li>
            </ul>
            <Link className="button small" href="/contact">
              Schedule AMC Review
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container stats-grid">
          {highlights.map((item) => (
            <div key={item.label} className="stat-card">
              <p className="stat-value">{item.value}</p>
              <p className="stat-label">{item.label}</p>
              <p className="muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Core Expertise"
            title="Complete Fire Protection & MEP Delivery"
            subtitle="Design, supply, installation, testing, commissioning, and AMC across multi-sector facilities."
          />
          <div className="grid-2">
            <div className="panel">
              <h3>Fire & Safety Systems</h3>
              <ul>
                {fireSystems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="panel">
              <h3>Electrical Works</h3>
              <ul>
                {electricalWorks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="panel">
              <h3>Plumbing & Infrastructure</h3>
              <ul>
                {plumbingWorks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="panel">
              <h3>Security & Networking</h3>
              <ul>
                {securityNetworking.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Maintenance"
            title="Annual Maintenance Contracts"
            subtitle="Preventive schedules, compliance testing, and emergency coverage."
          />
          <div className="tag-grid">
            {maintenance.map((item) => (
              <span key={item} className="tag">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Certifications"
            title="Compliance You Can Rely On"
            subtitle="Quality assurance and authorized vendor registrations for public and private institutions."
          />
          <div className="grid-3">
            {certifications.map((item) => (
              <div key={item} className="tile">
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Clients"
            title="Trusted by Leading Institutions"
            subtitle="Execution across hospitals, transport infrastructure, commercial, and industrial sites."
          />
          <div className="logo-grid">
            {clients.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Authorized Brands"
            title="Multi-Brand Supply & Integration"
            subtitle="We recommend the right OEM based on project scope and compliance needs."
          />
          <div className="tag-grid">
            {brands.map((item) => (
              <span key={item} className="tag">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <SectionHeading
              eyebrow="Project Capability"
              title="Multi-Sector Execution"
              subtitle="Dedicated engineers, project managers, and compliance support for every stage."
            />
            <div className="list-grid">
              {projectTypes.map((item) => (
                <div key={item} className="list-card">
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="form-panel">
            <h3>Request a Service Survey</h3>
            <p className="muted">
              Share your site details and scope. We will review and propose the
              right protection plan.
            </p>
            <ServiceRequestForm />
          </div>
        </div>
      </section>
    </main>
  );
}

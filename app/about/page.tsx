import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import LogoWall from "@/components/LogoWall";
import {
  certifications,
  company,
  highlights,
  team,
  workProcess,
  clients,
  brands,
  caseStudies,
  projectTypes,
} from "@/lib/content";

const values = [
  {
    title: "Compliance First",
    detail:
      "Every project is executed with authority-ready documentation, testing records, and safety-first engineering decisions.",
  },
  {
    title: "Execution Discipline",
    detail:
      "Our teams follow structured planning, role ownership, and quality check milestones from survey to commissioning.",
  },
  {
    title: "Long-Term Partnership",
    detail:
      "Beyond installation, we support AMC, audit readiness, and responsive service coordination for operational continuity.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Company Profile"
            title="About S.S. Engineers & Consultants"
            subtitle={`${company.overview} Established ${company.founded}.`}
          />
        </div>
      </section>

      {/* Highlights & Industry Practice */}
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
        <div className="container split">
          <article className="panel">
            <h3>Who We Are</h3>
            <p className="muted">
              {company.name} is a turnkey fire protection and MEP execution firm
              supporting infrastructure, institutional, and commercial projects
              with integrated engineering delivery.
            </p>
            <p className="muted">
              We combine design support, multi-brand sourcing, installation, testing,
              commissioning, and lifecycle service under a single execution team.
            </p>
            <p className="muted">
              Head Office: {company.address}
            </p>
          </article>

          <article className="panel">
            <h3>Core Values</h3>
            <div className="vendor-step-grid">
              {values.map((item) => (
                <article key={item.title} className="vendor-step-card">
                  <h4>{item.title}</h4>
                  <p className="muted">{item.detail}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* Projects & Sector Track Record */}
      <section className="section" id="projects-coverage">
        <div className="container">
          <SectionHeading
            eyebrow="Execution Track Record"
            title="Projects & Multidisciplinary Delivery"
            subtitle="Demonstrated engineering capability across transport infrastructure, healthcare networks, commercial hubs, and industrial sites."
          />

          <div className="list-grid" style={{ marginBottom: "2rem" }}>
            {projectTypes.map((item) => (
              <div key={item} className="list-card">
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="case-grid">
            {caseStudies.slice(0, 3).map((item) => (
              <article key={item.title} className="case-card">
                <p className="eyebrow">{item.sector}</p>
                <h3>{item.title}</h3>
                <p className="muted">
                  {item.location} | {item.timeline}
                </p>
                <ul>
                  {item.scope.map((scopeLine) => (
                    <li key={scopeLine}>{scopeLine}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="logo-wall-actions" style={{ marginTop: "1.5rem" }}>
            <Link className="button ghost small" href="/projects">
              Explore Full Projects & Case Studies Portfolio →
            </Link>
          </div>
        </div>
      </section>

      {/* Institutional Clients */}
      <section className="section alt" id="clients">
        <div className="container">
          <SectionHeading
            eyebrow="Trusted Clients"
            title="Institutional Clients & Long-Term Partnerships"
            subtitle="Leading enterprises and government-authorized institutions that depend on our engineering execution."
          />
          <LogoWall items={clients} limit={16} dense compactRow />
          <div className="logo-wall-actions" style={{ marginTop: "1.2rem" }}>
            <Link className="button ghost small" href="/clients">
              View All Client Records →
            </Link>
          </div>
        </div>
      </section>

      {/* Authorized Brands */}
      <section className="section" id="brands">
        <div className="container">
          <SectionHeading
            eyebrow="Authorized Brands"
            title="Multi-Brand Supply & OEM Integration"
            subtitle="Direct OEM sourcing and certified compatibility for critical fire safety and MEP equipment."
          />
          <LogoWall items={brands} limit={16} dense compactRow />
        </div>
      </section>

      {/* How We Work */}
      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="How We Work"
            title="Execution Lifecycle"
            subtitle="Structured process from survey to commissioning and support."
          />
          <div className="grid-3">
            {workProcess.map((step) => (
              <article key={step.title} className="tile">
                <h4>{step.title}</h4>
                <p className="muted">{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Team & Certifications */}
      <section className="section">
        <div className="container split">
          <article className="panel">
            <h3>Team Snapshot</h3>
            <div className="tag-grid">
              {team.slice(0, 12).map((member) => (
                <span key={`${member.role}-${member.name}`} className="tag">
                  {member.role}: {member.name}
                </span>
              ))}
            </div>
          </article>

          <article className="panel">
            <h3>Certifications & Registrations</h3>
            <ul className="checklist">
              {certifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}

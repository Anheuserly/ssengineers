import SectionHeading from "@/components/SectionHeading";
import { certifications, company, highlights, team, workProcess } from "@/lib/content";

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

      <section className="section">
        <div className="container grid-3">
          {highlights.map((item) => (
            <article key={item.label} className="tile">
              <p className="stat-value">{item.value}</p>
              <p className="stat-label">{item.label}</p>
              <p className="muted">{item.detail}</p>
            </article>
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

      <section className="section">
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

      <section className="section alt">
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

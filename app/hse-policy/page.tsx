import SectionHeading from "@/components/SectionHeading";

const lastUpdated = "March 19, 2026";

const commitments = [
  "Maintain zero-harm mindset for employees, clients, and site visitors.",
  "Execute risk assessments before activity mobilization.",
  "Use trained manpower with role-specific safety orientation.",
  "Enforce PPE compliance and safe work permits at all active sites.",
  "Record incidents and near-misses for preventive action tracking.",
  "Review safety performance continuously for corrective improvements.",
];

export default function HsePolicyPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Policy"
            title="Health & Safety (HSE) Policy"
            subtitle="Safety-first execution framework for project planning, installation, and maintenance activities."
          />
          <p className="muted">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="panel">
            <h3>Our HSE Commitment</h3>
            <p className="muted">
              We commit to a safe and healthy work environment by integrating risk
              control, compliance, and accountability into daily operations.
            </p>
            <ul className="checklist">
              {commitments.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="panel">
            <h3>Implementation Focus</h3>
            <p className="muted">
              Safety implementation is driven through toolbox talks, supervisor audits,
              permit-to-work checks, and incident-learning sessions.
            </p>

            <h3>Responsibility Matrix</h3>
            <p className="muted">
              Leadership, engineers, supervisors, and workforce teams share
              responsibility for maintaining safe execution practices on every site.
            </p>

            <h3>Legal and Regulatory Alignment</h3>
            <p className="muted">
              Activities are aligned with applicable client standards and statutory
              safety requirements relevant to project location and scope.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

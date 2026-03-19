import SectionHeading from "@/components/SectionHeading";

const lastUpdated = "March 19, 2026";

const qualityObjectives = [
  "Deliver code-compliant engineering and installation quality.",
  "Maintain traceable documentation across project milestones.",
  "Use approved materials, tools, and testing protocols.",
  "Ensure timely corrective action for observed non-conformities.",
  "Drive continuous improvement through review and feedback.",
];

export default function QualityPolicyPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Policy"
            title="Quality Policy"
            subtitle="Our quality framework for design, execution, testing, commissioning, and maintenance."
          />
          <p className="muted">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="panel">
            <h3>Quality Statement</h3>
            <p className="muted">
              We are committed to delivering reliable and compliant engineering
              outcomes through structured planning, supervision, and process control.
            </p>

            <h3>Quality Objectives</h3>
            <ul className="checklist">
              {qualityObjectives.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="panel">
            <h3>Process Governance</h3>
            <p className="muted">
              Project quality is governed through inspections, stage approvals,
              commissioning checks, and documented handover protocols.
            </p>

            <h3>Client Satisfaction</h3>
            <p className="muted">
              We measure quality not only by technical compliance but also by response
              speed, transparency, and operational performance after handover.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

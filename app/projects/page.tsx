import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import PartnerVisualShowcase from "@/components/PartnerVisualShowcase";
import ProjectImageGallery from "@/components/ProjectImageGallery";
import { caseStudies, projectTypes } from "@/lib/content";

const deliverables = [
  "Design drawings and hydraulic calculations",
  "Bill of quantities and OEM specifications",
  "Installation, testing, and commissioning reports",
  "As-built documentation and authority submissions",
  "AMC schedules and compliance logs",
];

export default function ProjectsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Projects"
            title="Execution That Scales with Project Complexity"
            subtitle="We manage multi-disciplinary coordination and safety compliance on every site."
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Project Image Library"
            title="Project-Wise Site Photos"
            subtitle="On-site image documentation organized by project for quick verification."
          />
          <ProjectImageGallery />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <PartnerVisualShowcase />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Sector Coverage"
            title="Project Types"
            subtitle="Experience across high-rise, infrastructure, healthcare, and industrial facilities."
          />
          <div className="list-grid">
            {projectTypes.map((item) => (
              <div key={item} className="list-card">
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Case Snapshots"
            title="Representative Project Case Studies"
            subtitle="Reference-style summaries to show our typical scope and delivery outcomes."
          />
          <div className="case-grid">
            {caseStudies.map((item) => (
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
                <p className="case-outcome">{item.outcome}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <SectionHeading
              eyebrow="Delivery"
              title="Project Control & Documentation"
              subtitle="From design to handover, we build documentation that simplifies approvals."
            />
            <ul className="checklist">
              {deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="panel">
            <h3>Need a Turnkey Partner?</h3>
            <p className="muted">
              Share your drawings or scope, and we will craft a detailed execution
              plan with compliance-ready submissions.
            </p>
            <Link className="button" href="/contact">
              Start a Project Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

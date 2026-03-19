import SectionHeading from "@/components/SectionHeading";
import { company } from "@/lib/content";

const lastUpdated = "March 19, 2026";

export default function TermsConditionsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Legal"
            title="Terms & Conditions"
            subtitle="Commercial and usage terms for services, proposals, and website interactions."
          />
          <p className="muted">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="panel">
            <h3>1. Scope of Services</h3>
            <p className="muted">
              All engineering, supply, installation, testing, commissioning, and AMC
              services are executed as per approved proposals, drawings, and applicable
              standards.
            </p>

            <h3>2. Proposal and Pricing</h3>
            <p className="muted">
              Quotations remain valid only for the stated period and are subject to
              final site conditions, material availability, and statutory requirements.
            </p>

            <h3>3. Payment and Deliverables</h3>
            <p className="muted">
              Project milestones, invoicing, and delivery timelines are governed by
              mutually agreed commercial terms in the work order or contract.
            </p>
          </div>

          <div className="panel">
            <h3>4. Client Responsibilities</h3>
            <p className="muted">
              Clients are responsible for site access, utility availability, civil
              readiness, and timely approvals required for safe and uninterrupted work.
            </p>

            <h3>5. Limitation of Liability</h3>
            <p className="muted">
              Liability is limited to the value and scope of contracted work. Indirect
              loss, business interruption, and consequential damages are excluded unless
              explicitly stated in writing.
            </p>

            <h3>6. Governing Communication</h3>
            <p className="muted">
              For contract clarifications, contact {company.name} via{" "}
              {company.footerEmails[0]} or {company.phones[0]}.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

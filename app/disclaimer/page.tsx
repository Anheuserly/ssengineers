import SectionHeading from "@/components/SectionHeading";

const lastUpdated = "March 19, 2026";

export default function DisclaimerPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Legal"
            title="Disclaimer"
            subtitle="Important notice regarding website content, technical references, and external links."
          />
          <p className="muted">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="panel">
            <h3>1. Informational Purpose</h3>
            <p className="muted">
              Website content is provided for general business and technical
              information only. It does not constitute a final engineering
              recommendation without project-specific review.
            </p>

            <h3>2. Proposal Supremacy</h3>
            <p className="muted">
              Final scope, materials, and responsibilities are governed strictly by
              approved proposals, agreements, and issued work orders.
            </p>

            <h3>3. External Links</h3>
            <p className="muted">
              Third-party websites linked from this platform are provided for
              convenience. We do not guarantee their availability or content accuracy.
            </p>
          </div>

          <div className="panel">
            <h3>4. Availability and Revisions</h3>
            <p className="muted">
              We may update, revise, or remove any section of the website at any time
              to reflect operational, legal, or technical changes.
            </p>

            <h3>5. No Warranty</h3>
            <p className="muted">
              While we aim for accuracy, all information is shared on an “as available”
              basis without express or implied warranties.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

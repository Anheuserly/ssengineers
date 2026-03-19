import SectionHeading from "@/components/SectionHeading";
import { company } from "@/lib/content";

const lastUpdated = "March 17, 2026";

export default function PrivacyPolicyPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Legal"
            title="Privacy Policy"
            subtitle="How S.S. Engineers & Consultants collects and uses website inquiry data."
          />
          <p className="muted">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="panel">
            <h3>1. Information We Collect</h3>
            <p className="muted">
              When you submit contact, service request, or career forms, we may
              collect your name, phone number, email, company, project details,
              and resume file (for job applications).
            </p>

            <h3>2. Why We Collect It</h3>
            <p className="muted">
              We use this data to respond to inquiries, evaluate project
              requirements, prepare proposals, coordinate service delivery, and
              process recruitment applications.
            </p>

            <h3>3. Storage and Security</h3>
            <p className="muted">
              Form submissions are processed through secure backend services and
              stored in managed infrastructure with access controls used by our
              authorized teams.
            </p>
          </div>

          <div className="panel">
            <h3>4. Data Sharing</h3>
            <p className="muted">
              We do not sell personal information. Data may be shared only with
              internal teams and authorized partners involved in technical
              evaluation, execution, or support.
            </p>

            <h3>5. Your Rights</h3>
            <p className="muted">
              You may request correction, update, or deletion of your submitted
              information by contacting us using the details below.
            </p>

            <h3>6. Contact for Privacy Requests</h3>
            <p className="muted">Email: {company.contactEmails[0]}</p>
            <p className="muted">Phone: {company.phones[0]}</p>
            <p className="muted">Address: {company.address}</p>

            <h3>7. Cookie Preferences</h3>
            <p className="muted">
              Our website uses essential cookies for security and performance.
              Optional analytics and marketing cookies can be enabled or disabled
              from Cookie Settings in the footer at any time.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

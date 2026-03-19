import SectionHeading from "@/components/SectionHeading";
import { company } from "@/lib/content";
import VendorRegistrationForm from "@/components/VendorRegistrationForm";

const requiredDocs = [
  "Company profile with service scope",
  "GST, PAN, and statutory registration details",
  "ESI / PF / MSME copies (if applicable)",
  "Past project references and client list",
  "Authorized signatory and contact information",
  "Safety and quality process summary",
];

const onboardingSteps = [
  {
    title: "Step 1: Registration Submission",
    detail:
      "Submit core company credentials, capability scope, and contact details for review.",
  },
  {
    title: "Step 2: Technical Screening",
    detail:
      "Our team checks domain fit, certifications, and execution readiness for project alignment.",
  },
  {
    title: "Step 3: Commercial & Compliance Review",
    detail:
      "Commercial profile, legal documentation, and statutory status are validated.",
  },
  {
    title: "Step 4: Empanelment Decision",
    detail:
      "Qualified vendors are shortlisted for RFQ / project-specific onboarding discussions.",
  },
];

const evaluationFocus = [
  "Relevant category experience and execution records",
  "Safety, quality, and documentation discipline",
  "Statutory compliance and legal readiness",
  "Response timelines and communication reliability",
];

const preferredCategories = [
  "Fire Fighting & Detection",
  "Electrical LT/HT Works",
  "Plumbing / PHE",
  "Security & Networking",
  "Testing / Commissioning",
  "AMC & O&M",
];

export default function VendorRegistrationPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Business"
            title="Vendor Registration"
            subtitle="Join our qualified vendor ecosystem for fire protection, electrical, plumbing, and MEP project opportunities."
          />
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="panel">
            <h3>Pre-Qualification Checklist</h3>
            <p className="muted">
              Please share complete and valid documentation for faster evaluation by
              our technical and procurement teams.
            </p>
            <ul className="checklist">
              {requiredDocs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="vendor-aux-title">Preferred Vendor Categories</p>
            <div className="tag-grid">
              {preferredCategories.map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="form-panel">
            <h3>Submit Vendor Details</h3>
            <p className="muted">
              Complete the form to start screening. You can share supporting files
              afterward with subject line:
              <strong> Vendor Registration - [Your Company Name]</strong>.
            </p>
            <p className="muted">
              Email: <a href={`mailto:${company.footerEmails[0]}`}>{company.footerEmails[0]}</a>
            </p>
            <p className="muted">
              Alternate:{" "}
              <a href={`mailto:${company.footerEmails[1]}`}>{company.footerEmails[1]}</a>
            </p>
            <p className="muted">
              For urgent support call: <a href={`tel:${company.phones[0]}`}>{company.phones[0]}</a>
            </p>
            <VendorRegistrationForm />
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container grid-2">
          <article className="panel">
            <h3>Onboarding Workflow</h3>
            <div className="vendor-step-grid">
              {onboardingSteps.map((step) => (
                <article key={step.title} className="vendor-step-card">
                  <h4>{step.title}</h4>
                  <p className="muted">{step.detail}</p>
                </article>
              ))}
            </div>
          </article>

          <article className="panel">
            <h3>Evaluation Focus</h3>
            <ul className="checklist">
              {evaluationFocus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="muted">
              Typical initial response window: <strong>2-4 business days</strong>{" "}
              after complete submission.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}

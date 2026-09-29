import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { company } from "@/lib/content";
import { ShieldCheck, PhoneCall, Clock, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Direct Engineering Dispatch"
            title="Commission a Project or Share Feedback"
            subtitle="Submit an official work request for turnkey MEP & fire protection execution, or submit client quality feedback directly to our central registry."
          />
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="panel contact-info-panel">
            <h3>Head Office & Operations</h3>
            <p className="muted">{company.address}</p>

            <div className="contact-features-banner">
              <div className="feature-item">
                <CheckCircle2 size={16} className="text-gold" />
                <span>Direct logging into central PostgreSQL work-requests database</span>
              </div>
              <div className="feature-item">
                <Clock size={16} className="text-gold" />
                <span>24 to 48 hours site survey & estimation dispatch SLA</span>
              </div>
              <div className="feature-item">
                <ShieldCheck size={16} className="text-gold" />
                <span>ISO 9001:2008 & NBC 2016 Part-IV fire safety compliance</span>
              </div>
            </div>

            <div className="contact-list">
              <div>
                <span>Emergency Technical Hotline</span>
                <p>
                  <strong>{company.phones[0]}</strong> | {company.phones.slice(1).join(" | ")}
                </p>
              </div>
              <div>
                <span>Official Engineering Email</span>
                <p>{company.contactEmails.join(" | ")}</p>
              </div>
              <div>
                <span>Website & Portal</span>
                <p>{company.website}</p>
              </div>
              <div>
                <span>Branch & Workshop</span>
                <p>{company.branchOffices.join(" | ")}</p>
              </div>
            </div>

            <div className="notice">
              <PhoneCall size={18} style={{ float: "left", marginRight: "10px", marginTop: "2px" }} />
              <p className="muted">
                <strong>Urgent Breakdown or Fire Audit?</strong> Call our primary hotline at{" "}
                <a href={`tel:${company.phones[0]}`}>+91 {company.phones[0]}</a> for immediate engineer
                mobilization.
              </p>
            </div>
          </div>

          <div className="form-panel contact-form-wrapper">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}

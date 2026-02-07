import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { company } from "@/lib/content";

export default function ContactPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Contact"
            title="Let’s Secure Your Facility"
            subtitle="Talk to our engineers for fire protection, MEP, or AMC requirements."
          />
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="panel">
            <h3>Head Office</h3>
            <p className="muted">{company.address}</p>
            <div className="contact-list">
              <div>
                <span>Phone</span>
                <p>{company.phones.join(" | ")}</p>
              </div>
              <div>
                <span>Email</span>
                <p>{company.emails.join(" | ")}</p>
              </div>
              <div>
                <span>Website</span>
                <p>{company.website}</p>
              </div>
            </div>
            <div className="notice">
              <p className="muted">
                For emergency service support, call the primary contact numbers
                listed above for immediate assistance.
              </p>
            </div>
          </div>
          <div className="form-panel">
            <h3>Send a Requirement</h3>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}

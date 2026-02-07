import SectionHeading from "@/components/SectionHeading";
import { clients, brands, certifications } from "@/lib/content";

export default function ClientsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Clients"
            title="Institutions That Trust Us"
            subtitle="We serve infrastructure, healthcare, commercial, and industrial facilities."
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Client Portfolio"
            title="Major Clients"
            subtitle="Representative list of organizations served by S.S. Engineers & Consultants."
          />
          <div className="logo-grid">
            {clients.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="OEM Network"
            title="Authorized Brands"
            subtitle="OEM partnerships ensure reliable sourcing and compliant installation."
          />
          <div className="tag-grid">
            {brands.map((item) => (
              <span key={item} className="tag">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Compliance"
            title="Registrations & Certifications"
            subtitle="Recognized certifications and vendor registrations."
          />
          <div className="grid-3">
            {certifications.map((item) => (
              <div key={item} className="tile">
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

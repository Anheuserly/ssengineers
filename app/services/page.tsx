import { Suspense } from "react";
import SectionHeading from "@/components/SectionHeading";
import ServiceCatalogue from "@/components/ServiceCatalogue";
import {
  maintenance,
} from "@/lib/content";

const processSteps = [
  {
    title: "Survey & Compliance",
    detail: "Site assessment, risk analysis, and statutory requirement mapping.",
  },
  {
    title: "Design & Engineering",
    detail: "Hydraulic calculations, layout drawings, and authority approvals.",
  },
  {
    title: "Supply & Installation",
    detail: "OEM sourcing, fabrication, installation, and quality inspections.",
  },
  {
    title: "Testing & Commissioning",
    detail: "Functional testing, system integration, and readiness checks.",
  },
  {
    title: "AMC & Support",
    detail: "Preventive maintenance, emergency response, and documentation.",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Services"
            title="End-to-End Fire Protection & MEP Services"
            subtitle="From concept to compliance, we deliver turnkey systems with accountability."
          />
        </div>
      </section>

      <section className="section" id="service-catalogue-view">
        <div className="container">
          <SectionHeading
            eyebrow="Capability Directory"
            title="Engineering Systems Built Around Your Facility"
            subtitle="Every system starts with a technical review. We provide a tailored scope, equipment datasheets, and commercial estimate after site assessment."
          />
          <Suspense fallback={<div className="container" style={{ padding: "2rem 0", color: "#64748b" }}>Loading engineering systems...</div>}>
            <ServiceCatalogue />
          </Suspense>
        </div>
      </section>



      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="AMC"
            title="Annual Maintenance Coverage"
            subtitle="Preventive schedules, compliance logs, and rapid restoration."
          />
          <div className="tag-grid">
            {maintenance.map((item) => (
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
            eyebrow="Delivery Model"
            title="Process Built for Reliability"
            subtitle="Structured execution to keep safety, quality, and compliance aligned."
          />
          <div className="grid-3">
            {processSteps.map((step) => (
              <div key={step.title} className="tile">
                <h4>{step.title}</h4>
                <p className="muted">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

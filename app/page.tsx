import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import HomeChatWidget from "@/components/HomeChatWidget";
import LogoWall from "@/components/LogoWall";
import TestimonialsSection from "@/components/TestimonialsSection";
import ServiceCatalogue from "@/components/ServiceCatalogue";
import { projectSiteImages } from "@/lib/project-site-images";
import {
  company,
  highlights,
  brands,
  clients,
  faqs,
} from "@/lib/content";

export default function HomePage() {
  const heroPreviewImage =
    projectSiteImages.find((project) => project.images.length > 0)?.images[0] ||
    "/images/site-activity-05.jpeg";

  return (
    <main>
      <HomeChatWidget />
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">{company.iso} Certified • Since 1997</p>
            <h1>{company.heroHeadline}</h1>
            <p className="lead">{company.overview}</p>
            <div className="hero-actions">
              <Link className="button" href="/services">
                Select Services
              </Link>
              <Link className="button ghost" href="/projects">
                View Recent Projects
              </Link>
            </div>
            <div className="hero-strip">
              <span>Fire Hydrant</span>
              <span>Sprinkler</span>
              <span>FM-200</span>
              <span>Electrical</span>
              <span>IBMS</span>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-card-image">
              <Image
                src={heroPreviewImage}
                alt="Recent execution image from project site"
                fill
                sizes="(max-width: 900px) 94vw, 34vw"
                priority
              />
            </div>
            <p className="card-title">Turnkey Fire & MEP Partner</p>
            <p className="muted">
              From design to handover, we execute fire, electrical, plumbing,
              and safety systems with quality control at every stage.
            </p>
            <ul>
              <li>Compliance-ready engineering submissions</li>
              <li>Dedicated project coordinators and supervisors</li>
              <li>Multi-sector execution experience</li>
            </ul>
            <Link className="button small" href="/projects">
              View Project Capability
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container stats-grid">
          {highlights.map((item) => (
            <div key={item.label} className="stat-card">
              <p className="stat-value">{item.value}</p>
              <p className="stat-label">{item.label}</p>
              <p className="muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Service catalogue"
            title="Specify the Right System for Your Facility"
            subtitle="Choose a capability, then request a survey. Engineering scope and pricing are prepared only after a site review."
          />
          <ServiceCatalogue compact />
          <div className="logo-wall-actions">
            <Link className="button ghost small" href="/services">
              View all service capabilities
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Clients"
            title="Trusted by Leading Institutions"
            subtitle="Execution across hospitals, transport infrastructure, commercial, and industrial sites."
          />
          <LogoWall items={clients} limit={10} dense compactRow />
          <div className="logo-wall-actions">
            <Link className="button ghost small" href="/clients">
              View All Clients
            </Link>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Authorized Brands"
            title="Multi-Brand Supply & Integration"
            subtitle="We recommend the right OEM based on project scope and compliance needs."
          />
          <LogoWall items={brands} limit={12} dense compactRow />
          <div className="logo-wall-actions">
            <Link className="button ghost small" href="/services">
              Explore service capabilities
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="FAQ"
            title="Common Questions Before Starting"
            subtitle="Answers to the most frequent planning and execution questions from facilities teams."
          />
          <div className="faq-list">
            {faqs.map((item) => (
              <details key={item.question} className="faq-item">
                <summary>{item.question}</summary>
                <p className="muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container request-path-wrap">
          <div className="form-panel request-path-card" id="request-service">
            <p className="eyebrow">One clear enquiry</p>
            <h3>Start with the systems your site needs</h3>
            <p className="muted">
              Add fire, electrical, plumbing or ELV services to your bucket. Then share site details once, and our team will prepare the right review path.
            </p>
            <Link className="button" href="/services">Select services</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

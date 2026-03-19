import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ServiceRequestForm from "@/components/ServiceRequestForm";
import StatusQuickNav from "@/components/StatusQuickNav";
import HomeChatWidget from "@/components/HomeChatWidget";
import LogoWall from "@/components/LogoWall";
import PartnerVisualShowcase from "@/components/PartnerVisualShowcase";
import ProjectImageGallery from "@/components/ProjectImageGallery";
import TestimonialsSection from "@/components/TestimonialsSection";
import { projectSiteImages } from "@/lib/project-site-images";
import {
  company,
  highlights,
  fireSystems,
  electricalWorks,
  plumbingWorks,
  securityNetworking,
  homeStrengths,
  certifications,
  brands,
  clients,
  projectTypes,
  workProcess,
  caseStudies,
  faqs,
} from "@/lib/content";

export default function HomePage() {
  const heroPreviewImage =
    projectSiteImages.find((project) => project.images.length > 0)?.images[0] ||
    "/images/site-activity-05.jpeg";

  return (
    <main>
      <StatusQuickNav active="/compliance-documents" />
      <HomeChatWidget />
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">{company.iso} Certified • Since 1997</p>
            <h1>{company.heroHeadline}</h1>
            <p className="lead">{company.overview}</p>
            <div className="hero-actions">
              <Link className="button" href="/contact">
                Get a Site Survey
              </Link>
              <Link className="button ghost" href="/services">
                Explore Services
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
            eyebrow="On-Site Activity"
            title="Execution Moments from Real Projects"
            subtitle="From manpower briefings to installation-at-height, this is how our teams work on live sites."
          />
          <PartnerVisualShowcase />
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Project Library"
            title="Project-Wise Site Image Collection"
            subtitle="Verified site photos grouped by project for quick visual reference."
          />
          <ProjectImageGallery limitProjects={4} maxImagesPerProject={4} />
          <div className="logo-wall-actions">
            <Link className="button ghost small" href="/projects#project-image-gallery">
              View All Project Images
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Core Expertise"
            title="Complete Fire Protection & MEP Delivery"
            subtitle="Design, supply, installation, testing, commissioning, and AMC across multi-sector facilities."
          />
          <div className="grid-2">
            <div className="panel">
              <h3>Fire & Safety Systems</h3>
              <ul>
                {fireSystems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="panel">
              <h3>Electrical Works</h3>
              <ul>
                {electricalWorks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="panel">
              <h3>Plumbing & Infrastructure</h3>
              <ul>
                {plumbingWorks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="panel">
              <h3>Security & Networking</h3>
              <ul>
                {securityNetworking.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Execution Strengths"
            title="How We Deliver Better"
            subtitle="Process, engineering discipline, and accountability that keep projects on track."
          />
          <div className="tag-grid">
            {homeStrengths.map((item) => (
              <span key={item} className="tag">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="How We Work"
            title="Clear, Compliance-First Execution"
            subtitle="Structured delivery to keep safety, quality, and timelines aligned."
          />
          <div className="grid-3">
            {workProcess.map((step) => (
              <div key={step.title} className="tile">
                <h4>{step.title}</h4>
                <p className="muted">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Certifications"
            title="Compliance You Can Rely On"
            subtitle="Quality assurance and authorized vendor registrations for public and private institutions."
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

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Clients"
            title="Trusted by Leading Institutions"
            subtitle="Execution across hospitals, transport infrastructure, commercial, and industrial sites."
          />
          <LogoWall items={clients} limit={12} dense />
          <div className="logo-wall-actions">
            <Link className="button ghost small" href="/clients">
              View All Clients
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Case Snapshots"
            title="Representative Delivery Case Studies"
            subtitle="Sample project patterns that reflect how we execute across sectors."
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

      <TestimonialsSection />

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Authorized Brands"
            title="Multi-Brand Supply & Integration"
            subtitle="We recommend the right OEM based on project scope and compliance needs."
          />
          <LogoWall items={brands} dense />
          <div className="logo-wall-actions">
            <Link className="button ghost small" href="/clients">
              View Full OEM Network
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

      <section className="section">
        <div className="container split">
          <div>
            <SectionHeading
              eyebrow="Project Capability"
              title="Multi-Sector Execution"
              subtitle="Dedicated engineers, project managers, and compliance support for every stage."
            />
            <div className="list-grid">
              {projectTypes.map((item) => (
                <div key={item} className="list-card">
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="form-panel">
            <h3>Request a Service Survey</h3>
            <p className="muted">
              Share your site details and scope. We will review and propose the
              right protection plan.
            </p>
            <ServiceRequestForm />
          </div>
        </div>
      </section>
    </main>
  );
}

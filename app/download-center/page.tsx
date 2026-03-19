import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { company, complianceFileOptions } from "@/lib/content";

const profileDocs = complianceFileOptions.filter((item) =>
  item.title.toLowerCase().includes("company profile")
);

const certificationDocs = complianceFileOptions.filter(
  (item) => !item.title.toLowerCase().includes("company profile")
);

export default function DownloadCenterPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Resources"
            title="Download Center"
            subtitle="Access catalogs, company profile, and compliance certifications from one place."
          />
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <article className="panel">
            <h3>Company Profile</h3>
            <ul>
              {profileDocs.map((item) => (
                <li key={item.fileName}>
                  <a href={item.path} target="_blank" rel="noreferrer">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </article>

          <article className="panel">
            <h3>Compliance Certifications</h3>
            <ul>
              {certificationDocs.map((item) => (
                <li key={item.fileName}>
                  <a href={item.path} target="_blank" rel="noreferrer">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section alt">
        <div className="container split">
          <article className="panel">
            <h3>Catalogs & Technical Sheets</h3>
            <p className="muted">
              OEM catalogs, product datasheets, and approved material profiles are
              shared as per project scope and technical qualification stage.
            </p>
            <p className="muted">
              For specific catalog requests, contact{" "}
              <a href={`mailto:${company.footerEmails[0]}`}>{company.footerEmails[0]}</a>.
            </p>
          </article>

          <article className="panel">
            <h3>Need Full Compliance Pack?</h3>
            <p className="muted">
              You can also review live document previews in the dedicated compliance page.
            </p>
            <Link className="button small" href="/compliance-documents">
              Open Compliance Documents
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}

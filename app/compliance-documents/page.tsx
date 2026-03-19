import SectionHeading from "@/components/SectionHeading";
import StatusQuickNav from "@/components/StatusQuickNav";
import { complianceFileOptions } from "@/lib/content";

export default function ComplianceDocumentsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Documents"
            title="Compliance Documents"
            subtitle="Download ESI, PF, GST, MSME, and company profile documents."
          />
        </div>
      </section>

      <section className="section status-page">
        <div className="container status-page-grid">
          <article className="status-main-card docs">
            <div className="status-main-head">
              <div>
                <p className="status-pill">Document List</p>
                <h3 className="status-title">Compliance & Company Files</h3>
                <p className="muted status-subcopy">
                  Access verified registrations and profile documents for onboarding and technical review.
                </p>
              </div>
              <p className="status-count">{complianceFileOptions.length} Files</p>
            </div>
            <div className="doc-grid">
              {complianceFileOptions.map((item, index) => (
                <article key={item.fileName} className="doc-card enhanced">
                  <p className="trust-doc-index">{String(index + 1).padStart(2, "0")}</p>
                  <h3>{item.title}</h3>
                  <a
                    className="doc-preview-link"
                    href={item.path}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${item.title} PDF`}
                  >
                    <div className="doc-preview-shell">
                      <iframe
                        className="doc-preview-frame"
                        src={`${item.path}#toolbar=0&navpanes=0&view=FitH`}
                        title={`${item.title} PDF preview`}
                        loading="lazy"
                      />
                    </div>
                  </a>
                  <p className="muted">{item.description}</p>
                </article>
              ))}
            </div>
          </article>
          <StatusQuickNav active="/compliance-documents" />
        </div>
      </section>
    </main>
  );
}

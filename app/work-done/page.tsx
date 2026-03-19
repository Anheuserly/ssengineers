import SectionHeading from "@/components/SectionHeading";
import StatusQuickNav from "@/components/StatusQuickNav";
import { workDone } from "@/lib/content";

export default function WorkDonePage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Execution Status"
            title="Work Done"
            subtitle="Completed project scope and delivered execution milestones."
          />
        </div>
      </section>

      <section className="section status-page">
        <div className="container status-page-grid">
          <article className="status-main-card done">
            <div className="status-main-head">
              <div>
                <p className="status-pill done">Work Done</p>
                <h3 className="status-title">Completed Execution References</h3>
                <p className="muted status-subcopy">
                  Delivered projects and installations completed by our execution teams.
                </p>
              </div>
              <p className="status-count">{workDone.length} Projects</p>
            </div>
            <div className="status-list-grid">
              {workDone.map((item, index) => (
                <article key={item} className="status-item-card done">
                  <p className="status-item-index">{String(index + 1).padStart(2, "0")}</p>
                  <h4 className="status-item-title">{item.replace(/\.$/, "")}</h4>
                  <p className="status-item-tag done">Completed & delivered</p>
                </article>
              ))}
            </div>
          </article>
          <StatusQuickNav active="/work-done" />
        </div>
      </section>
    </main>
  );
}

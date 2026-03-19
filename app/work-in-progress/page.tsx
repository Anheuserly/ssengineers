import SectionHeading from "@/components/SectionHeading";
import StatusQuickNav from "@/components/StatusQuickNav";
import { workInProgress } from "@/lib/content";

export default function WorkInProgressPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Execution Status"
            title="Work In Progress"
            subtitle="Live project tasks currently under active execution."
          />
        </div>
      </section>

      <section className="section status-page">
        <div className="container status-page-grid">
          <article className="status-main-card in-progress">
            <div className="status-main-head">
              <div>
                <p className="status-pill in-progress">Work In Progress</p>
                <h3 className="status-title">Active Execution Sites</h3>
                <p className="muted status-subcopy">
                  Sites currently under active engineering and on-ground execution.
                </p>
              </div>
              <p className="status-count">{workInProgress.length} Projects</p>
            </div>
            <div className="status-list-grid">
              {workInProgress.map((item, index) => (
                <article key={item} className="status-item-card in-progress">
                  <p className="status-item-index">{String(index + 1).padStart(2, "0")}</p>
                  <h4 className="status-item-title">{item.replace(/\.$/, "")}</h4>
                  <p className="status-item-tag in-progress">Execution in progress</p>
                </article>
              ))}
            </div>
          </article>
          <StatusQuickNav active="/work-in-progress" />
        </div>
      </section>
    </main>
  );
}

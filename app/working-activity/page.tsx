import SectionHeading from "@/components/SectionHeading";
import StatusQuickNav from "@/components/StatusQuickNav";
import { workingActivities } from "@/lib/content";

const ABOUT_TO_START_PATTERN = /\s*\(about to start\)\.?$/i;

function normalizeUpcomingTitle(value: string) {
  return value.replace(ABOUT_TO_START_PATTERN, "").trim();
}

export default function WorkingActivityPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Execution Status"
            title="Working Activity"
            subtitle="Current activities being handled by engineering and project teams."
          />
        </div>
      </section>

      <section className="section status-page">
        <div className="container status-page-grid">
          <article className="status-main-card activity">
            <div className="status-main-head">
              <div>
                <p className="status-pill">Working Activity</p>
                <h3 className="status-title">Upcoming Project Mobilization</h3>
                <p className="muted status-subcopy">
                  Projects currently in pre-start planning, documentation, and readiness stage.
                </p>
              </div>
              <p className="status-count">{workingActivities.length} Projects</p>
            </div>
            <div className="status-list-grid">
              {workingActivities.map((item, index) => (
                <article key={item} className="status-item-card planned">
                  <p className="status-item-index">{String(index + 1).padStart(2, "0")}</p>
                  <h4 className="status-item-title">{normalizeUpcomingTitle(item)}</h4>
                  <p className="status-item-tag planned">About to start</p>
                </article>
              ))}
            </div>
          </article>
          <StatusQuickNav active="/working-activity" />
        </div>
      </section>
    </main>
  );
}

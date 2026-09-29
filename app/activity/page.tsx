import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import PartnerVisualShowcase from "@/components/PartnerVisualShowcase";
import ProjectImageGallery from "@/components/ProjectImageGallery";

const activityLinks = [
  { href: "/working-activity", label: "Working Activity", detail: "Upcoming project mobilization and planning." },
  { href: "/work-in-progress", label: "Work In Progress", detail: "Current active execution sites." },
  { href: "/work-done", label: "Work Done", detail: "Completed project references and milestones." },
  { href: "/compliance-documents", label: "Compliance Documents", detail: "Company certificates and supporting records." },
];

export default function ActivityPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Activity"
            title="Site Activity & Project Library"
            subtitle="Follow execution progress, view real project imagery, and access current delivery records."
          />
          <div className="activity-link-row">
            {activityLinks.map((item) => (
              <Link key={item.href} href={item.href} className="activity-link-card">
                <strong>{item.label}</strong>
                <span>{item.detail}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="On-site activity"
            title="Execution Moments from Real Projects"
            subtitle="Field coordination, installation work, quality checks, and delivery milestones."
          />
          <PartnerVisualShowcase />
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Project library"
            title="Project-Wise Site Photos"
            subtitle="Site imagery organized by project for quick visual reference."
          />
          <ProjectImageGallery />
        </div>
      </section>
    </main>
  );
}

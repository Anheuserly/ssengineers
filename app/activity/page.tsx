import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import PartnerVisualShowcase from "@/components/PartnerVisualShowcase";
import ProjectImageGallery from "@/components/ProjectImageGallery";
import ActivityVideoGallery from "@/components/ActivityVideoGallery";

export const metadata = {
  title: "On-Site Activity & Video Gallery | S.S. Engineers & Consultants",
  description: "Track live on-site MEP project milestones, fire safety tutorials, NBC compliance standards, and technical masterclasses from Anil Saini Fire Academy.",
};

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
            eyebrow="Activity & Masterclasses"
            title="Site Activity & Engineering Video Gallery"
            subtitle="Follow field progress, watch practical fire safety demonstrations from Anil Saini Fire Academy, and access delivery records."
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

      {/* Video Gallery Section */}
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="container">
          <SectionHeading
            eyebrow="Video Masterclasses"
            title="Practical Field Engineering Demonstrations"
            subtitle="Hands-on tutorials on National Building Code (NBC 2016), gas suppression, pump house operations, and statutory compliance from Anil Saini Fire Academy."
          />
          <ActivityVideoGallery />
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="On-site activity"
            title="Execution Moments from Real Projects"
            subtitle="Field coordination, installation work, quality checks, and delivery milestones."
          />
          <PartnerVisualShowcase />
        </div>
      </section>

      <section className="section">
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

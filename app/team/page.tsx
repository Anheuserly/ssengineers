import SectionHeading from "@/components/SectionHeading";
import { team, machinery } from "@/lib/content";

export default function TeamPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Leadership"
            title="Experienced, Multi-Disciplinary Team"
            subtitle="Senior professionals supported by engineers, safety officers, and on-site supervisors."
          />
        </div>
      </section>

      <section className="section">
        <div className="container grid-3">
          {team.map((member) => (
            <div key={member.name} className="tile">
              <p className="role">{member.role}</p>
              <p className="name">{member.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Tools & Equipment"
            title="Ready for On-Site Execution"
            subtitle="Owned machinery ensures fast mobilization and precise installation."
          />
          <div className="tag-grid">
            {machinery.map((item) => (
              <span key={item} className="tag">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

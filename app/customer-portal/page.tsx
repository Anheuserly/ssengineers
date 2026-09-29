import Link from "next/link";
import { redirect } from "next/navigation";
import SectionHeading from "@/components/SectionHeading";
import {
  getPortalLoginPath,
  getPortalSession,
  getPortalRoleLabel,
} from "@/lib/server/portal-auth";

const customerActions = [
  {
    title: "Request Service Survey",
    detail: "Share site scope and receive technical response from our execution team.",
    href: "/contact",
  },
  {
    title: "Project Portfolio",
    detail: "Review sectors, project snapshots, and delivery case studies.",
    href: "/projects",
  },
  {
    title: "Support Documents",
    detail: "Access company profile and compliance documentation.",
    href: "/download-center",
  },
];

export default async function CustomerPortalPage() {
  const session = await getPortalSession();
  if (!session || session.role !== "customer") {
    redirect(getPortalLoginPath("customer"));
  }

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Portal"
            title={`${getPortalRoleLabel(session.role)} Dashboard`}
            subtitle={`Signed in as: ${session.identifier}`}
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="portal-quick-grid">
            {customerActions.map((item) => (
              <article key={item.title} className="portal-quick-card">
                <h3>{item.title}</h3>
                <p className="muted">{item.detail}</p>
                <Link className="button ghost small" href={item.href}>
                  Open
                </Link>
              </article>
            ))}
          </div>

          <form className="portal-logout" action="/api/auth/logout?redirect=/portal-login" method="post">
            <button className="button small" type="submit">
              Logout
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
